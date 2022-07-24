import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
