import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#305eff",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Work Sans, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "medium",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          paddingInline: 16,
          boxShadow: "none",
          borderRadius: 12,
        },
        containedPrimary: {
          backgroundColor: "#305eff",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#234acc",
          },
        },
        containedSecondary: {
          backgroundColor: "#f50057",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#c51162",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
  },
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
});

export default theme;
