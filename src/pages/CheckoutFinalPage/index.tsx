import s from './style.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { PageWrapper, Footer, Navbar, CartSummary } from '../../components';
import { store, UserBillingPayment, UserBillingShipping } from '../../consts';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutFinalPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [checkout, updCheckoutBilling, updCheckoutPaid, clearCart] = store((state) => [
    state.checkout,
    state.updCheckoutBilling,
    state.updCheckoutPaid,
    state.clearCart
  ]);
  const [selectedPayment, setSelectedPayment] = useState<keyof typeof UserBillingPayment>();
  const [selectedShipping, setSelectedShipping] = useState<keyof typeof UserBillingShipping>();

  useEffect(() => {
    if (params.cartId !== checkout.id) navigate('/cart');
  }, [params.cartId, checkout.id, navigate]);

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isCheckout />
        <section className={s.checkoutFinalWrapper}>
          <span className={s.title}>Complete order</span>
          <div className={s.rowBlock}>
            <div className={s.rowItem}>
              <span className={s.subtle}>Terms and conditions and cancellation policy</span>
            </div>
          </div>
          <div className={s.rowBlock}>
            <div className={s.rowItem}>
              <span className={s.subtle}>Shipping address</span>
              <span className={s.detail}>
                {checkout.user.firstName}&nbsp;{checkout.user.lastName} <br />
                {checkout.user.address.street} <br />
                {checkout.user.address.zip},&nbsp;{checkout.user.address.city} <br />
                {checkout.user.address.state},&nbsp;{checkout.user.address.country}
              </span>
            </div>
          </div>
          <div className={s.rowBlock}>
            <div className={s.rowItem}>
              <span className={s.subtle}>Payment method</span>
              {(Object.keys(UserBillingPayment) as Array<keyof typeof UserBillingPayment>).map(
                (item: keyof typeof UserBillingPayment) => {
                  return (
                    <div className={s.option} key={`payment-${item}`}>
                      <input
                        type="radio"
                        id={item}
                        name="UserBillingPayment"
                        value={item}
                        onChange={() => handleChangePayment(item)}
                      />
                      <label htmlFor={item}>{UserBillingPayment[item]}</label>
                    </div>
                  );
                }
              )}
            </div>
            <div className={s.rowItem}>
              <span className={s.subtle}>Shipping method</span>
              {(Object.keys(UserBillingShipping) as Array<keyof typeof UserBillingShipping>).map(
                (item: keyof typeof UserBillingShipping) => {
                  return (
                    <div className={s.option} key={`payment-${item}`}>
                      <input
                        type="radio"
                        id={item}
                        name="UserBillingShipping"
                        value={item}
                        onChange={() => handleChangeBilling(item)}
                      />
                      <label htmlFor={item}>{UserBillingShipping[item]}</label>
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

  function handleChangePayment(item: keyof typeof UserBillingPayment) {
    setSelectedPayment(item);
  }

  function handleChangeBilling(item: keyof typeof UserBillingShipping) {
    setSelectedShipping(item);
  }

  function handleContinue() {
    if (!selectedPayment || !selectedShipping) {
      toast.error('Please select payment and shipping types');
      return;
    }

    updCheckoutBilling({
      shipping: UserBillingShipping[selectedShipping],
      payment: UserBillingPayment[selectedPayment]
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
