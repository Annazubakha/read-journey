import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectToken } from "../redux/auth/slice";
import { AppDispatch } from "../redux/store";
import { refreshThunk } from "../redux/auth/operations";
import { PrivateRoute, PublicRoute } from "../routes";

const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RecommendedPage = lazy(
  () => import("../pages/RecommendedPage/RecommendedPage")
);
// const MyLibraryPage = lazy(() => import("../pages/MyLibraryPage/MyLibraryPage"));
// const ReadingPage = lazy(() => import("../pages/ReadingPage/ReadingPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

export const App = (): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(refreshThunk());
    }
  }, [dispatch, token, isLoggedIn]);
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute restricted={true}>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute restricted={true}>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/recommended"
            element={
              <PrivateRoute>
                <RecommendedPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
