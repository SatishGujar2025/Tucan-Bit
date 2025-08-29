import React from 'react';
import { Info } from 'lucide-react';

interface AnimatedInfoButtonProps {
  onClick: () => void;
  className?: string;
  size?: number;
  label?: string;
}

export const AnimatedInfoButton: React.FC<AnimatedInfoButtonProps> = ({
  onClick,
  className = '',
  size = 20,
  label = 'Info'
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center gap-2 
        text-white/80 hover:text-white 
        transition-colors duration-200
        group
        ${className}
      `}
      aria-label={label}
    >
      {/* Animated pulsing ring */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
        
        {/* Info icon */}
        <div className="relative bg-[#ED0CFF] rounded-full p-1 group-hover:bg-[#d30ae0] transition-colors duration-200">
          <Info size={size} className="text-white" />
        </div>
      </div>
      
      {/* Label text */}
      {label && (
        <span className="text-sm font-medium  transition-colors duration-200">
          {label}
        </span>
      )}
    </button>
  );
};
