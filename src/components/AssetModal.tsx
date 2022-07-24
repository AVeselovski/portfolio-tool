import { useEffect, useState } from "react";

import { formatCurrency } from "utils/numbers";
import { TYPES as TYPES_WITH_CASH, SECTORS, REGIONS } from "utils/constants";

import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  LoadingButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "./common";

const TYPES = TYPES_WITH_CASH.filter((t) => t.key !== 0);

type Props = any;

const AssetModal = ({
  availableFunds = 0,
  asset = null,
  isOpen = false,
  onClose = () => {},
  onSubmit = (asset: any) => {},
}: Props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState(TYPES[0].key);
  const [sector, setSector] = useState(SECTORS[0].key);
  const [region, setRegion] = useState(REGIONS[0].key);
  const [value, setValue] = useState(1000);

  const isValid = name && value && value <= availableFunds;
  const submitDisabled = !isValid;

  const clearForm = () => {
    setName("");
    setType(TYPES[0].key);
    setSector(SECTORS[0].key);
    setRegion(REGIONS[0].key);
    setValue(0);
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleSetValue = (e: any) => {
    const newValue = Number(e.target.value);

    setValue(newValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      const newAsset = {
        ...asset,
        name,
        type,
        sector,
        region,
        value,
      };

      onSubmit(newAsset);
    }
  };

  useEffect(() => {
    if (asset) {
      setName(asset.name);
      setType(asset.type);
      setSector(asset.sector);
      setRegion(asset.region);
      setValue(asset.value);
    }

    return () => {
      setName("");
      setType(TYPES[0].key);
      setSector(SECTORS[0].key);
      setRegion(REGIONS[0].key);
      setValue(1000);
    };
  }, [asset, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={asset ? "Edit asset" : "Add asset"}>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ maxWidth: 480, minWidth: 480 }}>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="asset-name">Name</FormLabel>
            <TextField
              autoFocus
              id="asset-name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Microsoft"
              size="medium"
              type="text"
              value={name}
            />
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="asset-type">Type</FormLabel>
            <Select
              id="asset-type"
              onChange={(e) => setType(Number(e.target.value))}
              size="medium"
              value={type}
            >
              {TYPES.map((t) => (
                <MenuItem key={t.key} value={t.key}>
                  {t.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="asset-sector">Sector</FormLabel>
            <Select
              id="asset-sector"
              onChange={(e) => setSector(Number(e.target.value))}
              size="medium"
              value={sector}
            >
              {SECTORS.map((t) => (
                <MenuItem key={t.key} value={t.key}>
                  {t.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="asset-region">Region</FormLabel>
            <Select
              id="asset-region"
              onChange={(e) => setRegion(Number(e.target.value))}
              size="medium"
              value={region}
            >
              {REGIONS.map((t) => (
                <MenuItem key={t.key} value={t.key}>
                  {t.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Chip label={`Available funds: ${formatCurrency(availableFunds)}`} />
          </Box>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="asset-amount">Amount</FormLabel>
            <TextField
              autoFocus
              id="asset-amount"
              onChange={handleSetValue}
              size="medium"
              type="number"
              value={value}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            disableElevation
            onClick={handleClose}
            size="large"
            sx={{ minWidth: "120px" }}
            variant="outlined"
          >
            Discard
          </Button>
          <LoadingButton
            disabled={submitDisabled}
            disableElevation
            loading={false}
            size="large"
            sx={{ minWidth: "120px" }}
            type="submit"
            variant="contained"
          >
            {asset ? "Update" : "Add"}
          </LoadingButton>
        </DialogActions>
      </form>
      <Box sx={{ display: ["block", "none"], height: "100vh" }} />
    </Modal>
  );
};

export default AssetModal;
