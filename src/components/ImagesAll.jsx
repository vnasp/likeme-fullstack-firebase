// External libraries
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

// Global utilities and settings
import { useImages } from "../contexts/ImagesContext";

// Components
import ImagesLike from "./ImagesLike";

export default function ImagesAll() {
  const { images } = useImages();
  return (
    <Box sx={{ width: "100%", height: "80vh", overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={4} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img
              srcSet={`${image.photoURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.photoURL}?w=248&fit=crop&auto=format`}
              alt={image.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              position="top"
              actionIcon={<ImagesLike image={image} />}
              actionPosition="right"
            />
            <ImageListItemBar title={image.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
