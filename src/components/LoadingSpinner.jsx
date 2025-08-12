import React from 'react';

export const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-8 w-8';
      case 'xl': return 'h-12 w-12';
      default: return 'h-6 w-6';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'white': return 'text-white';
      case 'gray': return 'text-gray-600';
      case 'green': return 'text-green-600';
      case 'red': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${getSizeClass()} ${getColorClass()} animate-spin`}>
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
};

export const LoadingButton = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${props.className} relative transition-all duration-200 ${
        loading ? 'cursor-not-allowed opacity-70' : ''
      }`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

export const LoadingOverlay = ({ loading, children }) => {
  return (
    <div className="relative">
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner size="lg" />
            <span className="text-sm text-gray-600 font-medium">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
