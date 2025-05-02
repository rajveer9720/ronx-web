import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as statsJson from "../../mock";
import { StatRow } from "../../interfaces/stats";

const Stats = () => {
  const rows: StatRow[] = statsJson.stats;

  const statsColumns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "program", headerName: "Program", flex: 1 },
    { field: "level", headerName: "Level", flex: 1 },
    { field: "wallet", headerName: "Wallet", flex: 2 },
    { field: "busdProfit", headerName: "BUSD Profit", flex: 1 },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ backgroundColor: "white" }}
    >
      <DataGrid rows={rows} columns={statsColumns} disableRowSelectionOnClick />
    </Box>
  );
};

export default Stats;
