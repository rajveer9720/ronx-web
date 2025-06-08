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
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { useEffect } from "react";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";

interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  program: IProgram;
  href: string;
}

const ProgramCard = (props: ProgramCardProps) => {
  const { textPrimary, href, program } = props;
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { data: userLevels, isLoading: isUserLevelLoading } =
    useGetUserLevelsQuery({
      user_id: Number(searchTerm) || loggedInUser?.id,
      program_id: program?.id,
      page: 1,
      limit: 100,
    });

  const placeholderLevels = program.levels
    .slice(userLevels?.pagination?.total_items, 3)
    .map((programLevel) => ({
      ...EmptyUserLevel,
      level: programLevel,
    }));

  const finalLevels =
    (userLevels?.pagination?.total_items || 0) >= 3
      ? [...(userLevels?.data || [])].reverse().slice(0, 3)
      : [...(userLevels?.data || []), ...placeholderLevels].slice().reverse();

  useEffect(() => {
    if (isUserLevelLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isUserLevelLoading]);

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

      <LevelList levels={finalLevels || []} href={href} />

      <CardActions sx={{ display: "flex", justifyContent: "center", px: 5 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!loggedInUser?.id}
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
