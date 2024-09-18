import { DasboardReading, MyBook } from "../../components";
import s from "./ReadingPage.module.css";
const ReadingPage = (): JSX.Element => {
  return (
    <div className={`container ${s.wrapper}`}>
      <DasboardReading />
      <MyBook />
    </div>
  );
};

export default ReadingPage;
