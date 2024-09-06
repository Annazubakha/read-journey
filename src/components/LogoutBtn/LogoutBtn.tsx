import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import { logoutThunk } from "../../redux/auth/operations";

import s from "./LogoutBtn.module.css";

export const LogoutBtn = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = async (): Promise<void> => {
    try {
      await dispatch(logoutThunk()).unwrap();
      toast.success("Log out success.");
      navigate("/login");
    } catch {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <button className={s.btn_logout} onClick={handleLogOut}>
      Log out
    </button>
  );
};
