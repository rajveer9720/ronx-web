import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertDialog = (props: AlertDialogProps) => {
  const { open, onClose, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={20} fontWeight={600} color="error">
          Confirmation
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography>Are you sure, you want to perform this action?</Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="text" onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={onConfirm}
          sx={{ textTransform: "none" }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
