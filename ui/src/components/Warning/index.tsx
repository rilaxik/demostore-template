import s from './style.module.scss';
import { infoIcon } from '#assets';

type Props = {
  label: string;
};

const Warning = ({ label }: Props) => {
  return (
    <div className={s.warningWrapper}>
      <div className={s.iconWrapper}>
        <img src={infoIcon} alt='(i)' />
      </div>
      <span className={s.message}>{label}</span>
    </div>
  );
};

export default Warning;
