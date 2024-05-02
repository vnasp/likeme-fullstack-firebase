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
import LogOutButton from "./LogOutButton";

// Styles
import { glassStyle } from "../theme";

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
  const { user, isRegistered } = useAuth();
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
      <Box
        component="section"
        sx={{
          ...glassStyle,
        }}
      >
        {isRegistered ? (
          <Box
            component="div"
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box
              component="div"
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
              gap={2}
            >
              <img
                srcSet={user.photoURL}
                src={user.photoURL}
                alt={user.displayName}
                loading="lazy"
                width={50}
                height={50}
              />
              <Typography component="h3" variant="h5">{user.displayName}</Typography>
            </Box>
            <LogOutButton />
          </Box>
        ) : (
          <Box component="div">Usuario no registrado</Box>
        )}
      </Box>
      <Box
        component="section"
        sx={{
          ...glassStyle,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          textAlign: "center",
          py: 4,
        }}
      >
        <Box sx={{ py: 3 }}>
          <Typography component="h2" variant="h4" gutterBottom>
            Subir una obra de arte
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            vero doloremque optio nobis iure mollitia corporis, rerum hic
            architecto. Dolorem fuga sequi ipsam possimus! Neque voluptate
            beatae tenetur fugit ratione?
          </Typography>
        </Box>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Sube una imagen
          <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
        </Button>
        {filename && <Typography>{filename}</Typography>}
        <Box component="div" sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Título de tu obra"
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </Box>
        <Box component="div" sx={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            required
            variant="standard"
            label="Describe tu obra"
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </Box>
        <Box component="div" sx={{ marginBottom: "16px" }}>
          <Button variant="contained" onClick={addPost}>
            Agregar
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere
          nisi eget turpis scelerisque, ut efficitur justo lobortis. Maecenas
          porta dignissim leo ut molestie. Proin cursus scelerisque nisl, a
          aliquam sem rutrum non. Sed lacinia dapibus tincidunt. Nullam commodo
          risus id nunc ornare vehicula. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Maecenas tempus
          sapien sit amet justo pulvinar, id lacinia ante pharetra. Nam
          venenatis ex ac aliquam mollis.
        </Typography>
        <SnackbarItem
          openSnackbar={openSnackbar}
          snackbarMessage={snackbarMessage}
          handleCloseSnackbar={handleCloseSnackbar}
        />
      </Box>
    </>
  );
}
