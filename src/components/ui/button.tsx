import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { forwardRef } from 'react';

import { Spinner } from '@components/ui';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  outline?: boolean;
  light?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className = '', size = 'md', variant = 'primary', outline, light, loading, icon, children, ...rest },
  ref
) {
  const disabled = rest.disabled || loading;
  let filledColor = `bg-${variant}-600 border border-${variant}-600 text-white`
  let outlineColor = `border border-${variant}-200 text-${variant}-500`

  if (!disabled) {
    filledColor += ` hover:bg-${variant}-700`
    outlineColor += ` hover:bg-${variant}-100`
  }

  return (
    <button
      ref={ref}
      className={clsx(
        !outline && !light && filledColor,
        outline && !light && outlineColor,
        light && 'border-none !shadow-none text-primary-500 hover:text-primary-700',
        (icon || loading) && children && 'flex items-center space-x-1.5 shrink-0',
        {
          'px-2 py-0.5': size === 'sm',
          'px-3 py-1': size === 'md',
          'px-4 py-1.5': size === 'lg'
        },
        'font-bold disabled:opacity-50 shadow-sm outline-none rounded',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {
        (icon || loading) && <span className="w-5">
          {loading? <Spinner variant={variant} size='xs'/>: icon}
        </span>
      }
      <div>{children}</div>
    </button>
  );
});
