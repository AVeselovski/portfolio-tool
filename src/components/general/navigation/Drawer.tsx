import MuiDrawer, { drawerClasses, DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";

const openedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: theme.drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(8)} + 1px)`,
});

type DrawerProps = MuiDrawerProps & {
  open?: boolean;
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  boxSizing: "border-box",
  flexShrink: 0,
  whiteSpace: "nowrap",
  width: theme.drawerWidth,
  ...(open && {
    ...openedMixin(theme),
    [`& .${drawerClasses.paper}`]: openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    [`& .${drawerClasses.paper}`]: closedMixin(theme),
  }),
  /* Do not show on mobile */
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export default Drawer;

export const MobileDrawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  boxSizing: "border-box",
  flexShrink: 0,
  whiteSpace: "nowrap",
  width: theme.drawerWidth + 20,
  zIndex: theme.zIndex.appBar + 101,
  [`& .${drawerClasses.paper}`]: {
    width: theme.drawerWidth + 20,
  },
  /* Only show on mobile */
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1.5),
  /* Necessary for content to be below app bar */
  ...theme.mixins.toolbar,
}));
