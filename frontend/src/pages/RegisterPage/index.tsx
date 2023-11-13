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
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  });
  const [pass, setPassword] = useState({ password: '', passwordR: '' });

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
              callback={(v) => setPassword({ ...pass, password: v.trim() })}
            />
            <Input
              placeholder='Password'
              type={'password'}
              callbackOnChange
              callback={(v) => setPassword({ ...pass, passwordR: v.trim() })}
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
      !pass.password ||
      !pass.passwordR
    ) {
      return toast.error('Please fill all the fields');
    }

    const { login, firstName, lastName, street, city, state, country, zip } = creds;
    validateRegistrationPassword(pass.password, pass.passwordR)
      .then(async (password: string) => {
        await userRegister(login, password, firstName, lastName, street, city, state, country, zip)
          .then((success) => {
            if (success) {
              toast.success('User was successfully registered');
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
