import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";

import s from "./AddReading.module.css";

interface FormValues {
  page: number;
}

export const AddReading = (): JSX.Element => {
  //   const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async ({ page }) => {
    try {
      //   await dispatch();
      console.log(page);
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
          To start
        </button>
      </form>
    </>
  );
};
