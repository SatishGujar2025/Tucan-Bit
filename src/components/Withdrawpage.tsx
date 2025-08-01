import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Gift, Clock, Star, Trophy, Zap, Crown, Copy, Check, Calendar, Users, Target, Award,
  Home, Wallet, Coins, Dice5, HelpCircle, Mail, Settings, ChevronDown, ChevronRight, LogOut, User, CreditCard, BarChart2,
  Gamepad2, Bitcoin, CreditCard as CreditCardIcon, QrCode, Copy as CopyIcon, ExternalLink, AlertTriangle
} from 'lucide-react';

interface WithdrawPageProps {
  onNavigate?: (page: string) => void;
}

const WithdrawPage: React.FC<WithdrawPageProps> = ({ onNavigate }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [currentPage, setCurrentPage] = useState('withdraw');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    const savedCurrency = localStorage.getItem('walletCurrency') as 'ETH' | 'SOL' | null;
    
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setWalletBalance(savedBalance);
      setWalletCurrency(savedCurrency);
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const connectWallet = async (walletType: string) => {
    setTimeout(() => {
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setWalletAddress(mockAddress);
      setWalletCurrency('ETH');
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletCurrency', 'ETH');
      setShowWalletModal(false);
    }, 1000);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletCurrency(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('walletCurrency');
  };

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const walletProviders = [
    { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', description: 'Connect using your MetaMask wallet' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png', description: 'Scan QR code with mobile wallet' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp', description: 'Connect with Coinbase extension' },
    { id: 'phantom', name: 'Phantom', icon: 'https://logowik.com/content/uploads/images/phantom3506.jpg', description: 'Solana & Ethereum compatible' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png', description: 'Mobile wallet connection' },
    { id: 'ledger', name: 'Ledger', icon: 'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/60fbcaf3bd0478862b605203_ledger.jpg', description: 'Connect your hardware wallet' }
  ];

  const handleWithdraw = () => {
    if (withdrawAmount && withdrawAddress) {
      setShowWithdrawModal(true);
    }
  };

  const confirmWithdraw = () => {
    // Simulate withdrawal processing
    setTimeout(() => {
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setWithdrawAddress('');
      alert('Withdrawal request submitted successfully!');
    }, 2000);
  };

  const cryptocurrencies = [
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      icon: '₿', 
      balance: '0.54321',
      minWithdraw: '0.001',
      maxWithdraw: '10',
      network: 'Bitcoin',
      fee: '0.0001',
      processingTime: '10-30 minutes'
    },
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      icon: 'Ξ', 
      balance: '10.987',
      minWithdraw: '0.01',
      maxWithdraw: '100',
      network: 'Ethereum',
      fee: '0.005',
      processingTime: '5-15 minutes'
    },
    { 
      symbol: 'USDT', 
      name: 'Tether', 
      icon: '₮', 
      balance: '12,345.67',
      minWithdraw: '10',
      maxWithdraw: '100,000',
      network: 'Tron',
      fee: '1',
      processingTime: '2-10 minutes'
    },
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      icon: 'S', 
      balance: '123.45',
      minWithdraw: '0.1',
      maxWithdraw: '1000',
      network: 'Solana',
      fee: '0.00025',
      processingTime: '1-5 minutes'
    }
  ];

  const selectedCrypto = cryptocurrencies.find(crypto => crypto.symbol === selectedCurrency);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Connect Wallet</h3>
              <button onClick={() => setShowWalletModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="space-y-3 mb-6">
              {walletProviders.map((wallet) => (
                <button key={wallet.id} onClick={() => connectWallet(wallet.id)} className="flex items-center w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200">
                  <img src={wallet.icon} alt={wallet.name} className="w-10 h-10 mr-4" />
                  <div className="text-left">
                    <div className="font-medium text-white">{wallet.name}</div>
                    <div className="text-sm text-gray-400">{wallet.description}</div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm">By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a></p>
          </div>
        </div>
      )}

      {/* Withdrawal Confirmation Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Confirm Withdrawal</h3>
              <p className="text-gray-400">Please review your withdrawal details</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-semibold">{withdrawAmount} {selectedCrypto?.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network Fee:</span>
                  <span className="text-white font-semibold">{selectedCrypto?.fee} {selectedCrypto?.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">You'll Receive:</span>
                  <span className="text-green-400 font-semibold">
                    {(parseFloat(withdrawAmount) - parseFloat(selectedCrypto?.fee || '0')).toFixed(6)} {selectedCrypto?.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Address:</span>
                  <span className="text-white font-mono text-sm truncate max-w-48">{withdrawAddress}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmWithdraw}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg>
              </div>
              <div>
                <span className="text-2xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></span>
                <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
              </div>
            </div>
          </div>
          {/* Main Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => handleNavigate('home')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] text-white ${currentPage === 'home' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            {/* Casino */}
            <button
              onClick={() => handleNavigate('casino')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'casino' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Dice5 className="w-5 h-5" />
              <span>Casino</span>
            </button>

            {/* Sports */}
            <button
              onClick={() => handleNavigate('sports')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'sports' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Sports</span>
            </button>

            {/* Lootboxes */}
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
                <div className="pl-10 pt-2 space-y-2">
                  <button onClick={() => handleNavigate('slots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Dice5 className="w-4 h-4" />
                    <span>Slots</span>
                  </button>
                  <button onClick={() => handleNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Table Games</span>
                  </button>
                  <button onClick={() => handleNavigate('roulette')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Roulette</span>
                  </button>
                  <button onClick={() => handleNavigate('blackjack')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Blackjack</span>
                  </button>
                  <button onClick={() => handleNavigate('live-casino')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Users className="w-4 h-4" />
                    <span>Live Casino</span>
                  </button>
                  <button onClick={() => handleNavigate('jackpots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Coins className="w-4 h-4" />
                    <span>Jackpots</span>
                  </button>
                </div>
              )}
            </div>

            {/* Promotions */}
            <button
              onClick={() => handleNavigate('promotions')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'promotions' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Gift className="w-5 h-5" />
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
                  <button onClick={() => handleNavigate('withdraw')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                    <LogOut className="w-4 h-4" />
                    <span>Withdraw</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tournaments */}
            <button
              onClick={() => handleNavigate('tournaments')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'tournaments' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Tournaments</span>
            </button>

            {/* Earn */}
            <button
              onClick={() => handleNavigate('earn')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'earn' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Coins className="w-5 h-5" />
              <span>Earn</span>
            </button>

            {/* Token Dashboard */}
            <button
              onClick={() => handleNavigate('token-dashboard')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'token-dashboard' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Token Dashboard</span>
            </button>

            {/* Support */}
            <button
              onClick={() => handleNavigate('support')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'support' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Support</span>
            </button>

            {/* Community */}
            <button
              onClick={() => handleNavigate('community')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'community' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <User className="w-5 h-5" />
              <span>Community</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => handleNavigate('settings')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'settings' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-800">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                  {walletBalance && <div className="flex items-center gap-2 mt-1"><span className="text-base font-bold text-yellow-400">{parseFloat(walletBalance).toFixed(4)}</span><span className="text-xs font-semibold text-gray-300">{walletCurrency}</span></div>}
                  <button onClick={disconnectWallet} className="text-xs text-orange-400 hover:text-orange-300">Disconnect</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowWalletModal(true)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-orange-600 transition-all">
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
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
      <main className="pt-16 lg:pt-0 lg:ml-64">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[40vh] min-h-[300px] flex items-center mb-12">
              <div
                className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center"
                style={{ backgroundPosition: 'center 30%' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center md:text-left max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Withdraw</span> Funds
                  </h1>
                  <p className="text-xl text-gray-300">
                    Withdraw your winnings to your cryptocurrency wallet instantly
                  </p>
                </div>
              </div>
            </section>

            {/* Currency Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Select Cryptocurrency</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cryptocurrencies.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => setSelectedCurrency(crypto.symbol)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedCurrency === crypto.symbol
                        ? 'border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-orange-500/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{crypto.icon}</div>
                      <div className="text-left">
                        <div className="font-bold text-white">{crypto.symbol}</div>
                        <div className="text-sm text-gray-400">{crypto.name}</div>
                        <div className="text-xs text-yellow-400">Balance: {crypto.balance}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Withdrawal Form */}
            {selectedCrypto && (
              <div className="grid lg:grid-cols-2 gap-8">

                {/* Withdrawal Form */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <LogOut className="w-6 h-6 mr-3 text-yellow-400" />
                    Withdraw {selectedCrypto.name}
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Amount Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          placeholder={`0.00 ${selectedCrypto.symbol}`}
                          className="w-full bg-gray-900 rounded-lg px-4 py-3 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none"
                        />
                        <div className="absolute right-3 top-3 text-gray-400">{selectedCrypto.symbol}</div>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-400">Available: {selectedCrypto.balance} {selectedCrypto.symbol}</span>
                        <button 
                          onClick={() => setWithdrawAmount(selectedCrypto.balance)}
                          className="text-yellow-400 hover:text-yellow-300"
                        >
                          Max
                        </button>
                      </div>
                    </div>

                    {/* Address Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Address</label>
                      <input
                        type="text"
                        value={withdrawAddress}
                        onChange={(e) => setWithdrawAddress(e.target.value)}
                        placeholder={`Enter your ${selectedCrypto.name} address`}
                        className="w-full bg-gray-900 rounded-lg px-4 py-3 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none font-mono text-sm"
                      />
                    </div>

                    {/* Network Info */}
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Network</div>
                          <div className="text-white font-semibold">{selectedCrypto.network}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Network Fee</div>
                          <div className="text-white font-semibold">{selectedCrypto.fee} {selectedCrypto.symbol}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Min Withdrawal</div>
                          <div className="text-white font-semibold">{selectedCrypto.minWithdraw} {selectedCrypto.symbol}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Max Withdrawal</div>
                          <div className="text-white font-semibold">{selectedCrypto.maxWithdraw} {selectedCrypto.symbol}</div>
                        </div>
                      </div>
                    </div>

                    {/* Withdraw Button */}
                    <button
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || !withdrawAddress || parseFloat(withdrawAmount) < parseFloat(selectedCrypto.minWithdraw)}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Withdraw {selectedCrypto.symbol}
                    </button>
                  </div>
                </div>

                {/* Information Panel */}
                <div className="space-y-6">
                  {/* Important Notes */}
                  <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl p-6 border border-red-700/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                      Important Notes
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Ensure you're using the correct network ({selectedCrypto.network}) for your withdrawal address.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Withdrawals below the minimum amount will be rejected.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Double-check your withdrawal address before confirming.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Processing time: {selectedCrypto.processingTime}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Processing Steps */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl p-6 border border-blue-700/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-400" />
                      Withdrawal Process
                    </h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                        <span>Enter the amount you want to withdraw and your wallet address</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                        <span>Review the withdrawal details and confirm the transaction</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                        <span>Your withdrawal will be processed within {selectedCrypto.processingTime}</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                        <span>You'll receive a confirmation email once the withdrawal is completed</span>
                      </li>
                    </ol>
                  </div>

                  {/* Recent Withdrawals */}
                  <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl p-6 border border-green-700/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-green-400" />
                      Recent Withdrawals
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{selectedCrypto.icon}</div>
                          <div>
                            <div className="text-white font-semibold">0.001 {selectedCrypto.symbol}</div>
                            <div className="text-sm text-gray-400">2 hours ago</div>
                          </div>
                        </div>
                        <div className="text-green-400 font-semibold">Completed</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{selectedCrypto.icon}</div>
                          <div>
                            <div className="text-white font-semibold">0.005 {selectedCrypto.symbol}</div>
                            <div className="text-sm text-gray-400">1 day ago</div>
                          </div>
                        </div>
                        <div className="text-yellow-400 font-semibold">Processing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WithdrawPage;