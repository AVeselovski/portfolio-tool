// import { FC } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Avatar from "@mui/material/Avatar";
// import MuiButtonBase, { ButtonBaseProps as MuiButtonBaseProps } from "@mui/material/ButtonBase";
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

// import { getUserInitials } from "utils/user";

type AppBarProps = MuiAppBarProps & {
  open?: boolean;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  borderLeft: "none",
  borderRight: "none",
  borderTop: "none",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  zIndex: theme.zIndex.drawer + 1,
  /* Slide on `sm` and up */
  [theme.breakpoints.up("sm")]: {
    ...(open && {
      width: `calc(100% - ${theme.drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}));

export default AppBar;

type MobileMenuButtonProps = MuiIconButtonProps & {
  open?: boolean;
};

export const MobileMenuButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<MobileMenuButtonProps>(({ theme, open }) => ({
  marginRight: theme.spacing(2),
  /* Only show on mobile */
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

type DesktopMenuButtonProps = MuiIconButtonProps & {
  open?: boolean;
};

export const DesktopMenuButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<DesktopMenuButtonProps>(({ theme, open }) => ({
  ...(open && { display: "none" }),
  marginRight: theme.spacing(4.5),
  /* Do not show on mobile */
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

// type UserButtonProps = MuiButtonBaseProps & {
//   children: string;
// };

// export const UserButton: FC<UserButtonProps> = ({ children, ...props }) => {
//   return (
//     <MuiButtonBase
//       {...props}
//       aria-haspopup="true"
//       aria-label="user button"
//       color="inherit"
//       id="user-menu-button"
//       sx={{ ml: 2, borderRadius: 50 }}
//     >
//       <Avatar sx={{ fontSize: ["1rem", "1.25rem"], height: [32, 40], width: [32, 40] }}>
//         {getUserInitials(children)}
//       </Avatar>
//     </MuiButtonBase>
//   );
// };
