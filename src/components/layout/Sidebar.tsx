import React from 'react';
import {
  Home, Wallet, Coins, Dice5, HelpCircle, Settings,
  ChevronDown, ChevronRight, LogOut, User, CreditCard,
  Trophy, Gift, Gamepad2, BarChart2, Users as UsersIcon, Video
} from 'lucide-react';
import tucanLogo from '../../assets/tucan.png';

interface SidebarProps {
  sidebarOpen: boolean;
  activeSubmenu: string | null;
  toggleSubmenu: (menu: string) => void;
  onNavigate: (page: string) => void;
  walletAddress?: string;
  disconnectWallet?: () => void;
  setShowWalletModal?: (show: boolean) => void;
  currentPage?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  activeSubmenu,
  toggleSubmenu,
  onNavigate,
  walletAddress,
  disconnectWallet,
  setShowWalletModal,
  currentPage
}) => {
  
  // Helper function to determine button classes
  const getButtonClass = (pageName: string) => {
    const baseClass = "w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] text-white";
    if (currentPage === pageName) {
      return `${baseClass} bg-gray-800`;
    }
    return `${baseClass} hover:bg-gray-800`;
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 relative z-50 bg-gray-900">
          <div className="flex items-center relative z-50">
            <div className="relative z-50">
              <div className="flex items-center mb-2">
                <img src={tucanLogo} alt="TucanBIT" className="w-16 h-16 rounded-lg -mr-1" />
                <span className="text-2xl font-bold text-white"><span className="text-[#36CFC9]">Tucan</span><span className="text-[#36CFC9]">Bit</span></span>
              </div>
              <p className="text-xs text-gray-400 mt-1 relative z-50">Crypto Casino & Sportsbook</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <button onClick={() => onNavigate('home')} className={getButtonClass('home')}>
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button onClick={() => onNavigate('casino')} className={getButtonClass('casino')}>
            <Dice5 className="w-5 h-5" />
            <span>Casino</span>
          </button>
          {/* <button onClick={() => onNavigate('live-casino')} className={getButtonClass('live-casino')}>
            <Video className="w-5 h-5" />
            <span>Live Casino</span>
          </button> */}
          <button onClick={() => onNavigate('sports')} className={getButtonClass('sports')}>
            <Trophy className="w-5 h-5" />
            <span>Sports</span>
          </button>
          <button onClick={() => onNavigate('lootboxes')} className={getButtonClass('lootboxes')}>
            <Gift className="w-5 h-5" />
            <span>Lootboxes</span>
          </button>

          {/* Games Submenu */}
          <div>
            <button onClick={() => toggleSubmenu('games')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#2A1B4F] text-white">
              <div className="flex items-center space-x-3"><Gamepad2 className="w-5 h-5" /><span>Games</span></div>
              {activeSubmenu === 'games' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {activeSubmenu === 'games' && (
              <div className="pl-10 pt-2 space-y-2">
                <button onClick={() => onNavigate('slots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white"><Dice5 className="w-4 h-4" /><span>Slots</span></button>
                <button onClick={() => onNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white"><BarChart2 className="w-4 h-4" /><span>Table Games</span></button>
             
             
              </div>
            )}
          </div>
          <button onClick={() => onNavigate('promotions')} className={getButtonClass('promotions')}>
            <Gift className="w-5 h-5" />
            <span>Promotions</span>
          </button>

          {/* Wallet Submenu */}
          <div>
            <button onClick={() => toggleSubmenu('wallet')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#2A1B4F] text-white">
              <div className="flex items-center space-x-3"><Wallet className="w-5 h-5" /><span>Wallet</span></div>
              {activeSubmenu === 'wallet' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {activeSubmenu === 'wallet' && (
              <div className="pl-10 pt-2 space-y-2">
                <button onClick={() => onNavigate('deposit')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white"><CreditCard className="w-4 h-4" /><span>Deposit</span></button>
                <button onClick={() => onNavigate('withdraw')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white"><Coins className="w-4 h-4" /><span>Withdraw</span></button>
              </div>
            )}
          </div>



          <button onClick={() => onNavigate('tournaments')} className={getButtonClass('tournaments')}>
            <Trophy className="w-5 h-5" />
            <span>Tournaments</span>
          </button>
          <button onClick={() => onNavigate('earn')} className={getButtonClass('earn')}>
            <Coins className="w-5 h-5" />
            <span>Earn</span>
          </button>
          <button onClick={() => onNavigate('task-dashboard')} className={getButtonClass('task-dashboard')}>
            <BarChart2 className="w-5 h-5" />
            <span>Task Dashboard</span>
          </button>

          <button onClick={() => onNavigate('support')} className={getButtonClass('support')}>
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </button>
          <button onClick={() => onNavigate('community')} className={getButtonClass('community')}>
            <UsersIcon className="w-5 h-5" />
            <span>Community</span>
          </button>
          <button onClick={() => onNavigate('settings')} className={getButtonClass('settings')}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          
        </nav>

        {/* User Profile / Wallet */}
        <div className="p-4 border-t border-gray-800">
          {walletAddress ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
              <div className="flex-1"><p className="text-sm font-medium text-white truncate">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p><button onClick={() => disconnectWallet?.()} className="text-xs text-orange-400 hover:text-orange-300">Disconnect</button></div>
            </div>
          ) : (
            <button onClick={() => setShowWalletModal?.(true)} className="w-full bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-[#2d153f] hover:to-[#2bb8b2] transition-all">
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
