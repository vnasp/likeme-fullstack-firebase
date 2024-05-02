// External libraries
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

// Global utilities and settings

// Components
import Login from "./../components/Login";

// Styles

export default function Header() {
  return (
    <AppBar
      component="nav"
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: 0,
        color: "primary.main",
      }}
    >
      <Toolbar
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <img
            srcSet="./logo.webp"
            src="./logo.webp"
            width={50}
            height={50}
            sx={{ marginRight: 1 }}
          />
          <Typography
            component="h1"
            variant={"h3"}
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              fontFamily: "Limelight, sans-serif",
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Art Gallery
          </Typography>
        </Box>
        <Login />
      </Toolbar>
    </AppBar>
  );
}
