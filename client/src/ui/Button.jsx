import React from 'react';
import { cn } from '../utils/cn'; // We'll create this utility

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white focus:ring-primary-500 shadow-[0_8px_20px_-6px_rgba(14,165,233,0.5)] hover:shadow-[0_12px_25px_-4px_rgba(14,165,233,0.6)]',
    secondary: 'bg-secondary-800/80 hover:bg-secondary-700 text-secondary-200 border border-secondary-700/50 backdrop-blur-sm focus:ring-secondary-500',
    success: 'bg-gradient-to-br from-success-500 to-success-600 hover:from-success-400 hover:to-success-500 text-slate-950 font-bold focus:ring-success-500 shadow-[0_8px_20px_-6px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_25px_-4px_rgba(34,197,94,0.5)]',
    warning: 'bg-gradient-to-br from-warning-400 to-warning-500 hover:from-warning-300 hover:to-warning-400 text-slate-950 font-bold focus:ring-warning-500 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)] hover:shadow-[0_12px_25px_-4px_rgba(245,158,11,0.5)]',
    danger: 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white focus:ring-red-500 shadow-[0_8px_20px_-6px_rgba(239,68,68,0.4)] hover:shadow-[0_12px_25px_-4px_rgba(239,68,68,0.5)]',
    ghost: 'bg-secondary-900/0 hover:bg-secondary-800/40 text-secondary-300 hover:text-white transition-all',
    outline: 'bg-transparent text-primary-400 border border-primary-500/30 hover:bg-primary-500/10 hover:border-primary-400 focus:ring-primary-500',
    glass: 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white backdrop-blur-md transition-all',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs rounded-xl',
    md: 'px-6 py-2.5 text-sm rounded-xl',
    lg: 'px-8 py-3.5 text-base rounded-2xl',
    xl: 'px-11 py-5 text-lg rounded-[2rem]',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;