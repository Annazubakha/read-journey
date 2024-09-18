import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setToken } from "../../api/api";
import { RootState } from "../store";

export interface Progress {
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: string;
}

export interface userBookResponse {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: Progress[];
}

interface ownBooksParams {
  status?: string;
}

interface CredentialsBook {
  title: string;
  author: string;
  totalPages: number;
}

export const addUserBookThunk = createAsyncThunk<
  void,
  string,
  {
    rejectValue: string;
  }
>("add user book", async (id, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    return thunkAPI.rejectWithValue("No token.");
  }
  try {
    setToken(token);
    await instance.post<void[]>(`books/add/${id}`);
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const fetchUserBooksThunk = createAsyncThunk<
  userBookResponse[],
  ownBooksParams,
  {
    rejectValue: string;
  }
>("user books", async ({ status = "" }: ownBooksParams, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    return thunkAPI.rejectWithValue("No token.");
  }
  try {
    setToken(token);
    const params = status ? { status } : {};
    const { data } = await instance.get<userBookResponse[]>("books/own", {
      params,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const deleteUserBookThunk = createAsyncThunk<
  void,
  string,
  {
    rejectValue: string;
  }
>("delete user book", async (id, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    return thunkAPI.rejectWithValue("No token.");
  }
  try {
    setToken(token);
    await instance.delete<void[]>(`books/remove/${id}`);
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const addNewBookThunk = createAsyncThunk<
  void,
  CredentialsBook,
  {
    rejectValue: string;
  }
>("new book", async (credentials, thunkAPI) => {
  try {
    const { data } = await instance.post<void>("/books/add", credentials);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
