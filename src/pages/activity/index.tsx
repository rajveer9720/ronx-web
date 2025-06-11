import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { useEffect, useState } from "react";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import { useGetTransactionsQuery } from "../../store/apis/transactionApi";
import moment from "moment";
import { Box, Link } from "@mui/material";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { Link as RouterLink } from "react-router-dom";
import { OpenInNew } from "@mui/icons-material";
import { truncateAddress } from "../../utils/userUtils";

const Activity = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: Number(import.meta.env.VITE_APP_PAGE_NUMBER),
    pageSize: Number(import.meta.env.VITE_APP_PAGE_SIZE),
  });
  const { data, isLoading, refetch } = useGetTransactionsQuery({
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
      flex: 0.5,
      renderCell: (params) =>
        moment(params?.row.created_at).format(
          import.meta.env.VITE_APP_TIME_STAMP
        ),
    },
    { field: "type", headerName: "Type" },
    { field: "id", headerName: "User ID" },
    {
      field: "program",
      headerName: "Program",
      renderCell: (params) => params.row.user_level.level.program.name,
    },
    {
      field: "level",
      headerName: "Level",
      renderCell: (params) => params.row.user_level.level.level,
    },
    {
      field: "hash",
      headerName: "Txn Hash",
      flex: 0.5,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to={`${import.meta.env.VITE_APP_BSC_URL}/${params.row.hash}`}
        >
          {truncateAddress(params.row.hash, 10, 6)}
          <OpenInNew fontSize="small" sx={{ mx: 1 }} />
        </Link>
      ),
    },
    { field: "amount", headerName: "Revenue", flex: 0.5 },
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
