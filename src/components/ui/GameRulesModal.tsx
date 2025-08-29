import React, { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

interface GameRule {
  title: string;
  description: string;
}

interface GameRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  rules: GameRule[];
  className?: string;
}

export const GameRulesModal: React.FC<GameRulesModalProps> = ({
  isOpen,
  onClose,
  gameTitle,
  rules,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (isOpen) {
      // Trigger animation
      const timeout = setTimeout(() => setIsAnimating(true), 50);
      return () => {
        clearTimeout(timeout);
        window.removeEventListener('resize', checkMobile);
      };
    } else {
      setIsAnimating(false);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  const mobileContainerClass = `
    fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center
    transition-all duration-300 ease-out
    ${isAnimating ? 'opacity-100' : 'opacity-0'}
  `;
  
  const mobileContentClass = `
    bg-gradient-to-b from-[#510957] to-black
    rounded-t-3xl w-full max-h-[85vh] flex flex-col
    transform transition-transform duration-300 ease-out
    ${isAnimating ? 'translate-y-0' : 'translate-y-full'}
  `;
  
  const desktopContainerClass = `
    fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4
    transition-all duration-300 ease-out
    ${isAnimating ? 'opacity-100' : 'opacity-0'}
  `;
  
  const desktopContentClass = `
    bg-[linear-gradient(to_bottom_right,_#510957_10%,_black_80%)]
    rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col
    transform transition-transform duration-300 ease-out
    ${isAnimating ? 'scale-100' : 'scale-95'}
  `;

  return (
    <div className={isMobile ? mobileContainerClass : desktopContainerClass}>
      <div className={`${isMobile ? mobileContentClass : desktopContentClass} ${className}`}>
        {/* Header */}
        <div className="p-6 flex justify-between items-center sticky top-0 rounded-t">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <BookOpen size={20} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white font-[Anton]">
              {gameTitle} Rules
            </h2>
          </div>
          <button 
            onClick={handleClose} 
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-0">
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div 
                key={index}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-2 font-[Anton]">
                  {rule.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={handleClose}
            className="w-full bg-[#ED0CFF] hover:bg-[#d30ae0] text-white py-3 rounded-xl font-semibold transition-colors font-[Anton]"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
