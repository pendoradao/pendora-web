import clsx from 'clsx';
import type { FC } from 'react';

interface Props {
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
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
        // have to do this wired thing or color will not be applied
        // 'border-primary-100 border-t-primary-600',
        // 'border-secondary-100 border-t-secondary-600',
        // 'border-success-100 border-t-success-600',
        // 'border-info-100 border-t-info-600',
        // 'border-warning-100 border-t-warning-600',
        // 'border-danger-100 border-t-danger-600',
        color,
        sizeClass,
        'animate-spin rounded-full',
        className
      )}
    />
  );
};
