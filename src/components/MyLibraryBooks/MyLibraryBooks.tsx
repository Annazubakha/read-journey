import { useSelector } from "react-redux";
import { userBookResponse } from "../../redux/userBooks/operations";
import { selectFiltersStatus } from "../../redux/userBooks/slice";
import { OwnBooksList, NoBooks, FiltersStatus } from "../index";
import s from "./MyLibraryBooks.module.css";

interface ownBooks {
  books: userBookResponse[];
}
export const MyLibraryBooks: React.FC<ownBooks> = ({ books }): JSX.Element => {
  const status = useSelector(selectFiltersStatus);
  return (
    <section className={s.wrapper}>
      <h1 className={s.title}>My library</h1>
      {books.length === 0 ? (
        status === "" ? (
          <NoBooks />
        ) : (
          <p>There are no books. Please try other filter.</p>
        )
      ) : (
        <OwnBooksList books={books} />
      )}
      <FiltersStatus />
    </section>
  );
};
