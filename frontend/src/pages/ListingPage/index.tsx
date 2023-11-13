import s from './style.module.scss';
import { PageWrapper, Navbar, Breadcrumbs, Footer } from '../../components';
import { Outlet } from 'react-router-dom';

const ListingPage = () => {
  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar />
        <Breadcrumbs />
        <div className={s.productCardsWrapper}>
          <Outlet />
        </div>
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default ListingPage;
