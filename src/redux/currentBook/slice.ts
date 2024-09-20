import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  currentBook,
  fetchCurrentBookThunk,
  startReadingThunk,
  stopReadingThunk,
} from "./operations";
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
        state.book = payload;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          fetchCurrentBookThunk.fulfilled,
          startReadingThunk.fulfilled,
          stopReadingThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCurrentBookThunk.pending,
          startReadingThunk.pending,
          stopReadingThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCurrentBookThunk.rejected,
          startReadingThunk.rejected,
          stopReadingThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
});

export const currentBookReducer = slice.reducer;

export const selectIsLoading = (state: RootState) =>
  state.currentBook.isLoading;
export const selectBook = (state: RootState) => state.currentBook.book;
