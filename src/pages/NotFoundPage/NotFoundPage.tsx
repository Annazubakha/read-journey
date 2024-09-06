import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = (): JSX.Element => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Ooops...</h1>
        <p>This page doesn&#39;t exist.</p>
        <NavLink to="/recomended" className={s.return}>
          Return
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
