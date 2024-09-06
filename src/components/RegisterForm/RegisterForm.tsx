import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { selectIsLoading } from "../../redux/auth/slice";
import { registerThunk } from "../../redux/auth/operations";
import { Icon, Loader } from "../index";
import { registerSchema } from "../../schemas";

import s from "./RegisterForm.module.css";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const [showPass, setShowPass] = useState<boolean>(false);
  const passVisibility = (): void => {
    setShowPass((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(registerSchema) });
  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      navigate("/recommended");
    } catch {
      toast.error("User with such mail is already exist. Please, try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.input_wrapper}>
        <input
          {...register("name")}
          className={`${s.input_auth} ${errors.name ? s.input_auth_error : ""}`}
        />
        <p className={s.placeholder}>Name:</p>
        <p className={s.input_error}>{errors.name?.message}</p>
        {errors.name && <Icon id="error" size={18} className={s.icon_error} />}
      </div>
      <div className={s.input_wrapper}>
        <input
          {...register("email")}
          className={`${s.input_auth} ${
            errors.email ? s.input_auth_error : ""
          }`}
        />
        <p className={s.placeholder}>Mail:</p>
        <p className={s.input_error}>{errors.email?.message}</p>
        {errors.email && <Icon id="error" size={18} className={s.icon_error} />}
      </div>

      <div className={s.input_wrapper}>
        <input
          type={showPass ? "text" : "password"}
          {...register("password")}
          className={`${s.input_auth_password} ${
            errors.password ? s.input_auth_error : ""
          }`}
        />
        <p className={s.placeholder}>Password:</p>
        <p className={s.input_error}>{errors.password?.message}</p>
        <button type="button" className={s.btn_eye} onClick={passVisibility}>
          {showPass ? (
            <Icon id="open-eye" size={18} />
          ) : (
            <Icon id="close-eye" size={18} />
          )}
        </button>
        {errors.password && (
          <Icon id="error" size={18} className={s.icon_error_pass} />
        )}
      </div>

      <div className={s.btn_wrapper}>
        <button type="submit" className={s.btn_submit}>
          Registration
          {isLoading && <Loader size={12} />}
        </button>
        <NavLink to="/login" className={s.navlink}>
          Already have an account?
        </NavLink>
      </div>
    </form>
  );
};
