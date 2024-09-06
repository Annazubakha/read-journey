import { createAsyncThunk } from "@reduxjs/toolkit";
import {  clearToken, instance, setToken } from "../../api/api";
import { AxiosError } from "axios";
import { RootState } from "../store";

interface Credentials {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
token: string;
email: string;
name: string;
refreshToken: string;
}

interface LogoutResponse {
  message: string; 
}

export const registerThunk = createAsyncThunk<
  AuthResponse,
  Credentials,
  {
    rejectValue: string;
  }
>("signup", async (credentials, thunkAPI) => {
  try {
    const { data } = await instance.post<AuthResponse>(
      "/users/signup",
      credentials
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return thunkAPI.rejectWithValue("The mail is already in use.");
      }
    }

    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const loginThunk = createAsyncThunk<
  AuthResponse,
  Credentials,
  {
    rejectValue: string;
  }
>("signin", async (credentials, thunkAPI) => {
  try {
    const { data } = await instance.post<AuthResponse>(
      "/users/signin",
      credentials
    );
    setToken(data.token);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        return thunkAPI.rejectWithValue(
          "The mail doesn't exist or password is incorrect. Please try again."
        );
      }
    }
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const logoutThunk = createAsyncThunk(
  "logout",
    async (token, thunkAPI) => {
    try {
      await instance.post<LogoutResponse>("/users/signout", token);
      clearToken();
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const refreshThunk = createAsyncThunk<
  AuthResponse,
  void,
  {
    rejectValue: string;
  }
>("refresh user", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
    const persistedToken = state.auth.refreshToken;
  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Imposible refresh user.");
    }
    try {
    setToken(persistedToken);
    const { data } = await instance.get<AuthResponse>("users/current/refresh");
    return data;
  } catch (error) {
 return thunkAPI.rejectWithValue((error as Error).message);
  }
});