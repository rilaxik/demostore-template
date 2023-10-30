import s from './style.module.scss';
import { store, products } from '../../consts';

const CartSummary = () => {
  const [currency, cart] = store((state) => [state.currency, state.cart]);

  calcTotal();

  return (
    <section className={s.summaryWrapper}>
      <div className={s.title}>Summary</div>
      <div className={s.costDetails}>
        <div className={s.details}>
          <div className={s.unit}>Subtotal</div>
          <div className={s.unit}>
            {currency}
            {calcTotal()}
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
            {calcTotal()}
          </div>
        </div>
        <div className={s.details}>
          <div className={s.unit}>Including VAT</div>
          <div className={s.unit}>
            {currency}
            {Math.round(calcTotal() * 0.2 * 100) / 100}
          </div>
        </div>
        <hr />
        <div className={`${s.details} ${s.total}`}>
          <div className={s.unit}>Grand total</div>
          <div className={s.unit}>
            {currency}
            {Math.round(calcTotal() * 0.2 * 100) / 100 + calcTotal()}
          </div>
        </div>
      </div>
    </section>
  );

  function calcTotal(): number {
    let sum: number = 0;
    cart.forEach((value, key) => {
      sum += products[key].price * value;
    });
    return sum;
  }
};

export default CartSummary;
