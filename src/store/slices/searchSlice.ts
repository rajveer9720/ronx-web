import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
  type: "string" | "number";
}

const initialState: SearchState = {
  searchTerm: "",
  type: "string",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      const trimmedSearchTerm = action.payload.trim();
      state.searchTerm = trimmedSearchTerm;
      state.type = /^\d+$/.test(trimmedSearchTerm) ? "number" : "string";
    },
  },
});

export const selectSearchTerm = (state: { search: SearchState }) =>
  state.search;
export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
