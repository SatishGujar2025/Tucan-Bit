import React, { useState } from 'react';
import { Play, Star, TrendingUp, Filter, Search, Clock, Trophy, Users, Zap, Gift, Crown } from 'lucide-react';
import { Language, getTranslation } from '../translations';

interface GameLobbyProps {
  onNavigate: (page: string) => void;
  initialFilter?: string;
  language: Language;
}

const GameLobby: React.FC<GameLobbyProps> = ({ onNavigate, initialFilter, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialFilter || 'all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Games', count: 247, icon: '🎮' },
    { id: 'slots', name: 'Slots', count: 156, icon: '🎰' },
    { id: 'live', name: 'Live Casino', count: 24, icon: '🎭' },
    { id: 'table', name: 'Table Games', count: 32, icon: '🃏' },
    { id: 'jackpots', name: 'Jackpots', count: 18, icon: '💎' },
    { id: 'new', name: 'New', count: 17, icon: '⭐' }
  ];

  const providers = [
    { id: 'all', name: 'All Providers' },
    { id: 'pragmatic', name: 'Pragmatic Play' },
    { id: 'evolution', name: 'Evolution Gaming' },
    { id: 'netent', name: 'NetEnt' },
    { id: 'microgaming', name: 'Microgaming' }
  ];

  const featuredGames = [
    {
      id: 'mega-fortune',
      name: 'Mega Fortune Dreams',
      category: 'jackpots',
      provider: 'netent',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.4%',
      jackpot: '€2,847,392',
      players: 2847,
      featured: true,
      new: false,
      hot: true
    },
    {
      id: 'live-blackjack',
      name: 'Live Blackjack VIP',
      category: 'live',
      provider: 'evolution',
      image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '99.4%',
      maxWin: '500x',
      players: 1892,
      featured: true,
      new: false,
      hot: true
    },
    {
      id: 'sweet-bonanza',
      name: 'Sweet Bonanza',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.5%',
      maxWin: '21,100x',
      players: 3421,
      featured: true,
      new: false,
      hot: true
    }
  ];

  const games = [
    {
      id: 'slot',
      name: 'Crypto Fortune',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.5%',
      maxWin: '1000x',
      players: 1250,
      hot: true,
      new: false
    },
    {
      id: 'blackjack',
      name: 'Bitcoin Blackjack',
      category: 'table',
      provider: 'evolution',
      image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '99.4%',
      maxWin: '3:2',
      players: 890,
      hot: false,
      new: false
    },
    {
      id: 'slot',
      name: 'Book of Dead',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.2%',
      maxWin: '5000x',
      players: 1890,
      hot: true,
      new: false
    },
    {
      id: 'slot',
      name: 'Starburst',
      category: 'slots',
      provider: 'netent',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.1%',
      maxWin: '500x',
      players: 2340,
      hot: true,
      new: false
    },
    {
      id: 'slot',
      name: 'Gonzo Quest',
      category: 'slots',
      provider: 'netent',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '95.9%',
      maxWin: '2500x',
      players: 1560,
      hot: false,
      new: false
    },
    {
      id: 'slot',
      name: 'Reactoonz',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.5%',
      maxWin: '4570x',
      players: 890,
      hot: false,
      new: true
    },
    {
      id: 'slot',
      name: 'Dead or Alive',
      category: 'slots',
      provider: 'netent',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.8%',
      maxWin: '12000x',
      players: 670,
      hot: true,
      new: false
    },
    {
      id: 'slot',
      name: 'Jammin Jars',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.8%',
      maxWin: '20000x',
      players: 1230,
      hot: true,
      new: false
    },
    {
      id: 'live-baccarat',
      name: 'Live Baccarat',
      category: 'live',
      provider: 'evolution',
      image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '98.9%',
      maxWin: '1:1',
      players: 456,
      hot: false,
      new: false
    },
    {
      id: 'poker',
      name: 'Caribbean Poker',
      category: 'table',
      provider: 'evolution',
      image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '98.2%',
      maxWin: '100:1',
      players: 234,
      hot: false,
      new: true
    },
    {
      id: 'jackpot-slot2',
      name: 'Mega Moolah',
      category: 'jackpots',
      provider: 'microgaming',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '88.1%',
      jackpot: '€1,247,392',
      players: 1890,
      hot: true,
      new: false
    },
    {
      id: 'slot',
      name: 'Fire Joker',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.2%',
      maxWin: '800x',
      players: 567,
      hot: false,
      new: false
    },
    {
      id: 'slot',
      name: 'Wolf Gold',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.0%',
      maxWin: '2500x',
      players: 890,
      hot: false,
      new: false
    },
    {
      id: 'slot',
      name: 'Bonanza',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.0%',
      maxWin: '12000x',
      players: 1340,
      hot: true,
      new: false
    },
    {
      id: 'roulette',
      name: 'Ethereum Roulette',
      category: 'table',
      provider: 'evolution',
      image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '97.3%',
      maxWin: '35x',
      players: 670,
      hot: true,
      new: false
    },
    {
      id: 'slot',
      name: 'Diamond Vault',
      category: 'slots',
      provider: 'netent',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '95.8%',
      maxWin: '500x',
      players: 420,
      hot: false,
      new: true
    },
    {
      id: 'slot',
      name: 'Gold Rush',
      category: 'slots',
      provider: 'pragmatic',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '97.1%',
      maxWin: '2000x',
      players: 980,
      hot: true,
      new: false
    },
    {
      id: 'slot',
      name: 'Neon Nights',
      category: 'slots',
      provider: 'microgaming',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.8%',
      maxWin: '750x',
      players: 560,
      hot: false,
      new: true
    },
    {
      id: 'live-roulette',
      name: 'Live Lightning Roulette',
      category: 'live',
      provider: 'evolution',
      image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '97.3%',
      maxWin: '500x',
      players: 1234,
      hot: true,
      new: false
    },
    {
      id: 'jackpot-slot',
      name: 'Divine Fortune',
      category: 'jackpots',
      provider: 'netent',
      image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rtp: '96.6%',
      jackpot: '€847,392',
      players: 892,
      hot: false,
      new: false
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesProvider = selectedProvider === 'all' || game.provider === selectedProvider;
    return matchesSearch && matchesCategory && matchesProvider;
  });

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{getTranslation(language, 'games')}</h1>
          <p className="text-gray-300">
            {language === 'es' ? 'Elige de nuestra colección de juegos comprobablemente justos' : 'Choose from our collection of provably fair games'}
          </p>
        </div>

        {/* Featured Games Carousel */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center">
            <Crown className="w-6 h-6 text-yellow-400 mr-2" />
            {getTranslation(language, 'featured')} {getTranslation(language, 'games')}
          </h2>
          <div className="flex overflow-x-auto scrollbar-hide space-x-3 pb-3">
            {featuredGames.map((game, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm border border-yellow-500/30 rounded-lg overflow-hidden hover:border-yellow-500/50 transition-all duration-300 cursor-pointer flex-shrink-0 w-64"
                onClick={() => onNavigate(game.id)}
              >
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>FEATURED</span>
                </div>
                
                <div className="aspect-[3/2] relative overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                
                <div className="p-3">
                  <h3 className="text-lg font-bold text-white mb-2">{game.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-semibold text-sm">RTP: {game.rtp}</span>
                    <span className="text-yellow-400 font-semibold text-sm">
                      {game.jackpot ? `Jackpot: ${game.jackpot}` : `Max: ${game.maxWin}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{game.players} playing</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
                    <Play className="w-5 h-5" />
                    <span>{getTranslation(language, 'playNow')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4">
          {/* Category Filters */}
          <div className="mb-3">
            <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm ${
                    selectedCategory === category.id
                      ? 'bg-[#3C1A4F] text-white'
                      : 'bg-black/20 text-gray-300 hover:bg-[#3C1A4F]/20'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Provider Filter */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-[#3C1A4F]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3C1A4F]/50 text-sm"
              />
            </div>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="px-3 py-2.5 bg-black/20 border border-[#3C1A4F]/20 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F]/50 text-sm"
            >
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id} className="bg-gray-800">
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {filteredGames.map((game, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#3C1A4F]/30 to-[#36CFC9]/30 backdrop-blur-sm border border-[#3C1A4F]/20 rounded-lg overflow-hidden hover:border-[#3C1A4F]/40 transition-all duration-200 cursor-pointer hover:scale-105"
              onClick={() => onNavigate(game.id)}
            >
              {/* Badges */}
              <div className="absolute top-1 left-1 z-10 flex flex-col space-y-1">
                {game.hot && (
                  <div className="bg-gradient-to-r from-[#FFC542] to-[#FF5A5F] text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span>HOT</span>
                  </div>
                )}
                {game.new && (
                  <div className="bg-gradient-to-r from-[#7ED957] to-[#36CFC9] text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Zap className="w-2.5 h-2.5" />
                    <span>NEW</span>
                  </div>
                )}
              </div>
              
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <h3 className="text-xs font-bold text-white mb-1 truncate">{game.name}</h3>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#7ED957] font-semibold text-xs truncate">
                    {game.jackpot ? game.jackpot : game.maxWin}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1 text-gray-300">
                    <Users className="w-2.5 h-2.5" />
                    <span className="text-xs">{game.players}</span>
                  </div>
                  <span className="text-xs text-gray-400 capitalize truncate">{game.provider}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white py-1 rounded font-semibold hover:from-[#3C1A4F]/80 hover:to-[#36CFC9]/80 transition-all duration-200 flex items-center justify-center space-x-1 text-xs">
                  <Play className="w-2.5 h-2.5" />
                  <span>Play</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Stats */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default GameLobby;