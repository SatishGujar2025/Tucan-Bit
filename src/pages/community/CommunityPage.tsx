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
  ThumbsUp,
  Share2,
  MoreHorizontal,
  UserPlus,
  Hash,
  TrendingUp as TrendingUpIcon,
  Eye,
  MessageCircle as MessageCircleIcon,
  Calendar as CalendarIcon,
  MapPin,
  Video,
  Image,
  Link,
  Smile,
  Camera,
  Mic,
  Send,
  Plus,
  Edit,
  Trash2,
  Flag,
  Bookmark,
  Download,
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Home,
  Dice5,
  LogOut,
  BarChart2,
  User
} from 'lucide-react';

interface CommunityPageProps {
  onNavigate?: (page: string) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [currentPage, setCurrentPage] = useState('community');
  const [activeTab, setActiveTab] = useState('forums');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPostContent, setNewPostContent] = useState('');

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

  // Mock community data
  const communityStats = {
    totalMembers: 125000,
    onlineMembers: 2847,
    totalPosts: 45678,
    totalEvents: 156,
    activeDiscussions: 89
  };

  const forumCategories = [
    { id: 'general', name: 'General Discussion', icon: MessageCircle, color: 'blue', posts: 1234 },
    { id: 'casino', name: 'Casino Games', icon: Gamepad2, color: 'purple', posts: 2345 },
    { id: 'sports', name: 'Sports Betting', icon: Trophy, color: 'green', posts: 987 },
    { id: 'crypto', name: 'Cryptocurrency', icon: Coins, color: 'yellow', posts: 1567 },
    { id: 'promotions', name: 'Promotions & Bonuses', icon: Gift, color: 'orange', posts: 456 },
    { id: 'technical', name: 'Technical Support', icon: Settings, color: 'red', posts: 789 }
  ];

  const forumPosts = [
    {
      id: 1,
      title: 'Best strategy for Blackjack?',
      author: 'CryptoGambler',
      avatar: '🎰',
      category: 'casino',
      content: 'I\'ve been playing Blackjack for a while now and wanted to share some strategies that have worked well for me. What are your favorite approaches?',
      likes: 45,
      replies: 23,
      views: 156,
      timestamp: '2 hours ago',
      isPinned: false,
      isHot: true
    },
    {
      id: 2,
      title: 'New slot game review - Cosmic Fortune',
      author: 'SlotMaster',
      avatar: '🎰',
      category: 'casino',
      content: 'Just tried the new Cosmic Fortune slot and it\'s absolutely amazing! The graphics are stunning and the bonus features are incredible. Highly recommend!',
      likes: 67,
      replies: 34,
      views: 289,
      timestamp: '4 hours ago',
      isPinned: true,
      isHot: false
    },
    {
      id: 3,
      title: 'Bitcoin price prediction for next month',
      author: 'CryptoAnalyst',
      avatar: '📊',
      category: 'crypto',
      content: 'Based on current market trends and technical analysis, I believe Bitcoin could reach new highs next month. What do you think?',
      likes: 89,
      replies: 56,
      views: 423,
      timestamp: '6 hours ago',
      isPinned: false,
      isHot: true
    },
    {
      id: 4,
      title: 'How to maximize welcome bonus?',
      author: 'BonusHunter',
      avatar: '🎁',
      category: 'promotions',
      content: 'I\'m new to TucanBit and want to make the most of my welcome bonus. Any tips on how to maximize the value?',
      likes: 34,
      replies: 18,
      views: 145,
      timestamp: '8 hours ago',
      isPinned: false,
      isHot: false
    },
    {
      id: 5,
      title: 'Live casino experience review',
      author: 'LiveCasinoFan',
      avatar: '🎲',
      category: 'casino',
      content: 'Had an amazing experience with the live casino dealers last night. The interaction was great and the games were smooth. Anyone else tried the live tables?',
      likes: 56,
      replies: 29,
      views: 234,
      timestamp: '12 hours ago',
      isPinned: false,
      isHot: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Weekly Poker Tournament',
      date: '2024-01-15',
      time: '20:00 UTC',
      type: 'Tournament',
      participants: 128,
      maxParticipants: 200,
      prize: '10,000 USDT',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Community AMA Session',
      date: '2024-01-18',
      time: '15:00 UTC',
      type: 'AMA',
      participants: 45,
      maxParticipants: 100,
      prize: 'N/A',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Crypto Trading Workshop',
      date: '2024-01-20',
      time: '14:00 UTC',
      type: 'Workshop',
      participants: 67,
      maxParticipants: 150,
      prize: 'N/A',
      status: 'upcoming'
    }
  ];

  const socialLinks = [
    { name: 'Discord', icon: '🎮', url: '#', members: '15.2K', color: 'purple' },
    { name: 'Telegram', icon: '📱', url: '#', members: '23.8K', color: 'blue' },
    { name: 'Twitter', icon: '🐦', url: '#', members: '45.6K', color: 'sky' },
    { name: 'Reddit', icon: '🤖', url: '#', members: '8.9K', color: 'orange' },
    { name: 'YouTube', icon: '📺', url: '#', members: '12.3K', color: 'red' }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
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
      <main >
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
          <div className="absolute inset-0 bg-[url('/src/assets/tucanbit.jpeg')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Community</span> Hub
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Connect with fellow players, share strategies, discuss games, and be part of the vibrant TucanBit community.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">{communityStats.totalMembers.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">{communityStats.onlineMembers.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Online Now</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">{communityStats.totalPosts.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Total Posts</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab('forums')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'forums'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Forums
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'events'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'social'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Social Media
              </button>
            </div>

            {/* Forums Tab */}
            {activeTab === 'forums' && (
              <div className="space-y-8">
                {/* Search and Create Post */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search discussions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2">
                      <Plus size={20} />
                      <span>Create Post</span>
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {forumCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                      className={`p-4 rounded-lg border transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 border-blue-500'
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            selectedCategory === category.id
                              ? 'bg-white/20'
                              : `bg-${category.color}-500/20`
                          }`}>
                            <category.icon className={`w-5 h-5 ${
                              selectedCategory === category.id
                                ? 'text-white'
                                : `text-${category.color}-400`
                            }`} />
                          </div>
                          <div className="text-left">
                            <div className={`font-medium ${
                              selectedCategory === category.id
                                ? 'text-white'
                                : 'text-gray-300'
                            }`}>
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-400">{category.posts} posts</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Forum Posts */}
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                            {post.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                            {post.isPinned && (
                              <span className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs rounded-full">Pinned</span>
                            )}
                            {post.isHot && (
                              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">Hot</span>
                            )}
                          </div>
                          <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
                              <span>by {post.author}</span>
                              <span>{post.timestamp}</span>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp size={14} />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle size={14} />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye size={14} />
                                <span>{post.views}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                <ThumbsUp size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                <Share2 size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upcoming Events */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar size={14} />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock size={14} />
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            event.type === 'Tournament' ? 'bg-purple-500 text-white' :
                            event.type === 'AMA' ? 'bg-blue-500 text-white' :
                            'bg-green-500 text-white'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Participants</span>
                            <span className="text-white">{event.participants}/{event.maxParticipants}</span>
                          </div>
                          {event.prize !== 'N/A' && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Prize Pool</span>
                              <span className="text-green-400 font-medium">{event.prize}</span>
                            </div>
                          )}
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                            Join Event
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Community Stats */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Community Statistics</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Users className="w-6 h-6 text-blue-400" />
                          </div>
                          <TrendingUpIcon className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{communityStats.totalMembers.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total Community Members</div>
                      </div>

                      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <MessageCircle className="w-6 h-6 text-green-400" />
                          </div>
                          <TrendingUpIcon className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{communityStats.totalPosts.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total Forum Posts</div>
                      </div>

                      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-400" />
                          </div>
                          <TrendingUpIcon className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{communityStats.totalEvents}</div>
                        <div className="text-sm text-gray-400">Events This Month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {socialLinks.map((social) => (
                    <div key={social.name} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:bg-gray-700 transition-colors">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-lg bg-${social.color}-500/20`}>
                          <span className="text-2xl">{social.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{social.name}</h3>
                          <p className="text-sm text-gray-400">{social.members} members</p>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <ExternalLink size={16} />
                        <span>Join {social.name}</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Stay Connected</h3>
                  <p className="text-gray-300 mb-6">
                    Join our social media channels to stay updated with the latest news, announcements, and community events. Connect with fellow players and share your gaming experiences!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">What you'll find:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Latest game releases and updates</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Exclusive promotions and bonuses</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Community tournaments and events</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Gaming tips and strategies</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">Community Guidelines:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span>Be respectful to all members</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span>No spam or inappropriate content</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span>Follow platform-specific rules</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span>Report violations to moderators</span>
                        </li>
                      </ul>
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

export default CommunityPage; 