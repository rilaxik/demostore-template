import s from './style.module.scss';
import { PageWrapper, Navbar, Footer, Input, Button } from '../../components';
import { useState } from 'react';

const LoginPage = () => {
  const [creds, setCreds] = useState({ login: '', pass: '' });

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isShortened />
        <section className={s.loginWrapper}>
          <div className={s.title}>Login</div>
          <Input
            placeholder='Email or login'
            type={'email'}
            callback={(v) => setCreds({ ...creds, login: v.trim() })}
          />
          <Input
            placeholder='Password'
            type={'password'}
            callback={(v) => setCreds({ ...creds, pass: v.trim() })}
          />
          <Button label={'Login'} callback={handleLogin} />
        </section>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  function handleLogin() {
    console.log(creds);
  }
};

export default LoginPage;
