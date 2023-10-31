import { PageWrapper, Navbar, Footer, CartSummary, CartItem } from '../../components';
import s from './style.module.scss';
import { store, products } from '../../consts';

const CartPage = () => {
  const [cart] = store((state) => [state.cart]);

  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar />
        <main className={s.cartWrapper}>
          <span className={s.title}>Shopping cart</span>
          <div className={s.detailsWrapper}>
            <section className={s.cartInfoWrapper}>
              <div className={s.infoTitles}>
                <div className={s.title}>Product</div>
                <div className={s.title}>Quantity</div>
                <div className={s.title}>incl. VAT</div>
                <div className={s.title}>Subtotal</div>
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
            </section>
            <CartSummary />
          </div>
        </main>
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CartPage;
