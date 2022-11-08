import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#ECECF9", // main / 05%
      main: "#8080d6", // main color
      dark: "#1F1F60", // main / 95%
      contrastText: "#fff",
    },
    secondary: {
      light: "#F8EBFA", // main / 05%
      main: "#CE72DC", // main color
      dark: "#81248F", // main / 95%
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(145deg, #8080d6 30%, #CE72DC 90%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "22px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          height: "48px",
          borderRadius: "20px",
          paddingRight: "24px",
          paddingLeft: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "22px",

          fieldset: {
            borderColor: "#ECECF9",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: lightTheme.palette.secondary,
    secondary: lightTheme.palette.primary,
  },
  typography: lightTheme.typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(145deg, #1F1F60 30%, #81248F 90%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "22px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          height: "48px",
          borderRadius: "20px",
          paddingRight: "24px",
          paddingLeft: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "22px",

          fieldset: {
            borderColor: lightTheme.palette.secondary,
          },
        },
      },
    },
  },
});
