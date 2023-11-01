import s from './style.module.scss';
import { Input, Button } from '../';
import { store, discounts, products } from '../../consts';
import { checkmarkIcon } from '../../assets';
// import toast from 'react-hot-toast';
import { Discounts } from '../../consts/types.ts';
// import { useNavigate } from 'react-router-dom';

const CartSummary = ({ isCartPage }: Props) => {
  // const navigate = useNavigate();
  const [currency, cart] = store((state) => [state.currency, state.cart]);
  const total = calcTotal();

  return (
    <section className={s.summaryWrapper}>
      <div className={s.summaryCard}>
        <div className={s.title}>Summary</div>
        <div className={s.costDetails}>
          <div className={s.details}>
            <div className={s.unit}>Subtotal</div>
            <div className={s.unit}>
              {currency}
              {total}
            </div>
          </div>
          <div className={s.details}>
            <div className={s.unit}>Shipping costs</div>
            <div className={s.unit}>{currency}0.00*</div>
          </div>
          <div className={s.details}>
            <div className={s.unit}>Grand total exclusive of VAT</div>
            <div className={s.unit}>
              {currency}
              {total}
            </div>
          </div>
          <div className={s.details}>
            <div className={s.unit}>Including VAT</div>
            <div className={s.unit}>
              {currency}
              {Math.round(total * 0.2)}
            </div>
          </div>
          <hr />
          <div className={`${s.details} ${s.total}`}>
            <div className={s.unit}>Grand total</div>
            <div className={s.unit}>
              {currency}
              {Math.round(total * 0.2 + total)}
            </div>
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
    if (Object.prototype.hasOwnProperty.call(discountsObj, value)) {
      // !discountsObj[value].expired ? : toast.error('Code expired')
    }
  }

  function handleCheckout() {
    // navigate('/checkout')
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
