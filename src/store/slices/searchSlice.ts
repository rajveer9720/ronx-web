import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload.trim();
      if (action.payload.trim()) {
        localStorage.setItem('searchTerm', action.payload.trim());
      }
    },
    clearSearchTerm(state) {
      state.searchTerm = "";
      localStorage.removeItem('searchTerm');
    },
  },
});

export const selectSearchTerm = (state: { search: SearchState }) =>
  state.search;
export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
