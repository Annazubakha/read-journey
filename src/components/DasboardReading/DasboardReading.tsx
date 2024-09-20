import { AddReading } from "../index";
import Img1 from "../../assets/images/emoji/star-emoji@1x.png";
import Img2 from "../../assets/images/emoji/star-emoji@2x.png";
import s from "./DasboardReading.module.css";

export interface Props {
  setIsReading: (value: boolean) => void;
  isReading: boolean;
}

export const DasboardReading: React.FC<Props> = ({
  setIsReading,
  isReading,
}): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <AddReading setIsReading={setIsReading} isReading={isReading} />
      <div>
        <h1 className={s.title}>Progress</h1>
        <p className={s.description}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <div className={s.emoji_container}>
          <div className={s.emoji_wrapper}>
            <img
              srcSet={`${Img1} 1x, ${Img2} 2x`}
              alt="Star emoji"
              className={s.emoji}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
