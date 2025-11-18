
import * as React from 'react';

const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin rounded-full border-4 border-gray-600 border-t-pink-500 ${sizeClasses[size]}`}
         style={{ borderTopColor: '#FF69B4' }}>
    </div>
  );
};

export default Spinner;