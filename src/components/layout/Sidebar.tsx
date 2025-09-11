import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import homeIcon from "../../assets/sidebar-logos/icons8-home-50.png";
import sportsIcon from "../../assets/sidebar-logos/icons8-jersey-50.png";
import lootboxIcon from "../../assets/sidebar-logos/icons8-open-delivered-box-50.png";
import gamesIcon from "../../assets/sidebar-logos/icons8-ps-controller-50.png";
import slotsIcon from "../../assets/sidebar-logos/icons8-slot-machine-50.png";
import rouletteIcon from "../../assets/sidebar-logos/icons8-roulette-50.png";
import blackjackIcon from "../../assets/sidebar-logos/icons8-ace-of-spades-50.png";
import liveCasinoIcon from "../../assets/sidebar-logos/icons8-video-call-50.png";
import jackpotsIcon from "../../assets/sidebar-logos/icons8-win-50.png";
import promotionsIcon from "../../assets/sidebar-logos/icons8-promotion-32.png";
import tournamentsIcon from "../../assets/sidebar-logos/icons8-trophy-50.png";
import vipIcon from "../../assets/sidebar-logos/icons8-battle-50.png";
import walletIcon from "../../assets/sidebar-logos/icons8-wallet-50.png";
import depositIcon from "../../assets/sidebar-logos/icons8-initiate-money-transfer-50.png";
import withdrawIcon from "../../assets/sidebar-logos/icons8-request-money-50.png";
import supportIcon from "../../assets/sidebar-logos/icons8-support-50.png";
import helpIcon from "../../assets/sidebar-logos/icons8-support-help-center.png";
import contactIcon from "../../assets/sidebar-logos/icons8-gmail-logo-50.png";
import responsibleIcon from "../../assets/sidebar-logos/icons8-user-shield-50.png";
import fairnessIcon from "../../assets/sidebar-logos/icons8-chessboard-50.png";
import termsIcon from "../../assets/sidebar-logos/icons8-terms-and-conditions-50.png";

