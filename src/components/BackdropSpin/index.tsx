import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface BackdropSpinProps {
  loading: boolean;
  text?: string;
}

const BackdropSpin = (props: BackdropSpinProps) => {
  const { loading, text } = props;
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
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
