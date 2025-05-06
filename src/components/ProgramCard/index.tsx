import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ILevel } from "../../interfaces/level";
import { ReactNode } from "react";
import { getBgColor } from "../../utils/levelUtils";
import { Slots } from "../../utils/slots";

interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  href: string;
  levels: ILevel[];
  icon?: ReactNode;
}

const ProgramCard = (props: ProgramCardProps) => {
  const theme = useTheme();
  const { icon, textPrimary, textSecondary, href, levels } = props;

  return (
    <Card sx={cardStyle}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display={"flex"} alignItems={"center"}>
          {icon}
          <Typography variant="h6" mx={1} fontWeight={700}>
            {textPrimary}
          </Typography>
        </Box>

        <Typography variant="h6" fontWeight={700}>
          {textSecondary}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" justifyContent="center" alignItems="center" py={2}>
        <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={4}>
          {Slots.map((_, index) => {
            const lvl =
              levels.find((level) => level.level === index + 1) ||
              ({} as ILevel);
            return (
              <Card
                key={index}
                sx={{
                  backgroundColor: getBgColor(lvl, theme),
                  p: 2.2,
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Link component={RouterLink} underline="none" to={href}>
          <Button variant="outlined" color="primary">
            Preview
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

const cardStyle = {
  p: 2,
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default ProgramCard;
