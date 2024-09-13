import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setToken } from "../../api/api";
import { RootState } from "../store";

// interface Progress {
//   startPage: number;
//   startReading: string;
//   finishPage: number;
//   finishReading: string;
//   speed: number;
//   status: string;
// }

// export interface userBookResponse {
//   _id: string;
//   title: string;
//   author: string;
//   imageUrl: string;
//   totalPages: number;
//   status: string;
//   owner: string;
//   progress: Progress[];
// }

export const addUserBookThunk = createAsyncThunk<
  void,
  string,
  {
    rejectValue: string;
  }
>("user books", async (id, thunkAPI) => {
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
