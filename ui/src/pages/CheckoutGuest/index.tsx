import React, { useRef, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Footer,
  Navbar,
  PageWrapper,
  CartSummary,
  CheckoutField,
  Button,
  CartItem
} from '../../components';
import { sessionStore, products } from '../../consts';
import { UserProfileSchema } from '@ecommerce/shared/types';
import s from './style.module.scss';
import userLogin from '../../api/userLogin.ts';

const CheckoutGuest = () => {
  const navigate = useNavigate();
  const [updLoggedIn, checkout, updCheckoutCustomer] = sessionStore((state) => [
    state.updLoggedIn,
    state.checkout,
    state.updCheckoutCustomer
  ]);
  const [tempUser, setTempUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    country: '',
    state: ''
  });
  const loginData: React.MutableRefObject<{ email: string; password: string }> = useRef({
    email: '',
    password: ''
  });

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isShortened />
        <div className={s.checkoutWrapper}>
          <section className={s.personalBlock}>
            <span className={s.title}>Shipping information</span>
            <span className={s.subtle}>Log in to existing account</span>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'Your email address'}
                placeholder={'Email address'}
                inputType={'email'}
                isFullWidth
                callback={(v) => (loginData.current.email = v.trim())}
              />
              <CheckoutField
                title={'Your password'}
                placeholder={'pass'}
                inputType={'password'}
                isFullWidth
                callback={(v) => (loginData.current.password = v.trim())}
              />
            </div>
            <Button label={'Login'} callback={handleLogin} />
            <span className={s.subtle}>Your personal details</span>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'First name'}
                placeholder={'Enter first name'}
                inputType={'text'}
                isFullWidth
                callback={(v) => setTempUser({ ...tempUser, firstName: v })}
              />
              <CheckoutField
                title={'Last name'}
                placeholder={'Enter last name'}
                inputType={'text'}
                isFullWidth
                callback={(v) => setTempUser({ ...tempUser, lastName: v })}
              />
            </div>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'Email address'}
                placeholder={'Enter email address'}
                inputType={'email'}
                isFullWidth
                callback={(v) => setTempUser({ ...tempUser, email: v })}
              />
              <CheckoutField
                title={'Password'}
                placeholder={'Enter password'}
                inputType={'pass'}
                isFullWidth
                callback={(v) => console.log(v)}
              />
            </div>
            <span className={s.subtle}>Your address</span>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'Street address'}
                placeholder={'Enter street address'}
                inputType={'text'}
                isFullWidth
                callback={(v) =>
                  setTempUser({
                    ...tempUser,
                    street: v
                  })
                }
              />
              <CheckoutField
                title={'Postal code'}
                placeholder={'Enter postal code'}
                inputType={'text'}
                isFullWidth
                callback={(v) =>
                  setTempUser({
                    ...tempUser,
                    zip: v
                  })
                }
              />
              <CheckoutField
                title={'City'}
                placeholder={'Enter city'}
                inputType={'text'}
                isFullWidth
                callback={(v) =>
                  setTempUser({
                    ...tempUser,
                    city: v
                  })
                }
              />
            </div>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'Country'}
                placeholder={'Enter country'}
                inputType={'text'}
                isFullWidth
                callback={(v) =>
                  setTempUser({
                    ...tempUser,
                    country: v
                  })
                }
              />
              <CheckoutField
                title={'State'}
                placeholder={'Enter state'}
                inputType={'text'}
                isFullWidth
                callback={(v) =>
                  setTempUser({
                    ...tempUser,
                    state: v
                  })
                }
              />
            </div>
            <span className={s.privacyWrapper}>
              Privacy
              <span className={s.text}>
                By selecting continue you confirm that you have read our data protection information
                and accepted our general terms and conditions. This site is protected by hCaptcha
                and its Privacy Policy and Terms of Service apply.
              </span>
            </span>
            <div className={s.buttonWrapper}>
              <Button label={'Continue'} callback={() => handleContinueCheckout()} />
            </div>
          </section>
          <section className={s.infoBlock}>
            <CartSummary
              callback={() => {
                return;
              }}
            />
            {Array.from(checkout.cart.keys()).map((id) => {
              return (
                // todo refactor to db
                <CartItem
                  image={products[id].image}
                  name={products[id].name}
                  content={products[id].content}
                  id={id}
                  price={products[id].price}
                  quantity={checkout.cart.get(id) ?? 0}
                  isShortened
                />
              );
            })}
          </section>
        </div>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  async function handleLogin() {
    await userLogin(loginData.current.email, loginData.current.password)
      .then((res) => {
        if (res.status !== 200 || !res.data) return toast.error(res.message);

        updLoggedIn(res.data);
        redirect(`verify`);
        toast.success(res.message);
      })
      .catch((e: any) => {
        return toast.error(e.message);
      });
  }

  function handleContinueCheckout() {
    if (!UserProfileSchema.safeParse(tempUser).success)
      return toast.error('Please fill all the fields to continue');
    updCheckoutCustomer(tempUser);
    navigate(`verify`);
  }
};

export default CheckoutGuest;
