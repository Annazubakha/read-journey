import { RecommendedBooksItem } from "../index";
import { Book } from "../../redux/books/operations";
import s from "./RecommendedBooksList.module.css";

interface RecommendedBooksProps {
  books: Book[];
}

export const RecommendedBooksList: React.FC<RecommendedBooksProps> = ({
  books,
}): JSX.Element => {
  return (
    <ul className={s.books_list}>
      {books?.map((book) => (
        <RecommendedBooksItem key={book._id} book={book} />
      ))}
    </ul>
  );
};
