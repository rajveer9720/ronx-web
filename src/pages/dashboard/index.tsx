import { Box, Typography, Grid } from "@mui/material";
import CountUp from "react-countup";
import { AttachMoney, Diversity3, Groups, Percent } from "@mui/icons-material";
import { useState } from "react";
import {
  BackdropSpin,
  DashboardCard,
  ReferralCard,
  UserProfile,
  ProgramCard,
} from "../../components";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const DashboardCards = [
    {
      title: "Partners",
      icon: <Diversity3 color="primary" />,
      start: 0,
      end: 2,
    },
    {
      title: "Team",
      icon: <Groups color="primary" />,
      start: 0,
      end: 7,
    },
    {
      title: "Ratio",
      icon: <Percent color="secondary" />,
      start: 0,
      suffix: "%",
      decimals: 2,
      end: 175,
    },
    {
      title: "Profits",
      icon: <AttachMoney color="secondary" />,
      start: 0,
      decimals: 4,
      end: 35,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} textAlign={"right"}>
        Welcome back, Ronxald!
      </Typography>

      <Grid container spacing={2} mt={2}>
        {DashboardCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 12, md: 2 }}>
            <DashboardCard title={card.title} icon={card.icon}>
              <Typography variant="h4" fontWeight="bold">
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
          <ReferralCard />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <UserProfile />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <ProgramCard textPrimary="X3" textSecondary="5 BUSD" length={12} />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <ProgramCard textPrimary="X4" textSecondary="15 BUSD" length={12} />
        </Grid>
      </Grid>

      <BackdropSpin
        loading={loading}
        text="Processing your request, please wait..."
      />
    </Box>
  );
};

export default Dashboard;
