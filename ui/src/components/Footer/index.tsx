import s from './style.module.scss';

import { shopInfo } from '#consts';

type Props = {
  isShortened?: boolean;
};

const Footer = ({ isShortened = false }: Props) => {
  return (
    <footer className={s.footerWrapper}>
      {!isShortened ? (
        <>
          <hr />
          <div className={s.footerWrapperShort}>
            <div className={s.infoBlock}>
              <span className={s.title}>Service hotline</span>
              <span className={s.link}>Support and counselling via:</span>
              <span className={`${s.link} ${s.number}`}>0180 - 000000</span>
              <span className={s.link}>Mon - Fri, 9am - 5pm</span>
              <a className={`${s.link} ${s.visible}`}>Or via our contact form.</a>
            </div>
            <div className={s.infoBlock}>
              <span className={s.title}>Shop Service</span>
              <nav className={s.links}>
                {shopInfo.service.map((item, index) => {
                  return (
                    <a href={item.link} className={s.link} key={`service-${index}`}>
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
            <div className={s.infoBlock}>
              <span className={s.title}>Information</span>
              <nav className={s.links}>
                {shopInfo.information.map((item, index) => {
                  return (
                    <a href={item.link} className={s.link} key={`service-${index}`}>
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      ) : null}
      <div className={s.footerEnding}>
        <nav className={s.important}>
          {shopInfo.direct.map((item, index) => {
            return (
              <a href={item.link} className={s.link} key={`direct-link-${index}`}>
                {item.label}
              </a>
            );
          })}
        </nav>
        <span className={s.vat}>
          * All prices incl. VAT plus&nbsp;<span className={s.accent}>shipping costs</span>&nbsp;and
          possible delivery charges, if not stated otherwise.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
