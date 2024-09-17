import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  addUserBookThunk,
  deleteUserBookThunk,
  fetchUserBooksThunk,
  userBookResponse,
} from "./operations";

interface userBookState {
  userBooks: userBookResponse[];
  isLoading: boolean;
  error: null | string | unknown;
  status: string;
}

const initialState: userBookState = {
  userBooks: [],
  isLoading: false,
  error: null,
  status: "",
};

const slice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBooksThunk.fulfilled, (state, { payload }) => {
        state.userBooks = payload;
      })
      .addMatcher(
        isAnyOf(
          addUserBookThunk.fulfilled,
          deleteUserBookThunk.fulfilled,
          fetchUserBooksThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          addUserBookThunk.pending,
          deleteUserBookThunk.pending,
          fetchUserBooksThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addUserBookThunk.rejected,
          deleteUserBookThunk.rejected,
          fetchUserBooksThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
});

export const userBooksReducer = slice.reducer;
export const { setFilters } = slice.actions;

export const selectIsLoading = (state: RootState) => state.userBooks.isLoading;
export const selectError = (state: RootState) => state.userBooks.error;
export const selectUserBooks = (state: RootState) => state.userBooks.userBooks;
export const selectFiltersStatus = (state: RootState) => state.userBooks.status;
