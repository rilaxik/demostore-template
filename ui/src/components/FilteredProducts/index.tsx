import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { ProductCard, Warning } from '#components';

import { DB_Response, ProductType } from '@ecommerce/shared/types';
import { productsGetAll } from '#api';

const FilteredProducts = () => {
  const searchQuery = useLocation().search;

  const [products, setProducts] = useState<ProductType[] | undefined>();

  useEffect(() => {
    try {
      productsGetAll(searchQuery).then((data: DB_Response<ProductType[]>) => {
        setProducts(data.data);
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  }, [searchQuery]);

  return (
    <>
      {!products ? (
        <Warning label={'No products found'} />
      ) : (
        products.map((item: ProductType, index: number) => {
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
              key={`product-${index}`}
            />
          );
        })
      )}
    </>
  );
};

export default FilteredProducts;
