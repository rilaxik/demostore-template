import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  PageWrapper,
  Navbar,
  Footer,
  Button,
  QuantityPanel,
  Breadcrumbs,
  Warning
} from '#components';
import s from './style.module.scss';

import { DB_Response, ProductType } from '@ecommerce/shared/types';
import { productsGetAll } from '#api';
import { sessionStore } from '#consts';

const ProductPage = () => {
  const params = useParams();

  const [item, setItem] = useState<ProductType | undefined>();

  useEffect(() => {
    try {
      productsGetAll(params.id!).then((data: DB_Response<ProductType[]>) => {
        if (!data.data) return toast.error(data.message);
        setItem(data.data[0]);
        setSelectedVariant(data.data[0].variants ? data.data[0].variants[0] : '');
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  }, [params]);

  const [currency, incCart] = sessionStore((state) => [state.currency, state.incCart]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar />
        {!item ? (
          <Warning label={'No product found '} />
        ) : (
          <>
            <Breadcrumbs />
            <div className={s.productWrapper}>
              <span className={s.title}>{item.name}</span>
              <section className={s.product}>
                <div className={s.imageWrapper}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={s.detailsWrapper}>
                  <span className={s.price}>
                    {currency}
                    {item.price}
                  </span>
                  <span className={s.info}>
                    Content:&nbsp;{item.content}&nbsp;{item.content === 1 ? 'piece' : 'pieces'}
                  </span>
                  <a className={s.vat}>Prices incl. VAT plus shipping costs</a>
                  <span className={s.info}>{item.isInStock ? 'Available' : 'Not in stock'}</span>

                  {item.variants ? (
                    <>
                      <span className={s.variantTitle}>Variants</span>
                      <div className={s.variantsWrapper}>
                        {item.variants.map((variant: string, index: number) => {
                          return (
                            <div
                              className={`${s.variant} ${
                                selectedVariant === variant ? s.selected : ''
                              }`}
                              key={`variant-${index}`}
                              onClick={() => handleSelectVariant(variant)}
                            >
                              {variant}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : null}

                  <div className={s.buttonsWrapper}>
                    <QuantityPanel id={item.id} />
                    <Button
                      label={'Add to shopping cart'}
                      isFullSize
                      callback={() => handleAddToCart(item.id)}
                    />
                  </div>
                  <span className={s.info}>Product id: {item.id}</span>
                </div>
              </section>
              <section className={s.informationWrapper}>
                <span className={s.title}>Product information</span>
                <span className={s.desc}>{item.description}</span>
                <table>
                  <tbody>
                    <tr>
                      <th>Materials</th>
                      <td>{item.material.join(', ')}</td>
                    </tr>
                    <tr>
                      <th>Sizing</th>
                      <td>{item.sizing.join(', ')}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </>
        )}
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );

  function handleSelectVariant(v: string) {
    setSelectedVariant(v);
  }

  function handleAddToCart(id: string) {
    incCart(id);
  }
};

export default ProductPage;
