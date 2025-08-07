import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  ChevronRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Coins,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  Check,
  Settings,
  HelpCircle,
  Users,
  MessageCircle,
  Shield,
  FileText,
  Globe,
  Zap,
  Target,
  Award,
  Gift,
  Star,
  Calendar,
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  Info,
  BookOpen,
  Shield as ShieldIcon,
  Heart,
  Scale,
  Lock,
  UserCheck,
  CreditCard,
  Gamepad2,
  Trophy,
  Coins as CoinsIcon,
  Settings as SettingsIcon,
  Bell,
  ExternalLink,
  Home,
  Dice5,
  LogOut,
  BarChart2,
  User
} from 'lucide-react';

interface SupportPageProps {
  onNavigate?: (page: string) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);

  // Add/remove modal-open class when wallet modal is open
  useEffect(() => {
    if (showWalletModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showWalletModal]);
  const [currentPage, setCurrentPage] = useState('support');
  const [activeTab, setActiveTab] = useState('help-center');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Wallet connection logic
  useEffect(() => {
    const savedWallet = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    const savedCurrency = localStorage.getItem('walletCurrency') as 'ETH' | 'SOL' | null;
    
    if (savedWallet) {
      setWalletAddress(savedWallet);
      setWalletBalance(savedBalance);
      setWalletCurrency(savedCurrency);
    }
  }, []);

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const connectWallet = async (provider: string) => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      const mockBalance = (Math.random() * 10).toFixed(4);
      const currency = provider === 'metamask' ? 'ETH' : 'SOL';
      
      setWalletAddress(mockAddress);
      setWalletBalance(mockBalance);
      setWalletCurrency(currency);
      setShowWalletModal(false);
      
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletBalance', mockBalance);
      localStorage.setItem('walletCurrency', currency);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletCurrency(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('walletCurrency');
  };

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const walletProviders = [
    { id: 'metamask', name: 'MetaMask', icon: '🦊' },
    { id: 'phantom', name: 'Phantom', icon: '👻' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' }
  ];

  // Mock support data
  const supportCategories = [
    { id: 'account', name: 'Account & Security', icon: UserCheck, color: 'blue' },
    { id: 'payments', name: 'Payments & Wallet', icon: CreditCard, color: 'green' },
    { id: 'games', name: 'Games & Casino', icon: Gamepad2, color: 'purple' },
    { id: 'promotions', name: 'Promotions & Bonuses', icon: Gift, color: 'orange' },
    { id: 'technical', name: 'Technical Issues', icon: Settings, color: 'red' },
    { id: 'responsible', name: 'Responsible Gaming', icon: Heart, color: 'pink' }
  ];

  const faqData = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click on the "Sign Up" button in the top right corner, provide your email address, create a strong password, and verify your email. You can also connect your wallet for instant access.',
      tags: ['account', 'registration']
    },
    {
      id: 2,
      category: 'payments',
      question: 'What cryptocurrencies do you accept?',
      answer: 'We accept Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and many other popular cryptocurrencies. You can view the complete list in the deposit section of your wallet.',
      tags: ['payments', 'cryptocurrency']
    },
    {
      id: 3,
      category: 'games',
      question: 'How do I start playing casino games?',
      answer: 'To start playing, first connect your wallet and deposit funds. Then navigate to the Casino section, choose your preferred game category (slots, table games, etc.), and click on any game to begin playing.',
      tags: ['games', 'casino']
    },
    {
      id: 4,
      category: 'promotions',
      question: 'How do I claim my welcome bonus?',
      answer: 'After making your first deposit, your welcome bonus will be automatically credited to your account. You can also check the Promotions page for current offers and bonus codes.',
      tags: ['promotions', 'bonus']
    },
    {
      id: 5,
      category: 'technical',
      question: 'The game is not loading, what should I do?',
      answer: 'Try refreshing your browser, clearing your cache, or switching to a different browser. If the issue persists, contact our support team with your browser details and error message.',
      tags: ['technical', 'troubleshooting']
    },
    {
      id: 6,
      category: 'responsible',
      question: 'How can I set deposit limits?',
      answer: 'You can set daily, weekly, or monthly deposit limits in your account settings under "Responsible Gaming". These limits help you maintain control over your gaming activities.',
      tags: ['responsible', 'limits']
    }
  ];

  const contactMethods = [
    {
      id: 'live-chat',
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageSquare,
      color: 'blue',
      available: true,
      responseTime: 'Instant'
    },
    {
      id: 'email',
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      color: 'green',
      available: true,
      responseTime: 'Within 24 hours'
    },
    {
      id: 'phone',
      name: 'Phone Support',
      description: 'Speak directly with our team',
      icon: Phone,
      color: 'purple',
      available: true,
      responseTime: 'Immediate'
    }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Connect Wallet</h3>
            <div className="space-y-3">
              {walletProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => connectWallet(provider.id)}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <span className="text-white font-medium">{provider.name}</span>
                  </div>
                  {isConnecting && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowWalletModal(false)}
              className="w-full mt-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg>
              </div>
              <div>
                <span className="text-2xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></span>
                <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
              </div>
            </div>
          </div>
          {/* Main Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => handleNavigate('home')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] text-white ${currentPage === 'home' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            {/* Casino */}
            <button
              onClick={() => handleNavigate('casino')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'casino' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Dice5 className="w-5 h-5" />
              <span>Casino</span>
            </button>

            {/* Sports */}
            <button
              onClick={() => handleNavigate('sports')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'sports' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Sports</span>
            </button>

            {/* Lootboxes */}
            <button
              onClick={() => handleNavigate('lootboxes')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'lootboxes' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Gift className="w-5 h-5" />
              <span>Lootboxes</span>
            </button>

            {/* Games Submenu */}
            <div>
              <button
                onClick={() => toggleSubmenu('games')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 text-white"
              >
                <div className="flex items-center space-x-3">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Games</span>
                </div>
                {activeSubmenu === 'games' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>

              {activeSubmenu === 'games' && (
                <div className="pl-10 pt-2 space-y-2">
                  <button onClick={() => handleNavigate('slots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Dice5 className="w-4 h-4" />
                    <span>Slots</span>
                  </button>
                  <button onClick={() => handleNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart3 className="w-4 h-4" />
                    <span>Table Games</span>
                  </button>
                  <button onClick={() => handleNavigate('roulette')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart3 className="w-4 h-4" />
                    <span>Roulette</span>
                  </button>
                  <button onClick={() => handleNavigate('blackjack')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart3 className="w-4 h-4" />
                    <span>Blackjack</span>
                  </button>
                  <button onClick={() => handleNavigate('live-casino')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Users className="w-4 h-4" />
                    <span>Live Casino</span>
                  </button>
                  <button onClick={() => handleNavigate('jackpots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Coins className="w-4 h-4" />
                    <span>Jackpots</span>
                  </button>
                </div>
              )}
            </div>

            {/* Promotions */}
            <button
              onClick={() => handleNavigate('promotions')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'promotions' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Gift className="w-5 h-5" />
              <span>Promotions</span>
            </button>

            {/* Wallet Submenu */}
            <div>
              <button
                onClick={() => toggleSubmenu('wallet')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 text-white"
              >
                <div className="flex items-center space-x-3">
                  <Wallet className="w-5 h-5" />
                  <span>Wallet</span>
                </div>
                {activeSubmenu === 'wallet' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>

              {activeSubmenu === 'wallet' && (
                <div className="pl-10 pt-1 space-y-1">
                  <button onClick={() => handleNavigate('deposit')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                    <CreditCard className="w-4 h-4" />
                    <span>Deposit</span>
                  </button>
                  <button onClick={() => handleNavigate('withdraw')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span>Withdraw</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tournaments */}
            <button
              onClick={() => handleNavigate('tournaments')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'tournaments' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Tournaments</span>
            </button>

            {/* Earn */}
            <button
              onClick={() => handleNavigate('earn')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'earn' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Coins className="w-5 h-5" />
              <span>Earn</span>
            </button>

            {/* Token Dashboard */}
            <button
              onClick={() => handleNavigate('token-dashboard')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'token-dashboard' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Token Dashboard</span>
            </button>

            {/* Support */}
            <button
              onClick={() => handleNavigate('support')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'support' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Support</span>
            </button>

            {/* Community */}
            <button
              onClick={() => handleNavigate('community')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'community' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Users className="w-5 h-5" />
              <span>Community</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => handleNavigate('settings')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'settings' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-800">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                  {walletBalance && <div className="flex items-center gap-2 mt-1"><span className="text-base font-bold text-yellow-400">{parseFloat(walletBalance).toFixed(4)}</span><span className="text-xs font-semibold text-gray-300">{walletCurrency}</span></div>}
                  <button onClick={disconnectWallet} className="text-xs text-orange-400 hover:text-orange-300">Disconnect</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowWalletModal(true)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-orange-600 transition-all">
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white z-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg>
            </div>
            <h1 className="text-xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></h1>
          </div>
        </div>
        <div className="w-6"></div>
      </header>

      {/* Main Content */}
      <main className="pt-16 lg:pt-0 lg:ml-64">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
          <div className="absolute inset-0 bg-[url('/src/assets/tucanbit.jpeg')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 p-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Support</span> Center
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                We're here to help! Find answers to your questions, get assistance with your account, or contact our support team.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-300">Support Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">&lt; 5min</div>
                  <div className="text-sm text-gray-300">Response Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-300">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab('help-center')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'help-center'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Help Center
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => setActiveTab('responsible-gaming')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'responsible-gaming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Responsible Gaming
              </button>
              <button
                onClick={() => setActiveTab('fairness')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'fairness'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Fairness
              </button>
            </div>

            {/* Help Center Tab */}
            {activeTab === 'help-center' && (
              <div className="space-y-8">
                {/* Search */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-white mb-4">How can we help you?</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search for answers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supportCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                      className={`p-6 rounded-lg border transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 border-blue-500'
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedCategory === category.id
                            ? 'bg-white/20'
                            : `bg-${category.color}-500/20`
                        }`}>
                          <category.icon className={`w-6 h-6 ${
                            selectedCategory === category.id
                              ? 'text-white'
                              : `text-${category.color}-400`
                          }`} />
                        </div>
                        <span className={`font-medium ${
                          selectedCategory === category.id
                            ? 'text-white'
                            : 'text-gray-300'
                        }`}>
                          {category.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* FAQ Section */}
                <div className="bg-gray-800 rounded-lg border border-gray-700">
                  <div className="p-6 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                    <p className="text-gray-400 mt-2">
                      {filteredFaqs.length} questions found
                    </p>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {filteredFaqs.map((faq) => (
                      <div key={faq.id} className="p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactMethods.map((method) => (
                    <div key={method.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-2 rounded-lg bg-${method.color}-500/20`}>
                          <method.icon className={`w-6 h-6 text-${method.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{method.name}</h3>
                          <p className="text-sm text-gray-400">{method.responseTime}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{method.description}</p>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                        {method.name === 'Live Chat' ? 'Start Chat' : 
                         method.name === 'Email Support' ? 'Send Email' : 'Call Now'}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Send us a message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select a category</option>
                      {supportCategories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Your message..."
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Responsible Gaming Tab */}
            {activeTab === 'responsible-gaming' && (
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="w-8 h-8 text-pink-400" />
                    <h3 className="text-2xl font-bold text-white">Responsible Gaming</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    At TucanBit, we are committed to promoting responsible gaming and ensuring that our platform provides a safe and enjoyable experience for all users. We believe that gaming should be a form of entertainment, not a way to make money.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Setting Limits</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Set daily, weekly, or monthly deposit limits</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Set session time limits</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Set loss limits to control spending</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Self-Exclusion</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Temporarily suspend your account</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Permanent account closure option</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Cooling-off periods available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Warning Signs</h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <span>Spending more than you can afford</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <span>Neglecting work or family responsibilities</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <span>Borrowing money to gamble</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <span>Feeling anxious or depressed about gambling</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Getting Help</h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start space-x-2">
                        <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Contact our support team</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Seek professional counseling</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Join support groups</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Use self-exclusion tools</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fairness Tab */}
            {activeTab === 'fairness' && (
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Scale className="w-8 h-8 text-green-400" />
                    <h3 className="text-2xl font-bold text-white">Game Fairness & Security</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    TucanBit is committed to providing fair and transparent gaming experiences. We use advanced technology and independent auditing to ensure that all games are fair and random.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Provably Fair Gaming</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Cryptographic verification of game results</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Transparent random number generation</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Verifiable game history</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Security Measures</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>SSL encryption for all transactions</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Multi-factor authentication</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Regular security audits</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Independent Auditing</h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Regular audits by third-party agencies</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Transparent RTP (Return to Player) rates</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Public verification of game fairness</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5" />
                        <span>Compliance with gaming regulations</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Verification Tools</h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start space-x-2">
                        <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                        <span>Game result verification</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                        <span>Transaction history verification</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                        <span>Random number generation proof</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                        <span>Fairness certificate verification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportPage; 