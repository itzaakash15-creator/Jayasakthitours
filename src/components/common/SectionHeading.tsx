import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
  light = false,
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-10 md:mb-14 ${isCentered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3.5 ${
          light 
            ? 'bg-white/10 text-brand-sky-200 border border-white/15'
            : 'bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200/60'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-500 animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight leading-[1.2] mb-3.5 ${
          light ? 'text-white' : 'text-brand-navy-900'
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            light ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
