import { useState } from "react";
import MainPage from "./pages";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./themes/theme";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    storedTheme as "light" | "dark"
  );

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <ThemeSwitch themeMode={themeMode} setThemeMode={setThemeMode} />
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
