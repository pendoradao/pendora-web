import type { FC, ReactNode } from 'react';

interface Props {
  title?: string;
  content?: ReactNode;
  className?: string;
}

export const Message: FC<Props> = ({ title, content, className = '' }) => {
  if (!content) {
    return null;
  }

  return (
    <div
      className={`bg-red-50 border border-red-500 border-opacity-50 p-4 space-y-1 rounded ${className}`}
    >
      {title && <h3 className="text-sm font-medium text-red-800">{title}</h3>}
      <div className="text-sm text-red-700">{content}</div>
    </div>
  );
};
