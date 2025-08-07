import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Trophy, 
  Crown, 
  Star, 
  Zap, 
  Target, 
  Award, 
  Gift, 
  Calendar, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Copy, 
  Check, 
  Settings, 
  HelpCircle, 
  MessageCircle, 
  Shield, 
  FileText, 
  Globe, 
  Play, 
  Flame, 
  Sparkles, 
  Heart, 
  X as CloseIcon,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Grid,
  List,
  Wallet,
  DollarSign,
  Coins,
  BarChart3,
  PieChart,
  Activity,
  User,
  CreditCard,
  LogOut,
  Scale,
  Lock,
  Cookie,
  Dice5,
  Briefcase,
  Diamond,
  BarChart2,
  LifeBuoy,
  Home,
  Gamepad2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import tribalCasinosBg from '../assets/tribal-casinos.jpg';

interface Tribe {
  id: string;
  name: string;
  leader: string;
  members: number;
  maxMembers: number;
  totalWinnings: string;
  rank: number;
  status: 'active' | 'recruiting' | 'full';
  description: string;
  requirements: string[];
  benefits: string[];
  leaderboard: Array<{
    rank: number;
    username: string;
    score: number;
    winnings: string;
    avatar: string;
  }>;
  tournaments: Array<{
    id: string;
    name: string;
    prizePool: string;
    startTime: string;
    endTime: string;
    status: 'upcoming' | 'active' | 'completed';
  }>;
}

