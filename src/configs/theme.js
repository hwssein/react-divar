import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A62626",
    },
    secondary: {
      main: "#4e4e4e",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 730,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  typography: {
    fontFamily: ["vazir"],
    h6: {
      fontSize: "1rem",

      "@media (min-width:700px)": {
        fontSize: "1.1rem",
      },
      "@media (min-width:1000px)": {
        fontSize: "1.2rem",
      },
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "96px",
        },
      },
    },
  },

  direction: "rtl",
});

export default theme;
