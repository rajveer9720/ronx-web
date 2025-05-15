import {
  alpha,
  createTheme,
  PaletteMode,
  ThemeOptions,
} from "@mui/material/styles";
import deepmerge from "deepmerge";
import { Colors } from "../utils/colors";

// const PRIMARY = "#0044fc";
// const PRIMARY = "#3a4bc9";
// const PRIMARY_LIGHT = "#7483e3";
// const PRIMARY_DARK = "#161a8f";

const PRIMARY = Colors.primary;
const PRIMARY_LIGHT = Colors.primary_light;
const PRIMARY_DARK = Colors.primary_dark;

export const createAppTheme = (mode: PaletteMode) => {
  const baseTheme: ThemeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: "DM Sans, sans-serif",
    },
    shape: {
      borderRadius: 10,
    },
  };

  const themeModes: Record<PaletteMode, ThemeOptions> = {
    light: {
      palette: {
        primary: {
          main: PRIMARY,
          light: PRIMARY_LIGHT,
          dark: PRIMARY_DARK,
          contrastText: "#ffffff",
        },
        background: {
          default: "#f5f5f5",
          paper: "#ffffff",
        },
      },

      components: {
        // Button component
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
              backgroundColor: PRIMARY,
              color: "#ffffff",
              "&:hover": {
                backgroundColor: PRIMARY_DARK,
              },
            },
            outlinedPrimary: {
              borderColor: PRIMARY_LIGHT,
              color: PRIMARY_LIGHT,
              "&:hover": {
                backgroundColor: alpha(PRIMARY_LIGHT, 0.1),
                borderColor: PRIMARY_LIGHT,
              },
            },
            textPrimary: {
              color: PRIMARY_LIGHT,
              "&:hover": {
                backgroundColor: alpha(PRIMARY_DARK, 0.1),
              },
            },
          },
        },
        MuiSvgIcon: {
          styleOverrides: {
            colorPrimary: {
              color: PRIMARY_LIGHT,
            },
          },
        },
        // Switch component
        MuiSwitch: {
          styleOverrides: {
            switchBase: {
              "&.Mui-checked": {
                color: PRIMARY,
                "& + .MuiSwitch-track": {
                  backgroundColor: PRIMARY,
                  opacity: 0.5,
                },
              },
            },
          },
        },
        // Checkbox component
        MuiCheckbox: {
          styleOverrides: {
            root: {
              "&.Mui-checked": {
                color: PRIMARY,
              },
            },
          },
        },
        // Radio button component
        MuiRadio: {
          styleOverrides: {
            root: {
              "&.Mui-checked": {
                color: PRIMARY,
              },
            },
          },
        },
        // Table components
        MuiTableCell: {
          styleOverrides: {
            head: {
              fontWeight: 600,
              "&.MuiTableCell-root": {
                color: PRIMARY,
              },
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              "&.Mui-selected": {
                backgroundColor: "rgba(128, 0, 255, 0.08)",
                "&:hover": {
                  backgroundColor: "rgba(128, 0, 255, 0.12)",
                },
              },
            },
          },
        },
        // Button Group component
        MuiButtonGroup: {
          styleOverrides: {
            root: {
              boxShadow: "none",
            },
            groupedContainedPrimary: {
              backgroundColor: PRIMARY,
              "&:not(:last-child)": {
                borderColor: PRIMARY_LIGHT,
              },
            },
            groupedOutlinedPrimary: {
              borderColor: PRIMARY,
            },
          },
        },
        // List component
        MuiListItem: {
          styleOverrides: {
            root: {
              "&.Mui-selected": {
                backgroundColor: "rgba(128, 0, 255, 0.08)",
                "&:hover": {
                  backgroundColor: "rgba(128, 0, 255, 0.12)",
                },
              },
            },
          },
        },
        MuiListItemText: {
          styleOverrides: {
            primary: {
              fontWeight: 600,
            },
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: {
              "&.Mui-selected": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: alpha(PRIMARY_LIGHT, 0.2),
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "10%",
                  bottom: "10%",
                  right: 0,
                  width: 4,
                  borderRadius: "40px",
                  backgroundColor: PRIMARY,
                },
              },
              "&:hover": {
                backgroundColor: alpha(PRIMARY_LIGHT, 0.2),
              },
            },
          },
        },
        // TextField & Input components
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: PRIMARY,
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              "&:after": {
                borderBottomColor: PRIMARY,
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              "&:after": {
                borderBottomColor: PRIMARY,
              },
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              "&.Mui-focused": {
                color: PRIMARY,
              },
            },
          },
        },
        // Pagination component
        MuiPaginationItem: {
          styleOverrides: {
            root: {
              "&.Mui-selected": {
                backgroundColor: "rgba(128, 0, 255, 0.12)",
                color: PRIMARY,
              },
            },
          },
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: PRIMARY,
          light: PRIMARY_LIGHT,
          dark: PRIMARY_LIGHT,
          contrastText: "#ffffff",
        },
      },
    },
  };

  // Merge baseTheme with mode-specific theme
  return createTheme(
    deepmerge.all([
      baseTheme,
      themeModes[mode],
      {
        colorSchemes: {
          light: themeModes.light,
          dark: themeModes.dark,
        },
        cssVariables: {
          colorSchemeSelector: "data-toolpad-color-scheme",
        },
      },
    ])
  );
};

// Create default theme (light mode)
const theme = createAppTheme("light");

export default theme;

// Export a function to enable system mode switching
export const getTheme = (mode: PaletteMode) => {
  return createAppTheme(mode);
};
