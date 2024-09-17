import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userThunk } from "./operations";
import { logoutThunk } from "../auth/operations";

interface UserState {
  isLoading: boolean;
  error: string | null | undefined | unknown;
  name: string;
  _id: string;
  email: string;
}

const initialState: UserState = {
  error: null,
  isLoading: false,
  name: "",
  _id: "",
  email: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        userThunk.fulfilled,
        (state, { payload: { name, _id, email } }) => {
          state.isLoading = false;
          state.name = name;
          state._id = _id;
          state.email = email;
        }
      )
      .addCase(userThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const userReducer = slice.reducer;

export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectError = (state: RootState) => state.user.error;
export const selectUser = (state: RootState) => state.user.name;
