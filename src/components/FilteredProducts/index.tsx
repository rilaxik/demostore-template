import { products } from '../../consts';
import { ProductCard } from '../index.tsx';
import { ShopCategories } from '../../consts';

const FilteredProducts = ({ filter }: Props) => {
  return !filter ? (
    <>
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
    </>
  ) : (
    <>
      {products.map((item) => {
        return item.tags.includes(filter) ? (
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
        ) : null;
      })}
    </>
  );
};

export default FilteredProducts;

type Props = {
  filter?: ShopCategories;
};
