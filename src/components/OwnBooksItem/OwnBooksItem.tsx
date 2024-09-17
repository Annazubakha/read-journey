import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteUserBookThunk,
  fetchUserBooksThunk,
  userBookResponse,
} from "../../redux/userBooks/operations";
import { AppDispatch } from "../../redux/store";
import { Icon, Modal, ModalBookInfo } from "../index";
import { useModal } from "../../helpers";

import Img1 from "../../assets/images/book/book_mobile@1x.png";
import Img2 from "../../assets/images/book/book_mobile@2x.png";

import s from "./ownBookItem.module.css";

interface ownBook {
  book: userBookResponse;
}

export const OwnBooksItem: React.FC<ownBook> = ({ book }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModal, toggleIsModal] = useModal();
  const handleDeleteBook = async (id: string) => {
    try {
      await dispatch(deleteUserBookThunk(id)).unwrap();
      await dispatch(fetchUserBooksThunk({ status: "" })).unwrap();
    } catch {
      toast.error("Something went wrong. Please, try again");
    }
  };

  return (
    <>
      <li className={s.book_item}>
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt="Book poster"
            className={s.book_img}
            onClick={toggleIsModal}
          />
        ) : (
          <div className={s.book_noimage}>
            <img
              srcSet={`${Img1} 1x, ${Img2} 2x`}
              alt="No book poster"
              onClick={toggleIsModal}
            />
          </div>
        )}
        <h3 className={s.book_title}>{book.title}</h3>
        <p className={s.book_author}>{book.author}</p>
        <button
          type="submit"
          onClick={() => handleDeleteBook(book._id)}
          className={s.btn_delete}
        >
          <Icon id="bin" size={14} />
        </button>
        {isModal && (
          <Modal toggleModal={toggleIsModal} modalType="addBook">
            <ModalBookInfo book={book} />
          </Modal>
        )}
      </li>
    </>
  );
};
