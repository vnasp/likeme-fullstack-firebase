import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { updateImage } from "../firebase/firebase";

export default function ImagesEdit({ image, setIsEditMode }) {
  const [title, setTitle] = useState(image.title);
  const [about, setAbout] = useState(image.about);
  const [message, setMessage] = useState("");
/*
  useEffect(() => {
    setTitle(image.title);
    setAbout(image.about);
  }, [image]);
*/
  const editPost = async () => {
    if (!title || !about) {
      setMessage("Todos los campos son necesarios.");
      return;
    }
    try {
      const result = await updateImage(image.id, title, about)
      if (result.success) {
        setMessage("Obra editada exitosamente");
        setIsEditMode(false);
      } else {
        setMessage("Error al acualizar la obra");
      }
    } catch (error) {
      console.error("Failed to update image:", error);
    }
  }

  return (
    <>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Description"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        margin="normal"
      />
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={editPost}
      >
        Actualizar
      </Button>
      {message && <Alert severity="info">{message}</Alert>}
    </>
  );
}
