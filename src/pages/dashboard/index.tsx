import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import CountUp from "react-countup";
import { PeopleRounded, StarRounded } from "@mui/icons-material";
import { useState } from "react";
import { BackdropSpin, DashboardCard } from "../../components";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} py={2}>
        Hey there, Samsung!
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <DashboardCard
            title="Total Balance"
            icon={
              <img src="/assets/bnb.png" alt="BNB" width={30} height={30} />
            }
          >
            <Typography variant="h4" fontWeight="bold">
              {
                <CountUp
                  end={567}
                  suffix=" BNB"
                  duration={1.2}
                  separator=","
                  decimals={4}
                />
              }
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Button>Redeem Now</Button>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <DashboardCard
            title="Team Earnings"
            icon={<PeopleRounded color="primary" sx={{ fontSize: 30 }} />}
          >
            <Typography variant="h4" fontWeight="bold">
              <CountUp
                end={123}
                suffix=" BNB"
                duration={1.2}
                separator=","
                decimals={4}
              />
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <DashboardCard
            title="Your Ranking"
            icon={<StarRounded color="secondary" sx={{ fontSize: 30 }} />}
          >
            <Typography variant="h4" fontWeight="bold">
              {"N/A"}
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      <BackdropSpin
        loading={loading}
        text={"Processing your request, please wait..."}
      />
    </Box>
  );
};

export default Dashboard;
