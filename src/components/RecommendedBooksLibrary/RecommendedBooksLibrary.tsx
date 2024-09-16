import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { booksThunk } from "../../redux/books/operations";
import { AppDispatch } from "../../redux/store";
import { selectBooks, selectIsLoading } from "../../redux/books/slice";
import { Icon, Loader } from "../index";
import s from "./RecommendedBooksLibrary.module.css";

export const RecommendedBooksLibrary = (): JSX.Element => {
  const isLoading = useSelector(selectIsLoading);
  const books = useSelector(selectBooks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(booksThunk({ limit: 3 })).unwrap();
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      {isLoading && <Loader size={125} />}
      <div className={s.wrapper}>
        <div className={s.wrapper_recom}>
          <h2 className={s.title}>Recommended books</h2>
          <ul className={s.list}>
            {books.map((book) => (
              <li className={s.item} key={book._id}>
                <img
                  src={book.imageUrl}
                  alt="Book poster"
                  className={s.book_img}
                />
                <h3 className={s.book_title}>{book.title}</h3>
                <p className={s.book_author}>{book.author}</p>
              </li>
            ))}
          </ul>
          <NavLink to="/recommended" className={s.home_link}>
            Home <Icon id="arrow-right" size={24} />
          </NavLink>
        </div>
      </div>
    </>
  );
};
