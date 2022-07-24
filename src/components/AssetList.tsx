import { useState } from "react";

import { formatCurrency } from "utils/numbers";
import { TYPES as TYPES_ARR, SECTORS as SECTORS_ARR } from "utils/constants";

import { Box, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper } from "./common";
import { MoreIcon } from "./icons";

const TYPES = TYPES_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

const SECTORS = SECTORS_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

type AssetItemProps = any;

const AssetItem = ({ item, onDelete = () => {}, onEdit = () => {}, total }: AssetItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const percentage = (item.value / total) * 100;

  const handleEdit = () => {
    onEdit();
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete();
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const actionsMenu = (
    <>
      <IconButton
        aria-controls={isMenuOpen ? "action-menu" : undefined}
        aria-expanded={isMenuOpen ? "true" : undefined}
        aria-haspopup="true"
        aria-label="action menu"
        edge="end"
        id="action-menu-button"
        onClick={handleMenuOpen}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="action-menu"
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit} sx={{ minWidth: "80px" }}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ minWidth: "80px" }}>
          Remove
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <ListItem
      secondaryAction={actionsMenu}
      sx={{ borderBottom: "1px solid", borderColor: "grey.300" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ListItemText primary={item.name} secondary={SECTORS[item.sector]} />
        <ListItemText
          primary={`${formatCurrency(item.value)} ${percentage.toFixed(0)}%`}
          secondary={TYPES[item.type]}
          sx={{ mr: 1, textAlign: "right" }}
        />
      </Box>
    </ListItem>
  );
};

type Props = any;

const AssetList = ({ data, onDelete, onEdit, total }: Props) => {
  return (
    <Paper sx={{ maxHeight: "calc(100vh - 200px)", overflow: "scroll", px: 0, py: 1 }}>
      <Box sx={{ display: "flex" }}>
        <List dense sx={{ width: "100%" }}>
          {data.map((asset: any, i: number) => (
            <AssetItem
              key={i}
              item={asset}
              onDelete={() => onDelete(asset)}
              onEdit={() => onEdit(asset)}
              total={total}
            />
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default AssetList;
