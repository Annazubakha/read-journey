import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectBooks,
  selectFilters,
  selectIsLoading,
  selectPage,
  setPage,
} from "../../redux/books/slice";
import { AppDispatch } from "../../redux/store";
import { booksThunk } from "../../redux/books/operations";
import { Dashboard, Loader, RecommendedBooks } from "../../components";
import { useWindowSizeHook } from "../../helpers";
import s from "./RecommendedPage.module.css";

const RecommendedPage = (): JSX.Element => {
  const isLoading = useSelector(selectIsLoading);
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);
  const { author, title } = useSelector(selectFilters);
  const windowSize = useWindowSizeHook().innerWidth;

  const getLimit = (): number => {
    if (windowSize >= 1280) {
      return 10;
    } else if (windowSize >= 768) {
      return 8;
    } else {
      return 2;
    }
  };

  const limit = getLimit();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(booksThunk({ page, limit, author, title })).unwrap();
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch, page, limit, author, title]);
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <>
      {isLoading && <Loader size={125} />}
      <div className={`container ${s.wrapper}`}>
        <Dashboard />
        <RecommendedBooks books={books} handlePageChange={handlePageChange} />
      </div>
    </>
  );
};

export default RecommendedPage;
