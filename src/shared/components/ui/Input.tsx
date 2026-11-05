import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, hint, id, className = '', ...props }, ref) => {
  return (
    <div className="grid gap-1.5">
      {label && (
        <label htmlFor={id} className="text-[0.88rem] font-bold">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`h-11 w-full rounded-xl border-[1.5px] border-line-2 bg-paper px-3.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-brand focus:shadow-[0_0_0_4px_rgba(31,79,224,0.18)] dark:bg-navy dark:text-white ${className}`}
        {...props}
      />
      {hint && !error && <span className="text-[0.8rem] text-muted">{hint}</span>}
      {error && <span className="text-[0.82rem] font-semibold text-bad">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, id, className = '', rows = 4, ...props }, ref) => {
  return (
    <div className="grid gap-1.5">
      {label && (
        <label htmlFor={id} className="text-[0.88rem] font-bold">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`w-full rounded-xl border-[1.5px] border-line-2 bg-paper px-3.5 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-brand focus:shadow-[0_0_0_4px_rgba(31,79,224,0.18)] dark:bg-navy dark:text-white ${className}`}
        {...props}
      />
      {error && <span className="text-[0.82rem] font-semibold text-bad">{error}</span>}
    </div>
  );
});
Textarea.displayName = 'Textarea';
