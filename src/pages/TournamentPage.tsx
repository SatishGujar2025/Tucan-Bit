import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Home,
  Gamepad2,
  Dice5,
  Trophy,
  Briefcase,
  Diamond,
  BarChart2,
  LifeBuoy,
  User,
  CreditCard,
  LogOut,
  Scale,
  Lock,
  Cookie,
  Play,
  Flame,
  Sparkles,
  Crown,
  Heart,
  X as CloseIcon
} from 'lucide-react';
import PromotionalBanner from '../components/ui/PromotionalBanner';

interface TournamentPageProps {
  onNavigate?: (page: string) => void;
}

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
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [currentPage, setCurrentPage] = useState('tournaments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showTournamentDetails, setShowTournamentDetails] = useState(false);

  // Add/remove modal-open class when tournament details modal is open
  useEffect(() => {
    if (showTournamentDetails) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showTournamentDetails]);

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

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      const mockBalance = (Math.random() * 10).toFixed(4);
      const currency = Math.random() > 0.5 ? 'ETH' : 'SOL';
      
      setWalletAddress(mockAddress);
      setWalletBalance(mockBalance);
      setWalletCurrency(currency);
      
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletBalance', mockBalance);
      localStorage.setItem('walletCurrency', currency);
      
      setShowWalletModal(false);
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

  const generateTournaments = (): Tournament[] => {
    const games = ['Poker', 'Blackjack', 'Roulette', 'Slots', 'Baccarat', 'Craps', 'Keno', 'Bingo'];
    const categories = ['Poker', 'Table Games', 'Slots', 'Live Casino', 'Jackpots'];
    const statuses: ('upcoming' | 'active' | 'completed')[] = ['upcoming', 'active', 'completed'];
    
    return Array.from({ length: 12 }, (_, i) => ({
      id: `tournament-${i + 1}`,
      name: `${games[i % games.length]} Championship ${i + 1}`,
      game: games[i % games.length],
      prizePool: `$${(Math.random() * 10000 + 1000).toFixed(0)}`,
      participants: Math.floor(Math.random() * 500) + 50,
      maxParticipants: Math.floor(Math.random() * 1000) + 200,
      startTime: new Date(Date.now() + Math.random() * 86400000).toISOString(),
      endTime: new Date(Date.now() + Math.random() * 86400000 + 3600000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      entryFee: `$${(Math.random() * 100 + 10).toFixed(0)}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `Join the ultimate ${games[i % games.length]} tournament with massive prizes and intense competition!`,
      leaderboard: Array.from({ length: 10 }, (_, j) => ({
        rank: j + 1,
        username: `Player${j + 1}`,
        score: Math.floor(Math.random() * 10000) + 1000,
        prize: `$${(Math.random() * 1000 + 100).toFixed(0)}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Player${j + 1}`
      }))
    }));
  };

  const tournaments = generateTournaments();

  useEffect(() => {
    let filtered = tournaments;

    if (searchTerm) {
      filtered = filtered.filter(tournament =>
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tournament => tournament.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(tournament => tournament.status === selectedStatus);
    }

    setFilteredTournaments(filtered);
  }, [searchTerm, selectedCategory, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-3 h-3" />;
      case 'upcoming': return <Clock className="w-3 h-3" />;
      case 'completed': return <Check className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  return (
    <div>
      {/* Hero Section with Background - Clickable to Promotions */}
      <section 
        className="relative overflow-hidden h-[60vh] min-h-[500px] flex items-center cursor-pointer"
        onClick={() => navigate('/promotions')}
      >
        <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
        </div>
        <div className="relative p-6 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">TucanBit</span> Tournaments
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compete in epic tournaments, win massive prizes, and become a legend in the crypto gaming world!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Scroll to tournament grid
                  document.querySelector('.tournament-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Join Tournaments</span>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Show leaderboard modal or navigate to leaderboard page
                  alert('Leaderboards feature coming soon! 🏆');
                }}
                className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-600"
              >
                <BarChart2 className="w-5 h-5" />
                <span>View Leaderboards</span>
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-yellow-400 text-sm font-medium">Click anywhere on banner to view tournament promotions →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="p-6">
        {/* Promotional Banner */}
        <PromotionalBanner />
        
        {/* Search and Filters */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md w-full">
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
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', name: 'All', count: tournaments.length },
              { id: 'Poker', name: 'Poker', count: tournaments.filter(t => t.category === 'Poker').length },
              { id: 'Table Games', name: 'Table Games', count: tournaments.filter(t => t.category === 'Table Games').length },
              { id: 'Slots', name: 'Slots', count: tournaments.filter(t => t.category === 'Slots').length },
              { id: 'Live Casino', name: 'Live Casino', count: tournaments.filter(t => t.category === 'Live Casino').length },
              { id: 'Jackpots', name: 'Jackpots', count: tournaments.filter(t => t.category === 'Jackpots').length }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{category.name}</span>
                <span className="bg-black/20 px-2 py-1 rounded text-xs font-bold">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tournament Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-400 text-sm">
            {filteredTournaments.length} tournaments found
          </div>
        </div>

        {/* Tournament Grid/List */}
        {viewMode === 'grid' ? (
          <div className="tournament-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-200 cursor-pointer min-h-[200px] flex flex-col justify-between"
                onClick={() => {
                  setSelectedTournament(tournament);
                  setShowTournamentDetails(true);
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400 font-medium">{tournament.category}</span>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                    {getStatusIcon(tournament.status)}
                    <span className="capitalize">{tournament.status}</span>
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-4 leading-tight">{tournament.name}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Prize:</span>
                    <span className="text-yellow-400 font-bold text-lg">{tournament.prizePool}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Entry:</span>
                    <span className="text-white font-semibold">{tournament.entryFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Players:</span>
                    <span className="text-white font-semibold">{tournament.participants.toLocaleString()}/{tournament.maxParticipants.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-sm text-gray-400">
                    {tournament.game}
                  </div>
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 text-sm">
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
                onClick={() => {
                  setSelectedTournament(tournament);
                  setShowTournamentDetails(true);
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                        {getStatusIcon(tournament.status)}
                        <span className="capitalize">{tournament.status}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-400 font-medium">Game:</span>
                        <span className="text-white font-semibold sm:ml-2">{tournament.game}</span>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-400 font-medium">Prize Pool:</span>
                        <span className="text-yellow-400 font-bold text-lg sm:ml-2">{tournament.prizePool}</span>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-400 font-medium">Entry Fee:</span>
                        <span className="text-white font-semibold sm:ml-2">{tournament.entryFee}</span>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-400 font-medium">Players:</span>
                        <span className="text-white font-semibold sm:ml-2">{tournament.participants.toLocaleString()}/{tournament.maxParticipants.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 text-sm whitespace-nowrap">
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>



      {/* Tournament Details Modal - Compact & Clean */}
      {showTournamentDetails && selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white truncate pr-4">{selectedTournament.name}</h2>
                <button
                  onClick={() => setShowTournamentDetails(false)}
                  className="text-white hover:text-gray-200 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-yellow-400 font-bold text-lg">{selectedTournament.prizePool}</div>
                  <div className="text-gray-400 text-xs">Prize Pool</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-white font-bold text-lg">{selectedTournament.entryFee}</div>
                  <div className="text-gray-400 text-xs">Entry Fee</div>
                </div>
              </div>

              {/* Key Info */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Game:</span>
                  <span className="text-white font-medium">{selectedTournament.game}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Players:</span>
                  <span className="text-white font-medium">{selectedTournament.participants}/{selectedTournament.maxParticipants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTournament.status)}`}>
                    {getStatusIcon(selectedTournament.status)}
                    <span className="capitalize">{selectedTournament.status}</span>
                  </span>
                </div>
              </div>

              {/* Join Button */}
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Join Tournament</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentPage; 