const TribesPage: React.FC = () => {
  const { walletAddress, openModal } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);
  const [showTribeDetails, setShowTribeDetails] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Generate sample tribes data
  const generateTribes = (): Tribe[] => {
    return [
      {
        id: '1',
        name: 'Phoenix Warriors',
        leader: 'CryptoKing',
        members: 45,
        maxMembers: 50,
        totalWinnings: '2.5 BTC',
        rank: 1,
        status: 'active',
        description: 'Elite gaming tribe focused on high-stakes tournaments and strategic gameplay. We dominate the leaderboards and share exclusive strategies.',
        requirements: ['Minimum 100 games played', 'Positive win rate', 'Active participation'],
        benefits: ['Exclusive tournaments', 'Strategy sharing', 'Bonus rewards', 'VIP access'],
        leaderboard: [
          { rank: 1, username: 'CryptoKing', score: 9850, winnings: '0.8 BTC', avatar: '👑' },
          { rank: 2, username: 'LuckyStrike', score: 8720, winnings: '0.6 BTC', avatar: '🎯' },
          { rank: 3, username: 'DiamondHands', score: 8150, winnings: '0.5 BTC', avatar: '💎' },
        ],
        tournaments: [
          { id: '1', name: 'Weekly Championship', prizePool: '1.2 BTC', startTime: '2024-01-15', endTime: '2024-01-22', status: 'active' },
          { id: '2', name: 'Monthly Masters', prizePool: '3.5 BTC', startTime: '2024-02-01', endTime: '2024-02-28', status: 'upcoming' },
        ]
      },
      {
        id: '2',
        name: 'Dragon Slayers',
        leader: 'GameMaster',
        members: 38,
        maxMembers: 40,
        totalWinnings: '1.8 BTC',
        rank: 2,
        status: 'recruiting',
        description: 'Aggressive players who specialize in live casino games and high-roller tournaments. We hunt for big wins together.',
        requirements: ['Minimum 50 live games', 'Bankroll management', 'Team player'],
        benefits: ['Live game bonuses', 'High-roller access', 'Team strategies', 'Priority support'],
        leaderboard: [
          { rank: 1, username: 'GameMaster', score: 7650, winnings: '0.5 BTC', avatar: '🎮' },
          { rank: 2, username: 'LiveHunter', score: 6980, winnings: '0.4 BTC', avatar: '🎲' },
          { rank: 3, username: 'CasinoPro', score: 6320, winnings: '0.3 BTC', avatar: '♠️' },
        ],
        tournaments: [
          { id: '3', name: 'Live Casino Challenge', prizePool: '2.0 BTC', startTime: '2024-01-20', endTime: '2024-01-27', status: 'upcoming' },
        ]
      },
      {
        id: '3',
        name: 'Lucky Legends',
        leader: 'FortuneSeeker',
        members: 50,
        maxMembers: 50,
        totalWinnings: '1.2 BTC',
        rank: 3,
        status: 'full',
        description: 'Community-focused tribe that believes in sharing luck and supporting each other. We celebrate every win together.',
        requirements: ['Positive attitude', 'Community participation', 'Regular activity'],
        benefits: ['Community events', 'Shared bonuses', 'Mentorship program', 'Social features'],
        leaderboard: [
          { rank: 1, username: 'FortuneSeeker', score: 5890, winnings: '0.3 BTC', avatar: '🍀' },
          { rank: 2, username: 'LuckyCharm', score: 5420, winnings: '0.25 BTC', avatar: '✨' },
          { rank: 3, username: 'HappyGamer', score: 4980, winnings: '0.2 BTC', avatar: '😊' },
        ],
        tournaments: [
          { id: '4', name: 'Community Cup', prizePool: '0.8 BTC', startTime: '2024-01-25', endTime: '2024-02-01', status: 'upcoming' },
        ]
      },
      {
        id: '4',
        name: 'Slot Masters',
        leader: 'SpinDoctor',
        members: 25,
        maxMembers: 30,
        totalWinnings: '0.9 BTC',
        rank: 4,
        status: 'recruiting',
        description: 'Specialized in slot machine strategies and bonus hunting. We know every slot game inside and out.',
        requirements: ['Slot game experience', 'Bonus hunting knowledge', 'Patience'],
        benefits: ['Slot strategies', 'Bonus alerts', 'RTP analysis', 'Exclusive slots'],
        leaderboard: [
          { rank: 1, username: 'SpinDoctor', score: 4560, winnings: '0.25 BTC', avatar: '🎰' },
          { rank: 2, username: 'BonusHunter', score: 4120, winnings: '0.2 BTC', avatar: '🎁' },
          { rank: 3, username: 'SlotQueen', score: 3780, winnings: '0.15 BTC', avatar: '👑' },
        ],
        tournaments: [
          { id: '5', name: 'Slot Championship', prizePool: '1.5 BTC', startTime: '2024-02-05', endTime: '2024-02-12', status: 'upcoming' },
        ]
      },
      {
        id: '5',
        name: 'Crypto Elite',
        leader: 'BitcoinBaron',
        members: 20,
        maxMembers: 25,
        totalWinnings: '3.2 BTC',
        rank: 5,
        status: 'active',
        description: 'High-stakes crypto players who focus on Bitcoin games and large tournaments. We play to win big.',
        requirements: ['Minimum 1 BTC bankroll', 'High-stakes experience', 'Risk management'],
        benefits: ['High-stakes tables', 'VIP treatment', 'Exclusive events', 'Personal manager'],
        leaderboard: [
          { rank: 1, username: 'BitcoinBaron', score: 12450, winnings: '1.2 BTC', avatar: '₿' },
          { rank: 2, username: 'CryptoWhale', score: 11890, winnings: '1.0 BTC', avatar: '🐋' },
          { rank: 3, username: 'DiamondHands', score: 11230, winnings: '0.8 BTC', avatar: '💎' },
        ],
        tournaments: [
          { id: '6', name: 'Bitcoin Millionaire', prizePool: '5.0 BTC', startTime: '2024-02-10', endTime: '2024-02-17', status: 'upcoming' },
        ]
      }
    ];
  };

  const [tribes] = useState<Tribe[]>(generateTribes());

  const filteredTribes = tribes.filter(tribe => {
    const matchesSearch = tribe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tribe.leader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || tribe.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'recruiting': return 'text-yellow-400';
      case 'full': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4" />;
      case 'recruiting': return <Users className="w-4 h-4" />;
      case 'full': return <CloseIcon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getProgressPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${tribalCasinosBg})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        
        {/* Animated Glowing Lights */}
        <div className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50"></div>
        <div className="absolute top-8 right-8 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-8 left-8 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-8 right-8 w-11 h-11 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Moving Glowing Lights */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle shadow-lg shadow-yellow-500/50"></div>
        <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle2 shadow-lg shadow-yellow-500/50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-9 h-9 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle2 shadow-lg shadow-yellow-500/50" style={{ animationDelay: '6s' }}></div>
        
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg">TucanBit</span> Tribes
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed drop-shadow-lg">
              Join exclusive gaming communities, compete in tournaments, and share strategies with fellow players.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => openModal('walletConnect')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl"
              >
                <Wallet className="w-6 h-6" />
                <span>{walletAddress ? 'Connected' : 'Connect Wallet'}</span>
              </button>
              <Link
                to="/tournaments"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl"
              >
                <Trophy className="w-6 h-6" />
                <span>View Tournaments</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Tribes</p>
                  <p className="text-2xl font-bold text-white">{tribes.filter(t => t.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Members</p>
                  <p className="text-2xl font-bold text-white">{tribes.reduce((sum, tribe) => sum + tribe.members, 0)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Winnings</p>
                  <p className="text-2xl font-bold text-white">9.6 BTC</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Tournaments</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-900 border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tribes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="all">All Tribes</option>
                <option value="active">Active</option>
                <option value="recruiting">Recruiting</option>
                <option value="full">Full</option>
              </select>
              <div className="flex bg-gray-800 border border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tribes Grid */}
      <section className="py-12 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTribes.map((tribe) => (
                <div key={tribe.id} className="bg-gray-800 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{tribe.name}</h3>
                          <p className="text-sm text-gray-400">Leader: {tribe.leader}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(tribe.status)}`}>
                        {getStatusIcon(tribe.status)}
                        <span className="capitalize">{tribe.status}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{tribe.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Members</span>
                        <span className="text-white text-sm">{tribe.members}/{tribe.maxMembers}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(tribe.members, tribe.maxMembers)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Winnings</span>
                        <span className="text-yellow-400 font-semibold">{tribe.totalWinnings}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Rank</span>
                        <span className="text-white font-semibold">#{tribe.rank}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTribe(tribe);
                          setShowTribeDetails(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
                      >
                        View Details
                      </button>
                      {tribe.status === 'recruiting' && (
                        <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200">
                          Join Tribe
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTribes.map((tribe) => (
                <div key={tribe.id} className="bg-gray-800 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all duration-300 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{tribe.name}</h3>
                        <p className="text-sm text-gray-400">Leader: {tribe.leader}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Members</p>
                        <p className="text-white font-semibold">{tribe.members}/{tribe.maxMembers}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Winnings</p>
                        <p className="text-yellow-400 font-semibold">{tribe.totalWinnings}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Rank</p>
                        <p className="text-white font-semibold">#{tribe.rank}</p>
                      </div>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(tribe.status)}`}>
                        {getStatusIcon(tribe.status)}
                        <span className="capitalize">{tribe.status}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTribe(tribe);
                          setShowTribeDetails(true);
                        }}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tribe Details Modal */}
      {showTribeDetails && selectedTribe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedTribe.name}</h2>
                <button
                  onClick={() => setShowTribeDetails(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Tribe Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Leader:</span>
                        <span className="text-white">{selectedTribe.leader}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Members:</span>
                        <span className="text-white">{selectedTribe.members}/{selectedTribe.maxMembers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Winnings:</span>
                        <span className="text-yellow-400 font-semibold">{selectedTribe.totalWinnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rank:</span>
                        <span className="text-white">#{selectedTribe.rank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`capitalize ${getStatusColor(selectedTribe.status)}`}>
                          {selectedTribe.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                    <p className="text-gray-300">{selectedTribe.description}</p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedTribe.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-300">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedTribe.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-300">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Leaderboard</h3>
                    <div className="space-y-2">
                      {selectedTribe.leaderboard.map((player) => (
                        <div key={player.rank} className="flex items-center justify-between p-2 bg-gray-600 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{player.avatar}</span>
                            <div>
                              <p className="text-white font-semibold">{player.username}</p>
                              <p className="text-gray-400 text-sm">Score: {player.score}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-yellow-400 font-semibold">{player.winnings}</p>
                            <p className="text-gray-400 text-sm">#{player.rank}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Active Tournaments</h3>
                    <div className="space-y-2">
                      {selectedTribe.tournaments.map((tournament) => (
                        <div key={tournament.id} className="p-3 bg-gray-600 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold">{tournament.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              tournament.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              tournament.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {tournament.status}
                            </span>
                          </div>
                          <p className="text-yellow-400 font-semibold mb-1">Prize Pool: {tournament.prizePool}</p>
                          <p className="text-gray-400 text-sm">
                            {tournament.startTime} - {tournament.endTime}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                {selectedTribe.status === 'recruiting' && (
                  <button className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200">
                    Join Tribe
                  </button>
                )}
                <button className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                  View Tournaments
                </button>
                <button
                  onClick={() => setShowTribeDetails(false)}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Join a Tribe?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Exclusive Tournaments</h3>
              <p className="text-gray-300">Access to private tournaments with higher prize pools and exclusive rewards only available to tribe members.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Community Support</h3>
              <p className="text-gray-300">Learn from experienced players, share strategies, and get support from your tribe members in your gaming journey.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bonus Rewards</h3>
              <p className="text-gray-300">Enjoy exclusive bonuses, cashback, and rewards that are only available to active tribe members.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join a Tribe?</h2>
          <p className="text-xl text-gray-300 mb-10">Connect your wallet and start your journey with the ultimate gaming community!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openModal('walletConnect')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
            <Link
              to="/tournaments"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Trophy className="w-5 h-5" />
              <span>Browse Tournaments</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TribesPage; 