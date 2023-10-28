import s from './style.module.scss';

const Button = ({ label, isDisabled, isFullSize, callback }: Props) => {
  return (
    <div
      className={`${isDisabled ? s.disabled : ''} ${isFullSize ? s.fullSize : ''} ${
        s.buttonWrapper
      }`}
      onClick={callback}
    >
      {label}
    </div>
  );
};

export default Button;

type Props = {
  label: string;
  isDisabled?: boolean;
  isFullSize?: boolean;
  callback: () => void;
};
