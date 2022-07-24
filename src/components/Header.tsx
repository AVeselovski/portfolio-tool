import { formatCurrency } from "utils/numbers";

import { Box, Button, Chip, IconButton, TabNav } from "./common";
import { AddIcon } from "./icons";

type Props = any;

const CategoriesHeader = ({
  onOpenAssetModal,
  onOpenDepositModal,
  onSetTab,
  tab,
  total,
}: Props) => {
  const handleOpenAssetModal = onOpenAssetModal;
  const handleOpenDepositModal = onOpenDepositModal;

  const handleSetTab = (_e: any, value: number) => onSetTab(value);

  return (
    <Box
      sx={{
        alignItems: "center",
        display: ["flex", "grid"],
        gridTemplateColumns: "1fr 1fr 1fr",
        justifyContent: "space-between",
        mb: [3],
      }}
    >
      <Box sx={{ justifySelf: "start" }}>
        <TabNav
          name="chart-tabs"
          onChange={handleSetTab}
          tabs={["Type", "Sector", "Region"]}
          value={tab}
        />
      </Box>
      <Box sx={{ justifySelf: "center" }}>
        <Chip
          label={`Total assets: ${formatCurrency(total)}`}
          sx={{ backgroundColor: "grey.200", fontWeight: 600 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifySelf: "end" }}>
        <IconButton sx={{ display: ["inline-flex", "none"], p: 0.25 }}>
          <AddIcon fontSize="large" titleAccess="Deposit" />
        </IconButton>
        <IconButton sx={{ display: ["inline-flex", "none"], p: 0.25 }}>
          <AddIcon fontSize="large" titleAccess="Add category" />
        </IconButton>
        <Button
          color="inherit"
          onClick={() => handleOpenDepositModal(true)}
          size="small"
          sx={{
            borderRadius: 10,
            display: ["none", "inline-block"],
            ml: 2,
            textTransform: "none",
          }}
          variant="outlined"
        >
          Deposit
        </Button>
        <Button
          color="primary"
          disableElevation
          onClick={() => handleOpenAssetModal(true)}
          size="small"
          sx={{
            borderRadius: 10,
            display: ["none", "inline-block"],
            ml: 2,
            textTransform: "none",
          }}
          variant="contained"
        >
          Add asset
        </Button>
      </Box>
    </Box>
  );
};

export default CategoriesHeader;
