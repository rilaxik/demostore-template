import s from './style.module.scss';
import { PageWrapper, Navbar, Footer, Input, Button } from '../../components';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { userLogin } from '../../api';
import { useNavigate } from 'react-router-dom';
import { sessionStore } from '../../consts';
import { UsersLoginSchema, UsersLoginType } from '@ecommerce/shared/types';

const LoginPage = () => {
  const navigate = useNavigate();
  const [setLoggedIn] = sessionStore((state) => [state.updLoggedIn]);
  const creds: React.MutableRefObject<UsersLoginType> = useRef({});

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
            callback={(v) => (creds.current.email = v.trim())}
          />
          <Input
            placeholder='Password'
            type={'password'}
            callbackOnChange
            callback={(v) => (creds.current.password = v.trim())}
          />
          <Button label={'Login'} callback={handleLogin} />
        </section>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  async function handleLogin() {
    if (!UsersLoginSchema.safeParse(creds.current).success)
      return toast.error('Please fill all the fields');

    await userLogin(creds.current)
      .then((res) => {
        if (!res.data) {
          return toast.error('The password is wrong');
        }

        setLoggedIn(res.data);
        toast.success('Logging in..');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
};

export default LoginPage;
