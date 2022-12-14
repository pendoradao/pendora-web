import clsx from 'clsx';
// import dynamic from 'next/dynamic';
import type { ComponentProps, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import { FieldError } from './form';

// const HelpTooltip = dynamic(() => import('./HelpTooltip'));

interface Props extends Omit<ComponentProps<'input'>, 'prefix'> {
  label?: string;
  prefix?: string | ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  helper?: ReactNode;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, prefix, type = 'text', iconLeft, iconRight, error, className = '', helper, ...props },
  ref
) {
  const id = useId();

  const iconStyles = [
    'text-zinc-500 [&>*]:peer-focus:text-primary-500 [&>*]:h-5',
    { '!text-red-500 [&>*]:peer-focus:!text-red-500': error }
  ];

  return (
    <label className="w-full" htmlFor={id}>
      {label && (
        <div className="flex items-center mb-1 space-x-1.5">
          <div className="font-medium text-gray-800">{label}</div>
          {/* <HelpTooltip content={helper} /> */}
        </div>
      )}
      <div className="flex">
        {prefix && (
          <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 rounded-l-xl border border-r-0 border-gray-300">
            {prefix}
          </span>
        )}
        <div
          className={clsx(
            { '!border-red-500': error },
            { 'focus-within:ring-1': !error },
            {
              'opacity-60 bg-gray-500 bg-opacity-20': props.disabled
            },
            'flex items-center border rounded bg-white border-zinc-300 focus-within:border-primary-500 focus-within:ring-primary-400  w-full px-1 py-1'
          )}
        >
          <input
            id={id}
            className={clsx(
              { 'placeholder-red-500': error },
              'peer border-none outline-none bg-transparent w-full',
              className
            )}
            type={type}
            ref={ref}
            {...props}
          />
          <span tabIndex={-1} className={clsx({ 'order-first pl-3': iconLeft }, iconStyles)}>
            {iconLeft}
          </span>
          <span tabIndex={-1} className={clsx({ 'order-last pr-3': iconRight }, iconStyles)}>
            {iconRight}
          </span>
        </div>
      </div>
      {props.name && <FieldError name={props.name} />}
    </label>
  );
});
