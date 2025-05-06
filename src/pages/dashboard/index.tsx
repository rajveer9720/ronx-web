import { Box, Typography, Grid } from "@mui/material";
import CountUp from "react-countup";
import {
  DashboardCard,
  ReferralCard,
  UserProfile,
  ProgramCard,
} from "../../components";
import { DashboardCards } from "../../utils/dashBoardUtils";
import { useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import { data as UserData } from "../../mock";
import { IProgram } from "../../interfaces/program";
import { getPrograms } from "../../api/program";
import { ILevel } from "../../interfaces/level";
import { getLevelsByParams } from "../../api/level";
import { Filter3, Filter4 } from "@mui/icons-material";

const Dashboard = () => {
  const { showLoader, hideLoader } = useLoader();
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const [levels, setLevels] = useState<ILevel[]>([]);

  const fetchPrograms = async () => {
    showLoader();
    try {
      const response = await getPrograms();
      const data = response.data;
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      hideLoader();
    }
  };

  const fetchLevels = async () => {
    showLoader();
    try {
      const response = await getLevelsByParams(UserData.id);
      const data = response.data;
      setLevels(data);
    } catch (error) {
      console.error("Error fetching levels:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchLevels();
  }, []);

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <UserProfile data={UserData} />
        </Grid>

        {programs.map((program, index) => (
          <Grid size={{ xs: 12, sm: 12, md: 4 }} key={index}>
            <ProgramCard
              textPrimary={program.name}
              textSecondary={String(program.price) + " BUSD"}
              href={`/program/${program.name.toLowerCase()}`}
              levels={levels.filter((level) => level.program.id === program.id)}
              icon={
                program.name.toLowerCase() === "x3" ? <Filter3 /> : <Filter4 />
              }
            />
          </Grid>
        ))}
      </Grid>

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
          <ReferralCard referral_code={UserData?.referral_code} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
