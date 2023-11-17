import { products } from '../../consts';
import { ProductCard } from '../index.tsx';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FilteredProducts = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const [c, setC] = useState<string | null>(null);
  const [q, setQ] = useState<string | null>(null);

  useEffect(() => {
    setC(null);
    setQ(null);
    searchParams.get('category') ? setC(searchParams.get('category')) : null;
    searchParams.get('query') ? setQ(searchParams.get('query')) : null;
  }, [searchParams]);

  return (
    <>
      {!searchParams.size
        ? (Object.keys(products) as Array<never>).map((key) => {
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
          })
        : (Object.keys(products) as Array<string>).map((key) => {
            const item = products[key];
            const tags = item.tags.concat(item.name.split(' '), item.material).join(' ');
            const regex =
              c && q
                ? new RegExp(`(?=.*\\b${c}\\b)(?=.*\\b${q}\\b)`, 'i')
                : c && !q
                ? new RegExp(c, 'i')
                : !c && q
                ? new RegExp(q, 'i')
                : null;
            return regex && regex.test(tags) ? (
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
  );
};

export default FilteredProducts;

// <ProductCard
//   id={item.id}
//   name={item.name}
//   sizingShort={item.sizingShort}
//   measurement={item.measurement}
//   description={item.description}
//   content={item.content}
//   pricePerPiece={item.pricePerPiece}
//   price={item.price}
//   isInStock={item.isInStock}
//   image={item.image}
//   key={`product-${item.id}`}
// />
