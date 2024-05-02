// External libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// Global utilities and settings
import { theme } from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import { ImagesProvider } from "./contexts/ImagesContext.jsx";

// Components
import App from "./App.jsx";

// Styles
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ImagesProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ImagesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
