import s from './style.module.scss';
import { Navbar, ProductCard, Footer } from '../../components';
import { products } from '../../consts';

const ListingPage = () => {
  return (
    <div className={s.listingWrapper}>
      <div className={s.listingWrapperShort}>
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
      <Footer />
    </div>
  );
};

export default ListingPage;
