import React from 'react';

interface BadgeProps {
  variant?: 'sky' | 'teal' | 'gold' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'sky',
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium',
  };

  const variantClasses = {
    sky: 'bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60',
    teal: 'bg-brand-teal-50 text-brand-teal-700 border border-brand-teal-200/60',
    gold: 'bg-amber-50 text-amber-800 border border-amber-200/70',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    outline: 'bg-white/90 text-slate-700 border border-slate-200 shadow-2xs',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
