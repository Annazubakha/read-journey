import { InfoBlock } from "../index";
import s from "./Dashboard.module.css";

export const Dashboard = (): JSX.Element => {
  return (
    <section className="container">
      <div className={s.wrapper}>
        <InfoBlock />
      </div>
    </section>
  );
};
