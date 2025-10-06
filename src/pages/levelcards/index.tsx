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
import { useEffect, useState, useCallback } from "react";
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
import { useUpgradeLevel } from "../../utils/upgradeLevelUtils";
import { useTokenBalances } from "../../hooks/useTokenBalances";
import { useAccount } from "wagmi";
import { showSnackbar } from "../../components/SnackbarUtils";
import { checkNativeTokenForGas, checkBusdBalance } from "../../utils/web3Checks";
import { useGetLevelsQuery } from "../../store/apis/levelApi";
import { ProgramIdEnum } from "../../utils/programUtils";



const LevelCards = () => {
  const { name, level } = useParams();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { isConnected, address, chain } = useAccount();
  const { data: levels } = useGetLevelsQuery({});

  const {
    busdBalance,
    nativeTokenBalance,
    refetchBalances: refetchWalletBalances,
  } = useTokenBalances();

  const { upgradeLevel } = useUpgradeLevel({
    onUpgradeComplete: () => window.location.reload(),
  });

  const getRequiredBusdForLevel = useCallback(
    (programId: number, levelNumber: number) => {
      if (!levels) return 0;
      const levelConfig = levels.find(
        (levelItem) => levelItem.program?.id === programId && levelItem.level === levelNumber
      );
      return levelConfig ? levelConfig.busd : 0;
    },
    [levels]
  );

  const handleUpgradeWithValidation = useCallback(async (programId: number, level: number) => {


    try {

      await refetchWalletBalances();

      const requiredBusd = getRequiredBusdForLevel(programId, level);

      if (!checkNativeTokenForGas(nativeTokenBalance, chain?.nativeCurrency?.symbol)) {
        checkNativeTokenForGas(nativeTokenBalance, chain?.nativeCurrency?.symbol);
        return;
      }

      if (!checkBusdBalance(busdBalance, requiredBusd)) {
        checkBusdBalance(busdBalance, requiredBusd);
        return;
      }

      await upgradeLevel(dispatch, programId, level);

    } catch (error: any) {
      console.error("Upgrade or validation failed:", error);
      showSnackbar({
        message: `Upgrade failed: ${error.message || 'Unknown error'}`,
        severity: "error"
      });
    }
  }, [
    isConnected,
    address,
    refetchWalletBalances,
    getRequiredBusdForLevel,
    nativeTokenBalance,
    chain?.nativeCurrency?.symbol,
    busdBalance,
    upgradeLevel,
    dispatch
  ]);



  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(
    Number(level) || 0
  );
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const [allUserLevelsData, setAllUserLevelsData] = useState<IUserLevel[]>([]);

  const program = useGetProgramsQuery().data?.find(
    (program) => program.name.toLowerCase() === name?.toLowerCase()
  );
  const programId = program?.id || (name?.toLowerCase() === ProgramIdEnum.X3 ? 1 : 0);
  const programLevel = program?.levels?.find(
    (programLevel: any) => programLevel.level === currentLevelIndex
  );
  const { data: user } = useGetUserQuery({
    id: Number(searchTerm) || loggedInUser?.id || 1,
  });

  const [triggerTxns, { data: txns, isLoading: isTxnLoading }] =
    useLazyGetTransactionsByCycleQuery();
  const [triggerAllUserLevels, { isLoading: isAllUserLevelsLoading }] =
    useLazyGetUserLevelsQuery();
  const [
    triggerUserLevels,
    { data: userLevels, isLoading: isUserLevelLoading },
  ] = useLazyGetUserLevelsQuery();

  const lastUnlockedLevel = [...allUserLevelsData]
    ?.reverse()
    ?.find((level) => level.unlock)?.level;

  const handleLevelChange = useCallback(async (newLevelIndex: number) => {
    setCurrentLevelIndex(newLevelIndex);
    setCurrentCycle(1);
    try {
      const newUserLevels = await triggerUserLevels({
        user_id: Number(searchTerm) || loggedInUser?.id || 1,
        level: newLevelIndex,
        program_id: programId,
        page: 1,
        limit: 100,
      }).unwrap();
      const totalCycles = newUserLevels?.total_cycles || 1;
      const appropriateCycle = totalCycles > 0 ? totalCycles : 1;
      setCurrentCycle(appropriateCycle);
    } catch (error) {
      console.error('Error fetching user levels for level change:', error);
      setCurrentCycle(1);
    }
  }, [programId, searchTerm, loggedInUser?.id, triggerUserLevels]);

  const refetchTxns = async (skipCycleUpdate = false) => {
    try {
      const newTxns = await triggerTxns({
        user_id: Number(searchTerm) || loggedInUser?.id || 1,
        program_id: programId,
        level: currentLevelIndex,
        cycle: currentCycle,
      }).unwrap();
      if (!skipCycleUpdate && currentCycle !== newTxns?.pagination?.current_page && newTxns?.pagination?.current_page) {
        setCurrentCycle(newTxns.pagination.current_page);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      if (!skipCycleUpdate) {
        setCurrentCycle(1);
      }
    }
  };

  const refetchUserLevels = async (shouldUpdateCycle = false) => {
    try {
      const newUserLevels = await triggerUserLevels({
        user_id: Number(searchTerm) || loggedInUser?.id || 1,
        level: currentLevelIndex,
        program_id: programId,
        page: 1,
        limit: 100,
      }).unwrap();
      if (shouldUpdateCycle || (!currentCycle || currentCycle === 1)) {
        const totalCycles = newUserLevels?.total_cycles || 1;
        setCurrentCycle(totalCycles);
      }
    } catch (error) {
      console.error('Error fetching user levels:', error);
      if (shouldUpdateCycle) {
        setCurrentCycle(1);
      }
    }
  };

  const refetchAllUserLevels = async () => {
    try {
      const allLevels = await triggerAllUserLevels({
        user_id: Number(searchTerm) || loggedInUser?.id || 1,
        program_id: programId,
        page: 1,
        limit: 100,
      }).unwrap();
      setAllUserLevelsData(allLevels?.data || []);
    } catch (error) {
      console.error('Error fetching all user levels:', error);
      setAllUserLevelsData([]);
    }
  };

  const currentLevel = userLevels?.data?.[0] || {
    ...EmptyUserLevel,
    level: programLevel || { level: currentLevelIndex, program: program },
    user: user || { id: Number(searchTerm) || loggedInUser?.id },
  } as IUserLevel;

  useEffect(() => {
    if (isUserLevelLoading || isTxnLoading || isAllUserLevelsLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isUserLevelLoading, isTxnLoading, isAllUserLevelsLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (programId && (searchTerm || loggedInUser?.id || 1)) {
        await Promise.all([
          refetchAllUserLevels(),
          refetchUserLevels(false),
          refetchTxns(),
        ]);
      }
    };
    
    fetchData();
  }, [currentLevelIndex, searchTerm, loggedInUser, programId]);

  useEffect(() => {
    if (programId) {
      (async () => {
        await refetchTxns(true);
      })();
    }
  }, [currentCycle, programId]);

  const handleProgramCardHover = useCallback(() => {
    if (isConnected && address && refetchWalletBalances) {
      refetchWalletBalances();
    }
  }, [isConnected, address, refetchWalletBalances]);

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
              color="primary"
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
            lastUnlockedLevel={lastUnlockedLevel?.level}
            onUpgradeClick={handleUpgradeWithValidation}
            onMouseEnter={handleProgramCardHover}
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
                handleLevelChange(currentLevelIndex - 1);
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
              onClick={() => setCurrentCycle((prev) => Math.max(1, prev - 1))}
              disabled={currentCycle <= 1}
            >
              <ExpandMore />
            </Button>
            <Button disableRipple color="inherit">
              Cycle: {currentCycle}
            </Button>
            <Button
              variant="contained"
              onClick={() => setCurrentCycle((prev) => Math.min(userLevels?.total_cycles || 1, prev + 1))}
              disabled={currentCycle >= (userLevels?.total_cycles || 1)}
            >
              <ExpandLess />
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
                handleLevelChange(currentLevelIndex + 1);
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
