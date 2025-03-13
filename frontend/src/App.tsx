import { useState } from "react";
import MainPage from "./pages";
import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import Icons from "./components/Icons";
import { darkTheme, lightTheme } from "./themes/theme";
import { useMapStore } from "./hooks/useMap";
import getStyleUrl from "./config";

function App() {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    storedTheme as "light" | "dark"
  );

  const { map } = useMapStore();

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      map?.setStyle(getStyleUrl(), { diff: true });
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <IconButton
        onClick={toggleTheme}
        title="Toggle Theme"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 100,
        }}
      >
        <Icons iconName={themeMode} />
      </IconButton>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
