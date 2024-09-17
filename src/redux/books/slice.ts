import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Book, booksThunk } from "./operations";
import { logoutThunk } from "../auth/operations";

interface BooksState {
  books: Book[];
  totalPages: number;
  page: number;
  perPage: number;
  isLoading: boolean;
  error: string | null | undefined;
  filters: {
    title: string;
    author: string;
  };
}

const initialState: BooksState = {
  books: [],
  totalPages: 0,
  page: 1,
  perPage: 2,
  isLoading: false,
  error: null,
  filters: {
    title: "",
    author: "",
  },
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
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
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const booksReducer = slice.reducer;
export const { setPage, setFilters } = slice.actions;

export const selectIsLoading = (state: RootState) => state.books.isLoading;
export const selectError = (state: RootState) => state.books.error;
export const selectBooks = (state: RootState) => state.books.books;
export const selectPage = (state: RootState) => state.books.page;
export const selectTotalPages = (state: RootState) => state.books.totalPages;
export const selectFilters = (state: RootState) => state.books.filters;
