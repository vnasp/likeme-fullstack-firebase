// External libraries
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Global utilities and settings
import { onAuthStateChanged } from "firebase/auth";
import { auth, existsUser, registerUser } from "../firebase/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isRegistered,
      setUser,
      setIsAuthenticated,
      setIsRegistered,
    }),
    [user, isAuthenticated, isRegistered]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const registered = await existsUser(user.uid);
        if (!registered) {
          // Registra el usuario si no existe
          await registerUser(user);
          setIsRegistered(true);
        } else {
          setIsRegistered(registered);
        }
        setUser(user);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsRegistered(false);
        navigate("/");
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);
  

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};
