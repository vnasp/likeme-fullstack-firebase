// External libraries
import { Box, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { isAuthenticated } = useAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    !isAuthenticated ? 
    <Button onClick={handleGoogleSignIn} variant="contained">Ingresar</Button> : null 
  );
}
