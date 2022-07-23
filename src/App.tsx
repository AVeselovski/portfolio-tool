import { theme, ThemeProvider, CssBaseline } from "utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div className="App">Hello</div>
    </ThemeProvider>
  );
}

export default App;
