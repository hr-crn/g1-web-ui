import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const EnhancedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  ripple = true,
  className = '',
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (loading || props.disabled) return;

    // Create ripple effect
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        x,
        y,
        size,
        id: Date.now(),
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    if (onClick) onClick(e);
  };

  const getVariantStyles = () => {
    const baseStyles = "relative overflow-hidden font-medium transition-all duration-200 ease-in-out transform active:scale-95";
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl border border-blue-600`;
      case 'secondary':
        return `${baseStyles} bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-md hover:shadow-lg border border-gray-300`;
      case 'success':
        return `${baseStyles} bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl border border-green-600`;
      case 'danger':
        return `${baseStyles} bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl border border-red-600`;
      case 'outline':
        return `${baseStyles} bg-transparent hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400`;
      default:
        return baseStyles;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm rounded-md';
      case 'lg':
        return 'px-6 py-3 text-lg rounded-lg';
      case 'xl':
        return 'px-8 py-4 text-xl rounded-xl';
      default:
        return 'px-4 py-2 text-base rounded-lg';
    }
  };

  const isDisabled = loading || props.disabled;

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${isDisabled ? 'opacity-50 cursor-not-allowed transform-none' : 'hover:-translate-y-0.5'}
        ${className}
      `}
    >
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <LoadingSpinner size="sm" color="white" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="h-5 w-5" />}
            <span>{children}</span>
            {Icon && iconPosition === 'right' && <Icon className="h-5 w-5" />}
          </>
        )}
      </div>
    </button>
  );
};

export default EnhancedButton;
