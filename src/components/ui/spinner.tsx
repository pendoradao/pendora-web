import clsx from 'clsx';
import type { FC } from 'react';

interface Props {
  className?: string;
  variant?: 'primary' | 'secondary' | 'success'  | 'info'  | 'warning'| 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Spinner: FC<Props> = ({ className = '', variant = 'primary', size = 'md' }) => {
  const color = `border-${variant}-100 border-t-${variant}-600`;
  const sizeClass = {
    xs: 'h-4 w-4 border-[2px]',
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-10 w-10 border-4'
  }[size];
  return (
    <div
      className={clsx(
        color,
        sizeClass,
        'animate-spin rounded-full',
        className
      )}
    />
  );
};
