import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import { selectBook } from "../../redux/currentBook/slice";
import { fetchCurrentBookThunk } from "../../redux/currentBook/operations";
import { Icon } from "../index";
import s from "./MyBook.module.css";

interface myBookProps {
  isReading: boolean;
}

export const MyBook: React.FC<myBookProps> = ({ isReading }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const book = useSelector(selectBook);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const bookId = localStorage.getItem("book");
        if (bookId) {
          await dispatch(fetchCurrentBookThunk(bookId)).unwrap();
        }
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>My reading</h1>
      <div className={s.inside_wrapper}>
        <img src={book.imageUrl} alt="Book poster" className={s.poster} />
        <h2 className={s.title_book}>{book.title}</h2>
        <p className={s.author}>{book.author}</p>
        {isReading ? (
          <Icon id="stop" size={40} />
        ) : (
          <Icon id="start" size={40} />
        )}
      </div>
    </div>
  );
};
