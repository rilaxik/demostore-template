import s from './style.module.scss';
import { Navbar, Footer } from '../../components';
import { Outlet } from 'react-router-dom';

const ListingPage = () => {
  return (
    <div className={s.listingWrapper}>
      <div className={s.listingWrapperShort}>
        <Navbar />
        <div className={s.productCardsWrapper}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListingPage;
