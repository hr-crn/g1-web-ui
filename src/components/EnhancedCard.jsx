import React from 'react';

export const EnhancedCard = ({
  children,
  hover = true,
  clickable = false,
  gradient = false,
  className = '',
  onClick,
  ...props
}) => {
  const getCardStyles = () => {
    let baseStyles = "bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 ease-in-out";
    
    if (gradient) {
      baseStyles = "bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 transition-all duration-300 ease-in-out";
    }

    if (hover) {
      baseStyles += " hover:shadow-xl hover:-translate-y-1";
    }

    if (clickable) {
      baseStyles += " cursor-pointer hover:shadow-2xl transform active:scale-98";
    }

    return baseStyles;
  };

  return (
    <div
      {...props}
      onClick={onClick}
      className={`${getCardStyles()} ${className}`}
    >
      {children}
    </div>
  );
};

export const EnhancedCardHeader = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const getHeaderStyles = () => {
    switch (variant) {
      case 'gradient':
        return "bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl";
      case 'subtle':
        return "bg-gray-50 border-b border-gray-200 p-6 rounded-t-xl";
      default:
        return "p-6 border-b border-gray-200";
    }
  };

  return (
    <div {...props} className={`${getHeaderStyles()} ${className}`}>
      {children}
    </div>
  );
};

export const EnhancedCardBody = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div {...props} className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const EnhancedCardFooter = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div {...props} className={`p-6 pt-0 border-t border-gray-200 bg-gray-50 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
};

// Stats Card Component
export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  className = '',
}) => {
  const getColorStyles = () => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          accent: 'bg-green-600'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          icon: 'text-red-600',
          accent: 'bg-red-600'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          icon: 'text-yellow-600',
          accent: 'bg-yellow-600'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          accent: 'bg-purple-600'
        };
      default:
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          accent: 'bg-blue-600'
        };
    }
  };

  const colors = getColorStyles();

  return (
    <EnhancedCard hover className={`relative overflow-hidden ${className}`}>
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent}`} />
      
      <EnhancedCardBody>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {trend && (
              <div className={`flex items-center text-sm ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                <span className="font-medium">{trendValue}</span>
                <span className="ml-1">vs last month</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={`${colors.bg} p-3 rounded-full`}>
              <Icon className={`h-8 w-8 ${colors.icon}`} />
            </div>
          )}
        </div>
      </EnhancedCardBody>
    </EnhancedCard>
  );
};

export default EnhancedCard;
