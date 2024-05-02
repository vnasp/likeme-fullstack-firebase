// External libraries
import { Box, Typography } from "@mui/material";

// Styles
import { glassStyle } from "../theme";

export default function Home() {
  return (
    <>
      <Box
        component="section"
        sx={{ ...glassStyle, flexGrow: 1, textAlign: "center", p:4 }}
      >
        <Typography component="h2" variant="h4" align="center">
          CXXXVIII Exposición de Arte
        </Typography>
        <Typography variant="h6" align="center">
          Vota por tu obra favorita o sube tu propio arte
        </Typography>
        <Box component="img" src="./flyer.webp" sx={{ py: 2, maxWidth:"100%" }} />
      </Box>
    </>
  );
}
