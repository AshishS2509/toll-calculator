import { Fab, Modal, styled, useTheme } from "@mui/material";
import { useMapStore } from "../hooks/useMap";
import getStyleUrl from "../config";
import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { IThemeMode } from "../types/props.types";
import { useState } from "react";
import { useTollData } from "../hooks/useTollData";

const ThemeButtom = styled(Fab)(({ theme }) => ({
  position: "fixed",
  top: 16,
  right: 16,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  ":hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
  zIndex: 1000,
}));

const ThemeSwitch = ({ themeMode, setThemeMode }: IThemeMode) => {
  const { map, resetMap } = useMapStore();
  const { setData } = useTollData();
  const [open, setOpen] = useState(false);
  const { palette } = useTheme();

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      map?.setStyle(getStyleUrl(), { diff: true });
      return newMode;
    });
  };
  return (
    <>
      <ThemeButtom
        title="Toggle Theme"
        onClick={() => setOpen(true)}
        size="small"
      >
        {themeMode === "light" ? (
          <AiFillMoon size={20} />
        ) : (
          <AiFillSun size={20} />
        )}
      </ThemeButtom>
      <Modal open={open}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: palette.background.paper,
            color: palette.text.primary,
            padding: "24px 32px",
            borderRadius: 8,
            boxShadow:
              palette.mode === "dark"
                ? "0 4px 24px rgba(0,0,0,0.7)"
                : "0 4px 24px rgba(0,0,0,0.2)",
            minWidth: 320,
            outline: "none",
          }}
        >
          <h2
            style={{ margin: 0, marginBottom: 16, color: palette.text.primary }}
          >
            Change Theme?
          </h2>
          <p style={{ marginBottom: 24, color: palette.text.secondary }}>
            Changing theme will reset the map. Are you sure you want to change
            theme?
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              style={{
                padding: "6px 16px",
                background: "transparent",
                color: palette.text.primary,
                border: `1px solid ${palette.divider}`,
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              style={{
                padding: "6px 16px",
                background: palette.primary.main,
                color: palette.primary.contrastText,
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => {
                resetMap();
                setData(undefined)
                toggleTheme();
                setOpen(false);
              }}
            >
              Yes, Change
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ThemeSwitch;
