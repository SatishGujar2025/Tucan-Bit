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
  Unlock,
  Activity,
  TrendingDown,
  PieChart,
  LineChart,
  BarChart3,
  Target as TargetIcon,
  Award as AwardIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  CheckSquare,
  Square,
  AlertCircle,
  Info,
  Plus,
  Minus,
  RefreshCw,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Bookmark,
  Flag,
  Shield,
  Zap as ZapIcon,
  Flame,
  Rocket,
  Lightning,
  Brain,
  Heart as HeartIcon,
  Smile,
  Frown,
  Meh,
  ArrowUp,
  ArrowDown,
  Minus as MinusIcon,
  Percent,
  Hash,
  Hash as HashIcon,
  CalendarDays,
  Clock as ClockIcon2,
  Timer as TimerIcon,
  Stopwatch,
  Hourglass,
  Calendar as CalendarIcon2,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Target as TargetIcon2,
  Award as AwardIcon2,
  Clock as ClockIcon3,
  Calendar as CalendarIcon3,
  CheckSquare as CheckSquareIcon,
  Square as SquareIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Plus as PlusIcon,
  Minus as MinusIcon2,
  RefreshCw as RefreshCwIcon,
  Filter as FilterIcon2,
  SortAsc as SortAscIcon,
  SortDesc as SortDescIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Copy as CopyIcon,
  ExternalLink as ExternalLinkIcon,
  Bookmark as BookmarkIcon,
  Flag as FlagIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon2,
  Flame as FlameIcon,
  Rocket as RocketIcon,
  Lightning as LightningIcon,
  Brain as BrainIcon,
  Heart as HeartIcon2,
  Smile as SmileIcon,
  Frown as FrownIcon,
  Meh as MehIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Minus as MinusIcon3,
  Percent as PercentIcon,
  Hash as HashIcon2,
  CalendarDays as CalendarDaysIcon,
  Clock as ClockIcon4,
  Timer as TimerIcon2,
  Stopwatch as StopwatchIcon,
  Hourglass as HourglassIcon,
  Calendar as CalendarIcon4
} from 'lucide-react';

type TaskDashboardPageProps = {
  onNavigate?: (page: string) => void;
};

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  availableTasks: number;
  totalEarned: string;
  thisWeekEarned: string;
  thisMonthEarned: string;
  completionRate: number;
  averageTime: string;
  streakDays: number;
}

interface TaskCategory {
  id: string;
  name: string;
  icon: string;
  total: number;
  completed: number;
  inProgress: number;
  available: number;
  color: string;
}

interface RecentActivity {
  id: string;
  taskName: string;
  action: string;
  timestamp: string;
  reward?: string;
  icon: string;
}

