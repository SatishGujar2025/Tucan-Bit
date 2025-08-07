import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, Gift, User, Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface MobileNavigationProps {
  onMenuToggle: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const { user } = useAppContext();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Gamepad2, label: 'Games', path: '/games' },
    { icon: Gift, label: 'Promotions', path: '/promotions' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-[#3C1A4F]/50 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'text-[#F25287] bg-[#3C1A4F]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={onMenuToggle}
          className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-400 hover:text-white"
        >
          <Menu size={20} />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNavigation; 