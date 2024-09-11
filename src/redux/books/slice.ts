import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Book, booksThunk } from "./operations";

interface BooksState {
  books: Book[];
  totalPages: number;
  page: number;
  perPage: number;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: BooksState = {
  books: [],
  totalPages: 0,
  page: 1,
  perPage: 2,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        booksThunk.fulfilled,
        (state, { payload: { results, totalPages, page, limit } }) => {
          state.isLoading = false;
          state.totalPages = totalPages;
          state.books = results;
          state.page = page;
          state.perPage = limit;
        }
      )
      .addCase(booksThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(booksThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const booksReducer = slice.reducer;

export const selectIsLoading = (state: RootState) => state.books.isLoading;
export const selectError = (state: RootState) => state.books.error;
export const selectBooks = (state: RootState) => state.books.books;
export const selectPage = (state: RootState) => state.books.page;
export const selectTotalPages = (state: RootState) => state.books.totalPages;
