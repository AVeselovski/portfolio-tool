import { FC } from "react";

import { Box, Main, MainContent } from "./common";
import Navigation, { NavSpacer } from "./general/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navigation />

      <Main>
        <NavSpacer />
        <MainContent>{children}</MainContent>
      </Main>
    </Box>
  );
};

export default Layout;
