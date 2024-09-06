import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Icon } from "../index";
import { loginSchema } from "../../schemas";

import s from "./LoginForm.module.css";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const passVisibility = (): void => {
    setShowPass((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    try {
      console.log(data);
      toast.success("Log in success.");
      navigate("/recommended");
    } catch {
      toast.error("Mail or password is incorrect. Please, try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
          Log in
          {/* {isLoading && <Loader size={12} />} */}
        </button>
        <NavLink to="/register" className={s.navlink}>
          Don&#39;t have an account?
        </NavLink>
      </div>
    </form>
  );
};
