import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Clock, 
  Star, 
  ChevronRight, 
  ChevronDown, 
  ChevronRight as ChevronRightIcon,
  Wallet,
  Home,
  Gamepad2,
  CreditCard,
  LogOut,
  Settings,
  User,
  Globe,
  Gift,
  BarChart2,
  Dice5,
  Menu,
  X,
  Search,
  Filter,
  Calendar,
  Target,
  Award,
  Zap,
  Crown,
  Medal,
  Coins,
  TrendingUp,
  Eye,
  Play,
  Timer
} from 'lucide-react';

type TournamentPageProps = {
  onNavigate?: (page: string) => void;
};

interface Tournament {
  id: string;
  name: string;
  game: string;
  prizePool: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'active' | 'completed';
  entryFee: string;
  category: string;
  description: string;
  leaderboard: Array<{
    rank: number;
    username: string;
    score: number;
    prize: string;
    avatar: string;
  }>;
}

const TournamentPage: React.FC<TournamentPageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string>('0.00');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState('BTC');
  const [currentPage, setCurrentPage] = useState('tournaments');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showTournamentDetails, setShowTournamentDetails] = useState(false);

  useEffect(() => {
    const savedWallet = localStorage.getItem('walletAddress');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      setWalletBalance('0.54321');
    }
  }, []);

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(36).substr(2, 9);
      setWalletAddress(mockAddress);
      setWalletBalance('0.54321');
      localStorage.setItem('walletAddress', mockAddress);
      setIsConnecting(false);
      setShowWalletModal(false);
    }, 2000);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance('0.00');
    localStorage.removeItem('walletAddress');
  };

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const walletProviders = [
    { name: 'MetaMask', icon: '🦊' },
    { name: 'WalletConnect', icon: '🔗' },
    { name: 'Coinbase Wallet', icon: '🪙' },
    { name: 'Trust Wallet', icon: '🛡️' }
  ];

  const generateTournaments = (): Tournament[] => {
    return [
      {
        id: '1',
        name: 'Mega Slots Championship',
        game: 'Slots',
        prizePool: '50,000 USDT',
        participants: 1247,
        maxParticipants: 2000,
        startTime: '2024-01-15T10:00:00Z',
        endTime: '2024-01-20T10:00:00Z',
        status: 'active',
        entryFee: '10 USDT',
        category: 'slots',
        description: 'The biggest slots tournament of the year! Compete for massive prizes and exclusive rewards.',
        leaderboard: [
          { rank: 1, username: 'SlotKing', score: 15420, prize: '10,000 USDT', avatar: '👑' },
          { rank: 2, username: 'LuckySpin', score: 12850, prize: '5,000 USDT', avatar: '🎰' },
          { rank: 3, username: 'JackpotHunter', score: 11230, prize: '2,500 USDT', avatar: '💰' },
          { rank: 4, username: 'SpinMaster', score: 9870, prize: '1,000 USDT', avatar: '🎯' },
          { rank: 5, username: 'FortuneSeeker', score: 8540, prize: '500 USDT', avatar: '⭐' }
        ]
      },
      {
        id: '2',
        name: 'Blackjack Masters',
        game: 'Blackjack',
        prizePool: '25,000 USDT',
        participants: 856,
        maxParticipants: 1000,
        startTime: '2024-01-18T14:00:00Z',
        endTime: '2024-01-22T14:00:00Z',
        status: 'upcoming',
        entryFee: '25 USDT',
        category: 'table-games',
        description: 'Test your blackjack skills against the best players. High stakes, high rewards!',
        leaderboard: []
      },
      {
        id: '3',
        name: 'Roulette Royale',
        game: 'Roulette',
        prizePool: '30,000 USDT',
        participants: 2341,
        maxParticipants: 3000,
        startTime: '2024-01-10T08:00:00Z',
        endTime: '2024-01-15T08:00:00Z',
        status: 'completed',
        entryFee: '15 USDT',
        category: 'table-games',
        description: 'The ultimate roulette tournament with massive prize pools and exclusive rewards.',
        leaderboard: [
          { rank: 1, username: 'RoulettePro', score: 8920, prize: '8,000 USDT', avatar: '🎲' },
          { rank: 2, username: 'LuckyNumber', score: 7650, prize: '4,000 USDT', avatar: '🎯' },
          { rank: 3, username: 'SpinWizard', score: 6890, prize: '2,000 USDT', avatar: '🔮' }
        ]
      },
      {
        id: '4',
        name: 'Crypto Poker Championship',
        game: 'Poker',
        prizePool: '100,000 USDT',
        participants: 567,
        maxParticipants: 1000,
        startTime: '2024-01-25T16:00:00Z',
        endTime: '2024-01-30T16:00:00Z',
        status: 'upcoming',
        entryFee: '100 USDT',
        category: 'table-games',
        description: 'The most prestigious poker tournament in the crypto world. Are you ready to compete?',
        leaderboard: []
      },
      {
        id: '5',
        name: 'Live Casino Battle',
        game: 'Live Casino',
        prizePool: '75,000 USDT',
        participants: 1892,
        maxParticipants: 2500,
        startTime: '2024-01-12T12:00:00Z',
        endTime: '2024-01-17T12:00:00Z',
        status: 'active',
        entryFee: '20 USDT',
        category: 'live-casino',
        description: 'Experience the thrill of live casino gaming with real dealers and massive prizes.',
        leaderboard: [
          { rank: 1, username: 'LivePro', score: 12340, prize: '15,000 USDT', avatar: '🎥' },
          { rank: 2, username: 'DealerSlayer', score: 10980, prize: '7,500 USDT', avatar: '🎭' },
          { rank: 3, username: 'CasinoKing', score: 9870, prize: '3,750 USDT', avatar: '👑' }
        ]
      },
      {
        id: '6',
        name: 'Jackpot Hunters',
        game: 'Jackpots',
        prizePool: '200,000 USDT',
        participants: 3421,
        maxParticipants: 5000,
        startTime: '2024-01-20T20:00:00Z',
        endTime: '2024-01-25T20:00:00Z',
        status: 'upcoming',
        entryFee: '5 USDT',
        category: 'jackpots',
        description: 'Hunt for the biggest jackpots in crypto gaming history!',
        leaderboard: []
      }
    ];
  };

  const tournaments = generateTournaments();

  const categories = [
    { id: 'all', name: 'All Tournaments', icon: Trophy, count: tournaments.length },
    { id: 'slots', name: 'Slots', icon: Dice5, count: tournaments.filter(t => t.category === 'slots').length },
    { id: 'table-games', name: 'Table Games', icon: BarChart2, count: tournaments.filter(t => t.category === 'table-games').length },
    { id: 'live-casino', name: 'Live Casino', icon: Users, count: tournaments.filter(t => t.category === 'live-casino').length },
    { id: 'jackpots', name: 'Jackpots', icon: Crown, count: tournaments.filter(t => t.category === 'jackpots').length }
  ];

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesCategory = selectedCategory === 'all' || tournament.category === selectedCategory;
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'upcoming': return 'text-yellow-400 bg-yellow-400/10';
      case 'completed': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Zap className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'completed': return <Award className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">TB</span>
            </div>
            <span className="text-white font-bold text-xl">TucanBit</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <button
            onClick={() => handleNavigate('home')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'home' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavigate('casino')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'casino' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <Dice5 className="w-5 h-5" />
            <span>Casino</span>
          </button>

          <button
            onClick={() => handleNavigate('sports')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'sports' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <Trophy className="w-5 h-5" />
            <span>Sports</span>
          </button>

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
              <div className="pl-10 pt-1 space-y-1">
                <button onClick={() => handleNavigate('slots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <Dice5 className="w-4 h-4" />
                  <span>Slots</span>
                </button>
                <button onClick={() => handleNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <BarChart2 className="w-4 h-4" />
                  <span>Table Games</span>
                </button>
                <button onClick={() => handleNavigate('roulette')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <Target className="w-4 h-4" />
                  <span>Roulette</span>
                </button>
                <button onClick={() => handleNavigate('blackjack')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <BarChart2 className="w-4 h-4" />
                  <span>Blackjack</span>
                </button>
                <button onClick={() => handleNavigate('live-casino')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <Users className="w-4 h-4" />
                  <span>Live Casino</span>
                </button>
                <button onClick={() => handleNavigate('jackpots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <Crown className="w-4 h-4" />
                  <span>Jackpots</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavigate('promotions')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'promotions' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <Star className="w-5 h-5" />
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

          <button
            onClick={() => handleNavigate('earn')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'earn' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Earn</span>
          </button>

          <button
            onClick={() => handleNavigate('task-dashboard')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'task-dashboard' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>Task Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigate('support')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'support' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <Users className="w-5 h-5" />
            <span>Support</span>
          </button>

          <button
            onClick={() => handleNavigate('community')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'community' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <Globe className="w-5 h-5" />
            <span>Community</span>
          </button>

          <button
            onClick={() => handleNavigate('settings')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'settings' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Wallet Connection */}
        <div className="p-4 border-t border-gray-800">
          {walletAddress ? (
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Connected</span>
                <button
                  onClick={disconnectWallet}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Disconnect
                </button>
              </div>
              <div className="text-xs text-gray-300 font-mono mb-1">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-white">{walletBalance}</span>
                <span className="text-xs text-gray-400">{walletCurrency}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowWalletModal(true)}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">TB</span>
            </div>
            <span className="text-white font-bold text-xl">TucanBit</span>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[70vh] min-h-[600px] flex items-center">
          <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">TucanBit</span> Tournaments
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Compete in epic tournaments, win massive prizes, and become a legend in the crypto gaming world!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-8 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Join Tournament</span>
                </button>
                <button className="bg-gray-800 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>View Leaderboards</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tournaments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                  >
                    <div className="grid grid-cols-2 gap-1 w-4 h-4">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                  >
                    <div className="space-y-1 w-4 h-4">
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className="bg-black/20 px-2 py-1 rounded text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-yellow-500/50"
                    onClick={() => {
                      setSelectedTournament(tournament);
                      setShowTournamentDetails(true);
                    }}
                  >
                    {/* Tournament Header */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                          {getStatusIcon(tournament.status)}
                          <span className="capitalize">{tournament.status}</span>
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{tournament.name}</h3>
                        <p className="text-gray-200 text-sm">{tournament.game}</p>
                      </div>
                    </div>

                    {/* Tournament Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{tournament.prizePool}</div>
                          <div className="text-xs text-gray-400">Prize Pool</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{tournament.entryFee}</div>
                          <div className="text-xs text-gray-400">Entry Fee</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Participants</span>
                          <span className="text-white">{tournament.participants.toLocaleString()}/{tournament.maxParticipants.toLocaleString()}</span>
                        </div>
                        
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(tournament.participants, tournament.maxParticipants)}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Start Time</span>
                          <span className="text-white">{formatTime(tournament.startTime)}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">End Time</span>
                          <span className="text-white">{formatTime(tournament.endTime)}</span>
                        </div>
                      </div>

                      <button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Join Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-yellow-500/50"
                    onClick={() => {
                      setSelectedTournament(tournament);
                      setShowTournamentDetails(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{tournament.name}</h3>
                          <p className="text-gray-400">{tournament.game}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                              {getStatusIcon(tournament.status)}
                              <span className="capitalize">{tournament.status}</span>
                            </span>
                            <span className="text-sm text-gray-400">{tournament.participants.toLocaleString()} participants</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">{tournament.prizePool}</div>
                        <div className="text-sm text-gray-400 mb-2">Prize Pool</div>
                        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 text-sm">
                          Join Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Tournament Details Modal */}
      {showTournamentDetails && selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowTournamentDetails(false)}></div>
          <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedTournament.name}</h2>
                <button
                  onClick={() => setShowTournamentDetails(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tournament Info */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Tournament Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Game:</span>
                      <span className="text-white">{selectedTournament.game}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-yellow-400 font-bold">{selectedTournament.prizePool}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Entry Fee:</span>
                      <span className="text-white">{selectedTournament.entryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Participants:</span>
                      <span className="text-white">{selectedTournament.participants.toLocaleString()}/{selectedTournament.maxParticipants.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Time:</span>
                      <span className="text-white">{formatTime(selectedTournament.startTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Time:</span>
                      <span className="text-white">{formatTime(selectedTournament.endTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTournament.status)}`}>
                        {getStatusIcon(selectedTournament.status)}
                        <span className="capitalize">{selectedTournament.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                    <p className="text-gray-300">{selectedTournament.description}</p>
                  </div>
                  
                  <button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Join Tournament</span>
                  </button>
                </div>

                {/* Leaderboard */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Leaderboard</h3>
                  {selectedTournament.leaderboard.length > 0 ? (
                    <div className="space-y-3">
                      {selectedTournament.leaderboard.map((player, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                              {player.rank}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{player.avatar}</span>
                              <span className="text-white font-medium">{player.username}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">{player.score.toLocaleString()}</div>
                            <div className="text-yellow-400 text-sm">{player.prize}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Leaderboard will be available once the tournament starts</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowWalletModal(false)}></div>
          <div className="relative bg-gray-900 rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
              <p className="text-gray-400">Choose your preferred wallet to connect</p>
            </div>
            
            <div className="space-y-3">
              {walletProviders.map((provider) => (
                <button
                  key={provider.name}
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <span className="text-2xl">{provider.icon}</span>
                  <span className="text-white font-medium">{provider.name}</span>
                  {isConnecting && <div className="ml-auto w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowWalletModal(false)}
              className="w-full mt-4 p-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentPage; 