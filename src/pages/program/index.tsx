import { Box, Typography, Card, Divider, Grid } from "@mui/material";
import { useState } from "react";
import { LevelCard } from "../../components";
import * as programData from "../../mock";
import { ProgramType } from "../../interfaces/program";

const Program = () => {
  const [programs] = useState<ProgramType>({
    ...programData.levelcard?.[0],
    levels: Array.isArray(programData.levelcard?.[0]?.levels)
      ? programData.levelcard[0].levels
      : [],
  });

  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={"bold"}>
          Program: {programs?.type}
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          {programs?.price}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} py={2}>
        {programs?.levels.map((level, i) => (
          <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
            <LevelCard
              level={level.level}
              busd={level.busd}
              people={level.people}
              cycles={level.cycles}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default Program;
