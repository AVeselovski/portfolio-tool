import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// TODO: blur all backdrops (e.g. MUI docs modal)

declare module "@mui/material/styles" {
  interface Theme {
    drawerWidth: number;
  }
  /* Allow configuration using `createTheme` */
  interface ThemeOptions {
    drawerWidth: number;
  }
}

const theme = createTheme({
  drawerWidth: 240,
});

export { theme, ThemeProvider, CssBaseline };
