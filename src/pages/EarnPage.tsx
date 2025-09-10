import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  ChevronRight, 
  ChevronDown, 
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
  Eye,
  Play,
  Timer,
  CheckCircle,
  DollarSign,
  GiftIcon,
  Trophy,
  Users as UsersIcon,
  Share2,
  Download,
  MessageCircle,
  Heart,
  ThumbsUp,
  Star as StarIcon,
  ArrowRight,
  Lock,
  Unlock
} from 'lucide-react';

type EarnPageProps = {
  onNavigate?: (page: string) => void;
};

interface EarningTask {
  id: string;
  title: string;
  description: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  timeEstimate: string;
  status: 'available' | 'in-progress' | 'completed';
  progress?: number;
  maxProgress?: number;
  requirements?: string[];
  icon: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  value: string;
  type: 'crypto' | 'bonus' | 'free-spins' | 'cashback';
  icon: string;
  isClaimed: boolean;
  expiresAt?: string;
}

const EarnPage: React.FC<EarnPageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string>('0.00');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState('BTC');

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
  const [currentPage, setCurrentPage] = useState('earn');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'tasks' | 'rewards' | 'referrals' | 'achievements'>('tasks');
  const [totalEarned, setTotalEarned] = useState('1,247.50');

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

  const generateTasks = (): EarningTask[] => {
    return [
      {
        id: '1',
        title: 'Daily Login Bonus',
        description: 'Log in to TucanBit for 7 consecutive days',
        reward: '50 USDT',
        difficulty: 'easy',
        category: 'daily',
        timeEstimate: '5 min',
        status: 'in-progress',
        progress: 5,
        maxProgress: 7,
        icon: '📅'
      },
      {
        id: '2',
        title: 'First Deposit',
        description: 'Make your first deposit of 100 USDT or more',
        reward: '200 USDT',
        difficulty: 'easy',
        category: 'deposit',
        timeEstimate: '10 min',
        status: 'available',
        icon: '💰'
      },
      {
        id: '3',
        title: 'Play 10 Slot Games',
        description: 'Play any 10 different slot games',
        reward: '25 USDT',
        difficulty: 'medium',
        category: 'gaming',
        timeEstimate: '30 min',
        status: 'in-progress',
        progress: 7,
        maxProgress: 10,
        icon: '🎰'
      },
      {
        id: '4',
        title: 'Win 5 Blackjack Hands',
        description: 'Win 5 consecutive blackjack hands',
        reward: '100 USDT',
        difficulty: 'hard',
        category: 'gaming',
        timeEstimate: '45 min',
        status: 'available',
        icon: '🃏'
      },
      {
        id: '5',
        title: 'Refer 3 Friends',
        description: 'Invite 3 friends who make their first deposit',
        reward: '500 USDT',
        difficulty: 'medium',
        category: 'referral',
        timeEstimate: '1 hour',
        status: 'in-progress',
        progress: 1,
        maxProgress: 3,
        icon: '👥'
      },
      {
        id: '6',
        title: 'Complete Profile',
        description: 'Fill out your complete profile information',
        reward: '15 USDT',
        difficulty: 'easy',
        category: 'profile',
        timeEstimate: '5 min',
        status: 'completed',
        icon: '👤'
      },
      {
        id: '7',
        title: 'Join Tournament',
        description: 'Participate in any tournament',
        reward: '75 USDT',
        difficulty: 'medium',
        category: 'tournament',
        timeEstimate: '2 hours',
        status: 'available',
        icon: '🏆'
      },
      {
        id: '8',
        title: 'Social Media Share',
        description: 'Share TucanBit on your social media',
        reward: '30 USDT',
        difficulty: 'easy',
        category: 'social',
        timeEstimate: '5 min',
        status: 'available',
        icon: '📱'
      }
    ];
  };

  const generateRewards = (): Reward[] => {
    return [
      {
        id: '1',
        name: 'Welcome Bonus',
        description: '100% match on your first deposit up to 1000 USDT',
        value: '1000 USDT',
        type: 'bonus',
        icon: '🎁',
        isClaimed: false
      },
      {
        id: '2',
        name: 'Free Spins Pack',
        description: '100 free spins on popular slot games',
        value: '50 USDT',
        type: 'free-spins',
        icon: '🎰',
        isClaimed: false
      },
      {
        id: '3',
        name: 'Cashback Reward',
        description: '10% cashback on your weekly losses',
        value: '150 USDT',
        type: 'cashback',
        icon: '💸',
        isClaimed: true
      },
      {
        id: '4',
        name: 'VIP Status',
        description: 'Upgrade to VIP status with exclusive benefits',
        value: 'VIP',
        type: 'bonus',
        icon: '👑',
        isClaimed: false
      }
    ];
  };

  const tasks = generateTasks();
  const rewards = generateRewards();

  const categories = [
    { id: 'all', name: 'All Tasks', icon: Target, count: tasks.length },
    { id: 'daily', name: 'Daily', icon: Calendar, count: tasks.filter(t => t.category === 'daily').length },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: tasks.filter(t => t.category === 'gaming').length },
    { id: 'referral', name: 'Referral', icon: Users, count: tasks.filter(t => t.category === 'referral').length },
    { id: 'social', name: 'Social', icon: Share2, count: tasks.filter(t => t.category === 'social').length }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-blue-400 bg-blue-400/10';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10';
      case 'completed': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return 'text-yellow-400';
      case 'bonus': return 'text-green-400';
      case 'free-spins': return 'text-purple-400';
      case 'cashback': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="page-content min-h-screen bg-black">
   

 
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>
          <div className="relative p-6 w-full">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Earn</span> Rewards
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Complete tasks, earn rewards, and grow your crypto portfolio with TucanBit's comprehensive earning system!
              </p>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Earned</p>
                    <p className="text-3xl font-bold text-yellow-400">{totalEarned} USDT</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">This Month</p>
                    <p className="text-xl font-semibold text-green-400">+247.50 USDT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="p-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'tasks', name: 'Tasks', icon: Target, count: tasks.length },
                { id: 'rewards', name: 'Rewards', icon: GiftIcon, count: rewards.length },
                { id: 'referrals', name: 'Referrals', icon: UsersIcon, count: 0 },
                { id: 'achievements', name: 'Achievements', icon: Trophy, count: 0 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                  <span className="bg-black/20 px-2 py-1 rounded text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div>
                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
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

                {/* Tasks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 flex flex-col h-full">
                      {/* Header Section */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl flex-shrink-0">{task.icon}</span>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-white font-bold text-lg mb-1 truncate">{task.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{task.description}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getDifficultyColor(task.difficulty)}`}>
                          {task.difficulty}
                        </span>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 flex flex-col space-y-4">
                        {/* Reward and Time Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-700/50 rounded-lg p-3">
                            <div className="text-gray-400 text-xs font-medium mb-1">Reward</div>
                            <div className="text-yellow-400 font-bold text-lg">{task.reward}</div>
                          </div>
                          <div className="bg-gray-700/50 rounded-lg p-3">
                            <div className="text-gray-400 text-xs font-medium mb-1">Time</div>
                            <div className="text-white font-semibold">{task.timeEstimate}</div>
                          </div>
                        </div>

                        {/* Progress Section */}
                        {task.status === 'in-progress' && task.progress !== undefined && task.maxProgress !== undefined && (
                          <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center justify-between text-sm mb-3">
                              <span className="text-gray-300 font-medium">Progress</span>
                              <span className="text-white font-bold">{task.progress}/{task.maxProgress}</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Status Badge */}
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                            {task.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                            {task.status === 'in-progress' && <Clock className="w-4 h-4" />}
                            {task.status === 'available' && <Unlock className="w-4 h-4" />}
                            <span className="capitalize">{task.status.replace('-', ' ')}</span>
                          </span>
                        </div>

                        {/* Spacer to push button to bottom */}
                        <div className="flex-1"></div>

                        {/* Action Button */}
                        <button className={`w-full h-14 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-3 ${
                          task.status === 'completed'
                            ? 'bg-green-600 text-white cursor-not-allowed'
                            : task.status === 'in-progress'
                            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 hover:from-yellow-600 hover:to-orange-600'
                        }`}>
                          {task.status === 'completed' && <CheckCircle className="w-5 h-5" />}
                          {task.status === 'in-progress' && <Clock className="w-5 h-5" />}
                          {task.status === 'available' && <Play className="w-5 h-5" />}
                          <span className="text-base font-medium">
                            {task.status === 'completed' ? 'Completed' : task.status === 'in-progress' ? 'Continue' : 'Start Task'}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <div key={reward.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{reward.icon}</span>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRewardTypeColor(reward.type)} bg-gray-700`}>
                        {reward.type}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-2">{reward.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{reward.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400 text-sm">Value</span>
                      <span className={`font-bold ${getRewardTypeColor(reward.type)}`}>{reward.value}</span>
                    </div>

                    <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      reward.isClaimed
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 hover:from-yellow-600 hover:to-orange-600'
                    }`}>
                      {reward.isClaimed ? <CheckCircle className="w-4 h-4" /> : <GiftIcon className="w-4 h-4" />}
                      <span>{reward.isClaimed ? 'Claimed' : 'Claim Reward'}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Referrals Tab */}
            {activeTab === 'referrals' && (
              <div className="text-center py-16">
                <UsersIcon className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Referral Program</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Invite friends to TucanBit and earn rewards for every successful referral!
                </p>
                <div className="bg-gray-800 rounded-xl p-8 max-w-md mx-auto border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Your Referral Link</h4>
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="text"
                      value="https://tucanbit.com/ref/yourusername"
                      readOnly
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                    />
                    <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                      Copy
                    </button>
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-3 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                    Share Referral Link
                  </button>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="text-center py-16">
                <Trophy className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Achievements</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Unlock achievements by completing various milestones and earn exclusive rewards!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { name: 'First Win', description: 'Win your first game', icon: '🏆', unlocked: true },
                    { name: 'High Roller', description: 'Bet 1000 USDT in a single game', icon: '💰', unlocked: false },
                    { name: 'Lucky Streak', description: 'Win 5 games in a row', icon: '🔥', unlocked: false },
                    { name: 'Social Butterfly', description: 'Refer 10 friends', icon: '🦋', unlocked: false },
                    { name: 'Daily Grinder', description: 'Log in for 30 consecutive days', icon: '📅', unlocked: false },
                    { name: 'Tournament Champion', description: 'Win a tournament', icon: '👑', unlocked: false }
                  ].map((achievement, index) => (
                    <div key={index} className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 ${
                      achievement.unlocked ? 'border-yellow-500/50' : 'border-gray-700 opacity-50'
                    }`}>
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <h4 className="text-white font-bold text-lg mb-2">{achievement.name}</h4>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                      {achievement.unlocked && (
                        <div className="mt-4">
                          <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium text-green-400 bg-green-400/10">
                            <CheckCircle className="w-3 h-3" />
                            <span>Unlocked</span>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
  

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

export default EarnPage; 