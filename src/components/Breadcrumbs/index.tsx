import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { chevronRightIcon } from '../../assets';
import s from './style.module.scss';

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  console.log(location, params);

  return (
    <div className={s.breadcrumbsWrapper}>
      <span
        className={`${s.link} ${location.pathname === '/' && params.size === 0 ? s.selected : ''}`}
        onClick={() => (params.size === 0 ? navigate('/') : null)}
      >
        Products
      </span>
      {location.pathname !== '/' ? (
        <>
          <img src={chevronRightIcon} alt="arrow" />
          <span className={`${s.link} ${s.selected}`}>{location.pathname.split('/').pop()}</span>
        </>
      ) : location.pathname === '/' && params.size > 0 ? (
        <>
          {params.get('category') ? (
            <>
              <img src={chevronRightIcon} alt="arrow" />
              <span className={`${s.link} ${s.selected}`}>{params.get('category')}</span>
            </>
          ) : null}
          {params.get('query') ? (
            <>
              {!params.get('category') ? <img src={chevronRightIcon} alt="arrow" /> : null}
              <span className={`${s.link} ${s.selected}`}>
                {params.get('category') ? ', ' : null}
                {params.get('query')}
              </span>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Breadcrumbs;
