import { FiltersBooks, RecommendedBooksLibrary } from "../index";
import s from "./LibraryDashboard.module.css";

export const LibraryDashboard = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <FiltersBooks />
      <RecommendedBooksLibrary />
    </div>
  );
};
