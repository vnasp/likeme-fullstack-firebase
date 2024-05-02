// External libraries
import { useState, useEffect } from "react";
import { Box, IconButton, Snackbar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Global utilities and settings
import { useAuth } from "../contexts/AuthContext";
import { useImages } from "../contexts/ImagesContext";

// Components
import SnackbarItem from "./SnackbarItem";

export default function ImagesLike({ image }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userHasLiked, setUserHasLiked] = useState(false);
  const { user } = useAuth();
  const { handleLikeImage, handleDislikeImage } = useImages();
  
  const handleLike = async () => {
    if (!user) {
      setOpenSnackbar(true);
      setSnackbarMessage("Debes ingresar para dar like.");

      return;
    }
  
    // Determina si el usuario ya ha dado "like"
    const alreadyLiked = image.likedBy.includes(user.uid);
  
    if (alreadyLiked) {
      const result = await handleDislikeImage(image.id, user.uid);
      if (result.success) {
        setUserHasLiked(false);
        image.likes -= 1;
      }
    } else {
      const result = await handleLikeImage(image.id, user.uid);
      if (result.success) {
        setUserHasLiked(true);
        image.likes += 1;
      }
    }
  };

  useEffect(() => {
    if (user && image && image.likedBy && image.likedBy.includes(user.uid)) {
      setUserHasLiked(true);
    } else {
      setUserHasLiked(false);
    }
  }, [user, image, image.likedBy]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <IconButton onClick={handleLike} sx={{ color: "white" }}>
        {userHasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Box component="span" sx={{ marginRight: "0.2rem", color:"white" }}>
        ({image.likes})
      </Box>
      <SnackbarItem openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage}/>
    </>
  );
}
