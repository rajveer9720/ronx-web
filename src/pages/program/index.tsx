import { Box, Typography, Card, Divider, Grid } from "@mui/material";
import { LevelCard } from "../../components";
import { useParams } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import { useEffect, useState } from "react";
import { IProgram } from "../../interfaces/program";
import { ILevel } from "../../interfaces/level";
import { getPrograms } from "../../api/program";
import { data as UserData } from "../../mock";
import { getLevelsByParams } from "../../api/level";
import { Slots } from "../../utils/slots";

const Program = () => {
  const { name } = useParams();
  const { showLoader, hideLoader } = useLoader();
  const [program, setProgram] = useState<IProgram>({} as IProgram);
  const [levels, setLevels] = useState<ILevel[]>([]);

  const fetchProgram = async () => {
    showLoader();
    try {
      const response = await getPrograms();
      const data: IProgram[] = response.data;
      const prog = data.find(
        (program) => program.name.toLowerCase() == name?.toLowerCase()
      );
      setProgram(prog || ({} as IProgram));
      fetchLevels(prog?.id || 0);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      hideLoader();
    }
  };

  const fetchLevels = async (program_id: number) => {
    showLoader();
    try {
      const response = await getLevelsByParams(UserData.id, program_id);
      const data: ILevel[] = response.data;
      const lvls: ILevel[] = data.sort((a, b) => a.level - b.level);
      setLevels(lvls);
    } catch (error) {
      console.error("Error fetching levels:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []);

  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={"bold"}>
          Program: {program?.name}
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          {program?.price} BUSD
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} py={2}>
        {levels.length === 0 ? (
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight={600} textAlign={"center"}>
              No levels available for this program.
            </Typography>
          </Grid>
        ) : null}

        {Slots?.map((_, index) => {
          const level: ILevel | undefined = levels.find(
            (level) => level.level === index + 1
          );
          const emptyLevel = {
            level: index + 1,
            busd: Slots[index],
            cycles: 0,
            people: 0,
            revenue: 0,
          } as ILevel;

          return (
            <Grid size={{ xs: 6, sm: 6, md: 2 }} key={index.toString()}>
              <LevelCard
                levelData={level || emptyLevel}
                route={
                  `/program/${program?.name?.toLowerCase()}` +
                  `/level/${level?.level || emptyLevel?.level}`
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default Program;
