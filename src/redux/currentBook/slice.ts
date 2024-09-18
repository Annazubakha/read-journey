import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { currentBook, fetchCurrentBookThunk } from "./operations";
import { logoutThunk } from "../auth/operations";

interface BookState {
  book: currentBook;
  isLoading: boolean;
  error: null | string | undefined;
}

const initialState: BookState = {
  book: {
    _id: "",
    title: "",
    author: "",
    imageUrl: "",
    totalPages: 0,
    status: "",
    owner: "",
    progress: [],
  },
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "currentBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentBookThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.book = payload;
      })
      .addCase(fetchCurrentBookThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentBookThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const currentBookReducer = slice.reducer;

export const selectIsLoading = (state: RootState) =>
  state.currentBook.isLoading;
export const selectBook = (state: RootState) => state.currentBook.book;
