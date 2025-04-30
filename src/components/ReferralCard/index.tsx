import { ContentCopy, InfoOutline } from "@mui/icons-material";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";

const ReferralCard = () => {
  return (
    <Card sx={cardStyle}>
      <Box display={"flex"} alignItems="center" mb={2}>
        <Typography variant="h6">Referral Link</Typography>
        <IconButton color="info" sx={{ mx: 1 }}>
          <InfoOutline />
        </IconButton>
      </Box>

      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Typography variant="body2">ronx.io/b/s41c6l</Typography>
        <Button
          size="small"
          startIcon={<ContentCopy />}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          Copy
        </Button>
      </Box>
    </Card>
  );
};

const cardStyle = {
  p: 2,
  borderRadius: "20px",
  border: "1px solid #e0e0e0",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default ReferralCard;
