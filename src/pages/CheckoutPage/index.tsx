import s from './style.module.scss';
import { Footer, Navbar, PageWrapper } from '../../components';

const CheckoutPage = () => {
  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar isCheckout />
        <div className={s.checkoutWrapper}></div>
      </PageWrapper>
      <Footer isShortened />
    </PageWrapper>
  );
};

export default CheckoutPage;
