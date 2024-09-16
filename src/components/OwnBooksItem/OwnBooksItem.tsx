import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteUserBookThunk,
  fetchUserBooksThunk,
  userBookResponse,
} from "../../redux/userBooks/operations";
import { AppDispatch } from "../../redux/store";
import { Icon } from "../index";
import s from "./ownBookItem.module.css";

interface ownBook {
  book: userBookResponse;
}

export const OwnBooksItem: React.FC<ownBook> = ({ book }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteBook = async (id: string) => {
    try {
      await dispatch(deleteUserBookThunk(id)).unwrap();
      await dispatch(fetchUserBooksThunk({ status: "" })).unwrap();
    } catch {
      toast.error("Something went wrong. Please, try again");
    }
  };

  return (
    <li className={s.book_item}>
      <img src={book.imageUrl} alt="Book poster" className={s.book_img} />
      <h3 className={s.book_title}>{book.title}</h3>
      <p className={s.book_author}>{book.author}</p>
      <button
        type="submit"
        onClick={() => handleDeleteBook(book._id)}
        className={s.btn_delete}
      >
        <Icon id="bin" size={14} />
      </button>
    </li>
  );
};
