import React from 'react';
import s from './style.module.scss';

type Props = {
  label: string;
  isDisabled?: boolean;
  isFullSize?: boolean;
  isUnfilled?: boolean;
  callback: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Button = ({
  label,
  isDisabled = false,
  isFullSize = false,
  isUnfilled = false,
  callback
}: Props) => {
  return (
    <div
      className={`${isDisabled ? s.disabled : ''} ${isFullSize ? s.fullSize : ''} ${
        isUnfilled ? s.unfilled : ''
      } ${s.buttonWrapper}`}
      onClick={(e) => callback(e)}
    >
      {label}
    </div>
  );
};

export default Button;
