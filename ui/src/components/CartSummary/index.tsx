import toast from 'react-hot-toast';
import { DB_Response, ProductType } from '@ecommerce/shared/types';
import { Input, Button } from '../';
import { sessionStore } from '../../consts';
import { productsGetMany } from '../../api';
import s from './style.module.scss';
import { checkmarkIcon } from '../../assets';
import { useEffect, useState } from 'react';

const CartSummary = ({ hasCodeField, hasButton, callback }: Props) => {
  const [currency, cart, updCheckoutCart, updCheckoutDiscount] = sessionStore((state) => [
    state.currency,
    state.cart,
    state.updCheckoutCart,
    state.updCheckoutDiscount
  ]);

  const [total, setTotal] = useState<number>(-1);

  useEffect(() => {
    try {
      calcTotal().then((res) => setTotal(res));
    } catch (err: any) {
      toast.error('Unable to calculate cart summary');
      console.log(err);
    }
  }, [calcTotal, cart]);

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
      {hasCodeField ? (
        <Input
          placeholder={'Gift card or discount number'}
          icon={checkmarkIcon}
          isIconFilled
          width={'100%'}
          callback={(v) => handleDiscount(v)}
        />
      ) : null}
      {hasButton ? (
        <Button
          label={'Continue'}
          isFullSize
          callback={() => {
            if (hasCodeField) handleCheckout();
            callback();
          }}
        />
      ) : null}
    </section>
  );

  function handleDiscount(value: string) {
    if (value !== 'gift') return toast.error('Code expired');

    updCheckoutDiscount({ amount: 10, system: '%' });
    toast.success('Code redeemed successfully');
  }

  function handleCheckout() {
    updCheckoutCart(cart);
  }

  async function calcTotal(): Promise<number> {
    return await productsGetMany([...cart.keys()])
      .then((data: DB_Response<ProductType[]>) => {
        if (!data.data) {
          toast.error('Unable to calculate cart summary');
          return -1;
        }

        let sum: number = 0;
        data.data.forEach((item) => {
          sum += item.price * cart.get(item.id)!;
        });
        return Math.round(sum);
      })
      .catch(() => {
        return -1;
      });
  }
};

export default CartSummary;

type Props = {
  hasCodeField?: boolean;
  hasButton?: boolean;
  callback: () => void;
};
