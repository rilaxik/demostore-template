import React, { useEffect, useRef } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import s from './style.module.scss';
import { PageWrapper, Footer, Navbar, CartSummary } from '../../components';
import { sessionStore } from '../../consts';
import { ShopCheckoutShipping, ShopCheckoutPayment } from '@ecommerce/shared/types';

const CheckoutLoggedIn = () => {
  const navigate = useNavigate();
  const [checkout, updCheckoutBilling, updCheckoutPaid, clearCart] = sessionStore((state) => [
    state.checkout,
    state.updCheckoutBilling,
    state.updCheckoutPaid,
    state.clearCart
  ]);
  const selectedPayment: React.MutableRefObject<ShopCheckoutPayment> = useRef(
    ShopCheckoutPayment.CREDIT_CARD
  );
  const selectedShipping: React.MutableRefObject<ShopCheckoutShipping> = useRef(
    ShopCheckoutShipping.STANDARD
  );
  const checkedPolicy: React.MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if (!checkout.customer) redirect('/cart');
  }, [checkout.customer]);

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
                <a href='#' className={s.link}>
                  Please note our cancellation policy.
                </a>
                <div className={s.checkboxWrapper}>
                  <input
                    type='checkbox'
                    name='policy-checkout'
                    id='policy-checkout'
                    onChange={handleCheckPolicy}
                    defaultChecked={checkedPolicy.current}
                  />
                  <label htmlFor='policy-checkout'>I have read and accepted the </label>
                  <a href='#' className={s.link}>
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
                {checkout.customer.firstName}&nbsp;{checkout.customer.lastName} <br />
                {checkout.customer.street} <br />
                {checkout.customer.zip},&nbsp;{checkout.customer.city} <br />
                {checkout.customer.state},&nbsp;{checkout.customer.country}
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
                        onChange={() => handleChangePayment(ShopCheckoutPayment[item])}
                      />
                      <label htmlFor={item}>{item}</label>
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
                        onChange={() => handleChangeBilling(ShopCheckoutShipping[item])}
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
    checkedPolicy.current = !checkedPolicy.current;
  }

  function handleChangePayment(item: ShopCheckoutPayment) {
    selectedPayment.current = item;
  }

  function handleChangeBilling(item: ShopCheckoutShipping) {
    selectedShipping.current = item;
  }

  function handleContinue() {
    if (!selectedPayment || !selectedShipping)
      return toast.error('Please select payment and shipping types');
    if (!checkedPolicy) return toast.error('Please get acknowledged with our policy');

    // todo refactor to db
    updCheckoutBilling({
      shipping: selectedShipping.current,
      payment: selectedPayment.current
    });
    updCheckoutPaid();
    clearCart();
    toast.success('Your order was submitted!');

    console.log(checkout);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }
};

export default CheckoutLoggedIn;
