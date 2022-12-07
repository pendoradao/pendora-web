import type { FC } from 'react';

interface ITextarea {
  value?: string;
  rows?: number;
  placeholder?: string;
}

export const Textarea: FC<ITextarea> = ({ value, rows, placeholder }) => {
  return (
    <textarea value={value} rows={rows} placeholder={placeholder} className='w-full border border-zinc-300 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 focus:border-brand-500 focus:ring-brand-400'></textarea>
  )
}