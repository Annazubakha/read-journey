import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon, AuthLogo, BurgerMenu } from "../index";
import { useWindowSizeHook } from "../../helpers";

import s from "./Header.module.css";

export const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const user = useSelector(selectUser);
  const location = useLocation();
  const windowSize = useWindowSizeHook().innerWidth;

  const toggleBurgerMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={s.header}>
      <AuthLogo />
      {windowSize < 768 && (
        <button className={s.btn_burger} onClick={toggleBurgerMenu}>
          <Icon id="burger" size={28} />
        </button>
      )}
      {isMobileMenuOpen && <BurgerMenu toggleBurgerMenu={toggleBurgerMenu} />}
    </header>
  );
};
