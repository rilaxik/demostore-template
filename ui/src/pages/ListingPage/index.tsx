import { Outlet } from 'react-router-dom';

import { PageWrapper, Navbar, Breadcrumbs, Footer } from '#components';
import s from './style.module.scss';

const ListingPage = () => {
  return (
    <PageWrapper>
      <PageWrapper container>
        <Navbar />
        <Breadcrumbs />
        <main className={s.productCardsWrapper}>
          <Outlet />
        </main>
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default ListingPage;
