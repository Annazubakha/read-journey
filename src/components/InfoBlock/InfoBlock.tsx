import { NavLink } from "react-router-dom";
import { Icon } from "../index";
import s from "./InfoBlock.module.css";

export const InfoBlock = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Start your workout</h1>
      <div className={s.features_wrapper}>
        <div className={s.desc_wrapper}>
          <div className={s.number}>1</div>
          <p className={s.descriprion}>
            <span> Create a personal library: </span>
            add <br /> the books you intend to read <br />
            to it.
          </p>
        </div>
        <div className={s.desc_wrapper}>
          <div className={s.number}>2</div>
          <p className={s.descriprion}>
            <span> Create your first workout: </span>
            define <br /> a goal, choose a period, start <br /> training.
          </p>
        </div>
      </div>
      <NavLink to="/library" className={s.library_link}>
        My Library <Icon id="arrow-right" size={24} />
      </NavLink>
    </div>
  );
};
