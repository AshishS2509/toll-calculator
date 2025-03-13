import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3498db",
      light: "#85c1e9",
      dark: "#21618c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f39c12",
      light: "#f7c266",
      dark: "#b57e1d",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1abc9c",
      light: "#48c9b0",
      dark: "#16a085",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e74c3c",
      light: "#ec7063",
      dark: "#943126",
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
});
