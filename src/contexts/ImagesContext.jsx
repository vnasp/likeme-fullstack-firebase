// External libraries
import { createContext, useContext, useState, useEffect } from "react";
import { getAllImages, addImage, deleteImage, likeImage, dislikeImage } from "../firebase/firebase";

const ImagesContext = createContext();

export const useImages = () => useContext(ImagesContext);

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  // Obtiene las imagenes
  const fetchImages = async () => {
    const data = await getAllImages();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Agregar imagen
  const handleAddNewImage = async (uid, file, title, about) => {
    try {
      const newImageData = { uid, file, title, about };
      const addedImage = await addImage(newImageData);
      if (addedImage) {
        setImages(prevImages => [...prevImages, { ...addedImage, uid: uid, likes: 0, likedBy: [] }]);
        return { success: true, message: "Imagen subida exitosamente" };
      } else {
        return { success: false, message: "No se pudo subir la imagen" };
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return { success: false, message: "Error al subir la imagen" };
    }
  };
  
  // Eliminar imagen
  const handleDeleteImage = async (imageId) => {
    const success = await deleteImage(imageId);
    if (success) {
      setImages(prevImages => prevImages.filter(img => img.id !== imageId));
    }
    return success;
  };

// Editar Imagen (likes)
const handleLikeImage = async (imageId, userId) => {
  try {
    const result = await likeImage(imageId, userId);
    if (result) {
      setImages(prevImages => prevImages.map(img => {
        if (img.id === imageId) {
          return { ...img, likes: img.likes + 1, likedBy: [...img.likedBy, userId] };
        }
        return img;
      }));
      return { success: true, message: "Like añadido exitosamente" };
    }
  } catch (error) {
    console.error("Error al añadir like:", error);
    return { success: false, message: "Error al añadir like" };
  }
};

// Editar Imagen (dislikes)
const handleDislikeImage = async (imageId, userId) => {
  try {
    const result = await dislikeImage(imageId, userId);
    if (result) {
      setImages(prevImages => prevImages.map(img => {
        if (img.id === imageId) {
          const updatedLikedBy = img.likedBy.filter(uid => uid !== userId);
          return { ...img, likes: img.likes - 1, likedBy: updatedLikedBy };
        }
        return img;
      }));
      return { success: true, message: "Like quitado exitosamente" };
    }
  } catch (error) {
    console.error("Error al quitar like:", error);
    return { success: false, message: "Error al quitar like" };
  }
};
  

  return (
    <ImagesContext.Provider value={{ images, handleAddNewImage, handleDeleteImage, handleLikeImage, handleDislikeImage }}>
      {children}
    </ImagesContext.Provider>
  );
}