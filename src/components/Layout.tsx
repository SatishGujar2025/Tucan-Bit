import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { translations, getTranslation } from '../translations';

// --- MODAL IMPORTS ---
import LoginModal from './auth/LoginModal';
import OTPPopup from './auth/OTPModal';
import VerificationPopup from './auth/VerificationModal';
import DepositModal from './auth/DepositModal';
import VisaPaymentModal from './auth/VisaPaymentModal';

// --- ICON IMPORTS ---
import { Wallet, Home, Gamepad2, Gift, User, ChevronDown, LogOut } from 'lucide-react';

// --- FOOTER COMPONENT ---
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
                             <li><Link to="/live" className="text-gray-400 hover:text-white transition-colors">Live Casino</Link></li>
                             <li><Link to="/jackpots" className="text-gray-400 hover:text-white transition-colors">Jackpots</Link></li>
                         </ul>
                     </div>

                     {/* Support */}
                     <div>
                         <h3 className="text-white font-bold text-lg mb-6">Support</h3>
                          <ul className="space-y-3">
                              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Live Chat</a></li>
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

                 <div className="border-t border-[#3C1A4F]/20 mt-12 pt-8">
                     <div className="flex flex-col md:flex-row items-center justify-between">
                         <p className="text-gray-400 text-sm">
                             © 2024 TucanBit. All rights reserved. Licensed in Curacao.
                         </p>
                         <div className="flex items-center space-x-6 mt-4 md:mt-0">
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
  const { isAuthenticated, balance, modalView, login, logout, openModal, closeModal } = useAppContext();
  const location = useLocation();
  
  // State for UI elements within the layout
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);

  const navigation = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'lootboxes', path: '/lootboxes', label: 'LootBoxes', icon: Gift },
    { id: 'games', path: '/games', label: 'Games', icon: Gamepad2 },
  ];

  if (isAuthenticated) {
    navigation.push({ id: 'profile', path: '/profile', label: 'Profile', icon: User });
  }

  const currencies = [
      { name: 'Tether', code: 'USDT', icon: '₮', balance: '12,345.67' },
      { name: 'Bitcoin', code: 'BTC', icon: '₿', balance: '0.54321' },
      { name: 'Ethereum', code: 'ETH', icon: 'Ξ', balance: '10.987' },
      { name: 'Solana', code: 'SOL', icon: 'S', balance: '123.45' },
  ];

  // --- Modal handlers using context ---
  const handleShowOtp = () => openModal('otp');
  const handleShowVerification = () => openModal('verification');
  const handleLoginComplete = () => login('testuser'); // username can be passed from a form in a real app

  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#3C1A4F] to-[#000000]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#3C1A4F]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const translatedLabel = getTranslation(language, item.id as keyof typeof translations.en);
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-[#3C1A4F]/20 text-[#F25287] border border-[#3C1A4F]/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{translatedLabel}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => openModal('login')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white rounded-lg font-semibold hover:from-[#3C1A4F]/80 hover:to-[#36CFC9]/80 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Login / Sign Up</span>
                </button>
              ) : (
                <div className="flex items-center space-x-8">
                    {/* Balance Display with Dropdown */}
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
                                                <span className="text-xl text-green-500 ">{currency.icon}</span>
                                                <span className="text-white">{currency.name}</span>
                                            </div>
                                            <span className="text-gray-300">{currency.balance}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 p-2 space-y-1">
                                    <button className="w-full text-left p-2 hover:bg-gray-700 rounded-md text-white">Buy Crypto</button>
                                    <button className="w-full text-left p-2 hover:bg-gray-700 rounded-md text-white">Hide 0 balances</button>
                                </div>
                            </div>
                        )}
                    </div>

                  {/* Deposit Button */}
                  <button
                    onClick={() => openModal('deposit')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white rounded-lg font-semibold transition-colors"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Deposit</span>
                  </button>

                  {/* Profile Icon */}
                   <div className="relative">
                        <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </button>
                   </div>


                    <button
                    onClick={logout}
                    className="w-10 h-10 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-full transition-colors"
                    aria-label="Logout"
                   >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pt-16">
        <Outlet /> {/* This is where the routed page component will be rendered */}
        <Footer />
      </main>

      {/* --- MODAL RENDERING LOGIC (now uses context) --- */}
      {modalView === 'login' && <LoginModal onClose={closeModal} onShowOtp={handleShowOtp} />}
      {modalView === 'otp' && <OTPPopup onClose={closeModal} onLoginSuccess={handleShowVerification} />}
      {modalView === 'verification' && <VerificationPopup onClose={closeModal} onVerificationComplete={handleLoginComplete} />}
      {modalView === 'deposit' && <DepositModal onClose={closeModal} onVisaClick={() => openModal('visa')} />}
      {modalView === 'visa' && <VisaPaymentModal onClose={() => openModal('deposit')} />}
    </div>
  );
};

export default Layout;