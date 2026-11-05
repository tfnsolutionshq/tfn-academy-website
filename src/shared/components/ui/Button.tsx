import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'brand' | 'accent' | 'line' | 'ghost';
export type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const variantClasses: Record<ButtonVariant, string> = {
  brand: 'bg-gradient-to-br from-brand to-brand-light text-white shadow-md shadow-brand/30 hover:brightness-110',
  accent: 'bg-gradient-to-br from-accent to-accent-light text-navy hover:brightness-105',
  line: 'bg-transparent border-[1.5px] border-line-2 text-ink hover:border-ink dark:text-white dark:border-white/30 dark:hover:border-white',
  ghost: 'bg-transparent text-ink hover:bg-brand/10 dark:text-white',
};

export const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[0.88rem] gap-1.5',
  md: 'h-11 px-5 text-[0.95rem] gap-2',
};

export function buttonClasses(variant: ButtonVariant = 'brand', size: ButtonSize = 'md', className = ''): string {
  return `inline-flex items-center justify-center rounded-full font-bold whitespace-nowrap transition-[filter,transform] active:scale-[0.97] disabled:opacity-45 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'brand', size = 'md', icon, iconRight, className = '', children, ...props }, ref) => {
    return (
      <button ref={ref} className={buttonClasses(variant, size, className)} {...props}>
        {icon}
        {children}
        {iconRight}
      </button>
    );
  },
);
Button.displayName = 'Button';
