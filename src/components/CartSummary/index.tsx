import s from './style.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button } from '../';
import { store, discounts, products, Discounts } from '../../consts';
import { checkmarkIcon } from '../../assets';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ isCartPage }: Props) => {
  const navigate = useNavigate();
  const [currency, cart, updCheckoutCart, updCheckoutDiscount, updCheckoutId] = store((state) => [
    state.currency,
    state.cart,
    state.updCheckoutCart,
    state.updCheckoutDiscount,
    state.updCheckoutId
  ]);
  const total = calcTotal();

  return (
    <section className={s.summaryWrapper}>
      <div className={s.summaryCard}>
        <span className={s.title}>Summary</span>
        <div className={s.costDetails}>
          <div className={s.details}>
            <span className={s.unit}>Subtotal</span>
            <span className={s.unit}>
              {currency}
              {total}
            </span>
          </div>
          <div className={s.details}>
            <span className={s.unit}>Shipping costs</span>
            <span className={s.unit}>{currency}0.00*</span>
          </div>
          <div className={s.details}>
            <span className={s.unit}>Grand total exclusive of VAT</span>
            <span className={s.unit}>
              {currency}
              {total}
            </span>
          </div>
          <div className={s.details}>
            <span className={s.unit}>Including VAT</span>
            <span className={s.unit}>
              {currency}
              {Math.round(total * 0.2)}
            </span>
          </div>
          <hr />
          <div className={`${s.details} ${s.total}`}>
            <span className={s.unit}>Grand total</span>
            <span className={s.unit}>
              {currency}
              {Math.round(total * 0.2 + total)}
            </span>
          </div>
        </div>
      </div>
      {isCartPage ? (
        <>
          <Input
            placeholder={'Gift card or discount number'}
            icon={checkmarkIcon}
            isIconFilled
            width={'100%'}
            callback={(v) => handleDiscount(v, discounts)}
          />
          <Button label={'Proceed to checkout'} isFullSize callback={() => handleCheckout()} />
        </>
      ) : null}
    </section>
  );

  function handleDiscount(value: string, discountsObj: Discounts) {
    if (!Object.prototype.hasOwnProperty.call(discountsObj, value)) {
      toast.error('Code expired');
      return;
    }
    if (!discountsObj[value].expired) {
      updCheckoutDiscount(discountsObj[value]);
      toast('Code redeemed successfully');
    }
  }

  function handleCheckout() {
    updCheckoutCart(cart);
    updCheckoutId(uuidv4());
    navigate('/checkout');
  }

  function calcTotal(): number {
    let sum: number = 0;
    cart.forEach((value, key) => {
      sum += products[key].price * value;
    });
    return Math.round(sum);
  }
};

export default CartSummary;

type Props = {
  isCartPage?: boolean;
};
