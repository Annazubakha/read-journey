import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Book } from "../../redux/books/operations";
import { AppDispatch } from "../../redux/store";
import { addUserBookThunk } from "../../redux/userBooks/operations";
import s from "./ModalBookInfo.module.css";

interface ModalBookInfoProps {
  book: Book;
  toggleModal: () => void;
  onAddBookSuccess: () => void;
}

export const ModalBookInfo: React.FC<ModalBookInfoProps> = ({
  toggleModal,
  book,
  onAddBookSuccess,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddBook = async (id: string) => {
    try {
      await dispatch(addUserBookThunk(id)).unwrap();
      onAddBookSuccess();
    } catch {
      toast.error("Something went wrong. Please, try again");
    }
  };
  return (
    <>
      <img
        src={book.imageUrl}
        alt="Book poster"
        className={s.book_img}
        onClick={toggleModal}
      />
      <h3 className={s.book_title}>{book.title}</h3>
      <p className={s.book_author}>{book.author}</p>
      <p className={s.book_pages}>{book.totalPages} pages</p>
      <button className={s.btn_add} onClick={() => handleAddBook(book._id)}>
        Add to library{" "}
      </button>
    </>
  );
};
