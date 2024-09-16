import { userBookResponse } from "../../redux/userBooks/operations";
import { OwnBooksList, NoBooks, FiltersStatus } from "../index";
import s from "./MyLibraryBooks.module.css";

interface ownBooks {
  books: userBookResponse[];
}
export const MyLibraryBooks: React.FC<ownBooks> = ({ books }): JSX.Element => {
  return (
    <section className={s.wrapper}>
      <h1 className={s.title}>My library</h1>
      {books.length === 0 ? <NoBooks /> : <OwnBooksList books={books} />}
      <FiltersStatus />
    </section>
  );
};
