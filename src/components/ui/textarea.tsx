import { ComponentProps, forwardRef, useId } from 'react';

// import { FieldError } from './Form';

interface Props extends ComponentProps<'textarea'> {
  label?: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function TextArea({ label, className, ...props }, ref) {
  const id = useId();

  return (
    <label htmlFor={id}>
      {label && <div className="label">{label}</div>}
      <textarea
        id={id}
        className={`w-full px-1 py-1 rounded border border-zinc-300 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 focus:border-primary-500 focus:ring-primary-400 ${className}`}
        ref={ref}
        {...props}
        />
      {/* {props.name && <FieldError name={props.name} />} */}
    </label>
  );
});
