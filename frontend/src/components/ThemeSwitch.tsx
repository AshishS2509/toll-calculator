import { Fab, styled } from "@mui/material";
import { useMapStore } from "../hooks/useMap";
import getStyleUrl from "../config";
import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { IThemeMode } from "../types/props.types";

const ThemeButtom = styled(Fab)(({ theme }) => ({
  position: "fixed",
  top: 16,
  right: 16,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  zIndex: 1000,
}));

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
    <ThemeButtom title="Toggle Theme" onClick={toggleTheme} size="small">
      {themeMode === "light" ? (
        <AiFillMoon size={20} />
      ) : (
        <AiFillSun size={20} />
      )}
    </ThemeButtom>
  );
};

export default ThemeSwitch;
