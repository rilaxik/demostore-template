import React, { useRef } from 'react';

import s from './style.module.scss';

type Props = {
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  icon?: string;
  isIconFilled?: boolean;
  width?: string;
  blockStyle?: React.CSSProperties;
  callbackOnChange?: boolean;
  callback: (value: string) => void;
};

const Input = ({
  placeholder,
  type = 'text',
  icon,
  isIconFilled = false,
  width = '20rem',
  blockStyle,
  callbackOnChange = false,
  callback
}: Props) => {
  const searchValue = useRef<string>('');

  return (
    <search className={s.searchbar} style={blockStyle}>
      <input
        style={{ width: width }}
        type={type}
        onChange={(e) => handleSearchChange(e)}
        onKeyDown={(e) => handleSearch(e)}
        placeholder={placeholder}
      />
      {icon ? (
        <div
          className={`${s.iconWrapper} ${isIconFilled ? s.filled : ''}`}
          onClick={() => handleSearch()}
        >
          <img src={icon} alt='icon' />
        </div>
      ) : null}
    </search>
  );

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    searchValue.current = e.target.value.trim();
    callbackOnChange ? callback(e.target.value.trim()) : null;
  }

  function handleSearch(e?: React.KeyboardEvent<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const prompt: string = e?.target.value.trim() | searchValue.trim();
    if (prompt === '') return;
    if (e) {
      if (e.key !== 'Enter') return;
      callback(searchValue.current);
    } else {
      callback(searchValue.current);
    }
  }
};

export default Input;
