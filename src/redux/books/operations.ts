import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setToken } from "../../api/api";
import { RootState } from "../store";

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

interface BooksResponse {
  results: Book[];
  totalPages: number;
  page: number;
  limit: number;
}

interface booksParams {
  page?: number;
  limit?: number;
  title?: string;
  author?: string;
}

export const booksThunk = createAsyncThunk<
  BooksResponse,
  booksParams,
  {
    rejectValue: string;
  }
>(
  "recommended books",
  async (
    { author = "", title = "", page = 1, limit = 2 }: booksParams,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;
    if (token === null) {
      return thunkAPI.rejectWithValue("No token.");
    }
    try {
      setToken(token);
      const { data } = await instance.get<BooksResponse>("books/recommend", {
        params: { author, title, page, limit },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
