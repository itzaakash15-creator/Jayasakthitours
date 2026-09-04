import React from 'react';
import { Link } from 'react-router-dom';
import { LiquidButton, LiquidButtonProps } from './LiquidButton';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'whatsapp' | 'ghost' | 'liquid';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  liquid?: boolean;
  children: React.ReactNode;
}

export { LiquidButton };
export type { LiquidButtonProps };

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  external,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  liquid,
  children,
  className = '',
  ...props
}) => {
  if (liquid || variant === 'liquid') {
    return (
      <LiquidButton
        to={to}
        href={href}
        external={external}
        size={size}
        fullWidth={fullWidth}
        className={className}
        {...props}
      >
        {children}
      </LiquidButton>
    );
  }
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold shadow-sm',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-brand-sky-600 via-brand-sky-500 to-brand-teal-600 hover:from-brand-sky-700 hover:to-brand-teal-700 hover:brightness-105 text-white shadow-soft hover:shadow-soft-lg focus:ring-brand-sky-500',
    secondary:
      'bg-brand-sky-50 text-brand-sky-800 hover:bg-brand-sky-100 hover:text-brand-sky-900 border border-brand-sky-200/80 hover:border-brand-sky-300 hover:shadow-xs focus:ring-brand-sky-400',
    outline:
      'bg-white/80 hover:bg-slate-50 text-brand-navy-800 border border-slate-200 hover:border-brand-sky-300 shadow-sm hover:shadow-soft focus:ring-slate-400',
    gold:
      'bg-gradient-to-r from-brand-gold-600 to-brand-gold-500 hover:from-brand-gold-700 hover:to-brand-gold-600 hover:brightness-105 text-white shadow-gold-glow hover:shadow-soft-lg focus:ring-brand-gold-400',
    whatsapp:
      'bg-[#25D366] hover:bg-[#20bd5a] hover:brightness-105 text-white shadow-md hover:shadow-lg focus:ring-[#25D366]',
    ghost:
      'text-brand-navy-700 hover:bg-slate-100 hover:text-brand-sky-700 focus:ring-slate-300',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
