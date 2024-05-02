import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: 'primary.dark',
          color: 'white',
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#003d74', // Azul oscuro
      light: '#3b7186', // Azul claro
      dark: '#002851', // Variante más oscura para contraste
    },
    secondary: {
      main: '#add7e9', // Azul más claro
      light: '#deefff', // Variante más clara para brillos
      dark: '#7ba3c7', // Variante más oscura para detalles
    },
    background: {
      default: '#e6f4f1', // Fondo suave para complementar el estilo glassmorfismo
      paper: '#ffffffcc', // Semi-transparente para efecto de vidrio
    },
    text: {
      primary: '#003d74', // Texto principal en azul oscuro para contraste
      secondary: '#6bb7d5', // Texto secundario en azul claro
    },
  },
});