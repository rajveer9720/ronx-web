import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/user"; // Adjust the path to your IUser interface

interface AuthState {
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: IUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

// Selectors
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;

// Actions
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
