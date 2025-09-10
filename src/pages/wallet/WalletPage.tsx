import React, { useState } from 'react';
import { ArrowLeft, Wallet, Plus, Minus, Copy, Check, TrendingUp, TrendingDown, Clock, Shield, Eye, EyeOff, Users, QrCode } from 'lucide-react';

interface WalletPageProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ balance, onBalanceChange }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [showTransactionHistory, setShowTransactionHistory] = useState(activeTab === 'history');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomDateInputs, setShowCustomDateInputs] = useState(false);
  const itemsPerPage = 10;

  // Generate QR code URL for deposit address
  const generateQRCode = (address: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;
  };

  // Full transaction history for modal
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
      game: 'Litecoin Poker', 
      amount: 32000, 
      status: 'Completed', 
      time: '2 days ago',
      date: '2024-01-13 20:15'
    },
    { 
      id: 'TXN007', 
      type: 'Deposit', 
      game: 'Wallet', 
      amount: 25000, 
      status: 'Completed', 
      time: '3 days ago',
      date: '2024-01-12 11:30'
    },
    { 
      id: 'TXN008', 
      type: 'Game Loss', 
      game: 'Dogecoin Dice', 
      amount: -15000, 
      status: 'Completed', 
      time: '4 days ago',
      date: '2024-01-11 16:45'
    },
    { 
      id: 'TXN009', 
      type: 'Game Win', 
      game: 'Bitcoin Baccarat', 
      amount: 67000, 
      status: 'Completed', 
      time: '5 days ago',
      date: '2024-01-10 14:20'
    },
    { 
      id: 'TXN010', 
      type: 'Withdrawal', 
      game: 'Wallet', 
      amount: -40000, 
      status: 'Completed', 
      time: '6 days ago',
      date: '2024-01-09 09:10'
    }
  ];

  // Filter transactions based on type and date
  const filteredTransactions = fullTransactionHistory.filter(transaction => {
    // Filter by transaction type
    if (transactionFilter !== 'all') {
      const typeMap = {
        'wins': 'Game Win',
        'losses': 'Game Loss',
        'deposits': 'Deposit',
        'withdrawals': 'Withdrawal'
      };
      if (transaction.type !== typeMap[transactionFilter as keyof typeof typeMap]) {
        return false;
      }
    }

    // Filter by date range
    if (dateFilter !== 'all') {
      const transactionDate = new Date(transaction.date);
      const now = new Date();
      
      switch (dateFilter) {
        case 'today':
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return transactionDate >= today;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return transactionDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return transactionDate >= monthAgo;
        case 'custom':
          if (customStartDate && customEndDate) {
            const startDate = new Date(customStartDate);
            const endDate = new Date(customEndDate);
            endDate.setHours(23, 59, 59, 999); // Include the entire end date
            return transactionDate >= startDate && transactionDate <= endDate;
          }
          return true;
        default:
          return true;
      }
    }

    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Helper functions
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    setShowCustomDateInputs(value === 'custom');
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setTransactionFilter('all');
    setDateFilter('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setShowCustomDateInputs(false);
    setCurrentPage(1);
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [transactionFilter, dateFilter, customStartDate, customEndDate]);

  // Auto-open transaction history modal when history tab is selected
  React.useEffect(() => {
    if (activeTab === 'history') {
      setShowTransactionHistory(true);
    } else {
      setShowTransactionHistory(false);
    }
  }, [activeTab]);

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', balance: balance, usdValue: balance * 45000, change: '+2.4%', positive: true },
    { symbol: 'ETH', name: 'Ethereum', balance: balance * 15, usdValue: balance * 15 * 3000, change: '+1.8%', positive: true },
    { symbol: 'LTC', name: 'Litecoin', balance: balance * 100, usdValue: balance * 100 * 150, change: '-0.5%', positive: false },
    { symbol: 'DOGE', name: 'Dogecoin', balance: balance * 10000, usdValue: balance * 10000 * 0.08, change: '+5.2%', positive: true }
  ];

  const transactions = [
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
    }
  ];

  const depositAddresses = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C',
    LTC: 'ltc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
    DOGE: 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L'
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleDeposit = () => {
    if (depositAmount) {
      const amount = parseFloat(depositAmount);
      onBalanceChange(balance + amount);
      setDepositAmount('');
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount) {
      const amount = parseFloat(withdrawAmount);
      if (amount <= balance) {
        onBalanceChange(balance - amount);
        setWithdrawAmount('');
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'deposit', label: 'Deposit' },
    { id: 'withdraw', label: 'Withdraw' },
    { id: 'history', label: 'History' }
  ];

  return (
    <div className="page-content min-h-screen p-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Wallet</h1>
          <p className="text-xl text-gray-300">Manage your cryptocurrency funds securely</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-black/20 p-2 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setActiveTab('deposit')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Deposit Funds</span>
                </button>
                <button
                  onClick={() => setActiveTab('withdraw')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Minus className="w-5 h-5" />
                  <span>Withdraw Funds</span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Clock className="w-5 h-5" />
                  <span>View History</span>
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'deposit' ? 'bg-green-500/20' :
                        tx.type === 'withdrawal' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                      }`}>
                        {tx.type === 'deposit' ? <Plus className="w-5 h-5 text-green-400" /> :
                         tx.type === 'withdrawal' ? <Minus className="w-5 h-5 text-red-400" /> :
                         <TrendingUp className="w-5 h-5 text-yellow-400" />}
                      </div>
                      <div>
                        <div className="font-semibold text-white capitalize">{tx.type}</div>
                        <div className="text-sm text-gray-400">{tx.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        tx.type === 'deposit' || tx.type === 'win' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {tx.type === 'deposit' || tx.type === 'win' ? '+' : '-'}{tx.amount} USDT
                      </div>
                      <div className={`text-sm px-2 py-1 rounded ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
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
        )}

        {activeTab === 'deposit' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Deposit Cryptocurrency</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Cryptocurrency</label>
                  <select
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {cryptos.map((crypto) => (
                      <option key={crypto.symbol} value={crypto.symbol}>
                        {crypto.name} ({crypto.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Deposit Address</label>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex-1 bg-gray-800 rounded-lg px-4 py-3 font-mono text-sm text-white break-all">
                      {depositAddresses[selectedCrypto as keyof typeof depositAddresses]}
                    </div>
                    <button
                      onClick={() => copyToClipboard(depositAddresses[selectedCrypto as keyof typeof depositAddresses], selectedCrypto)}
                      className="p-3 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
                    >
                      {copiedAddress === selectedCrypto ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-purple-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Scan QR Code</label>
                  <div className="inline-block bg-white p-4 rounded-lg">
                    <img
                      src={generateQRCode(depositAddresses[selectedCrypto as keyof typeof depositAddresses])}
                      alt={`${selectedCrypto} Deposit QR Code`}
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Scan with your {selectedCrypto} wallet</p>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Important:</strong> Only send {selectedCrypto} to this address. 
                    Sending other cryptocurrencies may result in permanent loss.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Deposit Information</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Network:</span>
                  <span className="text-white font-semibold">{selectedCrypto} Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Minimum Deposit:</span>
                  <span className="text-white font-semibold">
                    {selectedCrypto === 'BTC' ? '0.001' : 
                     selectedCrypto === 'ETH' ? '0.01' :
                     selectedCrypto === 'LTC' ? '0.1' : '100'} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Confirmations Required:</span>
                  <span className="text-white font-semibold">
                    {selectedCrypto === 'BTC' ? '3' : 
                     selectedCrypto === 'ETH' ? '12' :
                     selectedCrypto === 'LTC' ? '6' : '6'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Processing Time:</span>
                  <span className="text-white font-semibold">5-30 minutes</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-300 text-sm">
                  If your deposit doesn't appear within 1 hour, please contact our support team 
                  with your transaction hash.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Withdraw Cryptocurrency</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Cryptocurrency</label>
                  <select
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {cryptos.map((crypto) => (
                      <option key={crypto.symbol} value={crypto.symbol}>
                        {crypto.name} ({crypto.symbol}) - Available: {crypto.balance.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Address</label>
                  <input
                    type="text"
                    placeholder={`Enter ${selectedCrypto} address`}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => setWithdrawAmount(balance.toString())}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm font-semibold"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) > balance}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Withdraw {selectedCrypto}
                </button>
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Withdrawal Information</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Network Fee:</span>
                  <span className="text-white font-semibold">
                    {selectedCrypto === 'BTC' ? '0.0005' : 
                     selectedCrypto === 'ETH' ? '0.005' :
                     selectedCrypto === 'LTC' ? '0.01' : '1'} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Minimum Withdrawal:</span>
                  <span className="text-white font-semibold">
                    {selectedCrypto === 'BTC' ? '0.002' : 
                     selectedCrypto === 'ETH' ? '0.02' :
                     selectedCrypto === 'LTC' ? '0.2' : '200'} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Processing Time:</span>
                  <span className="text-white font-semibold">1-24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Daily Limit:</span>
                  <span className="text-white font-semibold">
                    {selectedCrypto === 'BTC' ? '10' : 
                     selectedCrypto === 'ETH' ? '100' :
                     selectedCrypto === 'LTC' ? '1000' : '1,000,000'} {selectedCrypto}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-2">Security Notice</h3>
                <p className="text-gray-300 text-sm">
                  Double-check the withdrawal address. Cryptocurrency transactions are irreversible 
                  and cannot be undone once confirmed.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-black/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'Deposit' ? 'bg-green-500/20' :
                      tx.type === 'Withdrawal' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                    }`}>
                      {tx.type === 'Deposit' ? <Plus className="w-5 h-5 text-green-400" /> :
                       tx.type === 'Withdrawal' ? <Minus className="w-5 h-5 text-red-400" /> :
                       <TrendingUp className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{tx.type}</div>
                      <div className="text-sm text-gray-400">{tx.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                    </div>
                    <div className={`text-sm px-2 py-1 rounded ${
                      tx.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      tx.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))}
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
        )}

        {/* Transaction History Modal */}
        {showTransactionHistory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
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
              
              <div className="overflow-x-auto">
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
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;