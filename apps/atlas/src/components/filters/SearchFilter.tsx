import React, { useEffect, useState } from 'react';

interface SearchFilterProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  defaultValue?: string;
}

export function SearchFilter(props: SearchFilterProps) {
  const [value, setValue] = useState(props.defaultValue ?? '');

  useEffect(() => {
    setValue(props.defaultValue ?? '');
  }, [props.defaultValue]);

  function doSubmit() {
    if (!props.onSubmit) {
      return;
    }
    props.onSubmit(value);
  }

  return (
    <div className="flex items-center justify-center gap-1 px-2 py-1 rounded shadow-inner bg-black/10">
      <input
        className="w-full px-3 py-2 text-sm font-bold leading-tight tracking-widest text-white uppercase transition-all duration-300 rounded shadow-md appearance-none h-9 focus:outline-none bg-gray-800/40 hover:bg-gray-300/20"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            doSubmit();
          }
        }}
        placeholder={props.placeholder ?? ''}
      />

      <button
        className="flex items-center justify-center p-2 transition-all duration-300 rounded cursor-pointer h-9 hover:bg-gray-300/20"
        onClick={doSubmit}
      >
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_566_2495)">
            <path
              d="M5.95833 10.6472C8.35157 10.6472 10.2917 8.70713 10.2917 6.31389C10.2917 3.92066 8.35157 1.98056 5.95833 1.98056C3.5651 1.98056 1.625 3.92066 1.625 6.31389C1.625 8.70713 3.5651 10.6472 5.95833 10.6472Z"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.3748 11.7305L9.01855 9.3743"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_566_2495">
              <rect
                width="13"
                height="13"
                fill="white"
                transform="translate(0 0.35556)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}
