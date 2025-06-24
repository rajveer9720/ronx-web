import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { useGetUserReferralsQuery } from "../../store/apis/userApi";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import moment from "moment";
import { selectCurrentUser } from "../../store/slices/authSlice";

const Referral = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: Number(import.meta.env.VITE_APP_PAGE_NUMBER),
    pageSize: Number(import.meta.env.VITE_APP_PAGE_SIZE),
  });
  const { data, isLoading, refetch } = useGetUserReferralsQuery({
    id: Number(searchTerm) || loggedInUser?.id || 1,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading]);

  useEffect(() => {
    refetch();
  }, [paginationModel]);

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
        rows={data?.data || []}
        rowCount={data?.pagination?.total_items || 0}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableColumnResize
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};

export default Referral;
