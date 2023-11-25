import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import s from './style.module.scss';
import { PageWrapper, Footer, Navbar, CartSummary } from '../../components';
import { store } from '../../consts';
import { ShopCheckoutShipping, ShopCheckoutPayment } from '@ecommerce/shared/types';

const CheckoutFinalPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [checkout, updCheckoutBilling, updCheckoutPaid, clearCart] = store((state) => [
    state.checkout,
    state.updCheckoutBilling,
    state.updCheckoutPaid,
    state.clearCart
  ]);
  const [selectedPayment, setSelectedPayment] = useState<keyof typeof ShopCheckoutPayment>();
  const [selectedShipping, setSelectedShipping] = useState<keyof typeof ShopCheckoutShipping>();
  const [checkedPolicy, setCheckedPolicy] = useState<boolean>(false);
  useEffect(() => {
    if (params.cartId !== checkout.id) navigate('/cart');
  }, [params.cartId, checkout.id, navigate]);

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isShortened />
        <section className={s.checkoutFinalWrapper}>
          <span className={s.title}>Complete order</span>
          <div className={s.rowBlock}>
            <div className={s.rowItem}>
              <span className={s.subtle}>Terms and conditions and cancellation policy</span>
              <div className={s.policyWrapper}>
                <a href='link' className={s.link}>
                  Please note our cancellation policy.
                </a>
                <div className={s.checkboxWrapper}>
                  <input
                    type='checkbox'
                    name='policy-checkout'
                    id='policy-checkout'
                    onChange={handleCheckPolicy}
                    defaultChecked={checkedPolicy}
                  />
                  <label htmlFor='policy-checkout'>I have read and accepted the </label>
                  <a href='link' className={s.link}>
                    general terms and conditions.
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={s.rowBlock}>
            <div className={s.rowItem}>
              <span className={s.subtle}>Shipping address</span>
              <span className={s.detail}>
                {checkout.user.firstName}&nbsp;{checkout.user.lastName} <br />
                {checkout.user.street} <br />
                {checkout.user.zip},&nbsp;{checkout.user.city} <br />
                {checkout.user.state},&nbsp;{checkout.user.country}
              </span>
            </div>
          </div>
          <div className={s.rowBlock}>
            <div className={s.rowItem}>
              <span className={s.subtle}>Payment method</span>
              {(Object.keys(ShopCheckoutPayment) as Array<keyof typeof ShopCheckoutPayment>).map(
                (item: keyof typeof ShopCheckoutPayment) => {
                  return (
                    <div className={s.option} key={`payment-${item}`}>
                      <input
                        type='radio'
                        id={item}
                        name='UserBillingPayment'
                        value={item}
                        onChange={() => handleChangePayment(item)}
                      />
                      <label htmlFor={item}>{ShopCheckoutPayment[item]}</label>
                    </div>
                  );
                }
              )}
            </div>
            <div className={s.rowItem}>
              <span className={s.subtle}>Shipping method</span>
              {(Object.keys(ShopCheckoutShipping) as Array<keyof typeof ShopCheckoutShipping>).map(
                (item: keyof typeof ShopCheckoutShipping) => {
                  return (
                    <div className={s.option} key={`payment-${item}`}>
                      <input
                        type='radio'
                        id={item}
                        name='UserBillingShipping'
                        value={item}
                        onChange={() => handleChangeBilling(item)}
                      />
                      <label htmlFor={item}>{ShopCheckoutShipping[item]}</label>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className={s.completeWrapper}>
            <CartSummary hasButton callback={() => handleContinue()} />
          </div>
        </section>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );

  function handleCheckPolicy() {
    setCheckedPolicy((prevState) => !prevState);
  }

  function handleChangePayment(item: keyof typeof ShopCheckoutPayment) {
    setSelectedPayment(item);
  }

  function handleChangeBilling(item: keyof typeof ShopCheckoutShipping) {
    setSelectedShipping(item);
  }

  function handleContinue() {
    if (!selectedPayment || !selectedShipping) {
      toast.error('Please select payment and shipping types');
      return;
    }

    if (!checkedPolicy) {
      toast.error('Please get acknowledged with our policy');
      return;
    }

    // todo refactor to db
    updCheckoutBilling({
      shipping: ShopCheckoutShipping[selectedShipping],
      payment: ShopCheckoutPayment[selectedPayment]
    });
    updCheckoutPaid();
    toast.success('Your order was submitted!');
    clearCart();

    console.log(checkout);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }
};

export default CheckoutFinalPage;
