import { Box, Typography, Grid } from "@mui/material";
import CountUp from "react-countup";
import {
  DashboardCard,
  ReferralCard,
  UserProfile,
  ProgramCard,
} from "../../components";
import { getDashboardCards } from "../../utils/dashBoardUtils";
import { useEffect } from "react";
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

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);

  const { data: programs, isLoading: isProgramLoading } = useGetProgramsQuery();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery({
    id: Number(searchTerm) || loggedInUser?.id,
  });
  const { data: stats, isLoading: isStatsLoading } = useGetUserStatsQuery({
    id: Number(searchTerm) || loggedInUser?.id,
  });
  const dashboardItems = getDashboardCards(stats);

  useEffect(() => {
    if (isProgramLoading || isUserLoading || isStatsLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isProgramLoading, isUserLoading, isStatsLoading]);

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <UserProfile data={user as IUser} />
        </Grid>

        {programs &&
          programs?.map((program, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 4 }} key={index}>
              <ProgramCard
                textPrimary={program.name}
                textSecondary={"BUSD"}
                href={`/program/${program.name.toLowerCase()}`}
                program={program}
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
