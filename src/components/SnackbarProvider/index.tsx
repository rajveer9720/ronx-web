import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Snackbar,
  Alert,
  AlertColor,
  SnackbarCloseReason,
} from "@mui/material";

type SnackbarContextType = {
  showSnackbar: (options: { message: string; severity?: AlertColor }) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showSnackbar = ({
    message,
    severity = "info",
  }: {
    message: string;
    severity?: AlertColor;
  }) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={severity}
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
