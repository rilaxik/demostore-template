import s from './style.module.scss';
import { plusIcon, minusIcon, crossIcon } from '../../assets';
import { ProductShort, store } from '../../consts';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ image, name, content, id, price, quantity }: Props) => {
  const navigate = useNavigate();
  const [currency, incCart, decCart, removeCartItem] = store((state) => [
    state.currency,
    state.incCart,
    state.decCart,
    state.removeCartItem
  ]);

  return (
    <div className={s.cartItemWrapper}>
      <div
        className={s.productInfo}
        onClick={() => {
          handleCartItemClick(id);
        }}
      >
        <img src={image} alt={name} />
        <div className={s.details}>
          <div className={`${s.detail} ${s.head}`}>{name}</div>
          <div className={s.detail}>
            Content:&nbsp;<span className={s.head}>{content}</span>
          </div>
          <div className={s.detail}>Id:&nbsp;{id}</div>
        </div>
      </div>
      <div className={s.productInfo}>
        <div className={s.buttons}>
          <div className={s.button} onClick={() => handleCartDec(id)}>
            <img src={minusIcon} alt="minus" />
          </div>
          <div className={s.button}>{quantity}</div>
          <div className={s.button} onClick={() => handleCartInc(id)}>
            <img src={plusIcon} alt="plus" />
          </div>
        </div>
      </div>
      <div className={s.productInfo}>
        {currency}
        {Math.floor(price * 0.2)}
      </div>
      <div className={`${s.productInfo} ${s.delete}`}>
        <span>
          {currency}
          {price}
        </span>
        <div className={s.iconWrapper} onClick={() => handleCartDel(id)}>
          <img src={crossIcon} alt="delete" />
        </div>
      </div>
    </div>
  );

  function handleCartDec(id: string) {
    decCart(id);
  }

  function handleCartInc(id: string) {
    incCart(id);
  }

  function handleCartDel(id: string) {
    removeCartItem(id);
  }

  function handleCartItemClick(id: string) {
    navigate(`/product/${id}`);
  }
};

export default CartItem;

type Props = {
  image: ProductShort['image'];
  name: ProductShort['name'];
  content: ProductShort['content'];
  id: ProductShort['id'];
  price: ProductShort['price'];
  quantity: number;
};
