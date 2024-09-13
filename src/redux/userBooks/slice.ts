import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addUserBookThunk } from "./operations";

interface userBookState {
  // userBooks: userBookResponse[];
  isLoading: boolean;
  error: null | string | unknown;
}

const initialState: userBookState = {
  // userBooks: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserBookThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addUserBookThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUserBookThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const userBooksReducer = slice.reducer;

export const selectIsLoading = (state: RootState) => state.userBooks.isLoading;
export const selectError = (state: RootState) => state.userBooks.error;
// export const selectUserBooks = (state: RootState) => state.userBooks.userBooks;
