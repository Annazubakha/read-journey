import { useLocation } from "react-router-dom";
import { ClockLoader } from "react-spinners";

import s from "./Loader.module.css";

interface LoaderProps {
  size: number;
}
export const Loader: React.FC<LoaderProps> = ({ size }): JSX.Element => {
  const location = useLocation();
  return (
    <div
      className={` ${
        location.pathname === "/register" || location.pathname === "/login"
          ? s.small_loader
          : s.big_loader
      }`}
    >
      <ClockLoader color={"#30B94D"} size={size} />
    </div>
  );
};
