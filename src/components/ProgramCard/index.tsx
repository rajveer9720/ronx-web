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
import { useEffect, useMemo, useCallback } from "react";

import { EmptyUserLevel } from "../../utils/levelUtils";
import LevelList from "../LevelList";

import { useGetUserLevelsQuery } from "../../store/apis/userlevelApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { showLoader, hideLoader } from "../../store/slices/loaderSlice";

import { IProgram } from "../../interfaces/program";

interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  program: IProgram;
  href: string;
  onUpgradeClick?: (programId: number, level: number) => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
}

const ProgramCard = (props: ProgramCardProps) => {
  const { textPrimary, href, program, onUpgradeClick, onMouseEnter, disabled = false } = props;
  const loggedInUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const currentUser = useAppSelector(selectCurrentUser);

  const userId = Number(searchTerm) || currentUser?.id;

  const { data: userLevels, isLoading } = useGetUserLevelsQuery({
    user_id: userId,
    program_id: program?.id,
    page: 1,
    limit: 100,
  });

  const unlockedLevelsCount = userLevels?.data?.length ?? 0;
  const isCurrentUser = currentUser?.id === userLevels?.data?.[0]?.user?.id;
  const nextLevel = unlockedLevelsCount + 1;
  const hasMoreLevelsToUpgrade = nextLevel <= (program?.levels?.length || 0);

  const finalLevels = useMemo(() => {
    const placeholders = program.levels
      .slice(unlockedLevelsCount, 3)
      .map((level) => ({ ...EmptyUserLevel, level }));

    return unlockedLevelsCount >= 3
      ? [...(userLevels?.data || [])].reverse().slice(0, 3)
      : [...(userLevels?.data || []), ...placeholders].slice().reverse();
  }, [program.levels, unlockedLevelsCount, userLevels]);

  useEffect(() => {
    dispatch(isLoading ? showLoader() : hideLoader());
  }, [isLoading, dispatch]);

  const handleUpgrade = useCallback(() => {
    if (onUpgradeClick && hasMoreLevelsToUpgrade) {
      onUpgradeClick(program.id, nextLevel);
    }
  }, [onUpgradeClick, program.id, nextLevel, hasMoreLevelsToUpgrade]);

  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) {
      onMouseEnter();
    }
  }, [onMouseEnter]);

  const isUpgradeDisabled = disabled || !isCurrentUser || !hasMoreLevelsToUpgrade;

  return (
    <Card
      sx={cardStyle}
      onMouseEnter={handleMouseEnter}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h5" fontWeight={700}>
          {textPrimary}
        </Typography>

        <Link component={RouterLink} to={href} underline="none">
          <Button variant="outlined" color="primary">
            View All
          </Button>
        </Link>
      </Box>

      <Divider />

      <LevelList levels={finalLevels} href={href} />
      <Box px={2} pb={1}>
        <Typography variant="caption" color="text.secondary">
          {unlockedLevelsCount} of {program?.levels?.length || 0} levels unlocked
        </Typography>
      </Box>

      <CardActions sx={{ display: "flex", justifyContent: "center", px: 5 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            loggedInUser?.id !== userLevels?.data?.[0]?.user?.id ||
            nextLevel !== (userLevels?.data?.length ?? 0) + 1
          }
          onClick={handleUpgrade}
          sx={{
            opacity: isUpgradeDisabled ? 0.6 : 1,
            '&:hover': {
              backgroundColor: isUpgradeDisabled ? undefined : 'primary.dark',
            }
          }}
        >
          Upgrade Now
        </Button>
      </CardActions>

      {!isCurrentUser && (
        <Box px={2} pb={2}>
          <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
            Switch to your account to upgrade levels
          </Typography>
        </Box>
      )}
    </Card>
  );
};

const cardStyle = {
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
};

export default ProgramCard;