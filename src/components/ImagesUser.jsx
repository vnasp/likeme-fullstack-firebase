// External libraries
import { useState } from "react";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Global utilities and settings
import { useAuth } from "../contexts/AuthContext";
import { useImages } from "../contexts/ImagesContext";

// Components
import SnackbarItem from "./SnackbarItem";

// Styles
import { glassStyle } from "../theme";

export default function ImagesUser() {
  const { user } = useAuth();
  const { images, handleDeleteImage } = useImages();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Obtenemos las imagenes del usuario
  const userImages = user ? images.filter((img) => img.uid === user.uid) : [];

  // Eliminar imagen
  const handleDelete = async (imageId) => {
    try {
      const success = await handleDeleteImage(imageId);
      if (success) {
        setSnackbarMessage("Imagen eliminada exitosamente.");
      } else {
        setSnackbarMessage("No se pudo eliminar la imagen.");
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      setSnackbarMessage("Error al eliminar la imagen.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          ...glassStyle,
          py: 2,
          px: 2,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Galeria de tus imágenes
        </Typography>
        <ImageList
          sx={{
            width: "100%",
            height: 120,
            overflowX: "auto",
            overflowY: "hidden",
            flexWrap: "nowrap",
            transform: "translateZ(0)",
            marginBlockStart: 1,
            marginBlockEnd: 1,
          }}
          cols={userImages.length > 0 ? userImages.length : 1}
          rowHeight={120}
        >
          {userImages.map((image) => (
            <ImageListItem
              key={image.id}
              sx={{ width: 120, height: 120, overflow: "hidden" }}
            >
              <img
                srcSet={`${image.photoURL}?w=120&h=120&fit=crop&auto=format&dpr=2 2x`}
                src={`${image.photoURL}?w=120&h=120&fit=crop&auto=format`}
                alt={image.title}
                loading="lazy"
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`Eliminar ${image.title}`}
                    onClick={() => handleDelete(image.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <SnackbarItem openSnackbar={openSnackbar} snackbarMessage={snackbarMessage} handleCloseSnackbar={handleCloseSnackbar}/>
      </Box>
    </>
  );
}
