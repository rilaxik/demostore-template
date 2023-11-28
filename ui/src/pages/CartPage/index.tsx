import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { PageWrapper, Navbar, Footer, CartSummary, CartItem, Input, Warning } from '#components';
import s from './style.module.scss';
import { checkmarkIcon } from '#assets';

import { DB_Response, ProductType } from '@ecommerce/shared/types';
import { productsGetAll, productsGetMany } from '#api';
import { sessionStore, shopInfo } from '#consts';
import { isUUID } from '#functions';

const CartPage = () => {
  const navigate = useNavigate();

  const [itemsData, setItemsData] = useState<ProductType[] | undefined>();

  const [cart, incCart] = sessionStore((state) => [state.cart, state.incCart]);

  useEffect(() => {
    if (!cart.size) return;

    try {
      productsGetMany([...cart.keys()]).then((data: DB_Response<ProductType[]>) => {
        if (!data.data) return toast.error(data.message);
        setItemsData(data.data);
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  }, [cart, incCart]);

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar />
        {!cart || !cart.size ? (
          <Warning label={'Your shopping cart is empty'} />
        ) : !itemsData ? (
          <Warning label={'Products from your cart could not be found'} />
        ) : (
          <main className={s.cartWrapper}>
            <span className={s.title}>Shopping cart</span>
            <div className={s.detailsWrapper}>
              <section className={s.cartInfoWrapper}>
                <div className={s.infoTitles}>
                  <span className={s.title}>Product</span>
                  <span className={s.title}>Quantity</span>
                  <span className={s.title}>incl. VAT</span>
                  <span className={s.title}>Subtotal</span>
                </div>
                <hr />
                {itemsData.map((item: ProductType, index: number) => {
                  return (
                    <CartItem
                      image={item.image}
                      name={item.name}
                      content={item.content}
                      id={item.id}
                      price={item.price}
                      quantity={cart.get(item.id) ?? 0}
                      key={`cart-item-${index}`}
                    />
                  );
                })}
                <div className={s.cartExtras}>
                  <Input
                    placeholder={'Enter product id'}
                    icon={checkmarkIcon}
                    isIconFilled
                    width={'15rem'}
                    callback={(v) => handleNewItem(v)}
                  />
                  <a className={s.shipping} href={shopInfo.information[2].link}>
                    Shipping details
                  </a>
                </div>
              </section>

              <CartSummary hasCodeField hasButton callback={() => handleContinue()} />
            </div>
          </main>
        )}
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );

  function handleNewItem(val: string) {
    if (!isUUID(val)) return toast.error('Value is not a valid id');

    try {
      productsGetAll(val).then((data: DB_Response<ProductType[]>) => {
        if (!data.data) return toast.error(`Item with this id could not be found`);

        incCart(data.data[0].id);
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  function handleContinue() {
    navigate('/checkout');
  }
};

export default CartPage;
