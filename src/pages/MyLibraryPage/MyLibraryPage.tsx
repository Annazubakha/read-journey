import { Loader, MyLibraryBooks, LibraryDashboard } from "../../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import { fetchUserBooksThunk } from "../../redux/userBooks/operations";
import { selectIsLoading, selectUserBooks } from "../../redux/userBooks/slice";
import s from "./MyLibraryPage.module.css";

const MyLibraryPage = (): JSX.Element => {
  const isLoading = useSelector(selectIsLoading);
  const books = useSelector(selectUserBooks);
  const status = "";
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(fetchUserBooksThunk({ status })).unwrap();
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch, status]);

  return (
    <>
      {isLoading && <Loader size={125} />}
      <div className={`container ${s.wrapper}`}>
        <LibraryDashboard />
        <MyLibraryBooks books={books} />
      </div>
    </>
  );
};

export default MyLibraryPage;
