import Img1 from "../../assets/images/emoji/book-emoji@1x.png";
import Img2 from "../../assets/images/emoji/book-emoji@2x.png";
import s from "./ModalFinishBook.module.css";

export const ModalFinishBook = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <img
        srcSet={`${Img1} 1x, ${Img2} 2x`}
        alt="Book emoji"
        className={s.emoji}
      />
      <h1 className={s.title}>The book is read</h1>
      <p className={s.text}>
        It was an
        <span className={s.accent}> exciting journey</span>, where each page
        revealed new horizons, and the characters became inseparable friends.
      </p>
    </div>
  );
};
