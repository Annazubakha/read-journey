import { useWindowSizeHook } from "../../helpers";
import { Filters, InfoBlock, QuoteBlock } from "../index";
import s from "./Dashboard.module.css";

export const Dashboard = (): JSX.Element => {
  const windowSize = useWindowSizeHook().innerWidth;
  return (
    <section className={s.wrapper}>
      <Filters />
      <InfoBlock />
      {windowSize >= 1280 && <QuoteBlock />}
    </section>
  );
};
