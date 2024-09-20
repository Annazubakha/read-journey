import { useState } from "react";
import { DasboardReading, MyBook } from "../../components";
import s from "./ReadingPage.module.css";

const ReadingPage = (): JSX.Element => {
  const [isReading, setIsReading] = useState<boolean>(false);

  return (
    <div className={`container ${s.wrapper}`}>
      <DasboardReading setIsReading={setIsReading} isReading={isReading} />
      <MyBook isReading={isReading} />
    </div>
  );
};

export default ReadingPage;
