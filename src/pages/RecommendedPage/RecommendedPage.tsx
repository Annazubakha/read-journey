import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectBooks,
  selectIsLoading,
  selectPage,
  // selectPerPage,
} from "../../redux/books/slice";
import { AppDispatch } from "../../redux/store";
import { booksThunk } from "../../redux/books/operations";
import { Dashboard, Loader, RecommendedBooks } from "../../components";
import s from "./RecommendedPage.module.css";

const RecommendedPage = (): JSX.Element => {
  const isLoading = useSelector(selectIsLoading);
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);
  // const perPage = useSelector(selectPerPage);
  const limit = 2;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(booksThunk({ page, limit })).unwrap();
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch, page, limit]);

  return (
    <>
      {isLoading && <Loader size={125} />}
      <div className={`container ${s.wrapper}`}>
        <Dashboard />
        <RecommendedBooks books={books} />
      </div>
    </>
  );
};

export default RecommendedPage;
