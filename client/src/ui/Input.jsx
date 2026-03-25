import React from 'react';
import { cn } from '../utils/cn';

const Input = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2 group">
      {label && (
        <label className="block text-sm font-semibold text-secondary-300 transition-colors group-hover:text-primary-400">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-5 py-3.5 bg-secondary-900 border border-secondary-700/50 rounded-2xl text-secondary-200 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-300 hover:border-secondary-600 shadow-inner',
          error && 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1.5 font-medium animate-slide-up">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;