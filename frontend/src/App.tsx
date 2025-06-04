import { useState } from "react";
import MainPage from "./Layout";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./themes/theme";
import ThemeSwitch from "./components/ThemeSwitch";

const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      "*::-webkit-scrollbar": {
        width: "8px", // Width of the scrollbar
        height: "8px", // Height of the scrollbar (for horizontal scrollbars)
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "transparent" : "#f1f1f1",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#888" : "#ccc",
        borderRadius: "10px",
      },
      "*::-webkit-scrollbar-thumb:hover": {
        backgroundColor: theme.palette.mode === "dark" ? "#555" : "#999",
      },
      "*::-webkit-scrollbar-button": {
        display: "none", // Hide scrollbar buttons
      },
    })}
  />
);

function App() {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    storedTheme as "light" | "dark"
  );

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {globalStyles}
      <ThemeSwitch themeMode={themeMode} setThemeMode={setThemeMode} />
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
