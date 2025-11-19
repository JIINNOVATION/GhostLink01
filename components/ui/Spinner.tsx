
import React from 'react';

const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin rounded-full border-4 border-gray-600 border-t-theme-primary ${sizeClasses[size]}`}
         style={{ borderTopColor: 'var(--theme-primary)' }}>
    </div>
  );
};

export default Spinner;
