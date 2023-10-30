import s from './style.module.scss';
import { PageWrapper, Navbar, Footer } from '../../components';
import { Outlet } from 'react-router-dom';

const ListingPage = () => {
  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar />
        <div className={s.productCardsWrapper}>
          <Outlet />
        </div>
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default ListingPage;
