import s from './style.module.scss';
import { PageWrapper, Navbar, Footer, Input, Button } from '../../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB_User } from '../../consts';
import toast from 'react-hot-toast';
import userRegister from '../../api/userRegister.ts';
import { validateRegistrationPassword } from '../../functions';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState<DB_User>({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  });
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
            placeholder='Login'
            type={'text'}
            callbackOnChange
            callback={(v) => setCreds({ ...creds, login: v.trim() })}
          />
          <div className={s.row}>
            <Input
              placeholder='First name'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, firstName: v.trim() })}
            />
            <Input
              placeholder='Last name'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, lastName: v.trim() })}
            />
          </div>
          <div className={s.row}>
            <Input
              placeholder='Password'
              type={'password'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, password: v.trim() })}
            />
            <Input
              placeholder='Password'
              type={'password'}
              callbackOnChange
              callback={(v) => setPassR(v.trim())}
            />
          </div>
          <div className={s.row}>
            <Input
              placeholder='Street'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, street: v.trim() })}
            />
            <Input
              placeholder='City'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, city: v.trim() })}
            />
          </div>
          <div className={s.row}>
            <Input
              placeholder='State'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, state: v.trim() })}
            />
            <Input
              placeholder='Country'
              type={'text'}
              callbackOnChange
              callback={(v) => setCreds({ ...creds, country: v.trim() })}
            />
          </div>
          <Input
            placeholder='Zip'
            type={'text'}
            callbackOnChange
            callback={(v) => setCreds({ ...creds, zip: v.trim() })}
          />
          <Button label={'Register'} callback={handleRegister} />
        </section>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  function handleRegister() {
    if (
      !creds.login ||
      !creds.firstName ||
      !creds.lastName ||
      !creds.street ||
      !creds.city ||
      !creds.state ||
      !creds.country ||
      !creds.zip ||
      !passR
    ) {
      return toast.error('Please fill all the fields');
    }

    validateRegistrationPassword(creds.password, passR)
      .then(async () => {
        await userRegister(creds)
          .then((res) => {
            if (res) {
              toast.success(res.message);
              setTimeout(() => {
                navigate('/');
              }, 3000);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
};

export default RegisterPage;
