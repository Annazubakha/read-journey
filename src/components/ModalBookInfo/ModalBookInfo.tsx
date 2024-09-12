import { Book } from "../../redux/books/operations";
import s from "./ModalBookInfo.module.css";

interface ModalBookInfoProps {
  book: Book;
  toggleModal: () => void;
}

export const ModalBookInfo: React.FC<ModalBookInfoProps> = ({
  toggleModal,
  book,
}): JSX.Element => {
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
      <button className={s.btn_add}>Add to library </button>
    </>
  );
};
