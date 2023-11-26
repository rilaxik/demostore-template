import s from './style.module.scss';
import { crossIcon } from '../../assets';
import { ProductShort, sessionStore } from '../../consts';
import { useNavigate } from 'react-router-dom';
import QuantityPanel from '../QuantityPanel';

const CartItem = ({ image, name, content, id, price, isShortened }: Props) => {
  const navigate = useNavigate();
  const [currency, removeCartItem] = sessionStore((state) => [
    state.currency,
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
          <span className={`${s.detail} ${s.head}`}>{name}</span>
          <span className={s.detail}>
            Content:&nbsp;<span className={s.head}>{content}</span>
          </span>
          <span className={s.detail}>Id:&nbsp;{id}</span>
        </div>
      </div>
      {!isShortened ? (
        <>
          <div className={s.productInfo}>
            <QuantityPanel id={id} />
          </div>
          <span className={s.productInfo}>
            {currency}
            {Math.floor(price * 0.2)}
          </span>
          <div className={`${s.productInfo} ${s.delete}`}>
            <span>
              {currency}
              {price}
            </span>
            <div className={s.iconWrapper} onClick={() => handleCartDel(id)}>
              <img src={crossIcon} alt='delete' />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );

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
  isShortened?: boolean;
};
