import { Box, Typography, Card, Divider, Grid } from "@mui/material";
import { LevelCard } from "../../components";

const Program = () => {
  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={"bold"}>
          Program: x3
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          10 BUSD
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} py={2}>
        {[...Array(12)].map((_, i) => {
          return (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
              <LevelCard
                level={i + 1}
                busd={(i + 1) * 5}
                people={12}
                cycles={44}
              />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default Program;
