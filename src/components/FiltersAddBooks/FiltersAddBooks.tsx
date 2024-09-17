import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch } from "../../redux/store";
import {
  addNewBookThunk,
  fetchUserBooksThunk,
} from "../../redux/userBooks/operations";
import { Modal, ModalAddBook } from "../index";
import { addBookSchema } from "../../schemas";
import { useModal } from "../../helpers";
import s from "./FiltersAddBooks.module.css";

interface FormValues {
  title: string;
  author: string;
  totalPages: number;
}

export const FiltersBooks = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalAddBook, toggleIsModalAddBook] = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: yupResolver(addBookSchema) });
  const onSubmit: SubmitHandler<FormValues> = async ({
    author,
    title,
    totalPages,
  }) => {
    try {
      await dispatch(addNewBookThunk({ author, title, totalPages }));
      await dispatch(fetchUserBooksThunk({ status: "" }));
      reset();
      toggleIsModalAddBook();
    } catch {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <p className={s.form_title}>Create your library:</p>
        <div className={s.input_wrapper}>
          <input type="text" {...register("title")} className={s.input_title} />
          <p className={s.input_error}>{errors.title?.message}</p>
          <p className={s.placeholder}>Book title:</p>
        </div>
        <div className={s.input_wrapper}>
          <input
            type="text"
            {...register("author")}
            className={s.input_author}
          />
          <p className={s.placeholder}>The author:</p>
          <p className={s.input_error}>{errors.author?.message}</p>
        </div>
        <div className={s.input_wrapper}>
          <input
            type="text"
            {...register("totalPages")}
            className={s.input_pages}
          />
          <p className={s.input_error}>{errors.totalPages?.message}</p>
          <p className={s.placeholder}>Number of pages:</p>
        </div>
        <button type="submit" className={s.btn_submit}>
          Add book
        </button>
      </form>
      {isModalAddBook && (
        <Modal toggleModal={toggleIsModalAddBook}>
          <ModalAddBook />
        </Modal>
      )}
    </>
  );
};
