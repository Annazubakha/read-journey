import { NavLink } from "react-router-dom";

import s from "./UserNav.module.css";

export const UserNav = (): JSX.Element => {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <NavLink
          to="/recommended"
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          Home
        </NavLink>
      </li>
      <li className={s.item}>
        <NavLink
          to="/library"
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          My library
        </NavLink>
      </li>
    </ul>
  );
};
