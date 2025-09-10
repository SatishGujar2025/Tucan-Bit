import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Crown, 
  Star, 
  Award, 
  Gift, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Copy, 
  Check, 
  Share2,
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
  TrendingDown as TrendingDownIcon,
  Lock,
  Unlock,
  CheckCircle,
  Circle,
  XCircle,
  AlertCircle,
  Badge,
  Shield,
  Sword,
  Gem,
  Diamond,
  Rainbow,
  Moon,
  Sun,
  Globe,
  Compass,
  Map,
  Flag,
  Bell,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Rocket,
  Infinity,
  Percent,
  Hash,
  Plus,
  Minus,
  Equal,
  Divide
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'gaming' | 'social' | 'milestone' | 'special' | 'seasonal';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  reward: {
    type: 'coins' | 'experience' | 'badge' | 'title' | 'bonus';
    amount: number;
    description: string;
  };
  dateUnlocked?: string;
  requirements: string[];
  xpReward: number;
  level: number;
}

interface AchievementCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  totalAchievements: number;
  completedAchievements: number;
  color: string;
}

const AchievementsPage: React.FC = () => {
  const { walletAddress, openModal } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Generate sample achievements data
  const generateAchievements = (): Achievement[] => {
    return [
      {
        id: '1',
        title: 'First Steps',
        description: 'Play your first game on TucanBit',
        category: 'gaming',
        rarity: 'common',
        icon: '🎮',
        progress: 1,
        maxProgress: 1,
        isCompleted: true,
        isUnlocked: true,
        reward: {
          type: 'experience',
          amount: 100,
          description: '100 XP'
        },
        dateUnlocked: '2024-01-15',
        requirements: ['Play 1 game'],
        xpReward: 100,
        level: 1
      },
      {
        id: '2',
        title: 'High Roller',
        description: 'Win 1 BTC in a single game',
        category: 'milestone',
        rarity: 'legendary',
        icon: '💰',
        progress: 0,
        maxProgress: 1,
        isCompleted: false,
        isUnlocked: false,
        reward: {
          type: 'badge',
          amount: 1,
          description: 'High Roller Badge'
        },
        requirements: ['Win 1 BTC in one game'],
        xpReward: 5000,
        level: 50
      },
      {
        id: '3',
        title: 'Win Streak',
        description: 'Win 10 games in a row',
        category: 'gaming',
        rarity: 'epic',
        icon: '🔥',
        progress: 7,
        maxProgress: 10,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'coins',
          amount: 500,
          description: '500 Coins'
        },
        requirements: ['Win 10 consecutive games'],
        xpReward: 2000,
        level: 25
      },
      {
        id: '4',
        title: 'Social Butterfly',
        description: 'Join 5 different tribes',
        category: 'social',
        rarity: 'rare',
        icon: '🦋',
        progress: 3,
        maxProgress: 5,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'title',
          amount: 1,
          description: 'Social Butterfly Title'
        },
        requirements: ['Join 5 tribes'],
        xpReward: 1000,
        level: 15
      },
      {
        id: '5',
        title: 'Jackpot Hunter',
        description: 'Hit 5 different jackpots',
        category: 'gaming',
        rarity: 'epic',
        icon: '🎰',
        progress: 2,
        maxProgress: 5,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'bonus',
          amount: 1000,
          description: '1000 Free Spins'
        },
        requirements: ['Hit 5 different jackpots'],
        xpReward: 3000,
        level: 35
      },
      {
        id: '6',
        title: 'Lucky 7',
        description: 'Win 7 times in a day',
        category: 'milestone',
        rarity: 'rare',
        icon: '7️⃣',
        progress: 4,
        maxProgress: 7,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'experience',
          amount: 750,
          description: '750 XP'
        },
        requirements: ['Win 7 games in 24 hours'],
        xpReward: 750,
        level: 10
      },
      {
        id: '7',
        title: 'Referral Master',
        description: 'Refer 10 friends who deposit',
        category: 'social',
        rarity: 'epic',
        icon: '👥',
        progress: 6,
        maxProgress: 10,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'coins',
          amount: 2000,
          description: '2000 Coins'
        },
        requirements: ['Refer 10 friends who make deposits'],
        xpReward: 2500,
        level: 30
      },
      {
        id: '8',
        title: 'Diamond Hands',
        description: 'Hold a winning streak for 30 days',
        category: 'milestone',
        rarity: 'mythic',
        icon: '💎',
        progress: 0,
        maxProgress: 30,
        isCompleted: false,
        isUnlocked: false,
        reward: {
          type: 'badge',
          amount: 1,
          description: 'Diamond Hands Badge'
        },
        requirements: ['Maintain winning streak for 30 days'],
        xpReward: 10000,
        level: 100
      },
      {
        id: '9',
        title: 'Tournament Champion',
        description: 'Win a major tournament',
        category: 'special',
        rarity: 'legendary',
        icon: '🏆',
        progress: 0,
        maxProgress: 1,
        isCompleted: false,
        isUnlocked: false,
        reward: {
          type: 'title',
          amount: 1,
          description: 'Tournament Champion Title'
        },
        requirements: ['Win a major tournament'],
        xpReward: 8000,
        level: 75
      },
      {
        id: '10',
        title: 'Casino Master',
        description: 'Play all game categories',
        category: 'gaming',
        rarity: 'rare',
        icon: '🎲',
        progress: 4,
        maxProgress: 6,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'experience',
          amount: 1500,
          description: '1500 XP'
        },
        requirements: ['Play all 6 game categories'],
        xpReward: 1500,
        level: 20
      },
      {
        id: '11',
        title: 'Night Owl',
        description: 'Play games for 7 consecutive nights',
        category: 'seasonal',
        rarity: 'common',
        icon: '🦉',
        progress: 5,
        maxProgress: 7,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'coins',
          amount: 300,
          description: '300 Coins'
        },
        requirements: ['Play games for 7 consecutive nights'],
        xpReward: 500,
        level: 5
      },
      {
        id: '12',
        title: 'Millionaire',
        description: 'Accumulate 1,000,000 coins',
        category: 'milestone',
        rarity: 'legendary',
        icon: '💵',
        progress: 250000,
        maxProgress: 1000000,
        isCompleted: false,
        isUnlocked: true,
        reward: {
          type: 'badge',
          amount: 1,
          description: 'Millionaire Badge'
        },
        requirements: ['Accumulate 1,000,000 coins'],
        xpReward: 6000,
        level: 60
      }
    ];
  };

  const categories: AchievementCategory[] = [
    {
      id: 'all',
      name: 'All Achievements',
      description: 'View all achievements',
      icon: <Trophy className="w-6 h-6" />,
      totalAchievements: 12,
      completedAchievements: 1,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      description: 'Game-related achievements',
      icon: <Gamepad2 className="w-6 h-6" />,
      totalAchievements: 4,
      completedAchievements: 1,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'social',
      name: 'Social',
      description: 'Community and social achievements',
      icon: <Users className="w-6 h-6" />,
      totalAchievements: 2,
      completedAchievements: 0,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'milestone',
      name: 'Milestones',
      description: 'Major accomplishment achievements',
      icon: <Target className="w-6 h-6" />,
      totalAchievements: 4,
      completedAchievements: 0,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'special',
      name: 'Special',
      description: 'Limited and special achievements',
      icon: <Star className="w-6 h-6" />,
      totalAchievements: 1,
      completedAchievements: 0,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'seasonal',
      name: 'Seasonal',
      description: 'Time-limited achievements',
      icon: <Calendar className="w-6 h-6" />,
      totalAchievements: 1,
      completedAchievements: 0,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const [achievements] = useState<Achievement[]>(generateAchievements());

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const shareAchievement = (achievement: Achievement) => {
    const text = `I just unlocked the "${achievement.title}" achievement on TucanBit! 🎉`;
    if (navigator.share) {
      navigator.share({
        title: 'TucanBit Achievement',
        text: text,
        url: window.location.href
      });
    } else {
      copyToClipboard(text);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-orange-400';
      case 'mythic': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20';
      case 'rare': return 'bg-blue-500/20';
      case 'epic': return 'bg-purple-500/20';
      case 'legendary': return 'bg-orange-500/20';
      case 'mythic': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getProgressPercentage = (progress: number, max: number) => {
    return Math.min((progress / max) * 100, 100);
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || achievement.rarity === selectedRarity;
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesRarity && matchesSearch;
  });

  const totalCompleted = achievements.filter(a => a.isCompleted).length;
  const totalAchievements = achievements.length;
  const completionPercentage = (totalCompleted / totalAchievements) * 100;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Achievements</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Unlock badges, earn rewards, and showcase your gaming prowess with our comprehensive achievement system.
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
                to="/leaderboards"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>View Leaderboards</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-12 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Achievements</p>
                  <p className="text-2xl font-bold text-white">{totalAchievements}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{totalCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completion Rate</p>
                  <p className="text-2xl font-bold text-white">{completionPercentage.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Percent className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total XP Earned</p>
                  <p className="text-2xl font-bold text-white">12,450</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Achievement Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 text-left ${
                  selectedCategory === category.id 
                    ? 'border-yellow-500/50 bg-yellow-500/10' 
                    : 'border-gray-700 hover:border-yellow-500/30'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mb-4">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 text-sm font-semibold">
                    {category.completedAchievements}/{category.totalAchievements}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {((category.completedAchievements / category.totalAchievements) * 100).toFixed(0)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Rarity Filter */}
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                  <option value="mythic">Mythic</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-yellow-500 w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Grid/List */}
      <section className="py-8 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-gray-800 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                    achievement.isCompleted 
                      ? 'border-green-500/50 bg-green-500/10' 
                      : achievement.isUnlocked 
                        ? 'border-yellow-500/30 hover:border-yellow-500/50' 
                        : 'border-gray-700 opacity-60'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex items-center space-x-2">
                        {achievement.isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : achievement.isUnlocked ? (
                          <Unlock className="w-6 h-6 text-yellow-400" />
                        ) : (
                          <Lock className="w-6 h-6 text-gray-500" />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRarityBg(achievement.rarity)} ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Progress</span>
                        <span className="text-white text-sm font-semibold">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            achievement.isCompleted 
                              ? 'bg-green-500' 
                              : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          }`}
                          style={{ width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Reward */}
                    <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Reward:</span>
                        <span className="text-yellow-400 font-semibold">{achievement.reward.description}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-400 text-sm">XP:</span>
                        <span className="text-green-400 font-semibold">+{achievement.xpReward}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">Level {achievement.level}</span>
                      {achievement.isCompleted && (
                        <button
                          onClick={() => shareAchievement(achievement)}
                          className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="text-xs">Share</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-gray-800 rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${
                    achievement.isCompleted 
                      ? 'border-green-500/50 bg-green-500/10' 
                      : achievement.isUnlocked 
                        ? 'border-yellow-500/30 hover:border-yellow-500/50' 
                        : 'border-gray-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-white font-bold text-lg">{achievement.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRarityBg(achievement.rarity)} ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                        {achievement.isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : achievement.isUnlocked ? (
                          <Unlock className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 text-xs">Progress: {achievement.progress}/{achievement.maxProgress}</span>
                          <span className="text-white text-xs font-semibold">
                            {getProgressPercentage(achievement.progress, achievement.maxProgress).toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              achievement.isCompleted 
                                ? 'bg-green-500' 
                                : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            }`}
                            style={{ width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-yellow-400 text-sm font-semibold">{achievement.reward.description}</span>
                          <span className="text-green-400 text-sm font-semibold">+{achievement.xpReward} XP</span>
                          <span className="text-gray-400 text-xs">Level {achievement.level}</span>
                        </div>
                        {achievement.isCompleted && (
                          <button
                            onClick={() => shareAchievement(achievement)}
                            className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs">Share</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage; 