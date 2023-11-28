import s from './style.module.scss';
import { minusIcon, plusIcon } from '#assets';

import { sessionStore } from '#consts';

type Props = {
  id: string;
};

const QuantityPanel = ({ id }: Props) => {
  const [cart, incCart, decCart] = sessionStore((state) => [
    state.cart,
    state.incCart,
    state.decCart
  ]);

  const quantity = cart.get(id) || 0;

  return (
    <div className={s.buttons}>
      <div className={s.button} onClick={() => handleCartDec(id)}>
        <img src={minusIcon} alt='minus' />
      </div>
      <span className={s.button}>{quantity}</span>
      <div className={s.button} onClick={() => handleCartInc(id)}>
        <img src={plusIcon} alt='plus' />
      </div>
    </div>
  );

  function handleCartDec(id: string) {
    decCart(id);
  }

  function handleCartInc(id: string) {
    incCart(id);
  }
};

export default QuantityPanel;
