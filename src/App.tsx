import React, { useState, useEffect } from 'react';
import { translations, Language, getTranslation } from './translations';
import HomePage from './components/HomePage';
import CasinoPage from './components/Caino/CasinoPage';
import GameLobbyPage from './components/GameLobbyPage';
import SlotsPage from './components/SlotsPage';
// import GameLobby from './components/GameLobby';
import SlotMachine from './components/games/SlotMachine';
import Blackjack from './components/games/Blackjack';
import Roulette from './components/games/Roulette';
import PromotionsPage from './components/PromotionsPage';
import ProfilePage from './components/ProfilePage';
import LootboxPage from './components/LootboxPage';
import GamesPage from './components/GamesPage';
import SportsPage from './components/SportsPage';
import TermsOfService from './components/legal/TermsOfService';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import CookiePolicy from './components/legal/CookiePolicy';
import Licensing from './components/legal/Licensing';
import Security from './components/legal/Security';
import HelpCenter from './components/support/HelpCenter';
import ContactUs from './components/support/ContactUs';
import ResponsibleGaming from './components/support/ResponsibleGaming';
import Fairness from './components/support/Fairness';

// --- MODAL IMPORTS (Your exact components) ---
import LoginModal from './components/auth/LoginModal';
import OTPPopup from './components/auth/OTPModal'; 
import VerificationPopup from './components/auth/VerificationModal'; 
import DepositModal from './components/auth/DepositModal'; 
import VisaPaymentModal from './components/auth/VisaPaymentModal'; 

// --- ICON IMPORTS (Unchanged) ---
import { Wallet, Home, Gamepad2, Trophy, Settings, User, Globe, Gift, Users, ChevronDown , LogOut } from 'lucide-react';

// --- FOOTER COMPONENT (Unchanged) ---
const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
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
              <li><button onClick={() => onNavigate('lobby?filter=slots')} className="text-gray-400 hover:text-white transition-colors">Slots</button></li>
              <li><button onClick={() => onNavigate('lobby?filter=table')} className="text-gray-400 hover:text-white transition-colors">Blackjack</button></li>
              <li><button onClick={() => onNavigate('lobby?filter=table')} className="text-gray-400 hover:text-white transition-colors">Roulette</button></li>
              <li><button onClick={() => onNavigate('lobby?filter=live')} className="text-gray-400 hover:text-white transition-colors">Live Casino</button></li>
              <li><button onClick={() => onNavigate('lobby?filter=jackpots')} className="text-gray-400 hover:text-white transition-colors">Jackpots</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('help')} className="text-gray-400 hover:text-white transition-colors">Help Center</button></li>
              <li><button onClick={() => window.open('#', '_blank')} className="text-gray-400 hover:text-white transition-colors">Live Chat</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors">Contact Us</button></li>
              <li><button onClick={() => onNavigate('responsible-gaming')} className="text-gray-400 hover:text-white transition-colors">Responsible Gaming</button></li>
              <li><button onClick={() => onNavigate('fairness')} className="text-gray-400 hover:text-white transition-colors">Fairness</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('terms')} className="text-gray-400 hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('cookies')} className="text-gray-400 hover:text-white transition-colors">Cookie Policy</button></li>
              <li><button onClick={() => onNavigate('licensing')} className="text-gray-400 hover:text-white transition-colors">Licensing</button></li>
              <li><button onClick={() => onNavigate('security')} className="text-gray-400 hover:text-white transition-colors">Security</button></li>
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

