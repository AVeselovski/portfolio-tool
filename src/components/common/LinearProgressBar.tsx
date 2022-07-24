import { FC } from "react";
import MuiLinearProgress, {
  linearProgressClasses,
  LinearProgressProps as MuiLinearProgressProps,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

type StyledProps = MuiLinearProgressProps & {
  overflow: boolean;
};

const StyledLinearProgressBar = styled(MuiLinearProgress, {
  shouldForwardProp: (prop) => prop !== "overflow",
})<StyledProps>(({ theme, overflow }) => {
  return {
    borderRadius: 5,
    height: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: overflow ? theme.palette.primary : theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: overflow ? theme.palette.error.light : theme.palette.primary.light,
      borderRadius: 5,
    },
  };
});

type Props = MuiLinearProgressProps;

const LinearProgressBar: FC<Props> = ({ value = 0, ...props }) => {
  const overflow = value > 100;
  const calculatedValue = overflow ? value - 100 : value;

  return <StyledLinearProgressBar {...props} overflow={overflow} value={calculatedValue} />;
};

export default LinearProgressBar;
