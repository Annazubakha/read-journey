import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectBook } from "../../redux/currentBook/slice";
import {
  startReadingThunk,
  stopReadingThunk,
} from "../../redux/currentBook/operations";
import { Modal, ModalFinishBook } from "../index";
import { Props } from "../DasboardReading/DasboardReading";
import { useModal } from "../../helpers";

import s from "./AddReading.module.css";

interface FormValues {
  page: number;
}

export const AddReading: React.FC<Props> = ({
  setIsReading,
  isReading,
}): JSX.Element => {
  const [isModal, toggleIsModal] = useModal();
  const book = useSelector(selectBook);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async ({ page }) => {
    try {
      if (isReading === true) {
        await dispatch(stopReadingThunk({ page, id: book._id })).unwrap();
        setIsReading(false);
        if (page === book.totalPages) {
          toggleIsModal();
        }
      } else {
        await dispatch(startReadingThunk({ page, id: book._id })).unwrap();
        setIsReading(true);
      }
    } catch {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <p className={s.form_title}>Start page:</p>
        <div className={s.input_wrapper}>
          <input
            type="text"
            {...register("page", {
              required: "Page number is required.",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Page number must be greater than 0.",
              },
              validate: {
                isNumber: (value) =>
                  !isNaN(value) || "Page number must be a number.",
              },
            })}
            className={s.input_pages}
          />
          <p className={s.input_error}>{errors.page?.message}</p>
          <p className={s.placeholder}>Page number:</p>
        </div>
        <button type="submit" className={s.btn_submit}>
          {isReading ? "To stop" : "To start"}
        </button>
      </form>
      {isModal && (
        <Modal toggleModal={toggleIsModal}>
          <ModalFinishBook />
        </Modal>
      )}
    </>
  );
};
