import { Check, ContentCopy, Share } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface ReferralCardProps {
  referral_code: string;
}

const ReferralCard = (props: ReferralCardProps) => {
  const { referral_code } = props;
  const theme = useTheme();
  const [copied, setCopied] = useState<boolean>(false);
  const { mode } = useColorScheme();

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
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Avatar
            sx={{
              bgcolor: mode === "dark" ? theme.palette.action.focus : "#f4f7fe",
              width: 56,
              height: 56,
            }}
            variant="rounded"
          >
            <Share color="primary" fontSize="large" />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              Referral Link
            </Typography>

            <Typography
              variant="button"
              textTransform={"lowercase"}
            >{`${import.meta.env.VITE_APP_REF_LINK}${referral_code}`}</Typography>
          </Box>
        </Box>

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
