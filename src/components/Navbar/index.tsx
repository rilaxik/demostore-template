import s from './style.module.scss';
import { ShopCategories, shopInfo, store } from '../../consts';
import { Button, Input } from '../';
import { cartIcon, highlightedCartIcon, profileIcon, searchIcon, wishlistIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const Navbar = ({ isCheckout }: Props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>();
  const [category, setCategory] = useState<ShopCategories>();
  const [currency, cart] = store((state) => [state.currency, state.cart]);

  useEffect(() => {
    if (category && query) {
      navigate(`/?category=${category}&query=${query}`);
    } else if (category && !query) {
      navigate(`/?category=${category}`);
    } else if (!category && query) {
      navigate(`/?query=${query}`);
    } else if (!category && !query) {
      navigate('/');
    }
  }, [category, query, navigate]);

  return isCheckout ? (
    <header className={s.header} style={{ padding: '1rem' }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={s.title} onClick={handleLogoClick}>
        {shopInfo.name}
      </div>
      <div className={s.info}>
        <span className={s.text}>Questions regarding your order?</span>
        <div className={`${s.text} ${s.bold}`}>
          <span className={s.accent}>12345-123456789</span>&nbsp; Daily from 7:30 am to 10:00 pm
        </div>
      </div>
      <Button label={'Back to shop'} isUnfilled callback={handleLogoClick} />
    </header>
  ) : (
    <header className={s.navbarWrapper}>
      <Toaster position="top-right" reverseOrder={false} />
      <nav className={s.header}>
        <div className={s.title} onClick={handleLogoClick}>
          {shopInfo.name}
        </div>
        <Input
          placeholder={'search for..'}
          icon={searchIcon}
          callback={(query) => setQuery(query.trim())}
        />
        <div className={s.personal}>
          <div className={s.iconWrapper}>
            <img src={wishlistIcon} alt="wishlist" />
          </div>
          <div className={s.iconWrapper}>
            <img src={profileIcon} alt="profile" />
          </div>
          <div className={s.iconWrapper} onClick={() => navigate('/cart')}>
            <img src={cart.size ? highlightedCartIcon : cartIcon} alt="cart" />
          </div>
          <div className={s.money}>
            {currency}
            {shopInfo.money}
          </div>
        </div>
      </nav>

      <nav className={s.categories}>{getCategories()}</nav>
    </header>
  );

  function handleLogoClick() {
    navigate('/');
  }

  function getCategories() {
    {
      return (Object.keys(ShopCategories) as Array<keyof typeof ShopCategories>).map(
        (item: keyof typeof ShopCategories) => {
          return (
            <div
              className={`${s.category} ${category === ShopCategories[item] ? s.active : ''}`}
              key={`category-${item}`}
              onClick={() =>
                category !== ShopCategories[item]
                  ? setCategory(ShopCategories[item])
                  : setCategory(undefined)
              }
            >
              {ShopCategories[item]}
            </div>
          );
        }
      );
    }
  }
};

export default Navbar;

type Props = {
  isCheckout?: boolean;
};