const TaskDashboardPage: React.FC<TaskDashboardPageProps> = ({ onNavigate }) => {
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
  const [currentPage, setCurrentPage] = useState('task-dashboard');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [selectedView, setSelectedView] = useState<'overview' | 'analytics' | 'progress'>('overview');

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

  const taskStats: TaskStats = {
    totalTasks: 156,
    completedTasks: 89,
    inProgressTasks: 12,
    availableTasks: 55,
    totalEarned: '2,847.50',
    thisWeekEarned: '342.75',
    thisMonthEarned: '1,156.20',
    completionRate: 57.1,
    averageTime: '2.3 days',
    streakDays: 8
  };

  const taskCategories: TaskCategory[] = [
    {
      id: 'daily',
      name: 'Daily Tasks',
      icon: '📅',
      total: 45,
      completed: 32,
      inProgress: 3,
      available: 10,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'gaming',
      name: 'Gaming Tasks',
      icon: '🎮',
      total: 38,
      completed: 25,
      inProgress: 5,
      available: 8,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'referral',
      name: 'Referral Tasks',
      icon: '👥',
      total: 22,
      completed: 15,
      inProgress: 2,
      available: 5,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'social',
      name: 'Social Tasks',
      icon: '📱',
      total: 28,
      completed: 12,
      inProgress: 1,
      available: 15,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'achievement',
      name: 'Achievements',
      icon: '🏆',
      total: 23,
      completed: 5,
      inProgress: 1,
      available: 17,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      taskName: 'Daily Login Bonus',
      action: 'Completed',
      timestamp: '2 hours ago',
      reward: '50 USDT',
      icon: '📅'
    },
    {
      id: '2',
      taskName: 'Play 10 Slot Games',
      action: 'Progress Updated',
      timestamp: '4 hours ago',
      reward: '25 USDT',
      icon: '🎰'
    },
    {
      id: '3',
      taskName: 'Refer 3 Friends',
      action: 'Started',
      timestamp: '1 day ago',
      reward: '500 USDT',
      icon: '👥'
    },
    {
      id: '4',
      taskName: 'Win 5 Blackjack Hands',
      action: 'Failed',
      timestamp: '2 days ago',
      icon: '🃏'
    },
    {
      id: '5',
      taskName: 'Social Media Share',
      action: 'Completed',
      timestamp: '3 days ago',
      reward: '30 USDT',
      icon: '📱'
    }
  ];

  const weeklyData = [
    { day: 'Mon', completed: 8, earned: 120 },
    { day: 'Tue', completed: 12, earned: 180 },
    { day: 'Wed', completed: 6, earned: 90 },
    { day: 'Thu', completed: 15, earned: 225 },
    { day: 'Fri', completed: 10, earned: 150 },
    { day: 'Sat', completed: 18, earned: 270 },
    { day: 'Sun', completed: 14, earned: 210 }
  ];

  return (
    <>
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
        <section className="relative overflow-hidden h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>
          <div className="relative p-6 w-full">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Task</span> Dashboard
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Track your progress, analyze performance, and optimize your earning strategy with detailed analytics!
              </p>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Completion Rate</p>
                    <p className="text-3xl font-bold text-green-400">{taskStats.completionRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Current Streak</p>
                    <p className="text-3xl font-bold text-yellow-400">{taskStats.streakDays} days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="p-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart2 },
                { id: 'analytics', name: 'Analytics', icon: LineChart },
                { id: 'progress', name: 'Progress', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedView === tab.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {selectedView === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{taskStats.totalTasks}</h3>
                    <p className="text-gray-400 text-sm">Total Tasks</p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <ArrowUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{taskStats.completedTasks}</h3>
                    <p className="text-gray-400 text-sm">Completed</p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{taskStats.totalEarned}</h3>
                    <p className="text-gray-400 text-sm">Total Earned (USDT)</p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <ArrowDown className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{taskStats.averageTime}</h3>
                    <p className="text-gray-400 text-sm">Avg. Completion Time</p>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Task Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {taskCategories.map((category) => (
                      <div key={category.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <h4 className="text-white font-semibold">{category.name}</h4>
                            <p className="text-gray-400 text-sm">{category.total} total tasks</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Completed</span>
                            <span className="text-green-400 font-semibold">{category.completed}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">In Progress</span>
                            <span className="text-yellow-400 font-semibold">{category.inProgress}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Available</span>
                            <span className="text-blue-400 font-semibold">{category.available}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{Math.round((category.completed / category.total) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${(category.completed / category.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                        <span className="text-2xl">{activity.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{activity.taskName}</h4>
                          <p className="text-gray-400 text-sm">{activity.action} • {activity.timestamp}</p>
                        </div>
                        {activity.reward && (
                          <span className="text-yellow-400 font-semibold">{activity.reward}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {selectedView === 'analytics' && (
              <div className="space-y-8">
                {/* Timeframe Selector */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'week', name: 'This Week', icon: Calendar },
                    { id: 'month', name: 'This Month', icon: CalendarDays },
                    { id: 'year', name: 'This Year', icon: CalendarIcon }
                  ].map((timeframe) => (
                    <button
                      key={timeframe.id}
                      onClick={() => setSelectedTimeframe(timeframe.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedTimeframe === timeframe.id
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <timeframe.icon className="w-4 h-4" />
                      <span>{timeframe.name}</span>
                    </button>
                  ))}
                </div>

                {/* Weekly Chart */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Weekly Performance</h3>
                  <div className="grid grid-cols-7 gap-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-gray-400 text-sm mb-2">{day.day}</div>
                        <div className="bg-gray-700 rounded-lg p-3 mb-2">
                          <div className="text-white font-bold text-lg">{day.completed}</div>
                          <div className="text-gray-400 text-xs">tasks</div>
                        </div>
                        <div className="text-yellow-400 font-semibold text-sm">{day.earned} USDT</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6">Earning Trends</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">This Week</span>
                        <span className="text-green-400 font-semibold">+{taskStats.thisWeekEarned} USDT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">This Month</span>
                        <span className="text-green-400 font-semibold">+{taskStats.thisMonthEarned} USDT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Total Earned</span>
                        <span className="text-yellow-400 font-semibold">{taskStats.totalEarned} USDT</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6">Task Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Completion Rate</span>
                        <span className="text-green-400 font-semibold">{taskStats.completionRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Average Time</span>
                        <span className="text-blue-400 font-semibold">{taskStats.averageTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Current Streak</span>
                        <span className="text-yellow-400 font-semibold">{taskStats.streakDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {selectedView === 'progress' && (
              <div className="space-y-8">
                {/* Progress Overview */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Overall Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">{taskStats.completedTasks}</div>
                      <div className="text-gray-400">Completed Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">{taskStats.inProgressTasks}</div>
                      <div className="text-gray-400">In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">{taskStats.availableTasks}</div>
                      <div className="text-gray-400">Available</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Overall Progress</span>
                      <span className="text-white">{Math.round((taskStats.completedTasks / taskStats.totalTasks) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(taskStats.completedTasks / taskStats.totalTasks) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Category Progress */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Category Progress</h3>
                  <div className="space-y-4">
                    {taskCategories.map((category) => (
                      <div key={category.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{category.icon}</span>
                            <span className="text-white font-semibold">{category.name}</span>
                          </div>
                          <span className="text-gray-400 text-sm">{category.completed}/{category.total}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${(category.completed / category.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

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
    </div></>
  );
};

export default TaskDashboardPage; 