// External libraries
import { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Global utilities and settings
import { useAuth } from "../contexts/AuthContext";
import { useImages } from "../contexts/ImagesContext";

// Components
import SnackbarItem from "./SnackbarItem";

// Styles
import { glassStyle } from "../theme";
import LoggedHeader from "./LoggedHeader";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImagesUpload() {
  const { user } = useAuth();
  const { handleAddNewImage } = useImages();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [likes, setLikes] = useState("");
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilename(uploadedFile.name);
    }
  };

  const addPost = async () => {
    if (!file || !title || !about) {
      setSnackbarMessage("Todos los campos son necesarios.");
      setOpenSnackbar(true);
      return;
    }

    const result = await handleAddNewImage(user.uid, file, title, about);
    if (result.success) {
      setSnackbarMessage(result.message);
      setOpenSnackbar(true);
      setTitle("");
      setAbout("");
      setFile(null);
      setFilename("");
    } else {
      setSnackbarMessage(result.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <LoggedHeader />
      <Box
        component="section"
        sx={{
          ...glassStyle,
          flexGrow: 1,
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          gutterBottom
          sx={{ fontFamily: "Limelight, sans-serif" }}
        >
          CXXXVIII Exposición de Arte
        </Typography>
        <Typography component="h3" variant="subtitle1" gutterBottom>
          Participa subiendo tu obra
        </Typography>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Elige una imagen
          <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
        </Button>
        {filename && <Typography>Nombr de archivo: {filename}</Typography>}
        <Box component="div" sx={{ ...glassStyle }}>
          <TextField
            fullWidth
            label="Título de tu obra"
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </Box>
        <Box component="div" sx={{ ...glassStyle }}>
          <TextField
            fullWidth
            required
            variant="standard"
            label="Describe tu obra"
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={addPost}>
            Agregar
          </Button>
        

        <SnackbarItem
          openSnackbar={openSnackbar}
          snackbarMessage={snackbarMessage}
          handleCloseSnackbar={handleCloseSnackbar}
        />
      </Box>
    </>
  );
}
