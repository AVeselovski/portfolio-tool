import { FC } from "react";
import MuiPaper, { PaperProps } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(MuiPaper)<PaperProps>(({ theme }) => ({
  borderRadius: theme.spacing(1),
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

type Props = PaperProps;

const Paper: FC<Props> = ({ children, ...props }) => {
  return (
    <StyledPaper variant="outlined" {...props}>
      {children}
    </StyledPaper>
  );
};

export default Paper;
