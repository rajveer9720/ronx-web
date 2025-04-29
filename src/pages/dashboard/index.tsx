import { Box, Typography, Button, Paper, useTheme, Grid } from "@mui/material";
import CountUp from "react-countup";
import { PeopleRounded, StarRounded } from "@mui/icons-material";
import { useState } from "react";
import { BackdropSpin, DashboardCard, UserProfile } from "../../components";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const DashboardCards = [
    {
      title: "Partners",
      icon: <PeopleRounded color="primary" />,
      end: 0,
      value: 0,
    },
    {
      title: "Team",
      icon: <PeopleRounded color="primary" />,
      end: 0,
      value: 0,
    },
    {
      title: "Ratio",
      icon: <StarRounded color="secondary" />,
      end: 0,
      suffix: "%",
      decimals: 2,
      value: 0,
    },
    {
      title: "Profits",
      icon: <StarRounded color="secondary" />,
      end: 0,
      decimals: 4,
      value: 0,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} textAlign={"right"}>
        Welcome back, Samsung!
      </Typography>

      <Grid container spacing={2} mt={2}>
        {DashboardCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 12, md: 3 }}>
            <DashboardCard title={card.title} icon={card.icon}>
              <Typography variant="h4" fontWeight="bold">
                <CountUp
                  end={card.end}
                  duration={1.2}
                  separator=","
                  decimals={card.decimals ?? 0}
                  suffix={card.suffix || ""}
                />
              </Typography>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      <Box py={2}>
        <UserProfile />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        {["X3", "X4"].map((grid, i) => (
          <Paper
            key={i}
            elevation={4}
            sx={{
              flex: "1 1 320px",
              minWidth: 300,
              p: 3,
              borderRadius: 3,
              bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fafafa",
              color: theme.palette.text.primary,
              boxShadow: 4,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="h6" fontWeight={600}>
                {grid}
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                0
              </Typography>
            </Box>

            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              justifyContent="center"
              my={2}
            >
              {[...Array(12)].map((_, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    p: 1,
                    width: 70,
                    textAlign: "center",
                    bgcolor:
                      theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                    color: theme.palette.text.primary,
                  }}
                >
                  <Typography fontSize="0.875rem">{index + 1}</Typography>
                </Paper>
              ))}
            </Box>

            <Button variant="contained" color="primary" fullWidth>
              Preview
            </Button>
          </Paper>
        ))}
      </Box>

      <BackdropSpin
        loading={loading}
        text="Processing your request, please wait..."
      />
    </Box>
  );
};

export default Dashboard;
