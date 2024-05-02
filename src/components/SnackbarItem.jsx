import { Snackbar } from "@mui/material";

export default function SnarbarkItem({openSnackbar, snackbarMessage, handleCloseSnackbar }) {

  return (
    <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
  )
}