import { Box, Typography, Grid } from "@mui/material";
import CountUp from "react-countup";
import {
  DashboardCard,
  ReferralCard,
  UserProfile,
  ProgramCard,
} from "../../components";
import { getDashboardCards } from "../../utils/dashBoardUtils";
import { useEffect, useCallback } from "react";
import { IUser } from "../../interfaces/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import { useGetProgramsQuery } from "../../store/apis/programApi";
import {
  useGetUserQuery,
  useGetUserStatsQuery,
} from "../../store/apis/userApi";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { useGetLevelsQuery } from "../../store/apis/levelApi";
import { useUpgradeLevel } from "../../utils/upgradeLevelUtils";
import { useTokenBalances } from "../../hooks/useTokenBalances";
import { useAccount } from "wagmi";
import { showSnackbar } from "../../components/SnackbarUtils";
import { checkNativeTokenForGas, checkBusdBalance } from "../../utils/web3Checks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { isConnected, address, chain } = useAccount();

  const {
    busdBalance,
    nativeTokenBalance,
    refetchBalances: refetchWalletBalances,
    isFetchingBalances,
  } = useTokenBalances();

  const { data: levels } = useGetLevelsQuery({});

  const { upgradeLevel } = useUpgradeLevel({
    onUpgradeComplete: () => window.location.reload(),
  });


  const { data: programs, isLoading: isProgramLoading } = useGetProgramsQuery();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery({
    id: Number(searchTerm) || loggedInUser?.id || 1,
  });
  const { data: stats, isLoading: isStatsLoading } = useGetUserStatsQuery({
    id: Number(searchTerm) || loggedInUser?.id || 1,
  });
  const dashboardItems = getDashboardCards(stats);

  useEffect(() => {
    if (isProgramLoading || isUserLoading || isStatsLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isProgramLoading, isUserLoading, isStatsLoading]);
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
  

    await refetchWalletBalances();

    try {
      const requiredBusd = getRequiredBusdForLevel(programId, level);
      
      if (!checkNativeTokenForGas(nativeTokenBalance, chain?.nativeCurrency?.symbol)) {
        return;
      }

      if (!checkBusdBalance(busdBalance, requiredBusd)) {
        return;
      }

      showSnackbar({ 
        message: `Upgrading to level ${level}...`, 
        severity: "info" 
      });
      
      await upgradeLevel(dispatch, programId, level);
      
    } catch (error: any) {
      console.error("Upgrade validation failed:", error);
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

  const handleProgramCardHover = useCallback(() => {
    if (isConnected && address) {
      refetchWalletBalances();
    }
  }, [isConnected, address, refetchWalletBalances]);

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <UserProfile data={user as IUser} />
        </Grid>
        {programs &&
          programs.map((program, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 4 }} key={index}>             
             <ProgramCard
                textPrimary={program.name}
                textSecondary={"BUSD"}
                href={`/program/${program.name.toLowerCase()}`}
                program={program}
                onUpgradeClick={handleUpgradeWithValidation}
                onMouseEnter={handleProgramCardHover}
                disabled={isFetchingBalances}
              />
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={{ xs: 1, sm: 1, md: 2 }} mt={2}>
        {dashboardItems.map((card, index) => (
          <Grid key={index} size={{ xs: 6, sm: 6, md: 2 }}>
            <DashboardCard title={card.title} icon={card.icon}>
              <Typography variant="h5" fontWeight="bold">
                <CountUp
                  end={card.end}
                  start={card.start}
                  duration={1.2}
                  separator=","
                  decimals={card.decimals ?? 0}
                  suffix={card.suffix || ""}
                />
              </Typography>
            </DashboardCard>
          </Grid>
        ))}

        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <ReferralCard referral_code={user?.refer_code || ""} />
        </Grid>
      </Grid>

    
    </Box>
  );
};

export default Dashboard;
