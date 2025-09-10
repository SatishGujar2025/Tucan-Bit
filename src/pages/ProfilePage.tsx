import React, { useState } from 'react';
import { User, Settings, Trophy, Star, Edit, Shield, Bell, Globe, Wallet, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { balanceService, Balance } from '../services/balanceService';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, userBalances, refreshBalance } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomDateInputs, setShowCustomDateInputs] = useState(false);
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);
  const itemsPerPage = 10;

  const userStats = {
    level: 42,
    experience: 85400,
    totalWins: 127,
    totalGames: 398,
    winRate: 31.9,
    highestWin: 15750,
    favoriteGame: 'Crypto Slots',
    memberSince: 'January 2024'
  };

  const achievements = [
    { id: 1, title: 'High Roller', description: 'Bet over 10,000 ₿ in total', icon: Star, unlocked: true },
    { id: 1, title: 'High Roller', description: 'Bet over 10,000 TB in total', icon: Star, unlocked: true },
    { id: 2, title: 'Lucky Seven', description: 'Win 7 games in a row', icon: Trophy, unlocked: true },
    { id: 3, title: 'Slot Master', description: 'Play 100 slot games', icon: Star, unlocked: true },
    { id: 4, title: 'Blackjack Pro', description: 'Win 50 blackjack hands', icon: Trophy, unlocked: false },
    { id: 5, title: 'Roulette Champion', description: 'Hit the same number twice', icon: Star, unlocked: false },
    { id: 6, title: 'Millionaire', description: 'Win over 1,000,000 TB in total', icon: Trophy, unlocked: false }
  ];

  const recentActivity = [
    { 
      id: 'TXN001', 
      type: 'Game Win', 
      game: 'Crypto Slots', 
      amount: 108000, 
      status: 'Completed', 
      time: '2 hours ago',
      date: '2024-01-15 14:30'
    },
    { 
      id: 'TXN002', 
      type: 'Deposit', 
      game: 'Wallet', 
      amount: 50000, 
      status: 'Completed', 
      time: '3 hours ago',
      date: '2024-01-15 13:15'
    },
    { 
      id: 'TXN003', 
      type: 'Game Win', 
      game: 'Bitcoin Blackjack', 
      amount: 54000, 
      status: 'Completed', 
      time: '4 hours ago',
      date: '2024-01-15 12:45'
    },
    { 
      id: 'TXN004', 
      type: 'Game Loss', 
      game: 'Ethereum Roulette', 
      amount: -22500, 
      status: 'Completed', 
      time: '6 hours ago',
      date: '2024-01-15 10:20'
    },
    { 
      id: 'TXN005', 
      type: 'Withdrawal', 
      game: 'Wallet', 
      amount: -75000, 
      status: 'Processing', 
      time: '1 day ago',
      date: '2024-01-14 16:30'
    },
    { 
      id: 'TXN006', 
      type: 'Game Win', 
      game: 'Crypto Slots', 
      amount: 36000, 
      status: 'Completed', 
      time: '1 day ago',
      date: '2024-01-14 15:10'
    }
  ];

  const fullTransactionHistory = [
    { 
      id: 'TXN001', 
      type: 'Game Win', 
      game: 'Crypto Slots', 
      amount: 108000, 
      status: 'Completed', 
      time: '2 hours ago',
      date: '2024-01-15 14:30'
    },
    { 
      id: 'TXN002', 
      type: 'Deposit', 
      game: 'Wallet', 
      amount: 50000, 
      status: 'Completed', 
      time: '3 hours ago',
      date: '2024-01-15 13:15'
    },
    { 
      id: 'TXN003', 
      type: 'Game Win', 
      game: 'Bitcoin Blackjack', 
      amount: 54000, 
      status: 'Completed', 
      time: '4 hours ago',
      date: '2024-01-15 12:45'
    },
    { 
      id: 'TXN004', 
      type: 'Game Loss', 
      game: 'Ethereum Roulette', 
      amount: -22500, 
      status: 'Completed', 
      time: '6 hours ago',
      date: '2024-01-15 10:20'
    },
    { 
      id: 'TXN005', 
      type: 'Withdrawal', 
      game: 'Wallet', 
      amount: -75000, 
      status: 'Processing', 
      time: '1 day ago',
      date: '2024-01-14 16:30'
    },
    { 
      id: 'TXN006', 
      type: 'Game Win', 
      game: 'Crypto Slots', 
      amount: 36000, 
      status: 'Completed', 
      time: '1 day ago',
      date: '2024-01-14 15:10'
    },
    { 
      id: 'TXN007', 
      type: 'Game Loss', 
      game: 'Live Blackjack', 
      amount: -18000, 
      status: 'Completed', 
      time: '2 days ago',
      date: '2024-01-13 20:45'
    },
    { 
      id: 'TXN008', 
      type: 'Deposit', 
      game: 'Wallet', 
      amount: 100000, 
      status: 'Completed', 
      time: '2 days ago',
      date: '2024-01-13 18:20'
    },
    { 
      id: 'TXN009', 
      type: 'Game Win', 
      game: 'Mega Fortune', 
      amount: 245000, 
      status: 'Completed', 
      time: '3 days ago',
      date: '2024-01-12 22:15'
    },
    { 
      id: 'TXN010', 
      type: 'Game Loss', 
      game: 'Lightning Roulette', 
      amount: -35000, 
      status: 'Completed', 
      time: '3 days ago',
      date: '2024-01-12 19:30'
    },
    { 
      id: 'TXN011', 
      type: 'Withdrawal', 
      game: 'Wallet', 
      amount: -150000, 
      status: 'Completed', 
      time: '4 days ago',
      date: '2024-01-11 14:45'
    },
    { 
      id: 'TXN012', 
      type: 'Game Win', 
      game: 'Book of Dead', 
      amount: 89000, 
      status: 'Completed', 
      time: '4 days ago',
      date: '2024-01-11 12:20'
    },
    { 
      id: 'TXN013', 
      type: 'Game Loss', 
      game: 'Starburst', 
      amount: -12000, 
      status: 'Completed', 
      time: '5 days ago',
      date: '2024-01-10 16:10'
    },
    { 
      id: 'TXN014', 
      type: 'Deposit', 
      game: 'Wallet', 
      amount: 75000, 
      status: 'Completed', 
      time: '5 days ago',
      date: '2024-01-10 14:30'
    },
    { 
      id: 'TXN015', 
      type: 'Game Win', 
      game: 'Gonzo Quest', 
      amount: 67000, 
      status: 'Completed', 
      time: '6 days ago',
      date: '2024-01-09 21:45'
    },
    { 
      id: 'TXN016', 
      type: 'Game Loss', 
      game: 'Dead or Alive', 
      amount: -28000, 
      status: 'Completed', 
      time: '6 days ago',
      date: '2024-01-09 19:15'
    },
    { 
      id: 'TXN017', 
      type: 'Game Win', 
      game: 'Jammin Jars', 
      amount: 156000, 
      status: 'Completed', 
      time: '1 week ago',
      date: '2024-01-08 23:30'
    },
    { 
      id: 'TXN018', 
      type: 'Withdrawal', 
      game: 'Wallet', 
      amount: -200000, 
      status: 'Completed', 
      time: '1 week ago',
      date: '2024-01-08 15:20'
    },
    { 
      id: 'TXN019', 
      type: 'Game Loss', 
      game: 'Live Baccarat', 
      amount: -45000, 
      status: 'Completed', 
      time: '1 week ago',
      date: '2024-01-07 20:10'
    },
    { 
      id: 'TXN020', 
      type: 'Deposit', 
      game: 'Wallet', 
      amount: 125000, 
      status: 'Completed', 
      time: '1 week ago',
      date: '2024-01-07 16:45'
    }
  ];
  const loginHistory = [
    { location: 'New York, USA', device: 'Chrome on Windows', time: '2 hours ago', ip: '192.168.1.1', status: 'success' },
    { location: 'New York, USA', device: 'Chrome on Windows', time: '1 day ago', ip: '192.168.1.1', status: 'success' },
    { location: 'London, UK', device: 'Safari on iPhone', time: '3 days ago', ip: '10.0.0.1', status: 'success' },
    { location: 'Tokyo, Japan', device: 'Firefox on Mac', time: '1 week ago', ip: '172.16.0.1', status: 'failed' },
    { location: 'New York, USA', device: 'Chrome on Windows', time: '2 weeks ago', ip: '192.168.1.1', status: 'success' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'balance', label: 'Balance', icon: Wallet },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Filter transactions based on selected filters
  const filteredTransactions = fullTransactionHistory.filter(transaction => {
    const matchesType = transactionFilter === 'all' || 
      (transactionFilter === 'wins' && transaction.type === 'Game Win') ||
      (transactionFilter === 'losses' && transaction.type === 'Game Loss') ||
      (transactionFilter === 'deposits' && transaction.type === 'Deposit') ||
      (transactionFilter === 'withdrawals' && transaction.type === 'Withdrawal');
    
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    
    let matchesDate = true;
    
    if (dateFilter === 'custom' && customStartDate && customEndDate) {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      endDate.setHours(23, 59, 59, 999); // Include the entire end date
      matchesDate = transactionDate >= startDate && transactionDate <= endDate;
    } else if (dateFilter !== 'all' && dateFilter !== 'custom') {
      matchesDate = dateFilter === 'today' && transactionDate.toDateString() === now.toDateString() ||
        dateFilter === 'week' && (now.getTime() - transactionDate.getTime()) <= 7 * 24 * 60 * 60 * 1000 ||
        dateFilter === 'month' && (now.getTime() - transactionDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
    }
    
    return matchesType && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [transactionFilter, dateFilter, customStartDate, customEndDate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle date filter change
  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    setShowCustomDateInputs(value === 'custom');
    if (value !== 'custom') {
      setCustomStartDate('');
      setCustomEndDate('');
    }
  };

  const resetFilters = () => {
    setTransactionFilter('all');
    setDateFilter('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setShowCustomDateInputs(false);
    setCurrentPage(1);
  };
  const ResponsiveTableRow: React.FC<{ transaction: typeof recentActivity[0] }> = ({ transaction }) => (
    <tr className="border-b border-gray-800 last:border-b-0 md:border-b-0">
      <td className="py-3 px-3 md:py-4 md:px-4 text-right md:text-left" data-label="Transaction ID">
        <span className="text-sm font-mono text-blue-400">{transaction.id}</span>
      </td>
      <td className="py-3 px-3 md:py-4 md:px-4 text-right md:text-left" data-label="Type">
        <div className="flex items-center justify-end md:justify-start space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            transaction.type === 'Game Win' ? 'bg-green-400' :
            transaction.type === 'Game Loss' ? 'bg-red-400' :
            transaction.type === 'Deposit' ? 'bg-blue-400' :
            'bg-orange-400'
          }`}></div>
          <span className="text-sm font-medium text-white">{transaction.type}</span>
        </div>
      </td>
      <td className="py-3 px-3 md:py-4 md:px-4 text-right md:text-left" data-label="Game/Source">
        <span className="text-sm text-gray-300">{transaction.game}</span>
      </td>
      <td className="py-3 px-3 md:py-4 md:px-4 text-right md:text-left" data-label="Amount (USD)">
        <span className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
        </span>
      </td>
      <td className="py-3 px-3 md:py-4 md:px-4 text-right md:text-center" data-label="Status">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${transaction.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
          {transaction.status}
        </span>
      </td>
      <td className="py-3 px-3 md:py-4 md:px-4 text-right md:text-left" data-label="Date">
        <div className="text-sm text-gray-300">{transaction.time}</div>
      </td>
    </tr>
  );
  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">Profile</h1>
          <p className="text-base sm:text-xl text-gray-300">Manage your account and view your gaming statistics</p>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">CryptoPlayer_42</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-4 text-gray-300 text-sm sm:text-base">
                <span>Level {userStats.level}</span>
                <span className="hidden sm:inline">•</span>
                <span>Member since {userStats.memberSince}</span>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                  <span className="text-xs sm:text-sm text-gray-300">Experience</span>
                  <span className="text-xs sm:text-sm text-purple-400">{userStats.experience.toLocaleString()} XP</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                    style={{ width: `${(userStats.experience % 1000) / 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex space-x-1 sm:space-x-2 bg-black/20 p-1 sm:p-2 rounded-lg sm:rounded-xl overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md sm:rounded-lg whitespace-nowrap text-xs sm:text-sm ${activeTab === tab.id ? 'bg-purple-500' : 'text-gray-400'}`}>
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" /><span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Stats */}
            <div className="lg:col-span-2">
              {/* Recent Activity */}
              <div className="bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Recent Activity</h2>
                <div className="overflow-x-auto scrollbar-hide">
                    <style>{`
                  @media (max-width: 767px) {
                    .responsive-table {
                      border: 0;
                    }
                    .responsive-table thead {
                      display: none;
                    }
                    .responsive-table tr {
                      margin-bottom: 1rem;
                      display: block;
                      border: 1px solid #374151;
                      border-radius: 0.5rem;
                      background-color: rgba(0, 0, 0, 0.2);
                    }
                    .responsive-table td {
                      display: block;
                      text-align: right;
                      padding: 0.75rem;
                      border-bottom: 1px solid #374151;
                    }
                    .responsive-table td:last-child {
                      border-bottom: 0;
                    }
                    .responsive-table td[data-label]::before {
                      content: attr(data-label);
                      font-weight: 600;
                      color: #9ca3af;
                      float: left;
                      margin-right: 1rem;
                      text-transform: uppercase;
                      font-size: 0.75rem;
                    }
                  }
                `}</style>
                  <table className="w-full responsive-table">
                    <thead className='hidden md:table-header-group'>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Transaction ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Game/Source</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Amount (USD)</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {recentActivity.map((activity, index) => (
                        <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 px-4">
                            <span className="text-sm font-mono text-blue-400">{activity.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                activity.type === 'Game Win' ? 'bg-green-400' :
                                activity.type === 'Game Loss' ? 'bg-red-400' :
                                activity.type === 'Deposit' ? 'bg-blue-400' :
                                'bg-orange-400'
                              }`}></div>
                              <span className="text-sm font-medium text-white">{activity.type}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-300">{activity.game}</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className={`text-sm font-semibold ${
                              activity.amount > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toLocaleString()}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                              activity.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                              activity.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {activity.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="text-sm text-gray-300">{activity.time}</div>
                            <div className="text-xs text-gray-500">{activity.date}</div>
                          </td>
                        </tr>
                      ))} */}
                       {recentActivity.map((tx) => <ResponsiveTableRow key={tx.id} transaction={tx} />)}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button 
                    onClick={() => setShowTransactionHistory(true)}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    View All Transactions →
                  </button>
                </div>
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="space-y-6">
              <div className="bg-black/20 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Achievements</h2>
                <div className="space-y-3">
                  {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg">
                        <Icon className="w-8 h-8 text-yellow-400" />
                        <div>
                          <div className="font-semibold text-white">{achievement.title}</div>
                          <div className="text-sm text-gray-300">{achievement.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                      : 'bg-black/20 border-gray-600/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                        : 'bg-gray-600'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-bold ${
                        achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-white' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className={`text-xs font-semibold ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                  }`}>
                    {achievement.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'balance' && (
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Balance Overview</h2>
                <button 
                  onClick={async () => {
                    setIsRefreshingBalance(true);
                    await refreshBalance();
                    setIsRefreshingBalance(false);
                  }}
                  disabled={isRefreshingBalance}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshingBalance ? 'animate-spin' : ''}`} />
                  <span>{isRefreshingBalance ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
              
              {userBalances.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userBalances.map((balance) => {
                    const totalAmount = parseFloat(balance.real_money) + parseFloat(balance.bonus_money);
                    const realAmount = parseFloat(balance.real_money);
                    const bonusAmount = parseFloat(balance.bonus_money);
                    
                    return (
                      <div key={balance.id} className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{balance.currency.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className="text-white font-semibold text-lg">{balance.currency}</h3>
                              <p className="text-gray-400 text-sm">Total Balance</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold text-xl">
                              {balanceService.formatCurrency(totalAmount, balance.currency)}
                            </div>
                            <div className="text-gray-400 text-xs">Updated: {new Date(balance.updated_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">Real Money</span>
                            <span className="text-green-400 font-semibold">
                              {balanceService.formatCurrency(realAmount, balance.currency)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">Bonus Money</span>
                            <span className="text-blue-400 font-semibold">
                              {balanceService.formatCurrency(bonusAmount, balance.currency)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" 
                              style={{ width: `${realAmount > 0 ? (realAmount / totalAmount) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Real: {realAmount > 0 ? ((realAmount / totalAmount) * 100).toFixed(1) : 0}%</span>
                            <span>Bonus: {bonusAmount > 0 ? ((bonusAmount / totalAmount) * 100).toFixed(1) : 0}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No Balances Found</h3>
                  <p className="text-gray-400 mb-4">You don't have any balances yet. Start by making a deposit!</p>
                  <button 
                    onClick={async () => {
                      setIsRefreshingBalance(true);
                      await refreshBalance();
                      setIsRefreshingBalance(false);
                    }}
                    disabled={isRefreshingBalance}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors"
                  >
                    {isRefreshingBalance ? 'Refreshing...' : 'Refresh Balances'}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <span>+</span>
                    <span>Deposit Funds</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <span>↔</span>
                    <span>Exchange Currency</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    <span>📊</span>
                    <span>View Transaction History</span>
                  </button>
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Balance Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Currencies</span>
                    <span className="text-white font-semibold">{userBalances.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Primary Currency</span>
                    <span className="text-white font-semibold">
                      {userBalances.length > 0 ? balanceService.getPrimaryBalance(userBalances)?.currency || 'N/A' : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Last Updated</span>
                    <span className="text-white font-semibold">
                      {userBalances.length > 0 ? new Date(Math.max(...userBalances.map(b => new Date(b.updated_at).getTime()))).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="bg-black/20 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white">
                      CryptoPlayer_42
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white">
                      player@example.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-black/20 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Security</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="font-semibold text-white">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-400">Extra security for your account</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-semibold text-white">Email Notifications</div>
                        <div className="text-sm text-gray-400">Receive updates about your account</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-semibold text-white">Login Alerts</div>
                        <div className="text-sm text-gray-400">Get notified of new login attempts</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-purple-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <button className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 py-3 rounded-lg font-semibold transition-colors">
                    Change Password
                  </button>
                  <button
                    onClick={() => setShowLoginHistory(true)}
                    className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-400 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Login History
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Transaction History Modal */}
        {showTransactionHistory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ml-44 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-6xl w-full max-h-[80vh] overflow-y-auto scrollbar-hide">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                <button
                  onClick={() => setShowTransactionHistory(false)}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  ✕
                </button>
              </div>
              
              {/* Filters */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Type</label>
                      <select
                        value={transactionFilter}
                        onChange={(e) => setTransactionFilter(e.target.value)}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="all">All Types</option>
                        <option value="wins">Game Wins</option>
                        <option value="losses">Game Losses</option>
                        <option value="deposits">Deposits</option>
                        <option value="withdrawals">Withdrawals</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                      <select
                        value={dateFilter}
                        onChange={(e) => handleDateFilterChange(e.target.value)}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                    {showCustomDateInputs && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                          <input
                            type="date"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                          <input
                            type="date"
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
                    </div>
                    <button
                      onClick={resetFilters}
                      className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
              
                              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Transaction ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Game/Source</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Amount (USD)</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.length > 0 ? paginatedTransactions.map((activity, index) => (
                      <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4">
                          <span className="text-sm font-mono text-blue-400">{activity.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.type === 'Game Win' ? 'bg-green-400' :
                              activity.type === 'Game Loss' ? 'bg-red-400' :
                              activity.type === 'Deposit' ? 'bg-blue-400' :
                              'bg-orange-400'
                            }`}></div>
                            <span className="text-sm font-medium text-white">{activity.type}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-300">{activity.game}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className={`text-sm font-semibold ${
                            activity.amount > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            activity.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                            activity.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {activity.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="text-sm text-gray-300">{activity.time}</div>
                          <div className="text-xs text-gray-500">{activity.date}</div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center">
                          <div className="text-gray-400">No transactions found matching your filters</div>
                          <button
                            onClick={resetFilters}
                            className="mt-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                          >
                            Reset filters to view all transactions
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {filteredTransactions.length > itemsPerPage && (
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages} • {filteredTransactions.length} total transactions
                </div>
                <button
                  onClick={() => setShowTransactionHistory(false)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login History Modal */}
        {showLoginHistory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto scrollbar-hide">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Login History</h2>
                <button
                  onClick={() => setShowLoginHistory(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                {loginHistory.map((login, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        login.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      <div>
                        <div className="font-semibold text-white">{login.location}</div>
                        <div className="text-sm text-gray-400">{login.device}</div>
                        <div className="text-xs text-gray-500">IP: {login.ip}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{login.time}</div>
                      <div className={`text-sm font-semibold ${
                        login.status === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {login.status === 'success' ? 'Successful' : 'Failed'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowLoginHistory(false)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;