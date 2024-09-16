import Img1 from "../../assets/images/emoji/book-emoji@1x.png";
import Img2 from "../../assets/images/emoji/book-emoji@2x.png";

import s from "./NoBooks.module.css";

export const NoBooks = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <div className={s.emoji_wrapper}>
        <img
          srcSet={`${Img1} 1x, ${Img2} 2x`}
          alt="Book emoji"
          className={s.emoji}
        />
      </div>
      <p className={s.description}>
        To start training, add
        <span className={s.accent}> some of your books </span> or from the
        recommended ones
      </p>
    </div>
  );
};
