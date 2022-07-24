import { FC } from "react";
import MuiCard, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const StyledCard = styled(MuiCard)<CardProps>(({ theme }) => ({
  borderRadius: "0.5rem",
}));

type Props = CardProps;

const Card: FC<Props> = ({ children, ...props }) => {
  return (
    <StyledCard variant="outlined" {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
