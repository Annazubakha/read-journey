import { useSelector } from "react-redux";
import { Icon } from "../index";
import { selectPage, selectTotalPages } from "../../redux/books/slice";
import s from "./Pagination.module.css";

export const Pagination = (): JSX.Element => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  return (
    <div className={s.wrapper}>
      <button
        className={`${s.btn_pagination} ${page === 1 ? s.disabled : ""}`}
        disabled={page === 1}
      >
        <Icon size={16} id="pagination-left" />
      </button>
      <button
        className={`${s.btn_pagination} ${
          page === totalPages ? s.disabled : ""
        }`}
        disabled={page === totalPages}
      >
        <Icon size={16} id="pagination-right" />
      </button>
    </div>
  );
};
