import { PageWrapper, Navbar, Footer, CartSummary, CartItem, Input } from '../../components';
import s from './style.module.scss';
import { store, products, shopInfo } from '../../consts';
import { checkmarkIcon, infoIcon } from '../../assets';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [cart, incCart] = store((state) => [state.cart, state.incCart]);

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar />
        {!cart || !cart.size ? (
          <div className={s.warningWrapper}>
            <div className={s.iconWrapper}>
              <img src={infoIcon} alt="(i)" />
            </div>
            <span className={s.message}>Your shopping cart is empty</span>
          </div>
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
                {Array.from(cart.keys()).map((id) => {
                  return (
                    <CartItem
                      image={products[id].image}
                      name={products[id].name}
                      content={products[id].content}
                      id={id}
                      price={products[id].price}
                      quantity={cart.get(id) ?? 0}
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

              <CartSummary isCartPage />
            </div>
          </main>
        )}
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );

  function handleNewItem(val: string) {
    if (Object.prototype.hasOwnProperty.call(products, val)) {
      incCart(val);
    } else {
      toast.error(`Item ${val} could not be found`);
    }
  }
};

export default CartPage;
