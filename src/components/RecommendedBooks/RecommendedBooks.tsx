import { Book } from "../../redux/books/operations";
import { Pagination, RecommendedBooksList } from "../index";
import s from "./RecommendedBooks.module.css";

interface RecommendedBooksProps {
  books: Book[];
  handlePageChange: (newPage: number) => void;
}

export const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  books,
  handlePageChange,
}): JSX.Element => {
  return (
    <section className={s.wrapper}>
      <h2 className={s.title}>Recommended</h2>
      {books.length > 0 ? (
        <RecommendedBooksList books={books} />
      ) : (
        <p className={s.text}>There are no books. Please try other filters.</p>
      )}
      <Pagination handlePageChange={handlePageChange} />
    </section>
  );
};
