import { Box, Typography, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DashboardCard } from "../../components";
import { recentActivityData } from "../../mock";
import { getActivityCards } from "../../utils/activityUtils";

const Activity = () => {
  const ActivityCards = getActivityCards();

  const columns: GridColDef[] = [
    { field: "id", headerName: "User ID", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    { field: "matrix", headerName: "Matrix", flex: 1 },
    { field: "level", headerName: "Level", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        {ActivityCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 12, md: 4 }}>
            <DashboardCard title={card.title} icon={<card.icon />}>
              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <DataGrid
          rows={recentActivityData}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Activity;
