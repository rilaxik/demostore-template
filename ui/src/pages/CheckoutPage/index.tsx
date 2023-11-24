import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { store, products } from '../../consts';
import s from './style.module.scss';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [checkout, updCheckoutUser] = store((state) => [state.checkout, state.updCheckoutUser]);
  const [tempUser, setTempUser] = useState({
    login: '',
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    country: '',
    state: ''
  });
  const [userData, setUserData] = useState({ email: '', password: '' });

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
                callback={(v) => setUserData({ ...userData, email: v })}
              />
              <CheckoutField
                title={'Your password'}
                placeholder={'pass'}
                inputType={'password'}
                isFullWidth
                callback={(v) => setUserData({ ...userData, password: v })}
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

  function handleLogin() {
    // todo add login
    console.log(userData);
  }

  function handleContinueCheckout() {
    if (allFieldsTaken(tempUser)) {
      updCheckoutUser(tempUser);
      navigate(`${checkout.id}`);
    } else {
      toast.error('Please fill all the fields to continue');
    }
  }

  // todo refactor to zod validation
  function allFieldsTaken(obj: { [key: string]: string | null | { [key: string]: string } }) {
    for (const [key, value] of Object.entries(obj)) {
      if (!value) {
        console.log(key + ' = ' + value + ' (no value)');
        return false;
      }
      if (typeof value === 'object') {
        allFieldsTaken(value);
      }
    }
    return true;
  }
};

export default CheckoutPage;
