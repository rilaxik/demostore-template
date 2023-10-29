import s from './style.module.scss';
import { Navbar, ProductCard } from '../../components';
import { products } from '../../consts';

const ListingPage = () => {
  return (
    <div className={s.listingWrapper}>
      <Navbar />
      <div className={s.productCardsWrapper}>
        {products.map((item) => {
          return (
            <ProductCard
              id={item.id}
              name={item.name}
              sizingShort={item.sizingShort}
              measurement={item.measurement}
              description={item.description}
              content={item.content}
              pricePerPiece={item.pricePerPiece}
              price={item.price}
              isInStock={item.isInStock}
              key={`product-${item.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListingPage;
