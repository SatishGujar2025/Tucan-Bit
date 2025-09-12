import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Wallet, Coins, Dice5, HelpCircle, Settings,
  ChevronDown, ChevronRight, LogOut, User, CreditCard,
  Trophy, Gift, Gamepad2, BarChart2, Users as UsersIcon, Video,
  Spade, Circle, Scale, Zap, Crown, ArrowDownToLine, ArrowUpFromLine,
  MessageCircle, Shield, FileText, Package
} from 'lucide-react';
import tucanLogo from '../../assets/tucan.png';



interface SidebarProps {
  isActive:boolean;
  sidebarOpen: boolean;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  activeSubmenu: string | null;
  toggleSubmenu: (menu: string, event?: React.MouseEvent) => void;
  handleLinkClick: () => void;
  isSportsPage: boolean;
  walletAddress?: string;
  disconnectWallet?: () => void;
  setShowWalletModal?: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isActive,
  sidebarOpen,
  sidebarExpanded,
  setSidebarExpanded,
  activeSubmenu,
  toggleSubmenu,
  handleLinkClick,
  isSportsPage,
  walletAddress,
  disconnectWallet,
  setShowWalletModal,
}) => {
  


  return (
    <div className={`fixed inset-y-0 left-0 z-[60] h-[90dvh] mt-[auto] w-[216px] bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800 `}>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo */}
        {/* <div className="p-6 border-b border-gray-800 relative z-50 bg-gray-900">
          <div className="flex items-center relative z-50">
            <div className="relative z-50">
              <div className="flex items-center mb-2">
                <img src={tucanLogo} alt="TucanBIT" className="w-16 h-16 rounded-lg -mr-1" />
                <span className="text-2xl font-bold text-white"><span className="text-[#36CFC9]">Tucan</span><span className="text-[#36CFC9]">Bit</span></span>
              </div>
              <p className="text-xs text-gray-400 mt-1 relative z-50">Crypto Casino & Sportsbook</p>
            </div>
          </div>
        </div> */}

        {/* Main Menu */}
     <nav className="flex-1 overflow-y-auto scrollbar-none py-4 space-y-1">

          <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] transition-colors relative ${isActive ? "text-white font-semibold" : "text-white hover:bg-gray-800"}`}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] rounded-full shadow-[0_-4px_12px_rgba(156,66,245,0.8),0_4px_12px_rgba(156,66,245,0.8),4px_0_12px_rgba(156,66,245,0.8)] pointer-events-none z-0" />
                )}
                <Home className={`w-5 h-5 ${isActive ? "text-[#9C42F5]" : ""}`} />
                <span className={isActive ? "bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] bg-clip-text text-transparent" : ""}>Home</span>
              </>
            )}
          </NavLink>
          <NavLink to="/casino" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] transition-colors relative ${isActive ? "text-white font-semibold" : "text-white hover:bg-gray-800"}`}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] rounded-full shadow-[0_-4px_12px_rgba(156,66,245,0.8),0_4px_12px_rgba(156,66,245,0.8),4px_0_12px_rgba(156,66,245,0.8)] pointer-events-none z-0" />
                )}
                <Dice5 className={`w-5 h-5 ${isActive ? "text-[#9C42F5]" : ""}`} />
                <span className={isActive ? "bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] bg-clip-text text-transparent" : ""}>Casino</span>
              </>
            )}
          </NavLink>
          <NavLink to="/sports" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] transition-colors relative ${isActive ? "text-white font-semibold" : "text-white hover:bg-gray-800"}`}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] rounded-full shadow-[0_-4px_12px_rgba(156,66,245,0.8),0_4px_12px_rgba(156,66,245,0.8),4px_0_12px_rgba(156,66,245,0.8)] pointer-events-none z-0" />
                )}
                <Trophy className={`w-5 h-5 ${isActive ? "text-[#9C42F5]" : ""}`} />
                <span className={isActive ? "bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] bg-clip-text text-transparent" : ""}>Sports</span>
              </>
            )}
          </NavLink>
          <NavLink to="/lootboxes" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] transition-colors relative ${isActive ? "text-white font-semibold" : "text-white hover:bg-gray-800"}`}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] rounded-full shadow-[0_-4px_12px_rgba(156,66,245,0.8),0_4px_12px_rgba(156,66,245,0.8),4px_0_12px_rgba(156,66,245,0.8)] pointer-events-none z-0" />
                )}
                <Gift className={`w-5 h-5 ${isActive ? "text-[#9C42F5]" : ""}`} />
                <span className={isActive ? "bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] bg-clip-text text-transparent" : ""}>Lootboxes</span>
              </>
            )}
          </NavLink>

          {/* Games Submenu */}
          <div>
            <button onClick={(e) => toggleSubmenu("games", e)} className={`${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"} p-3 rounded-lg hover:bg-gray-800 text-white`}>
              <div className="flex items-center ${sidebarOpen ? 'space-x-3' : sidebarExpanded ? 'space-x-3' : 'justify-center'}">
                <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                  <Gamepad2 className="w-5 h-5 flex-shrink-0 text-white" />
                </span>
                <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Games</span>
              </div>
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}>
                {activeSubmenu === "games" ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </button>
            {activeSubmenu === "games" && (
              <div className="pl-10 pt-2 space-y-2">
                <NavLink to="/slots" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <Coins className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Slots</span>
                </NavLink>
                <NavLink to="/table-games" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <Scale className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Table Games</span>
                </NavLink>
                <NavLink to="/roulette" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <Circle className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Roulette</span>
                </NavLink>
                <NavLink to="/blackjacks" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <Spade className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Blackjack</span>
                </NavLink>
                <NavLink to="/live-casino" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <Video className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Live Casino</span>
                </NavLink>
                <NavLink to="/jackpots" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <Zap className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Jackpots</span>
                </NavLink>
              </div>
            )}
          </div>
          
          {sidebarExpanded && (
            <div className="px-3 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">COMMUNITY</span>
            </div>
          )}
          
          <NavLink to="/promotions" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors relative ${isActive ? "text-white font-semibold" : "hover:bg-gray-800 text-white"}`}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] rounded-full shadow-[0_-4px_12px_rgba(156,66,245,0.8),0_4px_12px_rgba(156,66,245,0.8),4px_0_12px_rgba(156,66,245,0.8)] pointer-events-none z-0" />
                )}
                <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                  <Gift className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#9C42F5]" : "text-white"}`} />
                </span>
                <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate ${isActive ? "bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] bg-clip-text text-transparent" : ""}`}>Promotions</span>
              </>
            )}
          </NavLink>
          
          <NavLink to="/tournaments" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors relative ${isActive ? "text-white font-semibold" : "hover:bg-gray-800 text-white"}`}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] rounded-full shadow-[0_-4px_12px_rgba(156,66,245,0.8),0_4px_12px_rgba(156,66,245,0.8),4px_0_12px_rgba(156,66,245,0.8)] pointer-events-none z-0" />
                )}
                <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                  <Trophy className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#9C42F5]" : "text-white"}`} />
                </span>
                <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate ${isActive ? "bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] bg-clip-text text-transparent" : ""}`}>Tournaments</span>
              </>
            )}
          </NavLink>
          
          <NavLink to="/vip-club" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors relative ${isActive ? "text-white font-semibold" : "hover:bg-gray-800 text-white"}`}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] rounded-full shadow-[0_-4px_12px_rgba(156,66,245,0.8),0_4px_12px_rgba(156,66,245,0.8),4px_0_12px_rgba(156,66,245,0.8)] pointer-events-none z-0" />
                )}
                <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                  <Crown className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#9C42F5]" : "text-white"}`} />
                </span>
                <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate ${isActive ? "bg-gradient-to-b from-[#9C42F5] via-[#4579F5] to-[#00FFAA] bg-clip-text text-transparent" : ""}`}>Tucan Elite</span>
              </>
            )}
          </NavLink>
          
          {sidebarExpanded && (
            <div className="px-3 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">WALLET & SUPPORT</span>
            </div>
          )}
          
          <div>
            <button onClick={(e) => toggleSubmenu("wallet", e)} className={`${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"} p-3 rounded-lg hover:bg-gray-800 text-white`}>
              <div className="flex items-center ${sidebarOpen ? 'space-x-3' : sidebarExpanded ? 'space-x-3' : 'justify-center'}">
                <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                  <Wallet className="w-5 h-5 flex-shrink-0 text-white" />
                </span>
                <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Wallet</span>
              </div>
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}>
                {activeSubmenu === "wallet" ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </button>
            {activeSubmenu === "wallet" && (
              <div className="pl-10 pt-1 space-y-1">
                <NavLink to="/deposit" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <ArrowDownToLine className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Deposit</span>
                </NavLink>
                <NavLink to="/withdraw" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <ArrowUpFromLine className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Withdraw</span>
                </NavLink>
              </div>
            )}
          </div>
          
          <div>
            <button onClick={(e) => toggleSubmenu("support", e)} className={`${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"} p-3 rounded-lg hover:bg-gray-800 text-white`}>
              <div className="flex items-center ${sidebarOpen ? 'space-x-3' : sidebarExpanded ? 'space-x-3' : 'justify-center'}">
                <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                  <HelpCircle className="w-5 h-5 flex-shrink-0 text-white" />
                </span>
                <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Support</span>
              </div>
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}>
                {activeSubmenu === "support" ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </button>
            {activeSubmenu === "support" && (
              <div className="pl-10 pt-1 space-y-1">
                <NavLink to="/help" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <HelpCircle className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Help Center</span>
                </NavLink>
                <NavLink to="/contact" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <MessageCircle className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Contact Us</span>
                </NavLink>
                <NavLink to="/responsible-gaming" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <Shield className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Responsible Gaming</span>
                </NavLink>
                <NavLink to="/fairness" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <Scale className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Fairness</span>
                </NavLink>
                <NavLink to="/terms-of-service" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <FileText className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Terms of Service</span>
                </NavLink>
                <NavLink to="/privacy-policy" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white/60"}`}>
                  <span className="text-lg w-6 text-center">
                    <FileText className={`w-5 h-5 ${isActive ? "text-white" : "text-white/60"}`} />
                  </span>
                  <span>Privacy Policy</span>
                </NavLink>
              </div>
            )}
          </div>
          
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