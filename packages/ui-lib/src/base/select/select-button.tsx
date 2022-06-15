import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

const labelVariants = {
  default: 'text-white uppercase',
  placeholder: 'text-gray-400 font-medium',
};

interface Props {
  label: string;
  className?: string;
  variant?: keyof typeof labelVariants;
  icon?: ReactElement;
  labelIcon?: ReactElement;
}

export const SelectButton = ({
  label,
  className,
  variant = 'default',
  icon,
  labelIcon,
}: Props) => {
  const labelVariant = labelVariants[variant];

  return (
    <Listbox.Button
      className={twMerge(
        clsx(
          'relative w-full cursor-default rounded bg-gradient-to-t from-gray-700 via-gray-600 to-gray-600 py-3 pl-3 pr-10 text-left ring-gray-500 ring-opacity-30 transition duration-150 ease-in-out font-body tracking-widest font-semibold cursor-pointer',
          'focus:outline-none shadow-md hover:from-gray-800 hover:via-gray-600 hover:to-gray-500 focus-visible:ring-opacity-100',
          className
        )
      )}
    >
      <span
        className={clsx(
          'block truncate',
          labelVariant,
          labelIcon ? 'pl-10' : ''
        )}
      >
        {label}
      </span>
      {labelIcon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
          {labelIcon}
        </span>
      )}
      {icon && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
          {icon}
        </span>
      )}
    </Listbox.Button>
  );
};
SelectButton.displayName = 'SelectButton';
