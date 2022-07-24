import { FC } from "react";
import MuiBox, { BoxProps as MuiBoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledBox = styled(MuiBox)<MuiBoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));

type Props = MuiBoxProps;

const MainContent: FC<Props> = ({ children, ...props }) => (
  <StyledBox {...props} component="main">
    {children}
  </StyledBox>
);

export default MainContent;
