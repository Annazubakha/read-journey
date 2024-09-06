import Img1 from "../../assets/images/logo/logo_mobile@1x.png";
import Img2 from "../../assets/images/logo/logo_mobile@2x.png";

import s from "./AuthLogo.module.css";

export const AuthLogo = (): JSX.Element => {
  return (
    <div className={s.logo_wrapper}>
      <picture>
        <img srcSet={`${Img1} 1x, ${Img2} 2x`} alt="Logo" />
      </picture>
      <p className={s.logo_text}>Read journey</p>
    </div>
  );
};
