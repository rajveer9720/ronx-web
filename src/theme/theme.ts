import {
  alpha,
  createTheme,
  PaletteMode,
  ThemeOptions,
} from "@mui/material/styles";
import deepmerge from "deepmerge";

const PRIMARY = "#0044fc"; // Vibrant purple
const PRIMARY_LIGHT = "#c2c8fe"; // Lighter purple for hover states
const PRIMARY_DARK = "#002fe3"; // Darker purple

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
      fontFamily: "Work Sans, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  };

  const themeModes: Record<PaletteMode, ThemeOptions> = {
    light: {
      palette: {
        mode: "light",
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
              "&:hover": {
                backgroundColor: PRIMARY_DARK,
              },
            },
            outlinedPrimary: {
              borderColor: PRIMARY,
              color: PRIMARY,
              "&:hover": {
                backgroundColor: alpha(PRIMARY_LIGHT, 0.1),
                borderColor: PRIMARY,
              },
            },
            textPrimary: {
              color: PRIMARY_LIGHT,
              "&:hover": {
                backgroundColor: alpha(PRIMARY_LIGHT, 0.1),
              },
            },
          },
        },
        // Chip component
        MuiChip: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: PRIMARY,
              "&.MuiChip-outlined": {
                borderColor: PRIMARY,
                color: PRIMARY,
              },
            },
          },
        },
        // Divider component
        MuiDivider: {
          styleOverrides: {
            root: {
              backgroundColor: alpha(PRIMARY, 0.12),
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
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              color: PRIMARY,
              minWidth: 40,
            },
          },
        },
        MuiListItemText: {
          styleOverrides: {
            primary: {
              fontWeight: 500,
            },
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: {
              "&.Mui-selected": {
                backgroundColor: alpha(PRIMARY_LIGHT, 0.5),
                "&:hover": {
                  backgroundColor: alpha(PRIMARY_LIGHT, 0.5),
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: 4,
                  borderRadius: "0 4px 4px 0",
                  backgroundColor: PRIMARY,
                },
              },
              "&:hover": {
                backgroundColor: alpha(PRIMARY_LIGHT, 0.3),
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
        mode: "dark",
        primary: {
          main: PRIMARY_LIGHT,
          light: PRIMARY,
          dark: PRIMARY_DARK,
          contrastText: "#ffffff",
        },
      },

      components: {
        MuiButton: {
          styleOverrides: {
            outlinedPrimary: {
              borderColor: PRIMARY_LIGHT,
              color: PRIMARY_LIGHT,
              "&:hover": {
                backgroundColor: alpha(PRIMARY_LIGHT, 0.1),
                borderColor: PRIMARY_LIGHT,
              },
            },
          },
        },

        MuiListItemButton: {
          styleOverrides: {
            root: {
              "&.Mui-selected": {
                backgroundColor: alpha("#ffffff", 0.5),
                "&:hover": {
                  backgroundColor: alpha("#ffffff", 0.5),
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: 4,
                  borderRadius: "0 4px 4px 0",
                  backgroundColor: PRIMARY,
                },
              },
              "&:hover": {
                backgroundColor: alpha("#ffffff", 0.3),
              },
            },
          },
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
          light: {},
          dark: {
            palette: {
              mode: "dark",
              primary: {
                main: PRIMARY,
                dark: PRIMARY_DARK,
                light: PRIMARY_LIGHT,
              },
            },
          },
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
