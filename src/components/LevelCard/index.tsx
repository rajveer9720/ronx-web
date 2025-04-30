import { Cached, Circle, People } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";

interface LevelCardProps {
  level?: number;
  busd?: number;
  people?: number;
  cycles?: number;
}

const LevelCard = (props: LevelCardProps) => {
  const theme = useTheme();
  const { level, busd, people, cycles } = props;

  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: 2,
        backgroundColor: theme.palette.action.hover,
      }}
    >
      <CardActionArea>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2">Level {level}</Typography>
            <Typography variant="subtitle2">{busd}</Typography>
          </Box>

          <Box display={"flex"} justifyContent="center" gap={2} py={2}>
            <Circle fontSize="large" />
            <Circle fontSize="large" />
            <Circle fontSize="large" />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <People fontSize="small" />
              <Typography variant="subtitle2">{people}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Cached fontSize="small" />
              <Typography variant="subtitle2">{cycles}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LevelCard;
