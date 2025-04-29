import { AlertColor } from "@mui/material";
import { useSnackbar } from "../../components/SnackbarProvider";

let snackbarFunction:
  | ((props: { message: string; severity?: AlertColor }) => void)
  | null = null;

export const SnackbarUtilsConfigurator = () => {
  const { showSnackbar } = useSnackbar();
  snackbarFunction = showSnackbar;
  return null;
};

export const showSnackbar = (props: {
  message: string;
  severity?: AlertColor;
}) => {
  if (snackbarFunction) {
    snackbarFunction(props);
  } else {
    console.error(
      "SnackbarUtils not initialized. Ensure SnackbarUtilsConfigurator is mounted.",
    );
  }
};
