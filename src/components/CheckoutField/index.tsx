import s from './style.module.scss';
import { Input } from '../';

const CheckoutField = ({ title, placeholder, inputType, isFullWidth, callback }: Props) => {
  return (
    <div className={s.checkoutFieldWrapper} style={isFullWidth ? { width: '30rem' } : {}}>
      <span className={s.title}>{title}</span>
      <Input
        placeholder={placeholder}
        type={inputType}
        width={'100%'}
        blockStyle={{ alignSelf: 'stretch' }}
        callback={(v) => callback(v)}
      />
    </div>
  );
};

export default CheckoutField;

type Props = {
  title: string;
  placeholder: string;
  inputType: string;
  isFullWidth?: boolean;
  callback: (value: string) => void;
};
