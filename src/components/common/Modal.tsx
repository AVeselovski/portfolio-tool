import { FC } from "react";
import Box from "@mui/material/Box";
import MuiDialog, { dialogClasses, DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";

import Transition from "./Transition";
import { CloseRounded } from "../icons";

const StyledDialog = styled(MuiDialog)<DialogProps>(({ theme }) => ({
  [`.${dialogClasses.container}`]: {
    alignItems: "flex-start",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  [`.${dialogClasses.paper}`]: {
    borderRadius: theme.spacing(1.5),
    marginBottom: `-${theme.spacing(3)}`,
    marginTop: theme.spacing(0),
    maxHeight: "100%",
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up("sm")]: {
      // marginTop: theme.spacing(3),
    },
  },
}));

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const Modal: FC<Props> = ({ children, isOpen = false, onClose = () => {}, title = "" }) => {
  const ariaLabel = title.replace(" ", "-").toLowerCase();
  const handleClose = onClose;

  return (
    <StyledDialog
      aria-labelledby={`${ariaLabel}-modal-title`}
      aria-describedby={`${ariaLabel}-modal-description`}
      closeAfterTransition
      onClose={handleClose}
      open={isOpen}
      scroll="body"
      sx={{ marginBottom: 2 }}
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          pr: 2,
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <IconButton onClick={handleClose}>
          <CloseRounded />
        </IconButton>
      </Box>
      {children}
    </StyledDialog>
  );
};

export default Modal;
