import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setToken } from "../../api/api";
import { RootState } from "../store";
import { Progress } from "../userBooks/operations";

export interface currentBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: Progress[];
}

export const fetchCurrentBookThunk = createAsyncThunk<
  currentBook,
  string,
  { rejectValue: string }
>("get current book", async (id, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    return thunkAPI.rejectWithValue("No token.");
  }
  try {
    setToken(token);
    const { data } = await instance.get(`books/${id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const startReadingThunk = createAsyncThunk<
  void,
  { page: number; id: string },
  { rejectValue: string }
>("start reading", async (credentials, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    return thunkAPI.rejectWithValue("No token.");
  }
  try {
    setToken(token);
    await instance.post("books/reading/start", credentials);
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const stopReadingThunk = createAsyncThunk<
  void,
  { page: number; id: string },
  { rejectValue: string }
>("stop reading", async (credentials, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    return thunkAPI.rejectWithValue("No token.");
  }
  try {
    setToken(token);
    await instance.post("books/reading/finish", credentials);
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