interface SidebarProps {
  sidebarOpen: boolean;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  activeSubmenu: string | null;
  toggleSubmenu: (menu: string, event?: React.MouseEvent) => void;
  handleLinkClick: () => void;
  isSportsPage: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  sidebarExpanded,
  setSidebarExpanded,
  activeSubmenu,
  toggleSubmenu,
  handleLinkClick,
  isSportsPage,
}) => {
  return (
    <div className={`fixed top-16 bottom-0 left-0 z-[60] bg-black shadow-2xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-all duration-300 border-r border-gray-800 ${sidebarOpen ? "w-64" : sidebarExpanded ? "w-64" : "w-16"} max-h-screen overflow-hidden`}>
      <div className="flex flex-col h-full max-h-screen">
        <div className={`border-b border-gray-800 ${sidebarOpen ? "p-6" : sidebarExpanded ? "p-6" : "p-4"} lg:p-4`}>
          <div className={`flex items-center ${sidebarOpen ? "justify-end" : sidebarExpanded ? "justify-end" : "justify-center"}`}>
            <button
              onClick={() => {
                setSidebarExpanded(!sidebarExpanded);
                if (activeSubmenu) toggleSubmenu("");
              }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg transition-all duration-300 border border-white/30 hover:border-white/50 p-1.5 rounded-lg hidden md:block"
            >
              {sidebarExpanded ? <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" /> : <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />}
            </button>
          </div>
        </div>
        
        {isSportsPage && sidebarExpanded && (
          <>
            <div className="p-4 border-b border-gray-800">
              <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">💳</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Tucan Wallet</p>
                    <p className="text-xs text-gray-300">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-800">
              <div className="bg-gradient-to-r from-purple-950 to-purple-900 rounded-lg p-3 text-white min-h-[140px]">
                <h3 className="font-bold text-sm mb-2">BATTLEPASS</h3>
                <p className="text-xs mb-3">Get amazing rewards with Battlepass.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🪙</span>
                    <span className="text-lg">🏆</span>
                  </div>
                  <div className="text-xs">
                    <p>Levelup Rewards</p>
                    <p>Tucan Tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        <nav className={`flex-1 overflow-y-auto ${sidebarOpen ? "p-4" : sidebarExpanded ? "p-4" : "p-2"} space-y-1 min-h-0 h-full scrollbar-hide pb-20`}>
          <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
            <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
              <img src={homeIcon} alt="Home" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
            </span>
            <span className={`${sidebarOpen ? "block" : "hidden"} md:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Home</span>
          </NavLink>
          
          {sidebarExpanded && (
            <div className="px-3 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">GAMING</span>
            </div>
          )}
          
          <NavLink to="/sports" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
            <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
              <img src={sportsIcon} alt="Sports" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
            </span>
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Sports</span>
          </NavLink>
          
          <NavLink to="/lootboxes" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
            <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
              <img src={lootboxIcon} alt="Lootboxes" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
            </span>
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Lootboxes</span>
          </NavLink>
          
          <div>
            <button onClick={(e) => toggleSubmenu("games", e)} className={`${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"} p-3 rounded-lg hover:bg-gray-800 text-white`}>
              <div className="flex items-center ${sidebarOpen ? 'space-x-3' : sidebarExpanded ? 'space-x-3' : 'justify-center'}">
                <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                  <img src={gamesIcon} alt="Games" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
                </span>
                <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Games</span>
              </div>
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}>
                {activeSubmenu === "games" ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </button>
            {activeSubmenu === "games" && (
              <div className="pl-10 pt-2 space-y-2">
                <NavLink to="/slots" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <img src={slotsIcon} alt="Slots" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Slots</span>
                </NavLink>
                <NavLink to="/table-games" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <img src={fairnessIcon} alt="Table Games" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Table Games</span>
                </NavLink>
                <NavLink to="/roulette" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <img src={rouletteIcon} alt="Roulette" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Roulette</span>
                </NavLink>
                <NavLink to="/blackjacks" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <img src={blackjackIcon} alt="Blackjack" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Blackjack</span>
                </NavLink>
                <NavLink to="/live-casino" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <img src={liveCasinoIcon} alt="Live Casino" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Live Casino</span>
                </NavLink>
                <NavLink to="/jackpots" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                    <img src={jackpotsIcon} alt="Jackpots" className="w-5 h-5 filter brightness-0 invert" />
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
          
          <NavLink to="/promotions" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
            <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
              <img src={promotionsIcon} alt="Promotions" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
            </span>
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Promotions</span>
          </NavLink>
          
          <NavLink to="/tournaments" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
            <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
              <img src={tournamentsIcon} alt="Tournaments" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
            </span>
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Tournaments</span>
          </NavLink>
          
          <NavLink to="/vip-club" onClick={handleLinkClick} className={({ isActive }) => `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
            <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
              <img src={vipIcon} alt="Tucan Elite" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
            </span>
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Tucan Elite</span>
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
                  <img src={walletIcon} alt="Wallet" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
                </span>
                <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Wallet</span>
              </div>
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}>
                {activeSubmenu === "wallet" ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </button>
            {activeSubmenu === "wallet" && (
              <div className="pl-10 pt-1 space-y-1">
                <NavLink to="/deposit" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">
                    <img src={depositIcon} alt="Deposit" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Deposit</span>
                </NavLink>
                <NavLink to="/withdraw" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">
                    <img src={withdrawIcon} alt="Withdraw" className="w-5 h-5 filter brightness-0 invert" />
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
                  <img src={supportIcon} alt="Support" className="w-5 h-5 flex-shrink-0 filter brightness-0 invert" />
                </span>
                <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}>Support</span>
              </div>
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}>
                {activeSubmenu === "support" ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </button>
            {activeSubmenu === "support" && (
              <div className="pl-10 pt-1 space-y-1">
                <NavLink to="/help" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">
                    <img src={helpIcon} alt="Help Center" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Help Center</span>
                </NavLink>
                <NavLink to="/contact" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">
                    <img src={contactIcon} alt="Contact Us" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Contact Us</span>
                </NavLink>
                <NavLink to="/responsible-gaming" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">
                    <img src={responsibleIcon} alt="Responsible Gaming" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Responsible Gaming</span>
                </NavLink>
                <NavLink to="/fairness" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">
                    <img src={fairnessIcon} alt="Fairness" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Fairness</span>
                </NavLink>
                <NavLink to="/terms-of-service" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">
                    <img src={termsIcon} alt="Terms of Service" className="w-5 h-5 filter brightness-0 invert" />
                  </span>
                  <span>Terms of Service</span>
                </NavLink>
                <NavLink to="/privacy-policy" onClick={handleLinkClick} className={({ isActive }) => `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`}>
                  <span className="text-lg w-6 text-center">🔒</span>
                  <span>Privacy Policy</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;