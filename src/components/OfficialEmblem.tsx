import React from 'react';

/**
 * Official Rotaract Club of Gandaki University Logo
 * Based directly on the official club emblem (racgu-official-logo.png)
 */
export const OfficialClubLogo: React.FC<{ 
  className?: string; 
  size?: number | string;
  showText?: boolean;
}> = ({ 
  className = "w-12 h-12", 
  size,
  showText = false
}) => (
  <div className={`inline-flex items-center gap-3 ${className}`}>
    <img 
      src="/assets/official/racgu-official-logo.webp"
      alt="Rotaract Club of Gandaki University"
      style={size ? { width: size, height: size } : undefined}
      className="shrink-0 object-contain max-h-full"
    />
    {showText && (
      <div className="flex flex-col text-left leading-tight">
        <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Rotaract Club
        </span>
        <span className="text-xs font-bold text-[#D91B5C] tracking-wide uppercase">
          Gandaki University
        </span>
      </div>
    )}
  </div>
);

/**
 * Official Presidential Theme Logo (RY 2026-27: "Insight to Impact")
 * Based directly on the official theme artwork (insight-to-impact.png)
 */
export const PresidentialThemeLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'full';
}> = ({ 
  className = "", 
  size = 'md',
  variant = 'full' 
}) => {
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-16 sm:h-20'
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img 
        src="/assets/official/insight-to-impact.webp"
        alt="Insight to Impact - Presidential Theme RY 2026-27"
        className={`${heights[size]} w-auto object-contain`}
      />
    </div>
  );
};
