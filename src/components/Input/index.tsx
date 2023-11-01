import s from './style.module.scss';
import React, { useState } from 'react';

const Input = ({ placeholder, icon, isIconFilled, width, callback }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <search className={s.searchbar}>
      <input
        style={!width ? { width: '20rem' } : { width: width }}
        type="text"
        onChange={(e) => handleSearchChange(e)}
        onKeyDown={(e) => handleSearch(e)}
        placeholder={placeholder}
      />
      <div
        className={`${s.iconWrapper} ${isIconFilled ? s.filled : ''}`}
        onClick={() => handleSearch()}
      >
        <img src={icon} alt="icon" />
      </div>
    </search>
  );

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value.trim());
  }

  function handleSearch(e?: React.KeyboardEvent<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const prompt: string = e?.target.value.trim() | searchValue.trim();
    if (prompt === '') return;
    if (e) {
      if (e.key !== 'Enter') return;
      callback(searchValue);
    } else {
      callback(searchValue);
    }
  }
};

export default Input;

type Props = {
  placeholder: string;
  icon: string;
  isIconFilled?: boolean;
  width?: string;
  callback: (value: string) => void;
};
