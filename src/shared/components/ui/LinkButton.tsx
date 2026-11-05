import { Link, type LinkProps } from 'react-router-dom';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { buttonClasses, type ButtonVariant, type ButtonSize } from './Button';

interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = 'brand', size = 'md', icon, iconRight, className = '', children, ...props }, ref) => (
    <Link ref={ref} className={buttonClasses(variant, size, className)} {...props}>
      {icon}
      {children}
      {iconRight}
    </Link>
  ),
);
LinkButton.displayName = 'LinkButton';
