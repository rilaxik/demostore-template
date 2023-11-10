import s from './style.module.scss';
import { PageWrapper, Navbar, Footer, Input, Button } from '../../components';
import { useState } from 'react';

const RegisterPage = () => {
  const [creds, setCreds] = useState({ login: '', email: '', pass: '' });

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isShortened />
        <section className={s.loginWrapper}>
          <div className={s.title}>Register</div>
          <Input
            placeholder='Email'
            type={'email'}
            callback={(v) => setCreds({ ...creds, email: v.trim() })}
          />
          <Input
            placeholder='Login'
            type={'text'}
            callback={(v) => setCreds({ ...creds, login: v.trim() })}
          />
          <Input
            placeholder='Password'
            type={'password'}
            callback={(v) => setCreds({ ...creds, pass: v.trim() })}
          />
          <Button label={'Register'} callback={handleRegister} />
        </section>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  function handleRegister() {
    console.log(creds);
  }
};

export default RegisterPage;
