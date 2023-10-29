import s from './style.module.scss';
import { shopInfo } from '../../consts';

const Footer = ({ isShortened }: Props) => {
  return (
    <div className={s.footerWrapper}>
      {!isShortened ? (
        <>
          <hr />
          <div className={s.footerWrapperShort}>
            <div className={s.infoBlock}>
              <div className={s.title}>Service hotline</div>
              <div className={s.link}>Support and counselling via:</div>
              <div className={`${s.link} ${s.number}`}>0180 - 000000</div>
              <div className={s.link}>Mon - Fri, 9am - 5pm</div>
              <div className={`${s.link} ${s.visible}`}>Or via our contact form.</div>
            </div>
            <div className={s.infoBlock}>
              <div className={s.title}>Shop Service</div>
              <div className={s.links}>
                {shopInfo.service.map((item, index) => {
                  return (
                    <a href={item.link} className={s.link} key={`service-${index}`}>
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className={s.infoBlock}>
              <div className={s.title}>Information</div>
              <div className={s.links}>
                {shopInfo.information.map((item, index) => {
                  return (
                    <a href={item.link} className={s.link} key={`service-${index}`}>
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className={s.footerEnding}>
        <div className={s.important}>
          {shopInfo.direct.map((item, index) => {
            return (
              <a href={item.link} className={s.link} key={`direct-link-${index}`}>
                {item.label}
              </a>
            );
          })}
        </div>
        <div className={s.vat}>
          * All prices incl. VAT plus&nbsp;<span className={s.accent}>shipping costs</span>&nbsp;and
          possible delivery charges, if not stated otherwise.
        </div>
      </div>
    </div>
  );
};

export default Footer;

type Props = {
  isShortened?: boolean;
};
