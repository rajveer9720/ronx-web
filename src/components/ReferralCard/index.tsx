import { Check, ContentCopy, Share } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";

interface ReferralCardProps {
  referral_code: string;
}

const ReferralCard = (props: ReferralCardProps) => {
  const { referral_code } = props;
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_APP_REF_LINK}${referral_code}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card sx={cardStyle}>
      <Box display={"flex"} alignItems={"center"} mb={2}>
        <Share color="info" />
        <Typography variant="h6" mx={1} fontWeight={700}>
          Referral Link
        </Typography>
      </Box>

      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Typography variant="body2">{`${import.meta.env.VITE_APP_REF_LINK}${referral_code}`}</Typography>
        <Button
          size="small"
          startIcon={copied ? <Check /> : <ContentCopy />}
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Box>
    </Card>
  );
};

const cardStyle = {
  p: 2,
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default ReferralCard;
