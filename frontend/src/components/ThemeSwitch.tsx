import { Fab } from "@mui/material";
import { useMapStore } from "../hooks/useMap";
import getStyleUrl from "../config";
import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { IThemeMode } from "../types/props.types";

const ThemeSwitch = ({ themeMode, setThemeMode }: IThemeMode) => {
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
    <Fab
      title="Toggle Theme"
      onClick={toggleTheme}
      size="small"
      color="secondary"
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      {themeMode === "light" ? (
        <AiFillSun size={20} />
      ) : (
        <AiFillMoon size={20} />
      )}
    </Fab>
  );
};

export default ThemeSwitch;
