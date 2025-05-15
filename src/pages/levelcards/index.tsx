import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  Link,
  ButtonGroup,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  LockOpenRounded,
  LockRounded,
  Tag,
} from "@mui/icons-material";
import { LevelCard } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { EmptyUserLevel } from "../../utils/levelUtils";
import { IUserLevel } from "../../interfaces/user-levels";
import { useGetProgramsQuery } from "../../store/apis/programApi";
import { useGetUserLevelsQuery } from "../../store/apis/userlevelApi";
import { useAppDispatch } from "../../store/hooks/hook";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";

const LevelCards = () => {
  const { name, level } = useParams();
  const dispatch = useAppDispatch();
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(
    Number(level) || 0
  );
  const program = useGetProgramsQuery().data?.find(
    (program) => program.name.toLowerCase() === name?.toLowerCase()
  );
  const programLevel = program?.levels?.find(
    (programLevel: any) => programLevel.level === currentLevelIndex
  );
  const {
    data: userLevels,
    isLoading: isUserLevelLoading,
    refetch,
  } = useGetUserLevelsQuery({
    user_id: 1,
    level: currentLevelIndex,
    program_id: program?.id,
  });

  const currentLevel =
    userLevels?.[0] ||
    ({
      ...EmptyUserLevel,
      level: programLevel,
    } as IUserLevel);

  useEffect(() => {
    if (isUserLevelLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isUserLevelLoading]);

  useEffect(() => {
    refetch();
  }, [currentLevelIndex]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 8 }} offset={{ xs: 0, sm: 0, md: 2 }}>
        <Box
          display={"flex"}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Chip
            color={currentLevel.active ? "primary" : "default"}
            icon={currentLevel.active ? <LockOpenRounded /> : <LockRounded />}
            label={currentLevel.active ? "Unlocked" : "Locked"}
          />

          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Typography variant="h6" fontWeight={600}>
              Upline ID
            </Typography>
            <Chip color="primary" icon={<Tag />} label={"123"} />
          </Box>
        </Box>

        <Box py={2}>
          <LevelCard
            large={true}
            disabled={true}
            userLevel={currentLevel}
            programName={program?.name || name}
          />
        </Box>

        <Box display={"flex"} justifyContent="space-between">
          <Link
            component={RouterLink}
            underline="none"
            to={
              `/program/${name?.toLowerCase()}` +
              `/level/${currentLevelIndex - 1}`
            }
            sx={{
              visibility: currentLevelIndex === 1 ? "hidden" : "visible",
            }}
          >
            <Button
              size="large"
              variant="contained"
              startIcon={<ChevronLeft />}
              onClick={() => {
                setCurrentLevelIndex((prev) => prev - 1);
              }}
            >
              Level {currentLevelIndex - 1}
            </Button>
          </Link>

          <ButtonGroup
            variant="outlined"
            sx={{ display: !currentLevel.active ? "none" : "flex" }}
          >
            <Button variant="contained">
              <ExpandLess />
            </Button>
            <Button disableRipple color="inherit">
              Cycles: {currentLevel.cycles}
            </Button>
            <Button variant="contained">
              <ExpandMore />
            </Button>
          </ButtonGroup>

          <Link
            component={RouterLink}
            underline="none"
            to={
              `/program/${name?.toLowerCase()}` +
              `/level/${currentLevelIndex + 1}`
            }
            sx={{
              visibility:
                currentLevelIndex === program?.levels.length
                  ? "hidden"
                  : "visible",
            }}
          >
            <Button
              size="large"
              variant="contained"
              endIcon={<ChevronRight />}
              onClick={() => {
                setCurrentLevelIndex((prev) => prev + 1);
              }}
            >
              Level {currentLevelIndex + 1}
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LevelCards;
