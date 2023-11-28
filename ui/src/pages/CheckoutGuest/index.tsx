import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  Footer,
  Navbar,
  PageWrapper,
  CartSummary,
  CheckoutField,
  Button,
  CartItem,
  Warning
} from '#components';
import s from './style.module.scss';

import {
  DB_Response,
  ProductType,
  UserProfileSchema,
  type UserProfileType,
  UsersLoginType
} from '@ecommerce/shared/types';
import { userLogin, productsGetMany } from '#api';
import { sessionStore } from '#consts';

const CheckoutGuest = () => {
  const navigate = useNavigate();

  const [itemsData, setItemsData] = useState<ProductType[] | undefined>();

  const tempUser: React.MutableRefObject<UserProfileType> = useRef({});
  const loginData: React.MutableRefObject<UsersLoginType> = useRef({});

  const [loggedIn, updLoggedIn, checkout, updCheckoutCustomer] = sessionStore((state) => [
    state.loggedIn,
    state.updLoggedIn,
    state.checkout,
    state.updCheckoutCustomer
  ]);

  useEffect(() => {
    const { cart } = checkout;
    if (!cart.size) {
      navigate('/cart');
      return;
    }

    if (loggedIn) {
      navigate('verify');
      return;
    }

    try {
      productsGetMany([...cart.keys()]).then((data: DB_Response<ProductType[]>) => {
        if (!data.data) return toast.error(data.message);
        setItemsData(data.data);
      });
    } catch (e: any) {
      navigate('/cart');
      toast.error(e.message);
    }
  }, [checkout, loggedIn, navigate]);

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isShortened />
        {!itemsData ? (
          <Warning label={'Could not load cart items, please, refresh the page if you see this'} />
        ) : (
          <main className={s.checkoutWrapper}>
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
                  callback={(v) => (tempUser.current.firstName = v)}
                />
                <CheckoutField
                  title={'Last name'}
                  placeholder={'Enter last name'}
                  inputType={'text'}
                  isFullWidth
                  callback={(v) => (tempUser.current.lastName = v)}
                />
              </div>
              <div className={s.rowBlock}>
                <CheckoutField
                  title={'Email address'}
                  placeholder={'Enter email address'}
                  inputType={'email'}
                  isFullWidth
                  callback={(v) => (tempUser.current.email = v)}
                />
              </div>
              <span className={s.subtle}>Your address</span>
              <div className={s.rowBlock}>
                <CheckoutField
                  title={'Street address'}
                  placeholder={'Enter street address'}
                  inputType={'text'}
                  isFullWidth
                  callback={(v) => (tempUser.current.street = v)}
                />
                <CheckoutField
                  title={'Postal code'}
                  placeholder={'Enter postal code'}
                  inputType={'text'}
                  isFullWidth
                  callback={(v) => (tempUser.current.zip = v)}
                />
                <CheckoutField
                  title={'City'}
                  placeholder={'Enter city'}
                  inputType={'text'}
                  isFullWidth
                  callback={(v) => (tempUser.current.city = v)}
                />
              </div>
              <div className={s.rowBlock}>
                <CheckoutField
                  title={'Country'}
                  placeholder={'Enter country'}
                  inputType={'text'}
                  isFullWidth
                  callback={(v) => (tempUser.current.country = v)}
                />
                <CheckoutField
                  title={'State'}
                  placeholder={'Enter state'}
                  inputType={'text'}
                  isFullWidth
                  callback={(v) => (tempUser.current.state = v)}
                />
              </div>
              <span className={s.privacyWrapper}>
                Privacy
                <span className={s.text}>
                  By selecting continue you confirm that you have read our data protection
                  information and accepted our general terms and conditions. This site is protected
                  by hCaptcha and its Privacy Policy and Terms of Service apply.
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
              {itemsData.map((item: ProductType, index: number) => {
                return (
                  <CartItem
                    image={item.image}
                    name={item.name}
                    content={item.content}
                    id={item.id}
                    price={item.price}
                    quantity={checkout.cart.get(item.id) ?? 0}
                    isShortened
                    key={`cart-item-${index}`}
                  />
                );
              })}
            </section>
          </main>
        )}
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  async function handleLogin() {
    await userLogin(loginData.current)
      .then((res) => {
        if (res.status !== 200 || !res.data) return toast.error(res.message);

        updLoggedIn(res.data);
        navigate(`verify`);
        toast.success(res.message);
      })
      .catch((e: any) => {
        return toast.error(e.message);
      });
  }

  function handleContinueCheckout() {
    if (!UserProfileSchema.safeParse(tempUser.current).success)
      return toast.error('Please fill all the fields to continue');

    updCheckoutCustomer(tempUser.current);
    navigate(`verify`);
  }
};

export default CheckoutGuest;
