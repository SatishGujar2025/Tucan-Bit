import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, ArrowLeft, Star, Users, Coins, Zap, Crown, 
  Home, Dice5, Trophy, BarChart2, ChevronDown, ChevronRight, 
  Wallet, User, Search, Filter, TrendingUp, Play, Heart
} from 'lucide-react';
import { ethers } from 'ethers';

import g1 from '../../assets/g1.jpg';
import g2 from '../../assets/g2.jpg';
import g3 from '../../assets/g3.jpg';
import g4 from '../../assets/g4.jpg';
import g5 from '../../assets/g5.jpeg';
import g6 from '../../assets/g6.jpg';
import g7 from '../../assets/g7.jpg';
import g8 from '../../assets/g8.jpg';
import g9 from '../../assets/g9.jpg';
import g10 from '../../assets/g10.jpg';
import g11 from '../../assets/g11.jpg';
import g12 from '../../assets/g12.jpg';
import g13 from '../../assets/g13.jpg';
import g14 from '../../assets/g14.jpg';
import g15 from '../../assets/g15.jpg';
import g16 from '../../assets/g16.jpg';
import g17 from '../../assets/g17.jpg';
import g18 from '../../assets/g18.jpg';
import g19 from '../../assets/g19.jpg';
import g20 from '../../assets/g20.jpg';
import g21 from '../../assets/g21.jpg';
import g22 from '../../assets/g22.jpg';
import tb from '../../assets/TB.png'

interface Game {
  id: string;
  name: string;
  category: string;
  provider: string;
  image: string;
  rating: number;
  players: number;
  minBet: number;
  maxBet: number;
  isFavorite: boolean;
  isHot: boolean;
  isNew: boolean;
}

interface GameCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  gameCount: number;
  bannerImage: string;
}

const GamesPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('games');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);

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
    if (page === 'home') {
      onBack();
    }
  };

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const connectWallet = async (walletType: string) => {
    // Mock wallet connection for now
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

  const gameCategories: GameCategory[] = [
    {
      id: 'slots',
      name: 'Slots',
      icon: '🎰',
      description: 'Spin to win with exciting slot machines',
      gameCount: 1247,
      bannerImage: g1
    },
    {
      id: 'table-games',
      name: 'Table Games',
      icon: '🎲',
      description: 'Classic casino table games',
      gameCount: 89,
      bannerImage: g2
    },
    {
      id: 'live-casino',
      name: 'Live Casino',
      icon: '🎥',
      description: 'Real-time live dealer games',
      gameCount: 156,
      bannerImage: g3
    },
    {
      id: 'jackpots',
      name: 'Jackpots',
      icon: '💰',
      description: 'Mega jackpot games with huge prizes',
      gameCount: 23,
      bannerImage: g4
    },
    {
      id: 'crypto-games',
      name: 'Crypto Games',
      icon: '₿',
      description: 'Blockchain-powered games',
      gameCount: 67,
      bannerImage: g5
    },
    {
      id: 'arcade',
      name: 'Arcade',
      icon: '🕹️',
      description: 'Fun arcade-style games',
      gameCount: 234,
      bannerImage: g7
    }
  ];

  const games: Game[] = [
    {
      id: '1',
      name: 'Mega Fortune',
      category: 'slots',
      provider: 'NetEnt',
      image: g9,
      rating: 4.8,
      players: 1247,
      minBet: 0.1,
      maxBet: 100,
      isFavorite: false,
      isHot: true,
      isNew: false
    },
    {
      id: '2',
      name: 'Blackjack Pro',
      category: 'table-games',
      provider: 'Evolution',
      image: g10,
      rating: 4.6,
      players: 892,
      minBet: 1,
      maxBet: 1000,
      isFavorite: true,
      isHot: false,
      isNew: false
    },
    {
      id: '3',
      name: 'Live Roulette',
      category: 'live-casino',
      provider: 'Pragmatic Play',
      image: g8,
      rating: 4.9,
      players: 2156,
      minBet: 0.5,
      maxBet: 500,
      isFavorite: false,
      isHot: true,
      isNew: false
    },
    {
      id: '4',
      name: 'Crypto Slots',
      category: 'crypto-games',
      provider: 'CryptoGaming',
      image: g2,
      rating: 4.7,
      players: 567,
      minBet: 0.01,
      maxBet: 50,
      isFavorite: false,
      isHot: false,
      isNew: true
    },
    {
      id: '5',
      name: 'Mega Jackpot',
      category: 'jackpots',
      provider: 'Microgaming',
      image: g1,
      rating: 4.9,
      players: 3421,
      minBet: 0.25,
      maxBet: 250,
      isFavorite: true,
      isHot: true,
      isNew: false
    },
    {
      id: '6',
      name: 'Arcade Blast',
      category: 'arcade',
      provider: 'ArcadeGaming',
      image: g7,
      rating: 4.5,
      players: 789,
      minBet: 0.1,
      maxBet: 100,
      isFavorite: false,
      isHot: false,
      isNew: true
    },
     {
      id: '7',
      name: 'Arcade Blast',
      category: 'arcade',
      provider: 'ArcadeGaming',
      image: g4,
      rating: 4.5,
      players: 789,
      minBet: 0.1,
      maxBet: 100,
      isFavorite: false,
      isHot: false,
      isNew: true
    },
     {
      id: '8',
      name: 'Arcade Blast',
      category: 'arcade',
      provider: 'ArcadeGaming',
      image: g2,
      rating: 4.5,
      players: 789,
      minBet: 0.1,
      maxBet: 100,
      isFavorite: false,
      isHot: false,
      isNew: true
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         game.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showFavorites || game.isFavorite;
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  const handlePlayGame = (game: Game) => {
    // TODO: Implement game launch logic
    alert(`Launching ${game.name}...`);
  };

  const toggleFavorite = (gameId: string) => {
    // TODO: Implement favorite toggle logic
    console.log(`Toggling favorite for game ${gameId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
  

      {/* Mobile Menu Button */}
      {/* <button 
        onClick={() => setSidebarOpen(!sidebarOpen)} 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button> */}

      {/* Main Content */}
      <div >
        {/* Header */}
        <div className=" px-4 sm:px-6 lg:px-8 py-6">
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
                  {/* <Gamepad2 className="w-6 h-6 text-blue-400" /> */}
                  {/* <span>Games</span> */}
                </h1>
              </div>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-8">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">PLAY THE BEST GAMES</h2>
              <p className="text-xl text-gray-200 mb-6">
                Discover thousands of exciting games from top providers. From classic slots to live dealer games, 
                there's something for everyone!
              </p>
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">🎮 2000+ Games</span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">🏆 Top Providers</span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">💰 Instant Wins</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 space-x-2 hidden md:flex">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🎰</div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🎲</div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🎥</div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">💰</div>
            </div>
          </div>

          {/* Game Categories */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Game Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameCategories.map((category) => (
                <div
                  key={category.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="relative overflow-hidden rounded-xl h-48">
                    <img
                      src={category.bannerImage}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl">{category.icon}</span>
                        <h4 className="text-xl font-bold text-white">{category.name}</h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{category.gameCount} games</span>
                        <span className="text-sm bg-blue-500 px-2 py-1 rounded-full">Play Now</span>
                      </div>
                    </div>
                  </div>
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
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showFavorites 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="players">Most Players</option>
                </select>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="relative bg-gray-800 rounded-xl overflow-hidden">
                  {/* Game Image */}
                  <div className="relative h-40">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      {game.isHot && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">HOT</span>
                      )}
                      {game.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(game.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${game.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    {/* Play Button */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayGame(game);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        <span>Play Now</span>
                      </button> */}
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{game.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{game.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3">{game.provider}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{game.players}</span>
                      </div>
                      <div className="text-gray-300">
                        <span className="text-green-400">${game.minBet}</span>
                        <span className="mx-1">-</span>
                        <span className="text-red-400">${game.maxBet}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-4">
              By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesPage; 