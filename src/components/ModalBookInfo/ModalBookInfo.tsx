import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Book } from "../../redux/books/operations";
import { AppDispatch } from "../../redux/store";
import { addUserBookThunk } from "../../redux/userBooks/operations";

import Img1 from "../../assets/images/book/book_mobile@1x.png";
import Img2 from "../../assets/images/book/book_mobile@2x.png";

import s from "./ModalBookInfo.module.css";

interface ModalBookInfoProps {
  book: Book;
  onAddBookSuccess?: () => void;
}

export const ModalBookInfo: React.FC<ModalBookInfoProps> = ({
  book,
  onAddBookSuccess,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const handleAddBook = async (id: string) => {
    try {
      await dispatch(addUserBookThunk(id)).unwrap();
      if (onAddBookSuccess) {
        onAddBookSuccess();
      }
    } catch {
      toast.error("Something went wrong. Please, try again");
    }
  };
  return (
    <>
      {book.imageUrl ? (
        <img src={book.imageUrl} alt="Book poster" className={s.book_img} />
      ) : (
        <div className={s.book_noimage}>
          <img srcSet={`${Img1} 1x, ${Img2} 2x`} alt="No book poster" />
        </div>
      )}
      <h3 className={s.book_title}>{book.title}</h3>
      <p className={s.book_author}>{book.author}</p>
      <p className={s.book_pages}>{book.totalPages} pages</p>
      {location.pathname === "/recommended" ? (
        <button className={s.btn_add} onClick={() => handleAddBook(book._id)}>
          Add to library{" "}
        </button>
      ) : (
        <button className={s.btn_add}>Start reading</button>
      )}
    </>
  );
};
