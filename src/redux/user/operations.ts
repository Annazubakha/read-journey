import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setToken } from "../../api/api";
import { RootState } from "../store";

interface UserResponse {
  email: string;
  name: string;
  _id: string;
}

export const userThunk = createAsyncThunk<
  UserResponse,
  void,
  {
    rejectValue: string;
  }
>("get user", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    return thunkAPI.rejectWithValue("No token.");
  }
  try {
    setToken(token);
    const { data } = await instance.get<UserResponse>("users/current");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
