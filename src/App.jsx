// External libraries
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Grid, Box } from "@mui/material";

// Global utilities and settings
import { glassStyle } from "./theme";
import { useAuth } from "./contexts/AuthContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import ImagesAll from "./components/ImagesAll";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        height: "70vh",
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid
          item
          xs={12}
          md={7}
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1, overflowY: "scroll"}}
        >
          {" "}
          <Box
            component="header"
            sx={{ ...glassStyle, flexGrow: 0, textAlign: "center" }}
          >
            <Header />
          </Box>
          <Box
            component="section"
            sx={{ ...glassStyle, flexGrow: 1, textAlign: "center", height: "70vh"}}
          >
            <ImagesAll />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Box
            component="main"
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
          <Box component="footer">
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
