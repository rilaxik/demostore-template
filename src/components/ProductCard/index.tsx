import s from './style.module.scss';
import image from '../../assets/Example Product.png';
import { Button } from '../../components';
import { store, shopInfo, ProductShort } from '../../consts';

const ProductCard = ({
  id,
  name,
  sizingShort,
  measurement,
  description,
  content,
  pricePerPiece,
  price,
  isInStock
}: ProductShort) => {
  return (
    <div className={s.productCardWrapper}>
      <div className={s.topContent}>
        <div className={s.imageWrapper}>
          <img src={image} alt="product" />
        </div>
        <div className={s.title}>
          <div className={s.name}>{name}</div>
          {sizingShort && measurement ? (
            <div className={s.detail}>
              {sizingShort}&nbsp;{measurement}
            </div>
          ) : null}
        </div>
      </div>
      <div className={s.descriptionWrapper}>
        <div className={s.description}>{description}</div>
        <div className={s.content}>
          <span>Content:&nbsp;</span>
          {content}&nbsp;{content === 1 ? 'unit' : 'units'}{' '}
          {content > 1 && pricePerPiece ? `(${shopInfo.currency}${pricePerPiece}/per unit)` : null}
        </div>
        <div className={s.other}>
          Variants from&nbsp;
          <span>
            {shopInfo.currency}
            {Math.floor(price * 0.9)}*
          </span>
        </div>
      </div>
      <div className={s.buy}>
        <div className={s.price}>
          {shopInfo.currency}
          {price}*
        </div>
        <Button
          label="Add to shopping cart"
          isFullSize
          isDisabled={!isInStock}
          callback={() => handleButtonClick()}
        />
      </div>
    </div>
  );
};

export default ProductCard;
