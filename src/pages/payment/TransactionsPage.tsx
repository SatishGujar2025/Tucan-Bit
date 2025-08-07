import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  DollarSign,
  Wallet,
  CreditCard,
  Coins,
  BarChart3,
  Gift
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
  game?: string;
  transactionHash?: string;
}

const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Generate sample transactions
  const generateTransactions = (): Transaction[] => {
    return [
      {
        id: 'TX001',
        type: 'deposit',
        amount: 1000,
        currency: 'USDT',
        status: 'completed',
        date: '2024-01-15T10:30:00Z',
        description: 'Deposit via Credit Card',
        transactionHash: '0x1234567890abcdef'
      },
      {
        id: 'TX002',
        type: 'bet',
        amount: -50,
        currency: 'USDT',
        status: 'completed',
        date: '2024-01-15T11:15:00Z',
        description: 'Bet on Crazy Time',
        game: 'Crazy Time'
      },
      {
        id: 'TX003',
        type: 'win',
        amount: 250,
        currency: 'USDT',
        status: 'completed',
        date: '2024-01-15T11:20:00Z',
        description: 'Win from Crazy Time',
        game: 'Crazy Time'
      },
      {
        id: 'TX004',
        type: 'withdrawal',
        amount: -500,
        currency: 'USDT',
        status: 'pending',
        date: '2024-01-14T16:45:00Z',
        description: 'Withdrawal to Bank Account',
        transactionHash: '0xabcdef1234567890'
      },
      {
        id: 'TX005',
        type: 'bonus',
        amount: 100,
        currency: 'USDT',
        status: 'completed',
        date: '2024-01-14T09:00:00Z',
        description: 'Welcome Bonus'
      },
      {
        id: 'TX006',
        type: 'bet',
        amount: -25,
        currency: 'USDT',
        status: 'completed',
        date: '2024-01-13T20:30:00Z',
        description: 'Bet on Blackjack',
        game: 'Blackjack'
      },
      {
        id: 'TX007',
        type: 'win',
        amount: 75,
        currency: 'USDT',
        status: 'completed',
        date: '2024-01-13T20:35:00Z',
        description: 'Win from Blackjack',
        game: 'Blackjack'
      },
      {
        id: 'TX008',
        type: 'withdrawal',
        amount: -200,
        currency: 'USDT',
        status: 'failed',
        date: '2024-01-12T14:20:00Z',
        description: 'Withdrawal to Crypto Wallet',
        transactionHash: '0xfedcba0987654321'
      }
    ];
  };

  const transactions = generateTransactions();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight className="w-4 h-4 text-green-400" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'bet':
        return <Coins className="w-4 h-4 text-blue-400" />;
      case 'win':
        return <DollarSign className="w-4 h-4 text-yellow-400" />;
      case 'bonus':
        return <Gift className="w-4 h-4 text-purple-400" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedFilter === 'all' || transaction.type === selectedFilter;
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'completed').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalWinnings = transactions.filter(t => t.type === 'win' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-gray-400">Track all your deposits, withdrawals, bets, and winnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Deposits</p>
                <p className="text-2xl font-bold text-green-400">{totalDeposits.toFixed(2)} USDT</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Withdrawals</p>
                <p className="text-2xl font-bold text-red-400">{totalWithdrawals.toFixed(2)} USDT</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Winnings</p>
                <p className="text-2xl font-bold text-yellow-400">{totalWinnings.toFixed(2)} USDT</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="bet">Bets</option>
                <option value="win">Wins</option>
                <option value="bonus">Bonuses</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(transaction.type)}
                        <div>
                          <p className="text-white font-medium">{transaction.id}</p>
                          <p className="text-gray-400 text-sm">{transaction.description}</p>
                          {transaction.game && (
                            <p className="text-blue-400 text-xs">Game: {transaction.game}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        transaction.type === 'deposit' ? 'bg-green-500/20 text-green-400' :
                        transaction.type === 'withdrawal' ? 'bg-red-500/20 text-red-400' :
                        transaction.type === 'bet' ? 'bg-blue-500/20 text-blue-400' :
                        transaction.type === 'win' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} {transaction.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">
                        <p className="text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleTimeString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {transaction.transactionHash && (
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          View Hash
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No transactions found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;       