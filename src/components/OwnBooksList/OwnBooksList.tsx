import { userBookResponse } from "../../redux/userBooks/operations";
import { OwnBooksItem } from "../index";
import s from "./OwnBooksList.module.css";

interface ownBooks {
  books: userBookResponse[];
}

export const OwnBooksList: React.FC<ownBooks> = ({ books }): JSX.Element => {
  return (
    <ul className={s.list}>
      {books.map((book) => (
        <OwnBooksItem book={book} key={book._id} />
      ))}
    </ul>
  );
};
