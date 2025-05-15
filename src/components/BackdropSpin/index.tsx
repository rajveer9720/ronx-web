import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks/hook";
import { selectLoading } from "../../store/slices/loaderSlice";

interface BackdropSpinProps {
  loading?: boolean;
  text?: string;
}

const BackdropSpin = (props: BackdropSpinProps) => {
  const { loading, text } = props;
  const showLoading = useAppSelector(selectLoading);

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loading || showLoading}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}
        alignItems={"center"}
        gap={2}
      >
        <CircularProgress color="inherit" />
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Backdrop>
  );
};

export default BackdropSpin;
