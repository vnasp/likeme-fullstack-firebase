// External libraries
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

// Global utilities and settings
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase"; 

export default function LogOutButton() {
  const { setIsAuthenticated, setIsRegistered, setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
            setIsRegistered(false);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

  return (
    <Button onClick={handleLogout} variant="contained" color="secondary">
            Cerrar sesión
        </Button>
  );
}