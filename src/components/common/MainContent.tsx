import { FC } from "react";
import Container from "@mui/material/Container";

type Props = {
  children: React.ReactNode;
};

const MainContent: FC<Props> = ({ children }) => (
  <Container maxWidth={false} sx={{ display: "flex", flexDirection: "column", my: 2.5 }}>
    {children}
  </Container>
);

export default MainContent;
