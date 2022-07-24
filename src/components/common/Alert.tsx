import { forwardRef } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={0} ref={ref} variant="filled" {...props} />;
});

export default Alert;
