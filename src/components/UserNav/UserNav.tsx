import { NavLink } from "react-router-dom";

import s from "./UserNav.module.css";

export const UserNav = (): JSX.Element => {
  return (
    <ul className={s.list}>
      <li>
        <NavLink to="/recommended">Home</NavLink>
      </li>
      <li>
        <NavLink to="/library">My library</NavLink>
      </li>
    </ul>
  );
};
