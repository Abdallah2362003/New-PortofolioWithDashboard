import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SnackbarAlert = ({ open, message, type, onClose, anchorOrigin }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={anchorOrigin || { vertical: "top", horizontal: "right" }} // الموضع الافتراضي
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={type}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarAlert;
