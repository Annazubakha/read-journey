import { AuthLogo, RegisterForm, MainBanner, Title } from "../../components";

import s from "./RegisterPage.module.css";

const RegisterPage = (): JSX.Element => {
  return (
    <div className={`container_auth ${s.wrapper_main}`}>
      <div className={s.wrapper}>
        <AuthLogo />
        <Title />
        <RegisterForm />
      </div>
      <MainBanner />
    </div>
  );
};

export default RegisterPage;
