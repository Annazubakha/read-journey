import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { userReducer } from "./user/slice";
import { booksReducer } from "./books/slice";
import { userBooksReducer } from "./userBooks/slice";
import { currentBookReducer } from "./currentBook/slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["token", "refreshToken"],
};

const persistedAuth = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    user: userReducer,
    books: booksReducer,
    userBooks: userBooksReducer,
    currentBook: currentBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
