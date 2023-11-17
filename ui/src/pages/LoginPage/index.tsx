import s from './style.module.scss';
import { PageWrapper, Navbar, Footer, Input, Button } from '../../components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { userLogin } from '../../api';
import { useNavigate } from 'react-router-dom';
import { DB_Response, store } from '../../consts';

const LoginPage = () => {
  const navigate = useNavigate();
  const [setLoggedIn] = store((state) => [state.updLoggedIn]);
  const [creds, setCreds] = useState({ login: '', pass: '' });

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isShortened />
        <section className={s.loginWrapper}>
          <span className={s.title}>Login</span>
          <span className={s.navigation} onClick={() => navigate('/register')}>
            I want to register
          </span>
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

  async function handleLogin() {
    if (!creds.login || !creds.pass) return toast.error('Please fill all the fields');

    await userLogin(creds.login, creds.pass)
      .then((res: DB_Response<boolean>) => {
        if (!res.data) {
          return toast.error('The password is wrong');
        } else {
          toast.success('Logging in..');
          setLoggedIn(creds.login);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
};

export default LoginPage;
