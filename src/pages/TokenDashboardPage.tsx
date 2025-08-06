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
  Cookie
} from 'lucide-react';

interface TokenDashboardPageProps {
  onNavigate?: (page: string) => void;
}

const TokenDashboardPage: React.FC<TokenDashboardPageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [currentPage, setCurrentPage] = useState('token-dashboard');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedView, setSelectedView] = useState('grid');

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

  // Mock token data
  const tokenStats = {
    totalTokens: 1250000,
    tokenPrice: 0.85,
    marketCap: 1062500,
    circulatingSupply: 1250000,
    maxSupply: 10000000,
    priceChange24h: 12.5,
    volume24h: 125000,
    holders: 8500
  };

  const recentTransactions = [
    { id: 1, type: 'buy', amount: 1000, price: 0.85, timestamp: '2 hours ago', hash: '0x1234...5678' },
    { id: 2, type: 'sell', amount: 500, price: 0.84, timestamp: '4 hours ago', hash: '0x8765...4321' },
    { id: 3, type: 'buy', amount: 2000, price: 0.86, timestamp: '6 hours ago', hash: '0xabcd...efgh' },
    { id: 4, type: 'transfer', amount: 750, price: 0.85, timestamp: '8 hours ago', hash: '0x9876...5432' },
    { id: 5, type: 'buy', amount: 1500, price: 0.87, timestamp: '12 hours ago', hash: '0xdcba...hgfe' }
  ];

  const priceHistory = [
    { date: '2024-01-01', price: 0.75 },
    { date: '2024-01-02', price: 0.78 },
    { date: '2024-01-03', price: 0.82 },
    { date: '2024-01-04', price: 0.79 },
    { date: '2024-01-05', price: 0.85 },
    { date: '2024-01-06', price: 0.88 },
    { date: '2024-01-07', price: 0.85 }
  ];

  return (
  <>
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

 

        {/* Hero Section */}
        <section className="relative overflow-hidden h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
          <div className="absolute inset-0 bg-[url('/src/assets/tucanbit.jpeg')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 p-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Token</span> Dashboard
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Track your token performance, analyze market trends, and manage your portfolio with real-time data and insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">${tokenStats.tokenPrice.toFixed(2)}</div>
                  <div className="text-sm text-gray-300">Current Price</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">${(tokenStats.marketCap / 1000000).toFixed(2)}M</div>
                  <div className="text-sm text-gray-300">Market Cap</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-400">+{tokenStats.priceChange24h}%</div>
                  <div className="text-sm text-gray-300">24h Change</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="p-6">
          <div>
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  activeTab === 'transactions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Transactions
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Coins className="w-6 h-6 text-blue-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">${tokenStats.tokenPrice.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">Token Price</div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-green-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">${(tokenStats.marketCap / 1000000).toFixed(2)}M</div>
                    <div className="text-sm text-gray-400">Market Cap</div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Activity className="w-6 h-6 text-purple-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">${(tokenStats.volume24h / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-400">24h Volume</div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <Users className="w-6 h-6 text-orange-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{tokenStats.holders.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Holders</div>
                  </div>
                </div>

                {/* Price Chart */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Price History</h3>
                    <div className="flex space-x-2">
                      {['1d', '7d', '30d', '1y'].map((timeframe) => (
                        <button
                          key={timeframe}
                          onClick={() => setSelectedTimeframe(timeframe)}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            selectedTimeframe === timeframe
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {timeframe}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-400">Price chart will be displayed here</p>
                    </div>
                  </div>
                </div>

                {/* Token Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Token Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Supply</span>
                        <span className="text-white">{tokenStats.maxSupply.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Circulating Supply</span>
                        <span className="text-white">{tokenStats.circulatingSupply.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Cap</span>
                        <span className="text-white">${(tokenStats.marketCap / 1000000).toFixed(2)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">24h Volume</span>
                        <span className="text-white">${(tokenStats.volume24h / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        <span className="text-white font-medium">Buy Tokens</span>
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <span className="text-white font-medium">Stake Tokens</span>
                        <Target className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <span className="text-white font-medium">View on Explorer</span>
                        <Globe className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Price Performance</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">24h Change</span>
                        <span className="text-green-400 font-medium">+{tokenStats.priceChange24h}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">7d Change</span>
                        <span className="text-green-400 font-medium">+8.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">30d Change</span>
                        <span className="text-red-400 font-medium">-2.1%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Volume Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">24h Volume</span>
                        <span className="text-white font-medium">${(tokenStats.volume24h / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Avg Volume (7d)</span>
                        <span className="text-white font-medium">$98.5K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Volume Change</span>
                        <span className="text-green-400 font-medium">+15.3%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Market Sentiment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">72%</div>
                      <div className="text-sm text-gray-400">Bullish</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-400 mb-2">18%</div>
                      <div className="text-sm text-gray-400">Neutral</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">10%</div>
                      <div className="text-sm text-gray-400">Bearish</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                  <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hash</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {recentTransactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                tx.type === 'buy' ? 'bg-green-100 text-green-800' :
                                tx.type === 'sell' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {tx.type === 'buy' && <ArrowUpRight className="w-3 h-3 mr-1" />}
                                {tx.type === 'sell' && <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {tx.type === 'transfer' && <ArrowUpRight className="w-3 h-3 mr-1" />}
                                {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white">{tx.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-white">${tx.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">{tx.timestamp}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-mono text-sm">{tx.hash}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
  
      </div></>

  );
};

export default TokenDashboardPage; 