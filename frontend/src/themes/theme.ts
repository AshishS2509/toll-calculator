import { createTheme, ThemeOptions } from "@mui/material/styles";

const sharedThemeSettings: ThemeOptions = {
  typography: {
    fontFamily: "Poppins, sans-serif",
    htmlFontSize: 16,
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 20px",
          fontWeight: 500,
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...sharedThemeSettings,
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#ffffff",
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    secondary: {
      main: "#f8f9fa", // Very light gray
      light: "#ffffff", // Pure white
      dark: "#e9ecef", // Slightly darker gray
      contrastText: "#212121",
      50: "#ffffff", // White
      100: "#f8f9fa", // Snow white
      200: "#e9ecef", // Ice gray
      300: "#dee2e6", // Silver
      400: "#ced4da", // Light steel
      500: "#adb5bd", // Medium gray
      600: "#6c757d", // Slate
      700: "#495057", // Charcoal
      800: "#343a40", // Dark graphite
      900: "#212529", // Near black
    },
    warning: {
      main: "#ffc107",
      light: "#ffd54f",
      dark: "#ff8f00",
      contrastText: "#212121",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#ffffff",
    },
    info: {
      main: "#00acc1",
      light: "#26c6da",
      dark: "#0097a7",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f8f9fa",
    },
    text: {
      primary: "#212121",
      secondary: "#424242",
      disabled: "#9e9e9e",
    },
    action: {
      active: "#1976d2",
      hover: "rgba(25, 118, 210, 0.04)",
      selected: "rgba(25, 118, 210, 0.16)",
      disabled: "#bdbdbd",
    },
    divider: "rgba(0, 0, 0, 0.06)",
  },
});

export const darkTheme = createTheme({
  ...sharedThemeSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
      contrastText: "#212121",
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
    },
    secondary: {
      main: "#2d2d2d", // Dark gray
      light: "#1a1a1a", // Very dark
      dark: "#404040", // Medium dark
      contrastText: "#f8f9fa",
      50: "#121212", // Near black
      100: "#1a1a1a",
      200: "#4f4f4f",
      300: "#666666",
      400: "#7e7e7e",
      500: "#969696",
      600: "#aeaeae",
      700: "#c7c7c7",
      800: "#e0e0e0",
      900: "#fafafa",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#212121",
    },
    error: {
      main: "#f44336",
      light: "#ef5350",
      dark: "#d32f2f",
      contrastText: "#ffffff",
    },
    info: {
      main: "#26c6da",
      light: "#4dd0e1",
      dark: "#00acc1",
      contrastText: "#212121",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#212121",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
      disabled: "#757575",
    },
    action: {
      active: "#29b6f6",
      hover: "rgba(41, 182, 246, 0.08)",
      selected: "rgba(41, 182, 246, 0.16)",
      disabled: "#424242",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
});
