import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  increment,
  updateDoc,
  arrayUnion, arrayRemove
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// docRef crea una referencia a la DB > colección users > documento nombrado con el uid buscado
// docSnap es un document snapshot, como una "foto instantanea" del documento
// exist() regresa un booleano true/false si el documento existe o no
// CRUD getDoc, addDoc (con id automático), setDoc (con id específoco o sobreesvribir), updateDoc, deleteDoc

export async function existsUser(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    throw new Error("No se pudo verificar al usuario.");
  }
}

// el setDoc recibe la DB > la colección > el nombre del documento >> la data que sobreesribirá
export async function registerUser(user) {
  try {
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: new Date(),
    };
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userProfile);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw new Error("No se pudo registrar al usuario.");
  }
}

// Upload a new artwork
export async function addImage({uid, file, title, about, likes, likedBy}) {
  try {
    // Normaliza el título para el uso en un nombre de archivo
    const normalizedTitle = title.replace(/\s+/g, "-").toLowerCase();
    const fileName = `${uid}-${normalizedTitle}-${Date.now()}`;
    // Crear una referencia al archivo en Firebase Storage
    const fileRef = ref(storage, `images/${fileName}`);
    // Subir el archivo
    const snapshot = await uploadBytes(fileRef, file);
    // Obtener URL pública del archivo
    const photoURL = await getDownloadURL(snapshot.ref);

    // Crear un nuevo documento en Firestore con un ID único
    const dataImagen = {
      uid,
      title,
      about,
      photoURL,
      likes,
    likedBy,
      createdAt: new Date(),
    };
    const docRef = await addDoc(collection(db, "galleries"), dataImagen); // Corregido aquí
    return { success: true, id: docRef.id, photoURL };
  } catch (error) {
    console.error("Error uploading image: ", error);
    return { success: false, error };
  }
}


// Obtener todas las imagenes
export async function getAllImages() {
  try {
    const q = query(collection(db, "galleries"));
    const querySnap = await getDocs(q);
    const images = [];
    querySnap.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
    return images;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}

// Eliminar las imagenes
export async function deleteImage(imageId) {
  try {
    const imageRef = doc(db, "galleries", imageId);
    await deleteDoc(imageRef);
    console.log("Document successfully deleted!");
    return true;
  } catch (error) {
    console.error("Error removing document: ", error);
    return false;
  }
}

export async function updateImage(imageId, newTitle, newAbout) {
  try {
    const newDataImage = {
      title: newTitle,
      about: newAbout,
    };
    const imageRef = doc(db, "galleries", imageId);
    await updateDoc(imageRef, newDataImage);
    console.log("Document successfully updated!");
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
}

export async function likeImage(imageId, userId) {
  const imageRef = doc(db, "galleries", imageId);
  try {
    await updateDoc(imageRef, {
      likes: increment(1),
      likedBy: arrayUnion(userId)
    });
    console.log("Like added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding like: ", error);
    return false;
  }
}

// Función para quitar "like" de una imagen
export async function dislikeImage(imageId, userId) {
  const imageRef = doc(db, "galleries", imageId);
  try {
    await updateDoc(imageRef, {
      likes: increment(-1),
      likedBy: arrayRemove(userId)  // Elimina el ID del usuario de la lista de "likedBy"
    });
    console.log("Like removed successfully!");
    return true;
  } catch (error) {
    console.error("Error removing like: ", error);
    return false;
  }
}