import { useModal } from "../../helpers";
import { Book } from "../../redux/books/operations";
import { Modal, ModalAddBook, ModalBookInfo } from "../index";
import s from "./RecommendedBooksItem.module.css";

interface RecommendedBooksItemProps {
  book: Book;
}

export const RecommendedBooksItem: React.FC<RecommendedBooksItemProps> = ({
  book,
}): JSX.Element => {
  const [isModal, toggleIsModal] = useModal();
  const [isModalAddBook, toggleIsModalAddBook] = useModal();

  const handleAddBookSuccess = () => {
    toggleIsModal();
    toggleIsModalAddBook();
  };

  return (
    <>
      <li className={s.book_item}>
        <img
          src={book.imageUrl}
          alt="Book poster"
          className={s.book_img}
          onClick={toggleIsModal}
        />
        <h3 className={s.book_title}>{book.title}</h3>
        <p className={s.book_author}>{book.author}</p>
      </li>
      {isModal && (
        <Modal toggleModal={toggleIsModal} modalType="addBook">
          <ModalBookInfo book={book} onAddBookSuccess={handleAddBookSuccess} />
        </Modal>
      )}
      {isModalAddBook && (
        <Modal toggleModal={toggleIsModalAddBook}>
          <ModalAddBook />
        </Modal>
      )}
    </>
  );
};
