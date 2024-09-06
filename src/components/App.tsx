import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
// const RecommendedPage  = lazy(() => import("../pages/RecommendedPage/RecommendedPage"));
// const MyLibraryPage = lazy(() => import("../pages/MyLibraryPage/MyLibraryPage"));
// const ReadingPage = lazy(() => import("../pages/ReadingPage/ReadingPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

export const App = (): JSX.Element => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<SharedLayout />}> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* </Route> */}
      </Routes>
    </>
  );
};
