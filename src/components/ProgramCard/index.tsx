import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  Link,
  CardActions,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { EmptyUserLevel } from "../../utils/levelUtils";
import { IProgram } from "../../interfaces/program";
import { useGetUserLevelsQuery } from "../../store/apis/userlevelApi";
import LevelList from "../LevelList";
import { useAppSelector } from "../../store/hooks/hook";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { selectCurrentUser } from "../../store/slices/authSlice";

interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  program: IProgram;
  href: string;
}

const ProgramCard = (props: ProgramCardProps) => {
  const { textPrimary, href, program } = props;
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: userLevels } = useGetUserLevelsQuery({ user_id: +searchTerm });

  const filteredUserLevels =
    userLevels?.filter((level) => level.level.program.id === program.id) || [];

  const placeholderLevels = program.levels
    .slice(filteredUserLevels.length, 3)
    .map((programLevel) => ({
      ...EmptyUserLevel,
      level: programLevel,
    }));

  const finalLevels =
    filteredUserLevels.length >= 3
      ? filteredUserLevels.reverse().slice(0, 3)
      : [...filteredUserLevels, ...placeholderLevels].reverse();

  return (
    <Card sx={cardStyle}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h5" mx={1} fontWeight={700}>
          {textPrimary}
        </Typography>

        <Link component={RouterLink} underline="none" to={href}>
          <Button variant="outlined" color="primary">
            View All
          </Button>
        </Link>
      </Box>

      <Divider />

      <LevelList levels={finalLevels} href={href} />

      <CardActions sx={{ display: "flex", justifyContent: "center", px: 5 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!currentUser}
        >
          Upgrade
        </Button>
      </CardActions>
    </Card>
  );
};

const cardStyle = {
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default ProgramCard;
