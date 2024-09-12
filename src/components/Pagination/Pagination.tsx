import { useSelector } from "react-redux";
import { Icon } from "../index";
import {
  selectBooks,
  selectPage,
  selectTotalPages,
} from "../../redux/books/slice";
import s from "./Pagination.module.css";

interface PaginationProps {
  handlePageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  handlePageChange,
}): JSX.Element => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const books = useSelector(selectBooks);
  return (
    <div className={s.wrapper}>
      <button
        className={`${s.btn_pagination} ${
          page === 1 || books.length === 0 ? s.disabled : ""
        }`}
        disabled={page === 1 || books.length === 0}
        onClick={() => handlePageChange(page - 1)}
      >
        <Icon size={16} id="pagination-left" />
      </button>
      <button
        className={`${s.btn_pagination} ${
          page === totalPages || books.length === 0 ? s.disabled : ""
        }`}
        disabled={page === totalPages || books.length === 0}
        onClick={() => handlePageChange(page + 1)}
      >
        <Icon size={16} id="pagination-right" />
      </button>
    </div>
  );
};
