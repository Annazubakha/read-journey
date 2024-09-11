import { Book } from "../../redux/books/operations";
import s from "./RecommendedBooksItem.module.css";

interface RecommendedBooksItemProps {
  book: Book;
}

export const RecommendedBooksItem: React.FC<RecommendedBooksItemProps> = ({
  book,
}): JSX.Element => {
  return (
    <li className={s.book_item}>
      <img src={book.imageUrl} alt="Book poster" className={s.book_img} />
      <h3 className={s.book_title}>{book.title}</h3>
      <p className={s.book_author}>{book.author}</p>
    </li>
  );
};
