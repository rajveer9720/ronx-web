import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { useGetUserReferralsQuery } from "../../store/apis/userApi";
import { useEffect } from "react";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import moment from "moment";

const Referral = () => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { data: rows, isLoading } = useGetUserReferralsQuery({
    id: +searchTerm,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading]);

  const columns: GridColDef[] = [
    {
      field: "created_at",
      headerName: "Joining Date",
      flex: 1,
      renderCell: (params) =>
        moment(params?.row.created_at).format(
          import.meta.env.VITE_APP_TIME_STAMP
        ),
    },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "wallet_address", headerName: "Wallet Address", flex: 2 },
    { field: "profits", headerName: "Profits (BUSD)", flex: 1 },
  ];

  return (
    <Box mt={4}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableColumnResize
      />
    </Box>
  );
};

export default Referral;
