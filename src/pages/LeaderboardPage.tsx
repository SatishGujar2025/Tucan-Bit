import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Crown, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  Filter,
  Search,
  Grid,
  List,
  Users,
  DollarSign,
  Coins,
  BarChart3,
  Activity,
  Target,
  Award,
  Gift,
  Zap,
  Flame,
  Sparkles,
  Heart,
  ChevronRight,
  ChevronDown,
  Wallet,
  User,
  Gamepad2,
  Bitcoin,
  Medal,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  totalWinnings: string;
  gamesPlayed: number;
  winRate: number;
  biggestWin: string;
  favoriteGame: string;
  country: string;
  isOnline: boolean;
  trend: 'up' | 'down' | 'stable';
  change: number;
  achievements: string[];
  level: number;
  experience: number;
}

interface GameCategory {
  id: string;
  name: string;
  icon: string;
  totalPlayers: number;
  totalPrizePool: string;
}

const LeaderboardPage: React.FC = () => {
  const { walletAddress, openModal } = useAppContext();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'allTime'>('weekly');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Generate sample leaderboard data
  const generateLeaderboardData = (): LeaderboardEntry[] => {
    return [
      {
        id: '1',
        rank: 1,
        username: 'CryptoKing',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '2.45 BTC',
        gamesPlayed: 1247,
        winRate: 68.5,
        biggestWin: '0.85 BTC',
        favoriteGame: 'Blackjack',
        country: '🇺🇸',
        isOnline: true,
        trend: 'up',
        change: 2,
        achievements: ['High Roller', 'Win Streak', 'Lucky 7'],
        level: 42,
        experience: 15420
      },
      {
        id: '2',
        rank: 2,
        username: 'LuckyDragon',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '1.98 BTC',
        gamesPlayed: 892,
        winRate: 72.1,
        biggestWin: '0.62 BTC',
        favoriteGame: 'Roulette',
        country: '🇨🇦',
        isOnline: true,
        trend: 'up',
        change: 1,
        achievements: ['Roulette Master', 'Consistent Winner'],
        level: 38,
        experience: 12850
      },
      {
        id: '3',
        rank: 3,
        username: 'SlotQueen',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '1.76 BTC',
        gamesPlayed: 2156,
        winRate: 45.2,
        biggestWin: '1.2 BTC',
        favoriteGame: 'Crazy Time',
        country: '🇬🇧',
        isOnline: false,
        trend: 'down',
        change: 1,
        achievements: ['Slot Master', 'Big Win'],
        level: 35,
        experience: 11200
      },
      {
        id: '4',
        rank: 4,
        username: 'PokerPro',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '1.54 BTC',
        gamesPlayed: 567,
        winRate: 78.9,
        biggestWin: '0.45 BTC',
        favoriteGame: 'Poker',
        country: '🇦🇺',
        isOnline: true,
        trend: 'stable',
        change: 0,
        achievements: ['Poker Champion', 'Bluff Master'],
        level: 31,
        experience: 9850
      },
      {
        id: '5',
        rank: 5,
        username: 'BitcoinBaron',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '1.32 BTC',
        gamesPlayed: 743,
        winRate: 65.7,
        biggestWin: '0.38 BTC',
        favoriteGame: 'Baccarat',
        country: '🇩🇪',
        isOnline: true,
        trend: 'up',
        change: 3,
        achievements: ['Baccarat Expert', 'High Stakes'],
        level: 28,
        experience: 8450
      },
      {
        id: '6',
        rank: 6,
        username: 'CasinoCrusher',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '1.18 BTC',
        gamesPlayed: 1023,
        winRate: 58.3,
        biggestWin: '0.52 BTC',
        favoriteGame: 'Slots',
        country: '🇫🇷',
        isOnline: false,
        trend: 'down',
        change: 2,
        achievements: ['Slot Hunter', 'Lucky Streak'],
        level: 25,
        experience: 7200
      },
      {
        id: '7',
        rank: 7,
        username: 'GoldenGambler',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '1.05 BTC',
        gamesPlayed: 456,
        winRate: 81.2,
        biggestWin: '0.29 BTC',
        favoriteGame: 'Blackjack',
        country: '🇯🇵',
        isOnline: true,
        trend: 'up',
        change: 4,
        achievements: ['Blackjack Ace', 'Perfect Play'],
        level: 22,
        experience: 6100
      },
      {
        id: '8',
        rank: 8,
        username: 'WinningWizard',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '0.98 BTC',
        gamesPlayed: 678,
        winRate: 62.8,
        biggestWin: '0.41 BTC',
        favoriteGame: 'Roulette',
        country: '🇮🇹',
        isOnline: true,
        trend: 'stable',
        change: 0,
        achievements: ['Roulette Pro', 'Number Hunter'],
        level: 19,
        experience: 5400
      },
      {
        id: '9',
        rank: 9,
        username: 'FortuneFinder',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '0.87 BTC',
        gamesPlayed: 892,
        winRate: 54.6,
        biggestWin: '0.67 BTC',
        favoriteGame: 'Crazy Time',
        country: '🇪🇸',
        isOnline: false,
        trend: 'down',
        change: 1,
        achievements: ['Live Game Expert', 'Big Spender'],
        level: 16,
        experience: 4800
      },
      {
        id: '10',
        rank: 10,
        username: 'CryptoChampion',
        avatar: 'https://iili.io/FwSX1Xj.png',
        totalWinnings: '0.76 BTC',
        gamesPlayed: 345,
        winRate: 85.1,
        biggestWin: '0.23 BTC',
        favoriteGame: 'Poker',
        country: '🇳🇱',
        isOnline: true,
        trend: 'up',
        change: 5,
        achievements: ['Poker Master', 'High Roller'],
        level: 13,
        experience: 4200
      }
    ];
  };

  const gameCategories: GameCategory[] = [
    {
      id: 'slots',
      name: 'Slots',
      icon: '🎰',
      totalPlayers: 15420,
      totalPrizePool: '45.2 BTC'
    },
    {
      id: 'blackjack',
      name: 'Blackjack',
      icon: '🃏',
      totalPlayers: 8920,
      totalPrizePool: '28.7 BTC'
    },
    {
      id: 'roulette',
      name: 'Roulette',
      icon: '🎲',
      totalPlayers: 12340,
      totalPrizePool: '32.1 BTC'
    },
    {
      id: 'poker',
      name: 'Poker',
      icon: '♠️',
      totalPlayers: 5670,
      totalPrizePool: '18.9 BTC'
    },
    {
      id: 'live-casino',
      name: 'Live Casino',
      icon: '🎥',
      totalPlayers: 9870,
      totalPrizePool: '25.4 BTC'
    },
    {
      id: 'jackpots',
      name: 'Jackpots',
      icon: '💰',
      totalPlayers: 4560,
      totalPrizePool: '67.8 BTC'
    }
  ];

  const [leaderboardData] = useState<LeaderboardEntry[]>(generateLeaderboardData());

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDownIcon className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Award className="w-5 h-5 text-orange-400" />;
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const filteredData = leaderboardData.filter(entry => {
    const matchesSearch = entry.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === 'all' || entry.favoriteGame.toLowerCase() === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Global</span> Leaderboard
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compete with the best players worldwide and climb the ranks to earn exclusive rewards and recognition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal('walletConnect')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Wallet className="w-5 h-5" />
                <span>{walletAddress ? 'Connected' : 'Connect Wallet'}</span>
              </button>
              <Link
                to="/tournaments"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Join Tournaments</span>
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
                  <p className="text-gray-400 text-sm">Total Players</p>
                  <p className="text-2xl font-bold text-white">56,420</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Prize Pool</p>
                  <p className="text-2xl font-bold text-white">218.1 BTC</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Bitcoin className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Games</p>
                  <p className="text-2xl font-bold text-white">6</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Your Rank</p>
                  <p className="text-2xl font-bold text-white">#1,247</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-12 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Game Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameCategories.map((category) => (
              <div key={category.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300 cursor-pointer">
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm mb-1">{category.totalPlayers.toLocaleString()} players</p>
                  <p className="text-yellow-400 text-sm font-semibold">{category.totalPrizePool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Timeframe Filter */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="allTime">All Time</option>
                </select>
              </div>

              {/* Game Filter */}
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">All Games</option>
                  <option value="blackjack">Blackjack</option>
                  <option value="roulette">Roulette</option>
                  <option value="slots">Slots</option>
                  <option value="poker">Poker</option>
                  <option value="baccarat">Baccarat</option>
                  <option value="crazy time">Crazy Time</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-yellow-500 w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-8 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Top Players - {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}</h3>
            </div>

            {/* Leaderboard List */}
            <div className="divide-y divide-gray-700">
              {filteredData.map((entry) => (
                <div key={entry.id} className="p-6 hover:bg-gray-750 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    {/* Rank and User Info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={entry.avatar}
                            alt={entry.username}
                            className="w-12 h-12 rounded-full border-2 border-gray-600"
                          />
                          {entry.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold flex items-center space-x-2">
                            <span>{entry.username}</span>
                            <span className="text-lg">{entry.country}</span>
                          </h4>
                          <p className="text-gray-400 text-sm">Level {entry.level} • {entry.favoriteGame}</p>
                        </div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-yellow-400 font-bold text-lg">{entry.totalWinnings}</p>
                        <p className="text-gray-400 text-sm">Total Winnings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold">{entry.gamesPlayed}</p>
                        <p className="text-gray-400 text-sm">Games</p>
                      </div>
                      <div className="text-center">
                        <p className="text-green-400 font-semibold">{entry.winRate}%</p>
                        <p className="text-gray-400 text-sm">Win Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-purple-400 font-semibold">{entry.biggestWin}</p>
                        <p className="text-gray-400 text-sm">Biggest Win</p>
                      </div>
                    </div>

                    {/* Trend and Actions */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(entry.trend)}
                        <span className={`text-sm font-semibold ${entry.trend === 'up' ? 'text-green-400' : entry.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                          {entry.change > 0 ? '+' : ''}{entry.change}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(entry.username)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedAddress === entry.username ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mt-4 flex items-center space-x-2">
                    {entry.achievements.map((achievement, index) => (
                      <span key={index} className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prize Distribution */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Prize Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8 border border-yellow-500/30 text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1st Place</h3>
              <p className="text-3xl font-bold text-yellow-400 mb-2">5.0 BTC</p>
              <p className="text-gray-400">+ Exclusive VIP Status</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-300/30 text-center">
              <div className="w-16 h-16 bg-gray-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2nd Place</h3>
              <p className="text-3xl font-bold text-gray-300 mb-2">2.5 BTC</p>
              <p className="text-gray-400">+ Premium Features</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-orange-500/30 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3rd Place</h3>
              <p className="text-3xl font-bold text-orange-400 mb-2">1.0 BTC</p>
              <p className="text-gray-400">+ Special Rewards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaderboardPage; 