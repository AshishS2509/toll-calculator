import { Alert, Snackbar as MuiSnakcbar } from "@mui/material";
import { useSnackbar } from "../hooks/useSnackbar";

const Snackbar = () => {
  const { openSnakcbar, setOpenSnakcbar } = useSnackbar();
  return (
    <MuiSnakcbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      transitionDuration={500}
      autoHideDuration={5000}
      onClose={() => setOpenSnakcbar(false)}
      open={openSnakcbar}
      key={"topright"}
    >
      <Alert
        severity="error"
        onClose={() => setOpenSnakcbar(false)}
        sx={{ width: "100%" }}
      >
        Something went wrong
      </Alert>
    </MuiSnakcbar>
  );
};

export default Snackbar;
