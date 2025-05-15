import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface LoaderState {
  loading: boolean;
}

const initialState: LoaderState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});

export const selectLoading = (state: RootState) => state.loader.loading;
export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
