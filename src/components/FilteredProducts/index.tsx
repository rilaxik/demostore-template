import { products } from '../../consts';
import { ProductCard } from '../index.tsx';
import { ShopCategories, store } from '../../consts';

const FilteredProducts = ({ filter }: Props) => {
  const [searchPrompt] = store((state) => [state.searchPrompt]);

  return !filter && searchPrompt === '' ? (
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
            image={item.image}
            key={`product-${item.id}`}
          />
        );
      })}
    </>
  ) : !filter && searchPrompt !== '' ? (
    <>
      {products.map((item) => {
        const searchList = item.tags.concat(item.name.split(' '));
        return searchPrompt.split(' ').map((s) => {
          return searchList.includes(s) ? (
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
              image={item.image}
              key={`product-${item.id}`}
            />
          ) : null;
        });
      })}
    </>
  ) : filter ? (
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
            image={item.image}
            key={`product-${item.id}`}
          />
        ) : null;
      })}
    </>
  ) : null;
};

export default FilteredProducts;

type Props = {
  filter?: ShopCategories | string;
};
