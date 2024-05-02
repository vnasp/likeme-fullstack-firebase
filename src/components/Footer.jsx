// External libraries
import { Box, Typography } from "@mui/material";

// Global utilities and settings

// Components

// Styles
import { glassStyle } from './../theme';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      <Box
        component="section"
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          ...glassStyle,
          a: {
            color: 'primary.dark',
            textDecoration: 'none',
            "&:hover": {
              color: 'primary.main',
            },
          },
        }}
      >
        <Typography variant="body2" color="primary.dark">
          © {currentYear} Todos los derechos reservados
        </Typography>
        <Typography variant="body2" color="primary.dark">
          Sitio creado con{" "}
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ReactJS
          </a>,{" "}
          <a href="https://mui.com/" target="_blank" rel="noopener noreferrer">
            Material UI
          </a> y <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">
            Firebase
          </a>
        </Typography>
      </Box>
  );
}
