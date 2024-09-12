import { useModal } from "../../helpers";
import { Book } from "../../redux/books/operations";
import { Modal } from "../Modal/Modal";
import { ModalBookInfo } from "../ModalBookInfo/ModalBookInfo";
import s from "./RecommendedBooksItem.module.css";

interface RecommendedBooksItemProps {
  book: Book;
}

export const RecommendedBooksItem: React.FC<RecommendedBooksItemProps> = ({
  book,
}): JSX.Element => {
  const [isModal, toggleIsModal] = useModal();

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
        <Modal toggleModal={toggleIsModal}>
          <ModalBookInfo toggleModal={toggleIsModal} book={book} />
        </Modal>
      )}
    </>
  );
};
