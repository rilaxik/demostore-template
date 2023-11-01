import { products } from '../../consts';
import { ProductCard } from '../index.tsx';
import { ShopCategories, store } from '../../consts';

const FilteredProducts = ({ filter }: Props) => {
  const [searchPrompt] = store((state) => [state.searchPrompt]);

  return !filter && searchPrompt === '' ? (
    <>
      {(Object.keys(products) as Array<never>).map((key) => {
        const item = products[key];
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
      {(Object.keys(products) as Array<keyof typeof products>).map((key) => {
        const item = products[key];
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
      {(Object.keys(products) as Array<never>).map((key) => {
        const item = products[key];
        return item.tags.includes(filter.toLowerCase()) ? (
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
