import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  length?: number;
  type?: string;
  level?: number;
}

const ProgramCard = (props: ProgramCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { textPrimary, textSecondary, length, level, type } = props;

  const handlePreviewClick = () => {
    navigate(`/user/matrix/${type}/${level}`);
  };

  return (
    <Card sx={cardStyle}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={700}>
          {textPrimary}
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {textSecondary}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
          {[...Array(length)].map((_, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 1,
                backgroundColor: theme.palette.action.hover,
                p: 2.2,
              }}
            />
          ))}
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" onClick={handlePreviewClick}>
          Preview
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default ProgramCard;
