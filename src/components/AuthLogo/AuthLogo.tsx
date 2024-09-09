import { useSelector } from "react-redux";
import Img1 from "../../assets/images/logo/logo_mobile@1x.png";
import Img2 from "../../assets/images/logo/logo_mobile@2x.png";

import s from "./AuthLogo.module.css";
import { selectIsLoggedIn } from "../../redux/auth/slice";

export const AuthLogo = (): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={s.logo_wrapper}>
      <picture>
        <img srcSet={`${Img1} 1x, ${Img2} 2x`} alt="Logo" />
      </picture>
      <p className={isLoggedIn ? s.logo_text_loggedin : s.logo_text}>
        Read journey
      </p>
    </div>
  );
};
