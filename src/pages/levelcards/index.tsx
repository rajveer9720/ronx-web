import { Box, Button, Chip, Grid, Link, ButtonGroup } from "@mui/material";
import {
  AcUnitRounded,
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
import { useLazyGetUserLevelsQuery } from "../../store/apis/userlevelApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import { useLazyGetTransactionsByCycleQuery } from "../../store/apis/transactionApi";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { useGetUserQuery } from "../../store/apis/userApi";

const LevelCards = () => {
  const { name, level } = useParams();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(
    Number(level) || 0
  );
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const program = useGetProgramsQuery().data?.find(
    (program) => program.name.toLowerCase() === name?.toLowerCase()
  );
  const programLevel = program?.levels?.find(
    (programLevel: any) => programLevel.level === currentLevelIndex
  );
  const { data: user } = useGetUserQuery({
    id: Number(searchTerm) || loggedInUser?.id,
  });

  const [triggerTxns, { data: txns, isLoading: isTxnLoading }] =
    useLazyGetTransactionsByCycleQuery();
  const [
    triggerUserLevels,
    { data: userLevels, isLoading: isUserLevelLoading },
  ] = useLazyGetUserLevelsQuery();

  const refetchTxns = async () => {
    const newTxns = await triggerTxns({
      user_id: Number(searchTerm) || loggedInUser?.id,
      program_id: program?.id || 0,
      level: currentLevelIndex,
      cycle: currentCycle,
    }).unwrap();
    if (currentCycle === newTxns?.pagination?.current_page) return;
    setCurrentCycle(userLevels?.total_cycles || 1);
  };

  const refetchUserLevels = async () => {
    const newUserLevels = await triggerUserLevels({
      user_id: Number(searchTerm) || loggedInUser?.id,
      level: currentLevelIndex,
      program_id: program?.id,
      page: 1,
      limit: 100,
    }).unwrap();
    setCurrentCycle(newUserLevels?.total_cycles || 1);
  };

  const currentLevel =
    userLevels?.data?.[0] ||
    ({
      ...EmptyUserLevel,
      level: programLevel,
    } as IUserLevel);

  useEffect(() => {
    if (isUserLevelLoading || isTxnLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isUserLevelLoading, isTxnLoading]);

  useEffect(() => {
    (async () => {
      await refetchUserLevels();
      await refetchTxns();
    })();
  }, [currentLevelIndex, searchTerm, loggedInUser]);

  useEffect(() => {
    (async () => {
      await refetchTxns();
    })();
  }, [currentCycle]);

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
            color={currentLevel.unlock ? "primary" : "default"}
            icon={currentLevel.unlock ? <LockOpenRounded /> : <LockRounded />}
            label={currentLevel.unlock ? "Unlocked" : "Locked"}
          />

          <Box
            display={"flex"}
            gap={2}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            {currentLevel?.freeze && (
              <Chip
                color="secondary"
                variant="outlined"
                icon={
                  <AcUnitRounded sx={{ color: "white" }} fontSize="small" />
                }
                label={"Freezed"}
              />
            )}
            <Chip
              color="secondary"
              variant="outlined"
              icon={<Tag />}
              label={`UID: ${user?.id}`}
            />
          </Box>
        </Box>

        <Box py={2}>
          <LevelCard
            large
            disabled
            userLevel={currentLevel}
            programName={program?.name || name}
            transactions={txns?.data || []}
            cycles={userLevels?.total_cycles || 1}
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
            sx={{ display: !currentLevel.unlock ? "none" : "flex" }}
          >
            <Button
              variant="contained"
              onClick={() => setCurrentCycle((prev) => prev && prev - 1)}
              disabled={currentCycle === 1}
            >
              <ExpandLess />
            </Button>
            <Button disableRipple color="inherit">
              Cycle: {txns?.pagination?.current_page}
            </Button>
            <Button
              variant="contained"
              onClick={() => setCurrentCycle((prev) => prev && prev + 1)}
              disabled={currentCycle === userLevels?.total_cycles}
            >
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
