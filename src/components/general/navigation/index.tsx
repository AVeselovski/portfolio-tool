import { FC, useState } from "react";
import { styled } from "@mui/material/styles";

import { Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from "../../common";
import { ChevronLeftIcon, MenuIcon } from "../../icons";
import AppBar, { DesktopMenuButton, MobileMenuButton } from "./AppBar";
import Drawer, { DrawerHeader, MobileDrawer } from "./Drawer";
// import NavList from "./NavList";

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(anchorEl);

  const toggleDrawer = () => {
    setIsOpen((val) => !val);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="inherit" elevation={0} open={isOpen} position="fixed" variant="outlined">
        <Toolbar>
          {/* 
          <DesktopMenuButton
            aria-label="open drawer menu"
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            open={isOpen}
            size="medium"
          >
            <MenuIcon />
          </DesktopMenuButton>
          <MobileMenuButton
            aria-label="open drawer menu"
            color="inherit"
            onClick={toggleDrawer}
            open={isOpen}
            size="small"
          >
            <MenuIcon />
          </MobileMenuButton> 
          */}
          <Typography component="h1" noWrap sx={{ flexGrow: 1 }} variant="h6">
            Portfolio Tool
          </Typography>

          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={isUserMenuOpen}
            onClose={handleUserMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/*
      <MobileDrawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
      </MobileDrawer>

      <Drawer open={isOpen} variant="permanent">
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
      </Drawer> 
      */}
    </>
  );
};

export default Navigation;

export const NavSpacer = styled("div")(({ theme }) => ({
  /* Necessary for content to be below app bar */
  ...theme.mixins.toolbar,
}));
