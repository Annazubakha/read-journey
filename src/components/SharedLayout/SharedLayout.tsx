import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../index";

export const SharedLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
