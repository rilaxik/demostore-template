import s from './style.module.scss';
import { PageWrapper, Navbar, Footer, Input, Button } from '../../components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { validateLogin } from '../../functions';
import { useNavigate } from 'react-router-dom';
import { store } from '../../consts';

const LoginPage = () => {
  const navigate = useNavigate();
  const [setLoggedIn] = store((state) => [state.updLoggedIn]);
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
            callbackOnChange
            callback={(v) => setCreds({ ...creds, login: v.trim() })}
          />
          <Input
            placeholder='Password'
            type={'password'}
            callbackOnChange
            callback={(v) => setCreds({ ...creds, pass: v.trim() })}
          />
          <Button label={'Login'} callback={handleLogin} />
        </section>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  function handleLogin() {
    console.log();
    validateLogin(creds.login, creds.pass)
      .then((uuid) => {
        toast.success('Logging in..');
        setLoggedIn(uuid);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((e) => {
        toast.error(e);
      });
  }
};

export default LoginPage;
