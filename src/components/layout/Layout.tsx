import React, { useState } from 'react';
import { Outlet, Link,NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { translations, getTranslation } from '../../constants/translations';


import LoginModal from '../modals/LoginModal';
import OTPPopup from '../modals/OTPModal';

import DepositModal from '../modals/DepositModal';
import VisaPaymentModal from '../modals/VisaPaymentModal';
import { Wallet, Home, Gamepad2, Gift, User, ChevronDown,ChevronRightIcon, ChevronRight, LogOut } from 'lucide-react';
import WalletConnectModal from '../modals/WalletConnectModal';
import VerificationModal from '../modals/VerificationModal';





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
                            <li><Link to="/blackjack" className="text-gray-400 hover:text-white transition-colors">Blackjack</Link></li>
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
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
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
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
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
    { id: 'liveCasino', path: '/live-casino', label: 'Live Casino', icon: '🔴' },
    { id: 'games', path: '/games', label: 'Games', icon: '🎮' },
  ];
  if (isAuthenticated) {
    headerNavItems.push({ id: 'profile', path: '/profile', label: 'Profile', icon: '👤' });
  }


  // Modal handlers
  const handleShowOtp = () => openModal('otp');
  const handleShowVerification = () => openModal('verification');
  const handleLoginComplete = () => login('testuser');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#3C1A4F] to-[#000000]">
      {/* ====================================================================== */}
      {/* 1. SIDEBAR             */}
      {/* ====================================================================== */}
      <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Link to="/" onClick={handleLinkClick}> <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg></Link>
                </div>
                <div>
                 <Link to="/" onClick={handleLinkClick}>  <span className="text-2xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></span></Link> 
                    <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
                </div>
            </div>
          </div>

            {/* CONDITIONAL SPORTS SECTIONS */}
            {isSportsPage && (
              <>
                <div className="p-4 border-b border-gray-800">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2"><span className="text-2xl">🐋</span><div><p className="text-sm font-semibold text-white">Whale Token (WHALE)</p><p className="text-xs text-gray-300">Coming soon</p></div></div>
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
                  <p>Whale Tokens</p>
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
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <NavLink to="/" onClick={handleLinkClick}   className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🏠</span><span>Home</span></NavLink>
            <NavLink to="/casino" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🎰</span><span>Casino</span></NavLink>
            <NavLink to="/live-casino" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">📹</span><span>Live Casino</span></NavLink>
            <NavLink to="/sports" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🏆</span><span>Sports</span></NavLink>
            <NavLink to="/lootboxes" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🎁</span><span>Lootboxes</span></NavLink>
            
            <div> {/* Games Submenu */}
              <button onClick={() => toggleSubmenu('games')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 text-white">
                <div className="flex items-center space-x-3"><span className="text-xl">🎮</span><span>Games</span></div>
                {activeSubmenu === 'games' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
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
                  <NavLink to="/blackjack" onClick={handleLinkClick}  className={({ isActive }) => 
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
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🎁</span><span>Promotions</span></NavLink>

            <div> {/* Wallet Submenu */}
              <button onClick={() => toggleSubmenu('wallet')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 text-white">
                <div className="flex items-center space-x-3"><span className="text-xl">💼</span><span>Wallet</span></div>
                {activeSubmenu === 'wallet' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
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
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">🏆</span><span>Tournaments</span></NavLink>
            <NavLink to="/earn" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">💎</span><span>Earn</span></NavLink>
            <NavLink to="/token-dashboard" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">📊</span><span>Token Dashboard</span></NavLink>

            <div> {/* Support Submenu */}
                <button onClick={() => toggleSubmenu('support')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 text-white">
                    <div className="flex items-center space-x-3"><span className="text-xl">🆘</span><span>SOS Support</span></div>
                    {activeSubmenu === 'support' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
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
                    <NavLink to="/terms" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">📄</span><span>Terms of Service</span></NavLink>
                    <NavLink to="/privacy" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-lg">🔒</span><span>Privacy Policy</span></NavLink>
                </div>)}
            </div>

            <NavLink to="/community" onClick={handleLinkClick}  className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">👥</span><span>Community</span></NavLink>
             {!isAuthenticated ? (
            null): <NavLink to="/profile" onClick={handleLinkClick}
                className={({ isActive }) => 
        `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-gray-800  font-semibold' 
            : 'hover:bg-yellow-500/20 text-white'                  
        }`
      }><span className="text-xl">👤</span>
               <span>Profile</span></NavLink>}
          </nav>
         
          <div className="p-4 border-t border-gray-800">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/80 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white truncate" title={walletAddress}>
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                  <p className="text-base font-bold text-yellow-400">
                    {walletBalance} {walletCurrency}
                  </p>
                  <button onClick={disconnectWallet} className="text-xs text-orange-400 hover:text-orange-300">
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => openModal('walletConnect')} 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-orange-600"
              >
                <span className="text-lg">💼</span>
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:ml-64">
        {/* ====================================================================== */}
        {/* 2. HEADER - The top bar with login/user info                         */}
        {/* ====================================================================== */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#3C1A4F]/20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Mobile Hamburger Button */}
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white -ml-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m4 6H4"></path></svg>
                </button>

                {/*  Main Navigation Links for Desktop */}
                <div className="hidden lg:flex items-center space-x-6">
                  {headerNavItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                        location.pathname === item.path
                            ? 'bg-[#3C1A4F]/20 text-[#F25287]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                     <span>{ item.icon }</span>  
                        <span>{getTranslation(language, item.id as keyof typeof translations.en)}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Right Side: Login/User Info */}
                <div className="flex items-center space-x-4">
                  {!isAuthenticated ? (
                      <button onClick={() => openModal('login')} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-semibold">
                          <User className="w-5 h-5" />
                          <span className="hidden sm:inline">Login / Sign Up</span>
                      </button>
                  ) : (
                    
                      <div className="flex items-center space-x-4 sm:space-x-8">
                          {/* Balance Dropdown */}
                          <div className="relative">
                            <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
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

                 {/* from-[#3C1A4F] to-[#36CFC9] */}



                          <button onClick={() => openModal('deposit')} className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                              <Wallet className="w-5 h-5" />
                              <span>Deposit</span>
                          </button>

                          {/* RESTORED: Profile Icon */}
                          {/* <div className="relative">
                            <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </button>
                          </div> */}

                          <button onClick={logout} className="w-10 h-10 flex items-center justify-center bg-red-500/20 text-red-400 rounded-full">
                              <LogOut className="w-5 h-5" />
                          </button>
                      </div>
                  )}
                </div>
            </div>
            </div>
        </nav>
        {/* ====================================================================== */}
        {/* 3. MAIN CONTENT and 4. FOOTER                                        */}
        {/* ====================================================================== */}
        <main>
            <Outlet />
            <Footer />
        </main>
      </div>

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