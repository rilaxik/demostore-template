import s from './style.module.scss';
import { Navbar, ProductCard } from '../../components';
import { products } from '../../consts/data';

const ListingPage = () => {
  return (
    <div className={s.listingWrapper}>
      <Navbar />
      <div className={s.productCardsWrapper}>
        {products.map((item) => {
          return (
            <ProductCard
              name={item.name}
              sizingShort={item.sizingShort}
              measurement={item.measurement}
              description={item.description}
              content={item.content}
              pricePerPiece={item.pricePerPiece}
              price={item.price}
              isInStock={item.isInStock}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListingPage;
