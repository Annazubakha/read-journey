import Img1 from "../../assets/images/emoji/thumb-emoji@1x.png";
import Img2 from "../../assets/images/emoji/thumb-emoji@2x.png";
import s from "./ModalAddBook.module.css";

export const ModalAddBook = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <img
        srcSet={`${Img1} 1x, ${Img2} 2x`}
        alt="Book emoji"
        className={s.emoji}
      />
      <h1 className={s.title}>Good job</h1>
      <p className={s.text}>
        Your book is now in
        <span className={s.accent}> the library! </span> The joy knows no bounds
        and now you can <br /> start your training
      </p>
    </div>
  );
};
