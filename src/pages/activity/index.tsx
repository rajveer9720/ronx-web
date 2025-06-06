import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { useEffect, useState } from "react";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import { useGetTransactionsQuery } from "../../store/apis/transactionApi";
import moment from "moment";
import { Box } from "@mui/material";
import { selectCurrentUser } from "../../store/slices/authSlice";

const Activity = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: Number(import.meta.env.VITE_APP_PAGE_NUMBER),
    pageSize: Number(import.meta.env.VITE_APP_PAGE_SIZE),
  });
  const {
    data,
    isLoading,
    refetch,
  } = useGetTransactionsQuery({
    user_id: Number(searchTerm) || loggedInUser?.id,
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
      headerName: "Date & Time",
      flex: 1,
      renderCell: (params) =>
        moment(params?.row.created_at).format(
          import.meta.env.VITE_APP_TIME_STAMP
        ),
    },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "id", headerName: "User ID", flex: 1 },
    {
      field: "program",
      headerName: "Program",
      flex: 1,
      renderCell: (params) => params.row.user_level.level.program.name,
    },
    {
      field: "level",
      headerName: "Level",
      flex: 1,
      renderCell: (params) => params.row.user_level.level.level,
    },
    { field: "hash", headerName: "Txn Hash", flex: 1 },
    { field: "amount", headerName: "Cr/Dr (BUSD)", flex: 1 },
  ];

  return (
    <Box mt={4}>
      <DataGrid
        rows={data?.data || []}
        rowCount={data?.pagination?.total_items || 0}
        loading={isLoading}
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

export default Activity;
