import s from './style.module.scss';
import { minusIcon, plusIcon } from '../../assets';
import { store } from '../../consts';

const QuantityPanel = ({ id }: Props) => {
  const [cart, incCart, decCart] = store((state) => [state.cart, state.incCart, state.decCart]);
  const quantity = cart.get(id);

  return (
    <div className={s.buttons}>
      <div className={s.button} onClick={() => handleCartDec(id)}>
        <img src={minusIcon} alt="minus" />
      </div>
      <div className={s.button}>{quantity}</div>
      <div className={s.button} onClick={() => handleCartInc(id)}>
        <img src={plusIcon} alt="plus" />
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

type Props = {
  id: string;
};
