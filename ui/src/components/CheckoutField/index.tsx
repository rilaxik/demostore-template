import { Input } from '#components';
import s from './style.module.scss';

type Props = {
  title: string;
  placeholder: string;
  inputType: 'text' | 'email' | 'password';
  isFullWidth?: boolean;
  callback: (value: string) => void;
};

const CheckoutField = ({ title, placeholder, inputType, isFullWidth = false, callback }: Props) => {
  return (
    <div className={s.checkoutFieldWrapper} style={isFullWidth ? { width: '30rem' } : {}}>
      <span className={s.title}>{title}</span>
      <Input
        placeholder={placeholder}
        type={inputType}
        width={'100%'}
        blockStyle={{ alignSelf: 'stretch' }}
        callbackOnChange
        callback={(v) => callback(v)}
      />
    </div>
  );
};

export default CheckoutField;
