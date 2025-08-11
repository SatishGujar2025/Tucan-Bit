import React, { useState } from 'react';
import { Outlet, Link,NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { translations, getTranslation } from '../../constants/translations';


import LoginModal from '../modals/LoginModal';
import OTPPopup from '../modals/OTPModal';

import DepositModal from '../modals/DepositModal';
import VisaPaymentModal from '../modals/VisaPaymentModal';
import { Wallet, Home, Gamepad2, Gift, User, ChevronDown,ChevronRightIcon, ChevronRight, ChevronLeft, LogOut, BarChart3, Settings, DollarSign } from 'lucide-react';
import WalletConnectModal from '../modals/WalletConnectModal';
import VerificationModal from '../modals/VerificationModal';
import PromotionalSidebar from './PromotionalSidebar';
import MobileNavigation from './MobileNavigation';





const Footer: React.FC<{}> = () => {
    return (
        <footer className="bg-black/40 border-t border-[#3C1A4F]/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <p className="text-gray-400 mb-6">
                            The world's most trusted crypto casino. Play responsibly and enjoy the future of online gaming.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-[#3C1A4F]/20 rounded-lg flex items-center justify-center hover:bg-[#3C1A4F]/30 transition-colors">
                                <span className="text-[#F25287]">𝕏</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#3C1A4F]/20 rounded-lg flex items-center justify-center hover:bg-[#3C1A4F]/30 transition-colors">
                                <span className="text-[#F25287]">f</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#3C1A4F]/20 rounded-lg flex items-center justify-center hover:bg-[#3C1A4F]/30 transition-colors">
                                <span className="text-[#F25287]">📷</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#3C1A4F]/20 rounded-lg flex items-center justify-center hover:bg-[#3C1A4F]/30 transition-colors">
                                <span className="text-[#F25287]">▶</span>
                            </a>
                        </div>
                    </div>

                    {/* Games */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Games</h3>
                        <ul className="space-y-3">
                            <li><Link to="/slots" className="text-gray-400 hover:text-white transition-colors">Slots</Link></li>
                            <li><Link to="/blackjacks" className="text-gray-400 hover:text-white transition-colors">Blackjack</Link></li>
                            <li><Link to="/roulette" className="text-gray-400 hover:text-white transition-colors">Roulette</Link></li>
                            <li><Link to="/live-casino" className="text-gray-400 hover:text-white transition-colors">Live Casino</Link></li>
                            <li><Link to="/jackpots" className="text-gray-400 hover:text-white transition-colors">Jackpots</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Support</h3>
                        <ul className="space-y-3">
                            <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="/live-chat" className="text-gray-400 hover:text-white transition-colors">Live Chat</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/responsible-gaming" className="text-gray-400 hover:text-white transition-colors">Responsible Gaming</Link></li>
                            <li><Link to="/fairness" className="text-gray-400 hover:text-white transition-colors">Fairness</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
                        <ul className="space-y-3">
                                            <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/licensing" className="text-gray-400 hover:text-white transition-colors">Licensing</Link></li>
                            <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#3C1A4F]/20 mt-12 pt-8 ">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-400 text-sm">
                            © 2025 TucanBit. All rights reserved. Licensed in Curacao.
                        </p>
                        <div className="flex items-center space-x-6 mt-4 md:mt-0 ">
                            <div className="flex items-center space-x-2">
                                <span className="text-[#7ED957]">🛡</span>
                                <span className="text-sm text-gray-400">SSL Secured</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-[#FFC542]">🏆</span>
                                <span className="text-sm text-gray-400">Provably Fair</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-[#36CFC9]">🕐</span>
                                <span className="text-sm text-gray-400">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


const Layout: React.FC = () => {
  
  const location = useLocation();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [promotionalSidebarExpanded, setPromotionalSidebarExpanded] = useState(true);

  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'es'>('en');


    const { 
    modalView, 
    closeModal, 
    openModal, 
    isAuthenticated,
    login, logout,
    walletAddress, 
    walletBalance, 
    walletCurrency,
    balance, 
    disconnectWallet 
  } = useAppContext();
  


 


  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };
  
  const handleLinkClick = () => {
    setSidebarOpen(false); // Close sidebar on mobile when a link is clicked
  };

  const handleMobileMenuToggle = () => {
    setSidebarOpen(!sidebarOpen); // Open the main sidebar instead of mobile sidebar
  };
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false);
      }
      if (!target.closest('.balance-dropdown')) {
        setIsBalanceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    // Data for the dropdown
  const currencies = [
      { name: 'Tether', code: 'USDT', icon: '₮', balance: '12,345.67' },
      { name: 'Bitcoin', code: 'BTC', icon: '₿', balance: '0.54321' },
      { name: 'Ethereum', code: 'ETH', icon: 'Ξ', balance: '10.987' },
  ];
  const isSportsPage = location.pathname === '/sports';
  const desktopNavItems = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'lootboxes', path: '/lootboxes', label: 'LootBoxes', icon: Gift },
    { id: 'games', path: '/games', label: 'Games', icon: Gamepad2 },
  ];
  if (isAuthenticated) {
    desktopNavItems.push({ id: 'profile', path: '/profile', label: 'Profile', icon: User });
  }


   const headerNavItems = [
    // { id: 'home', path: '/', label: 'Home', icon: '🏠' },
    { id: 'liveCasino', path: '/live-casino', label: 'Live Casino', icon: '🎲' },
    { id: 'games', path: '/games', label: 'Games', icon: '🎮' },
    { id: 'vipClub', path: '/vip-club', label: 'VIP Club', icon: '💎' },
    // { id: 'tournaments', path: '/tournaments', label: 'Tournaments', icon: '⚡' },
  ];



  // Modal handlers
  const handleShowOtp = () => openModal('otp');
  const handleShowVerification = () => openModal('verification');
  const handleLoginComplete = () => login('testuser');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#3C1A4F] to-[#000000] overflow-x-hidden max-w-full">
      {/* ====================================================================== */}
      {/* 1. SIDEBAR             */}
      {/* ====================================================================== */}
      <div className={`fixed inset-y-0 left-0 z-[60] bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300 border-r border-gray-800 ${sidebarExpanded ? 'w-64' : 'w-8'} w-64 lg:w-auto`}>
        <div className="flex flex-col h-full">
          <div className={`border-b border-gray-800 ${sidebarExpanded ? 'p-6' : 'p-4'} lg:p-4`}>
            <div className={`flex items-center ${sidebarExpanded ? 'justify-between' : 'justify-center'}`}>
              <div className={`flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'}`}>
                {sidebarExpanded && (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Link to="/" onClick={handleLinkClick}> <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg></Link>
                  </div>
                )}
                <div className="lg:hidden">
                   <Link to="/" onClick={handleLinkClick}>  <span className="text-2xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></span></Link> 
                      <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
                  </div>
                {sidebarExpanded && (
                  <div className="hidden lg:block">
                   <Link to="/" onClick={handleLinkClick}>  <span className="text-2xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></span></Link> 
                      <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
                  </div>
                )}
              </div>
              
              {/* Sidebar Toggle Button - Inside sidebar */}
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg transition-all duration-300 border border-white/30 hover:border-white/50 p-2 rounded-lg hidden lg:block"
              >
                {sidebarExpanded ? (
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            </div>
          </div>

            {/* CONDITIONAL SPORTS SECTIONS */}
            {isSportsPage && (
              <>
                <div className="p-4 border-b border-gray-800">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2"><span className="text-2xl"></span><div><p className="text-sm font-semibold text-white">Tucan Wallet</p><p className="text-xs text-gray-300">Coming soon</p></div></div>
                  </div>
                </div>
               <div className="p-4 border-b border-gray-800">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-3 text-white">
              <h3 className="font-bold text-sm mb-2">BATTLEPASS</h3>
              <p className="text-xs mb-3">Get amazing rewards with Battlepass.</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🪙</span>
                  <span className="text-lg">🏆</span>
                </div>
                <div className="text-xs">
                  <p>Levelup Rewards</p>
                  <p>Tucan Tokens</p>
                </div>
              </div>
              <button className="w-full bg-white text-orange-500 py-2 rounded text-sm font-semibold">
                Get BattlePass
              </button>
            </div>
          </div>
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center justify-between text-white"><span className="text-sm">Streak</span><div className="flex items-center space-x-1"><span className="text-lg font-bold">2</span><ChevronRightIcon className="w-4 h-4" /></div></div>
                </div>
              </>
            )}
          <nav className={`flex-1 overflow-y-auto ${sidebarExpanded ? 'p-4' : 'p-2'} space-y-1 min-h-0 h-full scrollbar-hide`}>
            <NavLink to="/" onClick={handleLinkClick}   className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🏠</span>{sidebarExpanded && <span>Home</span>}</NavLink>
            <NavLink to="/casino" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🎰</span>{sidebarExpanded && <span>Casino</span>}</NavLink>
            <NavLink to="/live-casino" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">📹</span>{sidebarExpanded && <span>Live Casino</span>}</NavLink>
            <NavLink to="/sports" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🏆</span>{sidebarExpanded && <span>Sports</span>}</NavLink>
            <NavLink to="/lootboxes" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🎁</span>{sidebarExpanded && <span>Lootboxes</span>}</NavLink>
            
            <div> {/* Games Submenu */}
              <button onClick={() => toggleSubmenu('games')} className={`${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'justify-between' : 'justify-center'} p-3 rounded-lg hover:bg-gray-800 text-white`}>
                <div className="flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'}"><span className="text-xl">🎮</span>{sidebarExpanded && <span>Games</span>}</div>
                {sidebarExpanded && (activeSubmenu === 'games' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />)}
              </button>
              {activeSubmenu === 'games' && (<div className="pl-10 pt-2 space-y-2">
                  <NavLink to="/slots" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">🎰</span><span>Slots</span></NavLink>
                  <NavLink to="/table-games" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">🃏</span><span>Table Games</span></NavLink>
                  <NavLink to="/roulette" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">🎲</span><span>Roulette</span></NavLink>
                  <NavLink to="/blackjacks" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">🂡</span><span>Blackjack</span></NavLink>
                  <NavLink to="/live-casino" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">📹</span><span>Live Casino</span></NavLink>
                  <NavLink to="/jackpots" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">💰</span><span>Jackpots</span></NavLink>
              </div>)}
            </div>
            
            <NavLink to="/promotions" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🎁</span>{sidebarExpanded && <span>Promotions</span>}</NavLink>

            <NavLink to="/news" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">📰</span>{sidebarExpanded && <span>News</span>}</NavLink>

            <NavLink to="/vip-club" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">👑</span>{sidebarExpanded && <span>VIP Club</span>}</NavLink>

            <div> {/* Wallet Submenu */}
              <button onClick={() => toggleSubmenu('wallet')} className={`${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'justify-between' : 'justify-center'} p-3 rounded-lg hover:bg-gray-800 text-white`}>
                <div className="flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'}"><span className="text-xl">💼</span>{sidebarExpanded && <span>Wallet</span>}</div>
                {sidebarExpanded && (activeSubmenu === 'wallet' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />)}
              </button>
              {activeSubmenu === 'wallet' && (<div className="pl-10 pt-1 space-y-1">
                  <NavLink to="/deposit" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">💳</span><span>Deposit</span></NavLink>
                  <NavLink to="/withdraw" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">↩️</span><span>Withdraw</span></NavLink>
              </div>)}
            </div>

            <NavLink to="/tournaments" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🏆</span>{sidebarExpanded && <span>Tournaments</span>}</NavLink>
            <NavLink to="/earn" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">💎</span>{sidebarExpanded && <span>Earn</span>}</NavLink>
            <NavLink to="/token-dashboard" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">📊</span>{sidebarExpanded && <span>Token Dashboard</span>}</NavLink>

            <div> {/* Support Submenu */}
                <button onClick={() => toggleSubmenu('support')} className={`${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'justify-between' : 'justify-center'} p-3 rounded-lg hover:bg-gray-800 text-white`}>
                    <div className="flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'}"><span className="text-xl">💬</span>{sidebarExpanded && <span>Support</span>}</div>
                    {sidebarExpanded && (activeSubmenu === 'support' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />)}
                </button>
                {activeSubmenu === 'support' && (<div className="pl-10 pt-2 space-y-2">
                    <NavLink to="/help" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">❓</span><span>Help Center</span></NavLink>
                    <NavLink to="/contact" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">📧</span><span>Contact Us</span></NavLink>
                    <NavLink to="/responsible-gaming" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">🛡️</span><span>Responsible Gaming</span></NavLink>
                    <NavLink to="/fairness" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">⚖️</span><span>Fairness</span></NavLink>
                    <NavLink to="/terms-of-service" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">📄</span><span>Terms of Service</span></NavLink>
                    <NavLink to="/privacy-policy" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">🔒</span><span>Privacy Policy</span></NavLink>
                </div>)}
            </div>

            <NavLink to="/community" onClick={handleLinkClick}  className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">👥</span>{sidebarExpanded && <span>Community</span>}</NavLink>
             {!isAuthenticated ? (
            null): <NavLink to="/profile" onClick={handleLinkClick}
                className={({ isActive }) => 
        `${sidebarExpanded ? 'w-full' : 'w-8'} flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'} p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">👤</span>
               {sidebarExpanded && <span>Profile</span>}</NavLink>}
          </nav>
        </div>
      </div>



      {/* Promotional Sidebar - Hidden on mobile, visible on wider screens */}
      <div className="hidden lg:block">
        <PromotionalSidebar 
          isExpanded={promotionalSidebarExpanded}
          setIsExpanded={setPromotionalSidebarExpanded}
        />
      </div>

      <div className={`transition-all duration-300 overflow-x-hidden w-full ${sidebarExpanded ? 'lg:ml-64' : 'lg:ml-8'} lg:pl-4 lg:pr-4 ${promotionalSidebarExpanded ? 'lg:mr-80' : 'lg:mr-0'}`} id="main-content">
        {/* ====================================================================== */}
        {/* 2. HEADER - The top bar with login/user info                         */}
        {/* ====================================================================== */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#3C1A4F]/20">
            <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${promotionalSidebarExpanded ? 'lg:pr-48' : 'lg:pr-8'} ${promotionalSidebarExpanded ? 'xl:pr-64' : 'xl:pr-12'}`}>
            <div className="flex items-center justify-between h-16">
                {/* Mobile Hamburger Button */}
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white -ml-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m4 6H4"></path></svg>
                </button>

                {/*  Main Navigation Links for Desktop */}
                <div className="hidden lg:flex items-center space-x-3">
                  {headerNavItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-all text-sm ${
                        location.pathname === item.path
                            ? 'bg-[#3C1A4F]/20 text-[#F25287]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                     <span className="text-lg">{ item.icon }</span>  
                        <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Right Side: Login/User Info */}
                <div className="flex items-center space-x-2 ">
                  {!isAuthenticated ? (
                      <button onClick={() => openModal('login')} className="flex items-center sm:mr-28 mr-2  space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-semibold">
                          <User className="w-5 h-5" />
                          <span className="hidden sm:inline">Get Started</span>
                      </button>
                  ) : (
                    
                      <div className="flex items-center space-x-2 sm:space-x-4">

                          {/* Balance Dropdown */}
                          <div className="relative balance-dropdown">
                            <div className="flex items-center space-x-1 bg-gray-800/50 px-2 py-2 rounded-lg border border-yellow-500/30">
                                <span className="text-yellow-400 font-bold">₿</span>
                                <span className="text-white font-semibold">{balance.toFixed(2)}</span>
                                <button onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isBalanceDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                            {isBalanceDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                                    <div className="p-2">
                                        {currencies.map(currency => (
                                            <div key={currency.code} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-md">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xl text-green-500">{currency.icon}</span>
                                                    <span className="text-white">{currency.name}</span>
                                                </div>
                                                <span className="text-gray-300">{currency.balance}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                          </div>

                          {/* Deposit Button */}
                          <button onClick={() => openModal('deposit')} className="flex items-center space-x-1 px-3 py-2 text-white rounded-lg font-semibold bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg text-sm">
                              <Wallet className="w-5 h-5" />
                              <span className="hidden sm:inline">Deposit</span>
                          </button>

                          {/* User Avatar & Welcome Dropdown */}
                          <div className="relative user-dropdown">
                            <button 
                              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-3 py-2 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
                            >
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white text-sm font-semibold hidden md:inline">Welcome, User</span>
                              <ChevronDown className={`w-4 h-4 text-white transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* User Dropdown Menu */}
                            {isUserDropdownOpen && (
                              <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                                <div className="p-2">
                                  <div className="px-3 py-2 border-b border-gray-700 mb-2">
                                    <p className="text-white font-semibold">Welcome, User</p>
                                    <p className="text-gray-400 text-sm">user@example.com</p>
                                  </div>
                                  
                                  <Link to="/profile" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md text-gray-300 hover:text-white transition-colors">
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                  </Link>
                                  
                                  <Link to="/transactions" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md text-gray-300 hover:text-white transition-colors">
                                    <BarChart3 className="w-4 h-4" />
                                    <span>Transactions</span>
                                  </Link>
                                  
                                  <Link to="/settings" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md text-gray-300 hover:text-white transition-colors">
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                  </Link>
                                  
                                  <Link to="/withdraw" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md text-gray-300 hover:text-white transition-colors">
                                    <DollarSign className="w-4 h-4" />
                                    <span>Get Paid</span>
                                  </Link>
                                  
                                  <div className="border-t border-gray-700 mt-2 pt-2">
                                    <button 
                                      onClick={() => {
                                        logout();
                                        setIsUserDropdownOpen(false);
                                      }} 
                                      className="flex items-center space-x-3 p-2 hover:bg-red-500/20 rounded-md text-red-400 hover:text-red-300 transition-colors w-full"
                                    >
                                      <LogOut className="w-4 h-4" />
                                      <span>Logout</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>


                      </div>
                  )}
                </div>
            </div>
            </div>
        </nav>
        {/* ====================================================================== */}
        {/* 3. MAIN CONTENT and 4. FOOTER                                        */}
        {/* ====================================================================== */}
        <main className={`pb-16 md:pb-0 overflow-x-hidden max-w-full ${promotionalSidebarExpanded ? 'lg:pr-48 xl:pr-64' : 'lg:pr-8 xl:pr-0'} ${sidebarExpanded ? 'lg:pl-52' : 'lg:pl-2'}`}>
            <Outlet />
            <div className="hidden md:block">
                <Footer />
            </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation onMenuToggle={handleMobileMenuToggle} />

      {/* Mobile Sidebar Overlay - for main sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- MODAL RENDERING LOGIC --- */}
      {modalView === 'login' && <LoginModal onClose={closeModal} onShowOtp={handleShowOtp} />}
      {modalView === 'otp' && <OTPPopup onClose={closeModal} onLoginSuccess={handleShowVerification} />}
       {modalView === 'verification' && (
        <VerificationModal 
          onClose={closeModal} 
          onVerificationComplete={handleLoginComplete} 
        />
      )}
      {modalView === 'deposit' && <DepositModal onClose={closeModal} onVisaClick={() => openModal('visa')} />}
      {modalView === 'visa' && <VisaPaymentModal onClose={() => openModal('deposit')} />}
          {modalView === 'walletConnect' && <WalletConnectModal />}
    </div>
  );
};

export default Layout;