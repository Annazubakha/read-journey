import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
 refreshThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from "./operations";
import { RootState } from "../store";

interface AuthState {
  isLoading: boolean;
  error: string | null | undefined | unknown;
  isLoggedIn: boolean;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  refreshToken: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload: { token, refreshToken } }) => {
          state.token = token;
          state.refreshToken = refreshToken;
      })
      .addCase(
        refreshThunk.fulfilled,
        (state, { payload: { token, refreshToken } }) => {
          state.token = token;
          state.refreshToken = refreshToken;
          state.isLoggedIn = true;
            }
      )
      .addCase(loginThunk.fulfilled, (state, { payload: { token, refreshToken } }) => {
        state.token = token;
        state.refreshToken = refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          refreshThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          logoutThunk.fulfilled,
          refreshThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          logoutThunk.rejected,
     refreshThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
});

export const authReducer = slice.reducer;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
