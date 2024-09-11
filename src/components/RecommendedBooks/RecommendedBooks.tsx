import { Book } from "../../redux/books/operations";
import { Pagination, RecommendedBooksList } from "../index";
import s from "./RecommendedBooks.module.css";

interface RecommendedBooksProps {
  books: Book[];
}

export const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  books,
}): JSX.Element => {
  return (
    <section className={s.wrapper}>
      <h2 className={s.title}>Recommended</h2>
      <RecommendedBooksList books={books} />
      <Pagination />
    </section>
  );
};
