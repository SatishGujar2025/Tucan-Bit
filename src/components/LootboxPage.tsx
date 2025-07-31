import React, { useState, useEffect } from 'react';
import { Gift, Star, Zap, Crown, Coins, ArrowLeft, ShoppingCart, Eye, Search, Filter, TrendingUp, Users, Home, Dice5, Trophy, Gamepad2, BarChart2, ChevronDown, ChevronRight, Wallet, User, ChevronUp } from 'lucide-react';
import { ethers } from 'ethers';

import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpeg';
import g6 from '../assets/g6.jpg';
import g7 from '../assets/g7.jpg';
import g8 from '../assets/g8.jpg';
import g9 from '../assets/g9.jpg';
import g10 from '../assets/g10.jpg';
import g11 from '../assets/g11.jpg';
import g12 from '../assets/g12.jpg';
import g13 from '../assets/g13.jpg';
import g14 from '../assets/g14.jpg';
import g15 from '../assets/g15.jpg';
import g16 from '../assets/g16.jpg';
import g17 from '../assets/g17.jpg';
import g18 from '../assets/g18.jpg';
import g19 from '../assets/g19.jpg';
import g20 from '../assets/g20.jpg';
import g21 from '../assets/g21.jpg';
import g22 from '../assets/g22.jpg';
import tb from '../assets/TB.png'
// Extend Window interface for ethereum provider
declare global {
  interface Window {
    ethereum?: any;
    phantom?: {
      ethereum?: any;
      solana?: any;
    };
  }
}

interface LootboxItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  contents: string[];
  color: string;
  brand: string;
  backgroundImage: string;
}

interface RecentWin {
  user: string;
  amount: number;
  currency: string;
}

const LootboxPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedLootbox, setSelectedLootbox] = useState<LootboxItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [collection, setCollection] = useState('all');
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('lootboxes');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Load wallet data from localStorage on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    const savedCurrency = localStorage.getItem('walletCurrency') as 'ETH' | 'SOL' | null;
    
    if (savedAddress) setWalletAddress(savedAddress);
    if (savedBalance) setWalletBalance(savedBalance);
    if (savedCurrency) setWalletCurrency(savedCurrency);
  }, []);

  const onNavigate = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    // Navigate to different pages
    if (page === 'home') {
      onBack();
    }
    // Add other navigation logic as needed
  };

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const connectWallet = async (walletType: string) => {
    if (walletType === 'metamask') {
      setWalletCurrency('ETH');
      localStorage.setItem('walletCurrency', 'ETH');
      await connectMetaMask();
    } else if (
      walletType === 'trustwallet' ||
      walletType === 'walletconnect' ||
      walletType === 'ledger'
    ) {
      setWalletCurrency('ETH');
      localStorage.setItem('walletCurrency', 'ETH');
      await connectWalletConnect();
    } else if (walletType === 'coinbase') {
      setWalletCurrency('ETH');
      localStorage.setItem('walletCurrency', 'ETH');
      await connectCoinbaseWallet();
    } else if (walletType === 'phantom') {
      await connectPhantom();
    } else {
      setTimeout(() => {
        const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        setWalletAddress(mockAddress);
        setWalletCurrency('ETH');
        localStorage.setItem('walletAddress', mockAddress);
        localStorage.setItem('walletCurrency', 'ETH');
        setShowWalletModal(false);
      }, 1000);
    }
  };

  const connectMetaMask = async () => {
    try {
      setIsConnecting(true);
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          localStorage.setItem('walletAddress', address);
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balance = await provider.getBalance(address);
          setWalletBalance(ethers.formatEther(balance));
          localStorage.setItem('walletBalance', ethers.formatEther(balance));
        }
        setShowWalletModal(false);
      } else {
        alert('MetaMask is not installed. Please install MetaMask.');
        window.open('https://metamask.io/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting with MetaMask:', error);
      alert('Failed to connect with MetaMask.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    try {
      setIsConnecting(true);
      // Mock implementation for WalletConnect
      setTimeout(() => {
        const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        setWalletAddress(mockAddress);
        localStorage.setItem('walletAddress', mockAddress);
        setWalletBalance('0.5');
        localStorage.setItem('walletBalance', '0.5');
        setShowWalletModal(false);
      }, 1000);
    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
      alert('Failed to connect with WalletConnect.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectCoinbaseWallet = async () => {
    try {
      setIsConnecting(true);
      // Mock implementation for Coinbase Wallet
      setTimeout(() => {
        const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        setWalletAddress(mockAddress);
        localStorage.setItem('walletAddress', mockAddress);
        setWalletBalance('1.2');
        localStorage.setItem('walletBalance', '1.2');
        setShowWalletModal(false);
      }, 1000);
    } catch (error) {
      console.error('Error connecting with Coinbase Wallet:', error);
      alert('Failed to connect with Coinbase Wallet.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    try {
      setIsConnecting(true);
      if (window.phantom && window.phantom.ethereum) {
        setWalletCurrency('ETH');
        localStorage.setItem('walletCurrency', 'ETH');
        const provider = window.phantom.ethereum;
        await provider.request({ method: 'eth_requestAccounts' });
        const ethersProvider = new ethers.BrowserProvider(provider);
        const accounts = await ethersProvider.send('eth_accounts', []);
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          localStorage.setItem('walletAddress', address);
          const balance = await ethersProvider.getBalance(address);
          setWalletBalance(ethers.formatEther(balance));
          localStorage.setItem('walletBalance', ethers.formatEther(balance));
        }
        setShowWalletModal(false);
      } else {
        alert('Phantom wallet is not installed. Please install Phantom.');
        window.open('https://phantom.app/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting with Phantom:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred while connecting with Phantom.');
      }
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

  const recentWins: RecentWin[] = [
    { user: 'Alekorns', amount: 0.07, currency: 'T' },
    { user: 'user_15712712', amount: 10.00, currency: 'T' },
    { user: 'OnTiltHUD5560', amount: 5.50, currency: 'T' },
    { user: 'CryptoKing', amount: 2.25, currency: 'T' },
    { user: 'LuckyGamer', amount: 8.75, currency: 'T' },
    { user: 'OnTiltHUD5560', amount: 5.50, currency: 'T' },
    { user: 'CryptoKing', amount: 2.25, currency: 'T' },
    { user: 'LuckyGamer', amount: 8.75, currency: 'T' },
     { user: 'Alekorns', amount: 0.07, currency: 'T' },
  ];

  const lootboxes: LootboxItem[] = [
    {
      id: '1',
      name: 'Bonus Buy',
      price: 37.0025,
      currency: 'T',
      rarity: 'rare',
      image: '🐋',
      description: 'Always Win',
      contents: ['Bonus Spins', 'Free Games', 'Multipliers'],
      color: 'bg-orange-500',
      brand: 'Whale',
      backgroundImage: g1
    },
    {
      id: '2',
      name: 'Free Spins',
      price: 3.0002,
      currency: 'T',
      rarity: 'common',
      image: '🎰',
      description: 'Always Win',
      contents: ['Free Spins', 'Bonus Rounds'],
      color: 'bg-pink-500',
      brand: 'Whale',
      backgroundImage: g2
    },
    {
      id: '3',
      name: 'Highroller Lootbox',
      price: 20000.3600,
      currency: 'T',
      rarity: 'legendary',
      image: '👑',
      description: 'HIGHROLLER',
      contents: ['VIP Rewards', 'Exclusive Items', 'High Stakes'],
      color: 'bg-yellow-500',
      brand: 'Premium',
      backgroundImage: g3
    },
    {
      id: '4',
      name: 'JAMBO Lootbox',
      price: 15.0010,
      currency: 'T',
      rarity: 'epic',
      image: '🎯',
      description: 'Always Win',
      contents: ['JAMBO Rewards', 'Special Bonuses'],
      color: 'bg-blue-500',
      brand: 'Whale',
      backgroundImage: g4
    },
    {
      id: '5',
      name: '$KINGY Swag',
      price: 1.5001,
      currency: 'T',
      rarity: 'common',
      image: '👕',
      description: 'Always Win',
      contents: ['Merchandise', 'Branded Items'],
      color: 'bg-red-500',
      brand: 'Whale',
      backgroundImage: g5
    },
    {
      id: '6',
      name: 'Mega Bonus Buy',
      price: 299.0203,
      currency: 'T',
      rarity: 'epic',
      image: '💎',
      description: 'Always Win',
      contents: ['Mega Bonuses', 'Premium Rewards'],
      color: 'bg-purple-500',
      brand: 'Whale',
      backgroundImage: g6
    },
    {
      id: '7',
      name: 'JAMBO Lootbox',
      price: 15.0010,
      currency: 'T',
      rarity: 'epic',
      image: '🎯',
      description: 'Always Win',
      contents: ['JAMBO Rewards', 'Special Bonuses'],
      color: 'bg-blue-500',
      brand: 'Whale',
      backgroundImage: g4
    },
    {
      id: '8',
      name: 'JAMBO Lootbox',
      price: 15.0010,
      currency: 'T',
      rarity: 'epic',
      image: '🎯',
      description: 'Always Win',
      contents: ['JAMBO Rewards', 'Special Bonuses'],
      color: 'bg-blue-500',
      brand: 'Whale',
      backgroundImage: g9
    },
     {
      id: '9',
      name: 'JAMBO Lootbox',
      price: 15.0010,
      currency: 'T',
      rarity: 'epic',
      image: '🎯',
      description: 'Always Win',
      contents: ['JAMBO Rewards', 'Special Bonuses'],
      color: 'bg-blue-500',
      brand: 'Whale',
      backgroundImage: g8
    },
     {
      id: '10',
      name: 'JAMBO Lootbox',
      price: 15.0010,
      currency: 'T',
      rarity: 'epic',
      image: '🎯',
      description: 'Always Win',
      contents: ['JAMBO Rewards', 'Special Bonuses'],
      color: 'bg-blue-500',
      brand: 'Whale',
      backgroundImage: g10
    },
  ];

  const handlePurchase = (lootbox: LootboxItem) => {
    // TODO: Implement purchase logic
    alert(`Purchasing ${lootbox.name} for ${lootbox.price} ${lootbox.currency}`);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" />
                  <path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">
                  <span className="text-yellow-400">Tucan</span>
                  <span className="text-orange-500">Bit</span>
                </span>
                <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
              </div>
            </div>
          </div>

          {/* Main Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => onNavigate('home')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] text-white ${currentPage === 'home' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            {/* Casino */}
            <button
              onClick={() => onNavigate('casino')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'casino' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Dice5 className="w-5 h-5" />
              <span>Casino</span>
            </button>

            {/* Sports */}
            <button
              onClick={() => onNavigate('sports')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'sports' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Sports</span>
            </button>

            {/* Lootboxes */}
            <button
              onClick={() => onNavigate('lootboxes')}
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
                  <button onClick={() => onNavigate('slots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Dice5 className="w-4 h-4" />
                    <span>Slots</span>
                  </button>
                  <button onClick={() => onNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Table Games</span>
                  </button>
                  <button onClick={() => onNavigate('roulette')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Roulette</span>
                  </button>
                  <button onClick={() => onNavigate('blackjack')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Blackjack</span>
                  </button>
                  <button onClick={() => onNavigate('live-casino')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Users className="w-4 h-4" />
                    <span>Live Casino</span>
                  </button>
                  <button onClick={() => onNavigate('jackpots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Coins className="w-4 h-4" />
                    <span>Jackpots</span>
                  </button>
                </div>
              )}
            </div>

            {/* Promotions */}
            <button
              onClick={() => onNavigate('promotions')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'promotions' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Promotions</span>
            </button>

            {/* Tournaments */}
            <button
              onClick={() => onNavigate('tournaments')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'tournaments' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Dice5 className="w-5 h-5" />
              <span>Tournaments</span>
            </button>

            {/* Earn */}
            <button
              onClick={() => onNavigate('earn')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'earn' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Earn</span>
            </button>

            {/* Task Dashboard */}
            <button
              onClick={() => onNavigate('task-dashboard')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'task-dashboard' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Gift className="w-5 h-5" />
              <span>Task Dashboard</span>
            </button>

            {/* Support */}
            <button
              onClick={() => onNavigate('support')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'support' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Home className="w-5 h-5" />
              <span>Support</span>
            </button>

            {/* Community */}
            <button
              onClick={() => onNavigate('community')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'community' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Dice5 className="w-5 h-5" />
              <span>Community</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => onNavigate('settings')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'settings' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          {/* User Profile / Wallet */}
          <div className="p-4 border-t border-gray-800">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                  <button onClick={disconnectWallet} className="text-xs text-orange-400 hover:text-orange-300">
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowWalletModal(true)} 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)} 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className={`lg:ml-64 ${sidebarOpen ? 'ml-64' : ''}`}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* <button
                onClick={onBack}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button> */}
              <div>
                <h1 className="text-2xl font-bold flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-blue-400" />
                  <span>Lootboxes</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Banner */} 
          <div className="relative mb-8 overflow-hidden rounded-xl  p-8"  style={{
                  backgroundImage: `url(${tb})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2 text-yellow-700">OPEN LOOTBOXES WIN PRIZES EVERY TIME!</h2>
              <p className="text-lg text-yellow-500 mb-4">
                Unbox Crypto, Free Spins, Merch & more! Win every time, sell what you don't want.
              </p>
              {/* <div className="flex items-center space-x-4">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">#Sometimes Lose Always Win</span>
              </div> */}
            </div>
            
            {/* Decorative items */}
            {/* <div className="absolute top-4 right-4 flex space-x-2">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">👟</div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🧦</div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">👕</div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🥊</div>
            </div> */}
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>Recent Wins</span>
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {recentWins.map((win, index) => (
                <div key={index} className="flex-shrink-0 bg-gray-800 rounded-lg p-3 min-w-[120px]">
                  <div className="text-sm text-gray-400">{win.user}</div>
                  <div className="text-lg font-bold text-green-400">{win.currency} {win.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for lootbox"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Collection:</span>
                <select
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All</option>
                  <option value="whale">Whale</option>
                  <option value="premium">Premium</option>
                  <option value="limited">Limited Edition</option>
                </select>
              </div>
            </div>
          </div>

                  {/* Lootboxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
          {lootboxes.map((lootbox) => (
            <div
              key={lootbox.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedLootbox(lootbox)}
            >
              <div 
                className="relative rounded-xl p-6 h-48 flex flex-col justify-between overflow-hidden"
                style={{
                  backgroundImage: `url(${lootbox.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Content overlay */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Brand Badge */}
                  {/* <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded text-xs font-bold text-white">
                    {lootbox.brand}
                  </div> */}

                  {/* Lootbox Icon and Name */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{lootbox.image}</div>
                    {/* <h3 className="text-lg font-bold mb-1 text-white">{lootbox.name}</h3>
                    <p className="text-sm text-gray-200">{lootbox.description}</p> */}
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{lootbox.currency} {lootbox.price.toFixed(4)}</div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLootbox(lootbox);
                        setShowPreview(true);
                      }}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(lootbox);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* Preview Modal */}
          {showPreview && selectedLootbox && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Preview: {selectedLootbox.name}</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="text-center mb-6">
                  <div className={`${selectedLootbox.color} rounded-xl p-8 mb-4`}>
                    <div className="text-6xl mb-2">{selectedLootbox.image}</div>
                    <h4 className="text-xl font-bold">{selectedLootbox.name}</h4>
                    <p className="text-sm opacity-90">{selectedLootbox.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Possible Contents:</h4>
                  <ul className="space-y-2">
                    {selectedLootbox.contents.map((content, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{content}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      handlePurchase(selectedLootbox);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* FAQ Section */}
      <div className={`lg:ml-64 ${sidebarOpen ? 'ml-64' : ''}` } style={{backgroundColor:''}}>
        <div className="mt-12 mb-6 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* FAQ Item 1 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  What are Lootboxes and how do they work?
                </h3>
                {openFAQ === 0 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 0 && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Lootboxes are mystery boxes containing various rewards and bonuses. Each lootbox has different rarity levels (Common, Rare, Epic, Legendary) and contains items like bonus spins, free games, multipliers, and exclusive rewards. When you purchase a lootbox, you'll receive random rewards based on the lootbox's contents and rarity.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  How do I purchase a Lootbox?
                </h3>
                {openFAQ === 1 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    To purchase a lootbox, you need to connect your wallet first. Click on the "Connect Wallet" button and choose from MetaMask, Coinbase Wallet, Phantom, or WalletConnect. Once connected, you can click on any lootbox card and use the "Purchase" button to buy it with your wallet balance.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  What are the different rarity levels?
                </h3>
                {openFAQ === 2 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 2 && (
                <div className="px-3 pb-3">
                  <div className="text-xs text-gray-300 leading-relaxed space-y-1">
                    <p><span className="text-green-400 font-semibold">Common:</span> Basic rewards with lower value but higher drop rates</p>
                    <p><span className="text-blue-400 font-semibold">Rare:</span> Better rewards with moderate value and drop rates</p>
                    <p><span className="text-purple-400 font-semibold">Epic:</span> High-value rewards with lower drop rates</p>
                    <p><span className="text-yellow-400 font-semibold">Legendary:</span> Premium rewards with the highest value but lowest drop rates</p>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  Can I see what's inside a Lootbox before purchasing?
                </h3>
                {openFAQ === 3 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 3 && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Yes! You can preview the possible contents of any lootbox by clicking on the "Eye" icon on the lootbox card. This will show you a list of all possible rewards that could be inside, though the specific items you receive will be random when you open the lootbox.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  How do I receive my rewards after purchasing?
                </h3>
                {openFAQ === 4 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 4 && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    After purchasing a lootbox, your rewards will be automatically added to your account. You can view your rewards in your wallet balance, and any bonus spins or free games will be available immediately in the games section. VIP rewards and exclusive items will be sent to your account dashboard.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 6 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  Are Lootboxes available 24/7?
                </h3>
                {openFAQ === 5 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 5 && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Yes! Our lootboxes are available 24/7 for purchase. However, some special limited-edition lootboxes may have time restrictions or limited quantities. Keep an eye on our announcements for special lootbox releases and events.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 7 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  What payment methods are accepted?
                </h3>
                {openFAQ === 6 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 6 && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    We accept various cryptocurrencies through wallet connections including MetaMask, Coinbase Wallet, Phantom, and WalletConnect. All transactions are processed securely on the blockchain, and you can use tokens like T (TucanBit Token) and other supported cryptocurrencies.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 8 */}
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <span className="text-blue-500 mr-2 text-xs">Q:</span>
                  Is there a limit on how many Lootboxes I can buy?
                </h3>
                {openFAQ === 7 ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </button>
              {openFAQ === 7 && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    There's no limit on the number of lootboxes you can purchase! You can buy as many as you want, limited only by your wallet balance. Some high-value lootboxes like the Highroller Lootbox are designed for players who want to purchase multiple boxes for better chances at legendary rewards.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Support */}
          {/* <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions? We're here to help!</p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-semibold">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white font-semibold">
                Live Chat
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Connect Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => connectWallet('metamask')}
                disabled={isConnecting}
                className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-orange-500 rounded"></div>
                <span>MetaMask</span>
              </button>
              
              <button
                onClick={() => connectWallet('coinbase')}
                disabled={isConnecting}
                className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-blue-500 rounded"></div>
                <span>Coinbase Wallet</span>
              </button>
              
              <button
                onClick={() => connectWallet('phantom')}
                disabled={isConnecting}
                className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-purple-500 rounded"></div>
                <span>Phantom</span>
              </button>
              
              <button
                onClick={() => connectWallet('walletconnect')}
                disabled={isConnecting}
                className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
                <span>WalletConnect</span>
              </button>
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-4">
              By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
            </p>
          </div>
        </div>
      )}
    </div></>
  );
};

export default LootboxPage; 
