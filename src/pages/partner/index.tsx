import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PartnerRow } from "../../interfaces/partner";
import * as partnerJson from "../../mock";

const Partner = () => {
  const rows: PartnerRow[] = partnerJson.partners;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "x3", headerName: "X3", flex: 1 },
    { field: "x4", headerName: "X4", flex: 1 },
    { field: "profitBusd", headerName: "Profit (BUSD)", flex: 1 },
    { field: "newPartners", headerName: "New Partners", flex: 1 },
    { field: "partners", headerName: "Total Partners", flex: 1 },
  ];

  return (
    <Box mt={4}>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
    </Box>
  );
};

export default Partner;
