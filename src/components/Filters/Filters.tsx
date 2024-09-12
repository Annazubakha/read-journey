import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import s from "./Filters.module.css";
import { setFilters } from "../../redux/books/slice";

interface FormValues {
  title: string;
  author: string;
}

export const Filters = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({ author, title }) => {
    try {
      dispatch(setFilters({ author, title }));
    } catch {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <p className={s.form_title}>Filters:</p>
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
        <button type="submit" className={s.btn_submit}>
          To apply
        </button>
      </form>
    </>
  );
};
