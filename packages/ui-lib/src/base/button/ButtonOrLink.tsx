import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type {
  ComponentPropsWithRef,
  ReactElement,
  ReactNode,
  PropsWithChildren,
} from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Spinner } from '../spinner';

const STYLES = {
  icon: 'rounded-2xl bg-gray-500 border-gray-600 text-gray-200 ',
  base: 'relative inline-flex items-center justify-center tracking-veryWide outline-none select-none border text-left outline-none rounded transition duration-150 ease-in-out uppercase hover:-translate-y-1 active:translate-y-1 active:shadow-inner font-semibold',
  active:
    'focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-offset-white',
  disabled: 'disabled:opacity-70 disabled:pointer-events-none',
  size: {
    base: {
      xs: 'py-1 px-4 text-xs',
      sm: 'py-2 px-4 text-sm',
      md: 'py-2 px-4 text-md',
      lg: 'py-2 px-4 text-lg',
    },
    icon: {
      xs: 'p-1 text-xs',
      sm: 'p-2 text-sm',
      md: 'p-3 text-md',
      lg: 'p-4 text-lg',
    },
  },
  variant: {
    default:
      'text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 active:text-gray-900 hover:text-gray-900',
    attack:
      'text-red-600 bg-red-400 hover:bg-red-500 active:bg-red-300 active:text-red-900 hover:text-red-900 text-white border-red-300 hover:text-red-200',
    primary:
      'text-white bg-off-200 hover:bg-stone-400/80 focus-visible:ring-yellow-700 border-off-200 shadow-md ',
    secondary:
      'bg-gray-600 text-white border-gray-600 hover:bg-gray-400 hover:text-gray-800 active:text-gray-900  active:bg-gray-200 shadow-md ',
    tertiary:
      'text-gray-500 bg-white hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 active:text-gray-900',
    danger:
      'text-red-600 focus-visible:bg-red-100 focus-visible:ring-red-600 active:bg-red-200 hover:bg-red-100',
    link: '!p-0 font-semibold text-green-600 focus-visible:ring-transparent focus:underline hover:underline',
    outline:
      'text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 active:text-gray-900',
    unstyled: '',
  },
} as const;

export const getButtonStyles = () => STYLES;

export interface Styles {
  size?: keyof typeof STYLES['size']['base'];
  variant?: keyof typeof STYLES['variant'];
  fullWidth?: boolean;
}

export type ButtonOrLinkProps = {
  preserveRedirect?: boolean;
  replace?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  isIconButton?: boolean;
  loading?: boolean;
  loadingText?: string;
  spinner?: ReactElement;
  texture?: boolean;
} & ComponentPropsWithRef<'button'> &
  ComponentPropsWithRef<'a'> &
  Styles;

export const ButtonOrLink = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  PropsWithChildren<ButtonOrLinkProps>
>(
  (
    {
      href,
      replace = false,
      preserveRedirect = false,
      size = 'md',
      variant = 'default',
      isIconButton = false,
      fullWidth = false,
      loading = false,
      loadingText,
      spinner = <Spinner variant="circle" size="sm" />,
      className,
      texture = true,
      children,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const router = useRouter();
    const isLink = typeof href !== 'undefined';
    const ButtonOrLink = isLink ? 'a' : 'button';

    const classes =
      variant === 'unstyled'
        ? className
        : clsx(
            STYLES.base,
            STYLES.disabled,
            STYLES.active,
            isIconButton ? STYLES.icon : STYLES.variant[variant],
            isIconButton ? STYLES.size.icon[size] : STYLES.size.base[size],
            fullWidth && 'w-full'
          );

    const content = (
      <ButtonOrLink
        ref={ref}
        className={twMerge(classes, className)}
        disabled={disabled || loading}
        {...props}
      >
        {texture && (
          <img
            className={`${
              isIconButton
                ? 'rounded-2xl bg-center absolute w-full bg-cover h-full opacity-20'
                : 'bg-center absolute w-full bg-cover h-full opacity-20'
            }`}
            src="/texture-button.png"
            alt=""
          />
        )}

        {(leftIcon || loading) && (
          <span className="mr-3.5">{loading ? spinner : leftIcon}</span>
        )}
        {loading ? loadingText || children : children}
        {rightIcon && <span className="ml-3.5">{rightIcon}</span>}
      </ButtonOrLink>
    );

    if (isLink) {
      const finalHref =
        preserveRedirect && router.query.redirect
          ? `${href!}?redirect=${encodeURIComponent(
              router.query.redirect as string
            )}`
          : href!;

      return (
        <Link href={finalHref} passHref replace>
          {content}
        </Link>
      );
    }

    return content;
  }
);

ButtonOrLink.displayName = 'ButtonOrLink';
