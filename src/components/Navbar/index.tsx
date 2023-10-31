import React from 'react';
import s from './style.module.scss';
import { shopInfo, ShopCategories, store } from '../../consts';
import { searchIcon, wishlistIcon, profileIcon, cartIcon, highlightedCartIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [currency, updSearchPrompt, cart] = store((state) => [
    state.currency,
    state.updSearchPrompt,
    state.cart
  ]);

  return (
    <header className={s.navbarWrapper}>
      <Toaster position="top-right" reverseOrder={false} />
      <nav className={s.header}>
        <div className={s.title} onClick={handleLogoClick}>
          {shopInfo.name}
        </div>
        <search className={s.searchbar}>
          <input type="text" onKeyDown={(e) => handleSearch(e)} placeholder="search for.." />
          <img src={searchIcon} alt="search" />
        </search>
        <div className={s.personal}>
          <div className={s.iconWrapper}>
            <img src={wishlistIcon} alt="wishlist" />
          </div>
          <div className={s.iconWrapper}>
            <img src={profileIcon} alt="profile" />
          </div>
          <div className={s.iconWrapper} onClick={() => navigate('cart')}>
            <img src={cart.size ? highlightedCartIcon : cartIcon} alt="cart" />
          </div>
          <div className={s.money}>
            {currency}
            {shopInfo.money}
          </div>
        </div>
      </nav>

      <div className={s.categories}>
        {(Object.keys(ShopCategories) as Array<keyof typeof ShopCategories>).map(
          (item: keyof typeof ShopCategories) => {
            return (
              <div
                className={s.category}
                key={`category-${item}`}
                onClick={() => handleChangeCategory(ShopCategories[item])}
              >
                {ShopCategories[item]}
              </div>
            );
          }
        )}
      </div>
    </header>
  );

  function handleLogoClick() {
    navigate('/');
  }

  function handleChangeCategory(item: ShopCategories) {
    navigate(`/category=${item}`);
    updSearchPrompt('');
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const prompt = e.target.value.trim();
    if (e.key !== 'Enter' || prompt === '') {
      return;
    }
    console.log(prompt);
    updSearchPrompt(prompt);
  }
};

export default Navbar;
