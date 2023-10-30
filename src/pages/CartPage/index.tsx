import { PageWrapper, Navbar, Footer, CartSummary, CartItem } from '../../components';
import s from './style.module.scss';

const CartPage = () => {
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
              {/*<CartItem*/}
              {/*  image={'https://i.pinimg.com/564x/07/fe/fa/07fefafae63f381efe0ab4d02128cf13.jpg'}*/}
              {/*  name={'product name'}*/}
              {/*  content={100}*/}
              {/*  id={'1'}*/}
              {/*  price={2000}*/}
              {/*  quantity={2}*/}
              {/*/>*/}
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
