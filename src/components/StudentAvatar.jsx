import React from 'react';

const StudentAvatar = ({ 
  name, 
  size = 'md', 
  className = '',
  showTooltip = false 
}) => {
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-10 h-10 text-sm';
    }
  };

  const getColorFromName = (name) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-teal-500 to-teal-600',
    ];
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const colorClass = getColorFromName(name);
  const sizeClass = getSizeClasses();

  const avatar = (
    <div 
      className={`
        ${sizeClass} 
        bg-gradient-to-br ${colorClass} 
        rounded-full 
        flex items-center justify-center 
        text-white font-semibold 
        shadow-md hover:shadow-lg 
        transition-all duration-200 
        hover:scale-110 
        cursor-pointer
        ${className}
      `}
      title={showTooltip ? name : undefined}
    >
      {initials}
    </div>
  );

  return avatar;
};

export default StudentAvatar;
