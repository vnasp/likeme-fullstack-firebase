// External libraries
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

// Global utilities and settings
import { useImages } from "../contexts/ImagesContext";

// Components
import ImagesLike from "./ImagesLike";

export default function ImagesAll() {
  const { images } = useImages();

  return (
    <Box sx={{ width: "100%", height: "80vh", overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img
              srcSet={`${image.photoURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.photoURL}?w=248&fit=crop&auto=format`}
              alt={image.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={image.title}
              actionIcon={<ImagesLike image={image} />}
              sx={{ textAlign: "left" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
