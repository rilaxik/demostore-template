import s from './style.module.scss';
import { Footer, Navbar, PageWrapper, CartSummary, CheckoutField, Button } from '../../components';
import { store, UserPrivacy } from '../../consts';

const CheckoutPage = () => {
  const [updCheckoutUser] = store((state) => [state.updCheckoutUser, state.updCheckoutBilling]);

  const tempUser: UserPrivacy = {
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
  };

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
                callback={(v) => (tempUser.firstName = v)}
              />
              <CheckoutField
                title={'Last name'}
                placeholder={'Enter last name'}
                inputType={'text'}
                isFullWidth
                callback={(v) => (tempUser.lastName = v)}
              />
            </div>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'Email address'}
                placeholder={'Enter email address'}
                inputType={'email'}
                isFullWidth
                callback={(v) => (tempUser.email = v)}
              />
            </div>
            <span className={s.subtle}>Your address</span>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'Street address'}
                placeholder={'Enter street address'}
                inputType={'text'}
                isFullWidth
                callback={(v) => (tempUser.address.street = v)}
              />
              <CheckoutField
                title={'Postal code'}
                placeholder={'Enter postal code'}
                inputType={'text'}
                isFullWidth
                callback={(v) => (tempUser.address.zip = v)}
              />
              <CheckoutField
                title={'City'}
                placeholder={'Enter city'}
                inputType={'text'}
                isFullWidth
                callback={(v) => (tempUser.address.city = v)}
              />
            </div>
            <div className={s.rowBlock}>
              <CheckoutField
                title={'Country'}
                placeholder={'Enter country'}
                inputType={'text'}
                isFullWidth
                callback={(v) => (tempUser.address.country = v)}
              />
              <CheckoutField
                title={'State'}
                placeholder={'Enter state'}
                inputType={'text'}
                isFullWidth
                callback={(v) => (tempUser.address.state = v)}
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
              <Button label={'Continue'} callback={() => handleContinueCheckout(tempUser)} />
            </div>
          </section>
          <section className={s.infoBlock}>
            <CartSummary />
          </section>
        </div>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  function handleContinueCheckout(u: UserPrivacy) {
    updCheckoutUser(u);
  }
};

export default CheckoutPage;
