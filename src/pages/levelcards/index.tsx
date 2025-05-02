import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Tag } from "@mui/icons-material";
import * as levelCardData from "../../mock";
import { LevelCard } from "../../components";

const LevelCards = () => {
  const data = levelCardData.levelcard[0];
  const { levels } = data;

  const currentLevel = levels[0];

  const prevLevel = 0;
  const nextLevel = 2;
  const uplineId = "123";

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} offset={{ xs: 0, sm: 0, md: 3 }}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h6" fontWeight={600}>
            Upline ID
          </Typography>
          <Chip size="small" color="primary" icon={<Tag />} label={uplineId} />
        </Box>

        <Box py={2}>
          <LevelCard
            large={true}
            disabled={false}
            busd={currentLevel.busd}
            cycles={currentLevel.cycles}
            people={currentLevel.people}
            level={currentLevel.level}
            revenue={currentLevel.revenue}
          />
        </Box>

        <Box display={"flex"} justifyContent="space-between">
          <Button size="large" variant="contained" startIcon={<ChevronLeft />}>
            Level {prevLevel}
          </Button>
          <Button size="large" variant="contained" endIcon={<ChevronRight />}>
            Level {nextLevel}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LevelCards;
