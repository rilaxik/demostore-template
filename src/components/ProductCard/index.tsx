import React from 'react';
import s from './style.module.scss';
import { Button } from '../../components';
import { store, shopInfo, ProductShort } from '../../consts';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  id,
  name,
  sizingShort,
  measurement,
  description,
  content,
  pricePerPiece,
  price,
  isInStock,
  image
}: ProductShort) => {
  const navigate = useNavigate();
  const [incCart] = store((state) => [state.incCart]);

  return (
    <div className={s.productCardWrapper} onClick={(e) => handleViewProduct(e, id)}>
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

  function handleButtonClick() {
    incCart(id);
  }

  function handleViewProduct(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
    navigate(`/product/${id}`);
    e.stopPropagation();
  }
};

export default ProductCard;
