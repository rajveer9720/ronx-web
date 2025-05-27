import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SearchField from "../SearchField";

interface SearchDialogProps {
  open: boolean;
  handleClose: () => void;
}

const SearchDialog = (props: SearchDialogProps) => {
  const { open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Search by wallet address or ID</DialogTitle>
      <DialogContent>
        <SearchField
          onSearch={(_) => {
            handleClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
