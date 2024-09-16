import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setFilters } from "../../redux/books/slice";
import s from "./FiltersAddBooks.module.css";

interface FormValues {
  title: string;
  author: string;
  totalPages: number;
}

export const FiltersBooks = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({
    author,
    title,
    totalPages,
  }) => {
    try {
      dispatch(setFilters({ author, title, totalPages }));
    } catch {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <p className={s.form_title}>Create your library::</p>
        <div className={s.input_wrapper}>
          <input type="text" {...register("title")} className={s.input_title} />
          <p className={s.placeholder}>Book title:</p>
        </div>
        <div className={s.input_wrapper}>
          <input
            type="text"
            {...register("author")}
            className={s.input_author}
          />
          <p className={s.placeholder}>The author:</p>
        </div>
        <div className={s.input_wrapper}>
          <input
            type="text"
            {...register("totalPages")}
            className={s.input_pages}
          />
          <p className={s.placeholder}>Number of pages:</p>
        </div>
        <button type="submit" className={s.btn_submit}>
          Add book
        </button>
      </form>
    </>
  );
};
