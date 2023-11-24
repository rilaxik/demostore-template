import s from './style.module.scss';
import { shopInfo, store } from '../../consts';
import { ShopCategoriesEnum as ShopCategories } from '@ecommerce/shared/types';
import { Button, Input } from '../';
import {
  cartIcon,
  highlightedCartIcon,
  profileIcon,
  highlightedProfileIcon,
  searchIcon,
  wishlistIcon
} from '../../assets';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const Navbar = ({ isShortened }: Props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>();
  const [category, setCategory] = useState<ShopCategories>();
  const [currency, cart, loggedIn] = store((state) => [state.currency, state.cart, state.loggedIn]);

  return isShortened ? (
    <header className={s.header} style={{ padding: '1rem' }}>
      <Toaster position='top-right' reverseOrder={false} />
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
      <Toaster position='top-right' reverseOrder={false} />
      <nav className={s.header}>
        <div className={s.title} onClick={handleLogoClick}>
          {shopInfo.name}
        </div>
        <Input
          placeholder={'search for..'}
          icon={searchIcon}
          callback={(query) => {
            setQuery(query.trim());
            handleNavigate(query.trim(), category);
          }}
        />
        <div className={s.personal}>
          <div className={s.iconWrapper}>
            <img src={wishlistIcon} alt='wishlist' />
          </div>
          <div className={s.iconWrapper} onClick={() => navigate('/login')}>
            <img src={!loggedIn ? profileIcon : highlightedProfileIcon} alt='profile' />
          </div>
          <div className={s.iconWrapper} onClick={() => navigate('/cart')}>
            <img src={cart.size ? highlightedCartIcon : cartIcon} alt='cart' />
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

  function handleNavigate(q: string | undefined, c: ShopCategories | undefined) {
    if (c && q) {
      navigate(`/?category=${c}&query=${q}`);
    } else if (c && !q) {
      navigate(`/?category=${c}`);
    } else if (!c && q) {
      navigate(`/?query=${q}`);
    } else if (!c && !q) {
      navigate('/');
    }
  }

  function getCategories() {
    {
      return (Object.keys(ShopCategories) as Array<keyof typeof ShopCategories>).map(
        (item: keyof typeof ShopCategories) => {
          return (
            <div
              className={`${s.category} ${category === ShopCategories[item] ? s.active : ''}`}
              key={`category-${item}`}
              onClick={() => {
                if (category !== ShopCategories[item]) {
                  setCategory(ShopCategories[item]);
                  handleNavigate(query, ShopCategories[item]);
                } else {
                  setCategory(undefined);
                  handleNavigate(query, undefined);
                }
              }}
            >
              {ShopCategories[item].charAt(0).toUpperCase() + ShopCategories[item].slice(1)}
            </div>
          );
        }
      );
    }
  }
};

export default Navbar;

type Props = {
  isShortened?: boolean;
};
