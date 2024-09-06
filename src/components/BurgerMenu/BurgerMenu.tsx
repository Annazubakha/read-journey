import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/slice";
import { Icon, LogoutBtn, UserNav } from "../index";

import s from "./BurgerMenu.module.css";

export interface BurgerMenuProps {
  toggleBurgerMenu: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  toggleBurgerMenu,
}): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.backdrop}>
      <div className={s.menu}>
        <button onClick={toggleBurgerMenu} className={s.btn_close}>
          <Icon id="close" size={28} />
        </button>
        <UserNav />
        {isLoggedIn && <LogoutBtn />}
      </div>
    </div>
  );
};
