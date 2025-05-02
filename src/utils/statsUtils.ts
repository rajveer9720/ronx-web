import { GridColDef } from "@mui/x-data-grid";

export const statsColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
  { field: "program", headerName: "Program", flex: 1 },
  { field: "level", headerName: "Level", flex: 1 },
  { field: "wallet", headerName: "Wallet", flex: 2 },
  { field: "busdProfit", headerName: "BUSD Profit", flex: 1 },
];
