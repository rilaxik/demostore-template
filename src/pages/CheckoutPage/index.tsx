import s from './style.module.scss';
import { Footer, Navbar, PageWrapper, CartSummary, CheckoutField, Button } from '../../components';
import { store } from '../../consts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [checkout, updCheckoutUser] = store((state) => [state.checkout, state.updCheckoutUser]);
  const [tempUser, setTempUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      street: '',
      zip: '',
      city: '',
      country: '',
      state: ''
    }
  });

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isCheckout />
        <div className={s.checkoutWrapper}>
          <section className={s.personalBlock}>
            <span className={s.title}>Shipping information</span>
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
                    address: {
                      ...tempUser.address,
                      street: v
                    }
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
                    address: {
                      ...tempUser.address,
                      zip: v
                    }
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
                    address: {
                      ...tempUser.address,
                      city: v
                    }
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
                    address: {
                      ...tempUser.address,
                      country: v
                    }
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
                    address: {
                      ...tempUser.address,
                      state: v
                    }
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
          </section>
        </div>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  function handleContinueCheckout() {
    updCheckoutUser(tempUser);
    navigate(`${checkout.id}`);
  }
};

export default CheckoutPage;
