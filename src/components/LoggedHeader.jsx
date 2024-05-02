// External libraries
import { Box, Typography } from "@mui/material";

// Global utilities and settings
import { useAuth } from "../contexts/AuthContext";

// Components
import LogOutButton from "./LogOutButton";

// Styles
import { glassStyle } from "../theme";

export default function LoggedHeader() {
  const { user, isRegistered } = useAuth();

  return (
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
        padding={1}
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
  )
}