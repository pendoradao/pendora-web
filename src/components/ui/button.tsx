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
  return (
    <button
      ref={ref}
      className={clsx(
        // have to do this wired thing or color will not be applied
        // 'bg-primary-600 bg-secondary-600 bg-success-600 bg-info-600 bg-warning-600 bg-danger-600', 
        // 'hover:bg-primary-700 hover:bg-secondary-700 hover:bg-success-700 hover:bg-info-700 hover:bg-warning-700 hover:bg-danger-700',
        // 'hover:bg-primary-100 hover:bg-secondary-100 hover:bg-success-100 hover:bg-info-100 hover:bg-warning-100 hover:bg-danger-100',
        // 'border-primary-200 border-secondary-200 border-success-200 border-info-200 border-warning-200 border-danger-200',
        // 'text-primary-500 text-secondary-500 text-success-500 text-info-500 text-warning-500 text-danger-500',
        !outline && !light && `bg-${variant}-600 border text-white`,
        !outline && !light && !disabled && `hover:bg-${variant}-700`,
        outline && !light && `border border-${variant}-200 text-${variant}-500`,
        outline && !light && !disabled && `hover:bg-${variant}-100`,
        light && 'border-none !shadow-none text-primary-500 hover:text-primary-700',
        (icon || loading) && 'flex items-center justify-center space-x-1.5 shrink-0',
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
