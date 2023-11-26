import s from './style.module.scss';
import { PageWrapper, Navbar, Footer, Input, Button } from '../../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersType, UsersRegisterSchema } from '@ecommerce/shared/types';
import toast from 'react-hot-toast';
import userRegister from '../../api/userRegister.ts';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState<UsersType>({});
  const [passR, setPassR] = useState<string>('');

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isShortened />
        <section className={s.loginWrapper}>
          <span className={s.title}>Register</span>
          <span className={s.navigation} onClick={() => navigate('/login')}>
            I already have an account
          </span>
          <Input
            placeholder='Email'
            type={'email'}
            callbackOnChange
            callback={(v) => setCreds({ ...creds, email: v })}
          />
          <div className={s.row}>
            <Input
              placeholder='First name'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, firstName: v })}
            />
            <Input
              placeholder='Last name'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, lastName: v })}
            />
          </div>
          <div className={s.row}>
            <Input
              placeholder='Password'
              type={'password'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, password: v })}
            />
            <Input
              placeholder='Password'
              type={'password'}
              callbackOnChange
              callback={(v) => setPassR(v)}
            />
          </div>
          <div className={s.row}>
            <Input
              placeholder='Street'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, street: v })}
            />
            <Input
              placeholder='City'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, city: v })}
            />
          </div>
          <div className={s.row}>
            <Input
              placeholder='State'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, state: v })}
            />
            <Input
              placeholder='Country'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, country: v })}
            />
          </div>
          <Input
            placeholder='Zip'
            type={'text'}
            callbackOnChange
            callback={(v) => setCreds({ ...creds, zip: v })}
          />
          <Button label={'Register'} callback={handleRegister} />
        </section>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  async function handleRegister() {
    try {
      UsersRegisterSchema.parse(creds);
    } catch (err: any) {
      console.log(err);
      return toast.error(err.issues[0].message ?? 'Please fill all the fields');
    } finally {
      if (creds.password.trim() !== passR.trim()) toast.error('Passwords do not match');
    }

    await userRegister(creds)
      .then((res) => {
        if (res.status !== 201) return toast.error(res.message);

        toast.success(res.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
};

export default RegisterPage;
