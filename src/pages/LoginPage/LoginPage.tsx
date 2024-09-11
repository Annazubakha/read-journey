import { AuthLogo, LoginForm, MainBanner, Title } from "../../components";

import s from "./LoginPage.module.css";

const LoginPage = (): JSX.Element => {
  return (
    <div className={`container_auth ${s.wrapper_main}`}>
      <div className={s.wrapper}>
        <AuthLogo />
        <Title />
        <LoginForm />
      </div>
      <MainBanner />
    </div>
  );
};

export default LoginPage;
