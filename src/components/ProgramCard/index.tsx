import { SquareRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";

interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  length?: number;
}

const ProgramCard = (props: ProgramCardProps) => {
  const theme = useTheme();
  const { textPrimary, textSecondary, length } = props;

  return (
    <Card sx={cardStyle}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" fontWeight={600}>
          {textPrimary}
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          {textSecondary}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={1}
      >
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
          {[...Array(length)].map((_, index) => (
            <SquareRounded
              key={index}
              fontSize="large"
              sx={{ color: theme.palette.grey[500] }}
            />
          ))}
        </Box>
      </Box>

      <Box display={"flex"} alignSelf={"end"}>
        <Button variant="outlined">Preview</Button>
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

export default ProgramCard;
