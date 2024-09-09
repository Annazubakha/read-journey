import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon, AuthLogo, BurgerMenu, LogoutBtn, UserNav } from "../index";
import { convertUserName, useWindowSizeHook } from "../../helpers";

import s from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/slice";
import { selectIsLoggedIn } from "../../redux/auth/slice";

export const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const location = useLocation();
  const windowSize = useWindowSizeHook().innerWidth;

  const convertedName = convertUserName(user);

  const toggleBurgerMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={s.header}>
      <AuthLogo />
      {windowSize >= 768 && <UserNav />}
      <div className={s.wrapper}>
        {isLoggedIn && <div className={s.wrapper_name}>{convertedName}</div>}
        {isLoggedIn && windowSize >= 1280 && (
          <p className={s.full_name}>{user}</p>
        )}
        {windowSize >= 768 && <LogoutBtn />}
        {windowSize < 768 && (
          <button className={s.btn_burger} onClick={toggleBurgerMenu}>
            <Icon id="burger" size={28} />
          </button>
        )}
      </div>
      {isMobileMenuOpen && <BurgerMenu toggleBurgerMenu={toggleBurgerMenu} />}
    </header>
  );
};
