import Img1 from "../../assets/images/emoji/book-emoji@1x.png";
import Img2 from "../../assets/images/emoji/book-emoji@2x.png";
import s from "./QuoteBlock.module.css";

export const QuoteBlock = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <img
        srcSet={`${Img1} 1x, ${Img2} 2x`}
        alt="Book emoji"
        className={s.emoji}
      />

      <p className={s.text}>
        "Books are
        <span className={s.accent}> windows </span>to the world, and reading is
        a journey into the unknown."
      </p>
    </div>
  );
};
