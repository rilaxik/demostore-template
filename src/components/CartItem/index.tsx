import s from './style.module.scss';
import { ProductShort, store } from '../../consts';

const CartItem = ({ image, name, content, id, price, quantity }: Props) => {
  const [currency] = store((state) => [state.currency]);

  return (
    <div className={s.cartItemWrapper}>
      <div className={s.productInfo}>
        <img src={image} alt={name} />
        <div className={s.details}>
          <div className={`${s.detail} ${s.head}`}>{name}</div>
          <div className={s.detail}>
            Content:&nbsp;<span className={s.head}>{content}</span>
          </div>
          <div className={s.detail}>Id:&nbsp;{id}</div>
        </div>
      </div>
      <div className={s.productInfo}>{quantity}</div>
      <div className={s.productInfo}>
        {currency}
        {Math.floor(price * 0.2 * 100) / 100}
      </div>
      <div className={s.productInfo}>
        {currency}
        {price}
      </div>
    </div>
  );
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
