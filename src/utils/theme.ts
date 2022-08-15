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
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        "::-webkit-scrollbar": {
          width: "5px",
        },
        /* Handle */
        "::-webkit-scrollbar-thumb": {
          borderRadius: "5px",
          background: "#777",
        },
        /* Handle on hover */
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }),
    },
  },
});

export { theme, ThemeProvider, CssBaseline };
