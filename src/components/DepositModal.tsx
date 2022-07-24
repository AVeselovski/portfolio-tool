import { useState } from "react";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  LoadingButton,
  Modal,
  TextField,
} from "./common";

const DepositModal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = (amount: number) => {},
  totalFunds = 30000,
}) => {
  const [amount, setAmount] = useState(totalFunds);

  const submitDisabled = (typeof amount === "undefined" || amount === null) && amount < 0;

  const clearForm = () => {
    setAmount(totalFunds);
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(amount);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit available cash">
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ maxWidth: 480, minWidth: 480 }}>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="deposit-amount">Amount</FormLabel>
            <TextField
              autoFocus
              id="deposit-amount"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              onChange={(e) => setAmount(Number(e.target.value))}
              size="medium"
              type="number"
              value={amount}
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
            Set
          </LoadingButton>
        </DialogActions>
      </form>
      <Box sx={{ display: ["block", "none"], height: "100vh" }} />
    </Modal>
  );
};

export default DepositModal;
