import React, { useState, useEffect } from 'react';
import { translations, Language, getTranslation } from './translations';
import HomePage from './components/HomePage';
import GameLobby from './components/GameLobby';
import SlotMachine from './components/games/SlotMachine';
import Blackjack from './components/games/Blackjack';
import Roulette from './components/games/Roulette';
import PromotionsPage from './components/PromotionsPage';
import WalletPage from './components/WalletPage';
import ProfilePage from './components/ProfilePage';
import TermsOfService from './components/legal/TermsOfService';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import CookiePolicy from './components/legal/CookiePolicy';
import Licensing from './components/legal/Licensing';
import Security from './components/legal/Security';
import HelpCenter from './components/support/HelpCenter';
import ContactUs from './components/support/ContactUs';
import ResponsibleGaming from './components/support/ResponsibleGaming';
import Fairness from './components/support/Fairness';
// --- CORRECTED IMPORTS ---
import LoginModal from './components/auth/LoginModal';
import OTPPopup from './components/auth/OTPModal'; // Corrected path if needed
import VerificationPopup from './components/auth/VerificationModal'; // Corrected path if needed
import { Wallet, Home, Gamepad2, Trophy, Settings, User, Globe, Gift, Users } from 'lucide-react';

// Footer Component (remains the same)
const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-black/40 border-t border-[#3C1A4F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
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

type Page = 'home' | 'lobby' | 'slot' | 'blackjack' | 'roulette' | 'wallet' | 'profile' | 'promotions' | 'terms' | 'privacy' | 'cookies' | 'licensing' | 'security' | 'help' | 'contact' | 'responsible-gaming' | 'fairness';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [gameFilter, setGameFilter] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalView, setModalView] = useState<'login' | 'otp' | 'verification'| null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [balance, setBalance] = useState(10000);
  const [userLevel, setUserLevel] = useState(42);
  const [userXP, setUserXP] = useState(8540);
  const [nextLevelXP, setNextLevelXP] = useState(10000);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const btcToUsd = 45000;
  const balanceUSD = balance * btcToUsd;
  const xpProgress = (userXP / nextLevelXP) * 100;

  // --- CLEANED UP HANDLERS ---
  const handleShowOtp = () => {
    setModalView('otp');
  };

  const handleShowVerification = () => {
    setModalView('verification');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUser({ username: 'test' });
    setModalView(null);
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

  const renderPage = () => {
    // This function remains the same
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HomePage onNavigate={handleNavigation} language={language} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'lobby':
        return (
          <>
            <GameLobby onNavigate={setCurrentPage} initialFilter={gameFilter} language={language} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'slot':
        return <SlotMachine balance={balance} onBalanceChange={setBalance} onBack={() => setCurrentPage('lobby')} />;
      case 'blackjack':
        return <Blackjack balance={balance} onBalanceChange={setBalance} onBack={() => setCurrentPage('lobby')} />;
      case 'roulette':
        return <Roulette balance={balance} onBalanceChange={setBalance} onBack={() => setCurrentPage('lobby')} />;
      case 'wallet':
        return (
          <>
            <WalletPage balance={balance} onBalanceChange={setBalance} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'promotions':
        return (
          <>
            <PromotionsPage onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'profile':
        return (
          <>
            <ProfilePage />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'terms':
        return (
          <>
            <TermsOfService onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'privacy':
        return (
          <>
            <PrivacyPolicy onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'cookies':
        return (
          <>
            <CookiePolicy onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'licensing':
        return (
          <>
            <Licensing onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'security':
        return (
          <>
            <Security onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'help':
        return (
          <>
            <HelpCenter onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'contact':
        return (
          <>
            <ContactUs onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'responsible-gaming':
        return (
          <>
            <ResponsibleGaming onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case 'fairness':
        return (
          <>
            <Fairness onBack={() => setCurrentPage('home')} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      default:
        return (
          <>
            <HomePage onNavigate={handleNavigation} language={''} />
            <Footer onNavigate={handleNavigation} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#3C1A4F] to-[#000000]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#3C1A4F]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      if (item.id === 'games') {
                        setCurrentPage('lobby');
                      } else if (item.id === 'live-casino') {
                        setCurrentPage('lobby');
                        setGameFilter('live');
                      } else {
                        setCurrentPage(item.id as Page);
                      }
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      (item.id === 'games' && currentPage === 'lobby') || 
                      (item.id === 'live-casino' && currentPage === 'lobby' && gameFilter === 'live') || 
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
              
              {isAuthenticated && (
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setCurrentPage('wallet');
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 'wallet'
                      ? 'bg-[#3C1A4F]/20 text-[#F25287] border border-[#3C1A4F]/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="hidden sm:inline font-semibold">
                    {getTranslation(language, 'balance')}: ${balanceUSD.toLocaleString()}
                  </span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Globe className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {language === 'en' ? 'EN' : 'ES'}
                  </span>
                </button>
                
                {showLanguageDropdown && (
                  <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-[#3C1A4F]/20 rounded-lg shadow-xl z-50 min-w-[120px]">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full px-4 py-3 text-left hover:bg-[#3C1A4F]/20 transition-colors flex items-center space-x-2 ${
                        language === 'en' ? 'text-[#F25287] bg-[#3C1A4F]/10' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span>English</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange('es')}
                      className={`w-full px-4 py-3 text-left hover:bg-[#3C1A4F]/20 transition-colors flex items-center space-x-2 ${
                        language === 'es' ? 'text-[#F25287] bg-[#3C1A4F]/10' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-lg">🇪🇸</span>
                      <span>Español</span>
                    </button>
                  </div>
                )}
              </div>

              {isAuthenticated && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm font-medium">Level {userLevel}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs text-gray-300">{(userXP / 1000).toFixed(1)}K</span>
                          <div className="w-16 bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1.5 rounded-full transition-all duration-300" 
                              style={{ width: `${xpProgress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-300">{(nextLevelXP / 1000).toFixed(1)}K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!isAuthenticated ? (
                <button
                  onClick={() => setModalView('login')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white rounded-lg font-semibold hover:from-[#3C1A4F]/80 hover:to-[#36CFC9]/80 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Login / Sign Up</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">Welcome, {user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLanguageDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
      
      <main className="pt-16">
        {renderPage()}
      </main>

      {/* --- MODAL RENDERING LOGIC --- */}
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
    </div>
  );
}

export default App;
