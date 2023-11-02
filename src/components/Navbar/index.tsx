import s from './style.module.scss';
import { shopInfo, ShopCategories, store } from '../../consts';
import { Button, Input } from '../';
import { searchIcon, wishlistIcon, profileIcon, cartIcon, highlightedCartIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Navbar = ({ isCheckout }: Props) => {
  const navigate = useNavigate();
  const [currency, updSearchPrompt, cart] = store((state) => [
    state.currency,
    state.updSearchPrompt,
    state.cart
  ]);

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
        <Input placeholder={'search for..'} icon={searchIcon} callback={(v) => handleSearch(v)} />
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

  function handleSearch(value: string) {
    updSearchPrompt(value);
    navigate('/');
  }
};

export default Navbar;

type Props = {
  isCheckout?: boolean;
};
