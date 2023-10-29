import s from './style.module.scss';
import { shopInfo, shopCategories, store } from '../../consts';
import { searchIcon, wishlistIcon, profileIcon, cartIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [currency] = store((state) => [state.currency]);

  return (
    <div className={s.navbarWrapper}>
      <div className={s.header}>
        <div className={s.title} onClick={handleLogoClick}>
          {shopInfo.name}
        </div>
        <div className={s.searchbar}>
          <input type="text" placeholder="search for.." />
          <img src={searchIcon} alt="search" />
        </div>
        <div className={s.personal}>
          <div className={s.iconWrapper}>
            <img src={wishlistIcon} alt="wishlist" />
          </div>
          <div className={s.iconWrapper}>
            <img src={profileIcon} alt="profile" />
          </div>
          <div className={s.iconWrapper}>
            <img src={cartIcon} alt="cart" />
          </div>
          <div className={s.money}>
            {currency}
            {shopInfo.money}
          </div>
        </div>
      </div>

      <div className={s.categories}>
        {(Object.keys(shopCategories) as Array<keyof typeof shopCategories>).map(
          (item: keyof typeof shopCategories) => {
            return (
              <div className={s.category} key={`category-${item}`}>
                {shopCategories[item]}
              </div>
            );
          }
        )}
      </div>
    </div>
  );

  function handleLogoClick() {
    navigate('/');
  }
};

export default Navbar;
