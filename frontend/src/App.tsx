import { useEffect, useState } from "react";
import MainPage from "./pages";
import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import Icons from "./components/Icons";
import { darkTheme, lightTheme } from "./themes/theme";

function App() {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    storedTheme as "light" | "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <IconButton
        onClick={toggleTheme}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        {themeMode === "light" ? (
          <Icons iconName="dark" />
        ) : (
          <Icons iconName="light" />
        )}
      </IconButton>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
