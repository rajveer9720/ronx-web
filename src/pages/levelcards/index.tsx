import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { LevelCard } from "../../components";
import { ChevronLeft, ChevronRight, Tag } from "@mui/icons-material";

const LevelCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} offset={{ xs: 0, sm: 0, md: 3 }}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h6" fontWeight={600}>
            Upline ID
          </Typography>
          <Chip size="small" color="primary" icon={<Tag />} label="123" />
        </Box>

        <Box py={2}>
          <LevelCard
            large
            disabled
            busd={5}
            cycles={2}
            people={4}
            level={1}
            revenue={10}
          />
        </Box>

        <Box display={"flex"} justifyContent="space-between">
          <Button size="large" variant="contained" startIcon={<ChevronLeft />}>
            Level 0
          </Button>
          <Button size="large" variant="contained" endIcon={<ChevronRight />}>
            Level 2
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LevelCards;