// --- CORRECTED PAGE TYPE (Modals are not pages) ---
type Page = 'home' | 'casino' | 'games' | 'sports' | 'lootboxes' | 'lobby' | 'slots' | 'slot' | 'blackjack' | 'roulette' | 'profile' | 'promotions' | 'terms' | 'privacy' | 'cookies' | 'licensing' | 'security' | 'help' | 'contact' | 'responsible-gaming' | 'fairness';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [gameFilter, setGameFilter] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // --- CORRECTED MODAL STATE ---
  const [modalView, setModalView] = useState<'login' | 'otp' | 'verification' | 'deposit' | 'visa' | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [balance, setBalance] = useState(10000);
  const [userLevel, setUserLevel] = useState(42);
  const [userXP, setUserXP] = useState(8540);
  const [nextLevelXP, setNextLevelXP] = useState(10000);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);

  const btcToUsd = 45000;
  const balanceUSD = balance * btcToUsd;
  const xpProgress = (userXP / nextLevelXP) * 100;

  const currencies = [
      { name: 'Tether', code: 'USDT', icon: '₮', balance: '12,345.67' },
      { name: 'Bitcoin', code: 'BTC', icon: '₿', balance: '0.54321' },
      { name: 'Ethereum', code: 'ETH', icon: 'Ξ', balance: '10.987' },
      { name: 'Solana', code: 'SOL', icon: 'S', balance: '123.45' },
  ]

  // --- HANDLERS (Unchanged) ---
  const handleShowOtp = () => setModalView('otp');
  const handleShowVerification = () => setModalView('verification');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUser({ username: 'test' });
    setModalView('deposit'); // Show deposit modal after login
  };

  const handleNavigation = (page: string) => {
    window.scrollTo(0, 0);
    if (page.includes('?filter=')) {
      const [pageName, filterParam] = page.split('?filter=');
      setGameFilter(filterParam);
      setCurrentPage(pageName as Page);
    } else {
      setGameFilter('all');
      setCurrentPage(page as Page);
    }
  };

  const handleLanguageChange = (lang: 'en' | 'es') => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('home');
  };

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'lootboxes', label: 'LootBoxes', icon: Gift },
    { id: 'games', label: 'Games', icon: Gamepad2 },
  ];

  if (isAuthenticated) {
    navigation.push({ id: 'profile', label: 'Profile', icon: User });
  }

  // --- CORRECTED RENDERPAGE (No longer includes modals) ---
  const renderPage = () => {
    const goHome = () => setCurrentPage('home');
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} language={language} />;
      case 'casino':
        return <CasinoPage onNavigate={handleNavigation} />;
      case 'games':
        return <GamesPage onBack={() => setCurrentPage('home')} />;
      case 'sports':
        return <SportsPage onBack={() => setCurrentPage('home')} />;
      case 'lootboxes':
        return <LootboxPage onBack={() => setCurrentPage('home')} />;
      case 'lobby':
        return <GameLobbyPage onNavigate={handleNavigation} />;
      case 'slots':
        return <SlotsPage onNavigate={handleNavigation} />;
      case 'slot':
        return <SlotMachine balance={balance} onBalanceChange={setBalance} onBack={() => setCurrentPage('lobby')} />;
      case 'blackjack':
        return <Blackjack balance={balance} onBalanceChange={setBalance} onBack={() => setCurrentPage('lobby')} />;
      case 'roulette':
        return <Roulette balance={balance} onBalanceChange={setBalance} onBack={() => setCurrentPage('lobby')} />;
      case 'promotions':
        return <PromotionsPage onBack={() => setCurrentPage('home')} />;
      case 'profile':
        return <ProfilePage />;
      case 'help':
        return <HelpCenter onBack={goHome} />;
      case 'contact':
        return <ContactUs onBack={goHome} />;
      case 'responsible-gaming':
        return <ResponsibleGaming onBack={goHome} />;
      case 'fairness':
        return <Fairness onBack={goHome} />;
         case 'terms':
      return <TermsOfService onBack={goHome} />;
    case 'privacy':
      return <PrivacyPolicy onBack={goHome} />;
    case 'cookies':
      return <CookiePolicy onBack={goHome} />;
    case 'licensing':
      return <Licensing onBack={goHome} />;
    case 'security':
      return <Security onBack={goHome} />;
      default:
        return <HomePage onNavigate={handleNavigation} language={''} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#3C1A4F] to-[#000000]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#3C1A4F]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const translatedLabel = getTranslation(language, item.id as keyof typeof translations.en);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setCurrentPage(item.id as Page);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-[#3C1A4F]/20 text-[#F25287] border border-[#3C1A4F]/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{translatedLabel}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => setModalView('login')}
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
                    onClick={() => setModalView('deposit')}
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
                    onClick={handleLogout}
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
        {renderPage()}
        <Footer onNavigate={handleNavigation} />
      </main>

      {/* --- CORRECTED MODAL RENDERING LOGIC --- */}
      {modalView === 'login' && (
        <LoginModal
          onClose={() => setModalView(null)}
          onShowOtp={handleShowOtp}
        />
      )}
      {modalView === 'otp' && (
        <OTPPopup
          onClose={() => setModalView(null)}
          onLoginSuccess={handleShowVerification}
        />
      )}
      {modalView === 'verification' && (
        <VerificationPopup
          onClose={() => setModalView(null)}
          onVerificationComplete={handleLoginSuccess}
        />
      )}
      {modalView === 'deposit' && (
        <DepositModal
          onClose={() => setModalView(null)}
          onVisaClick={() => setModalView('visa')}
        />
      )}
      {modalView === 'visa' && (
        <VisaPaymentModal
          onClose={() => setModalView('deposit')} // Go back to the deposit modal
        />
      )}
    </div>
  );
}


export default App;
