import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, Wallet, User, Dice5, ArrowRight, Zap, Flame,
  Search, Grid, List, Star as StarIcon, Filter as FilterIcon, ChevronDown, ArrowLeft
} from 'lucide-react';

// The component is now clean and doesn't need props for navigation.
const TableGamesPage: React.FC = () => {
  // State specific to the table games page functionality remains.
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // All sidebar and wallet state has been removed.

  // The function to generate game data and all related constants remain here.
  const generateTableGames = () => {
    const gameNames = ['Blackjack Classic', 'European Roulette', 'American Roulette', 'Baccarat', 'Poker Texas Hold\'em', 'Caribbean Stud Poker', 'Three Card Poker', 'Pai Gow Poker', 'Casino Hold\'em', 'Lightning Blackjack', 'Lightning Roulette', 'Speed Baccarat', 'VIP Blackjack'];
    const providers = ['Evolution', 'Pragmatic Play', 'Play\'n GO', 'NetEnt', 'Microgaming'];
    const types = ['Blackjack', 'Roulette', 'Baccarat', 'Poker', 'Craps', 'Sic Bo'];
    const volatilities = ['Low', 'Medium', 'High'];
    const themes = ['Classic', 'VIP', 'Professional', 'Gold', 'Platinum'];

    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: gameNames[i % gameNames.length],
      provider: providers[i % providers.length],
      image: `https://picsum.photos/300/200?random=${i + 2000}`,
      type: types[i % types.length],
      volatility: volatilities[i % volatilities.length],
      rtp: `${(96 + Math.random() * 3).toFixed(2)}%`,
      maxWin: `x${[2, 5, 10, 35, 100, 500][i % 6]}`,
      theme: themes[i % themes.length],
      isHot: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
      isLive: Math.random() > 0.6,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      players: Math.floor(Math.random() * 100) + 1,
      dealer: Math.random() > 0.5 ? 'Male' : 'Female',
      language: ['English', 'Spanish', 'French'][Math.floor(Math.random() * 3)]
    }));
  };

  const allTableGames = generateTableGames();

  const gameCategories = [
    { id: 'all', name: 'All Table Games', icon: BarChart2, color: 'from-purple-500 to-pink-500', count: allTableGames.length },
    { id: 'blackjack', name: 'Blackjack', icon: BarChart2, color: 'from-green-500 to-emerald-500', count: allTableGames.filter(g => g.type === 'Blackjack').length },
    { id: 'roulette', name: 'Roulette', icon: BarChart2, color: 'from-red-500 to-pink-500', count: allTableGames.filter(g => g.type === 'Roulette').length },
    { id: 'baccarat', name: 'Baccarat', icon: BarChart2, color: 'from-blue-500 to-cyan-500', count: allTableGames.filter(g => g.type === 'Baccarat').length },
    { id: 'poker', name: 'Poker', icon: BarChart2, color: 'from-yellow-500 to-orange-500', count: allTableGames.filter(g => g.type === 'Poker').length },
    { id: 'live', name: 'Live Games', icon: Users, color: 'from-indigo-500 to-purple-500', count: allTableGames.filter(g => g.isLive).length },
  ];

  const filteredGames = allTableGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'live' ? game.isLive : game.type.toLowerCase() === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="absolute animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`}}>
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500  rounded-lg flex items-center justify-center opacity-20">
                  <BarChart2 className="w-3 h-3 text-white" />
                </div>
              </div>
            ))}
          </div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
              <ZapIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">{allTableGames.length}+ Table Games</span>
              <ZapIcon className="w-5 h-5 text-yellow-400" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">TABLE ARENA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Test your skills at classic games. Experience the thrill of Blackjack, Roulette, Baccarat, and Poker with professional dealers and high stakes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/casino" className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Casino</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Categories Section */}
      <section className="p-6 bg-gray-800/50">
        <div>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search table games, providers, variants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}><Grid className="w-5 h-5" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}><List className="w-5 h-5" /></button>
              </div>
              <div className="text-gray-400"><span className="font-semibold text-white">{filteredGames.length}</span> table games found</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameCategories.map((category) => (
              <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`group relative p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${selectedCategory === category.id ? 'border-yellow-500 bg-gradient-to-br from-yellow-500/20 to-orange-500/20' : 'border-gray-700 bg-gray-800/50'}`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 mx-auto`}><category.icon className="w-5 h-5 text-white" /></div>
                <h3 className="text-sm font-bold text-white mb-1">{category.name}</h3>
                <p className="text-gray-400 text-xs">{category.count} Games</p>
                {selectedCategory === category.id && <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"><ArrowRight className="w-3 h-3 text-white" /></div>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="p-6">
        <div>
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' : 'grid-cols-1'}`}>
            {filteredGames.map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-2xl border border-gray-700 bg-gray-800/50 transform hover:scale-105">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {game.isHot && <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"><Flame className="w-3 h-3 mr-1" />HOT</div>}
                    {game.isLive && <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"><Users className="w-3 h-3 mr-1" />LIVE</div>}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center space-x-1"><StarIcon className="w-3 h-3 text-yellow-400" /><span className="text-white text-xs font-bold">{game.rating}</span></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                      <Play className="w-4 h-4" />
                      <span>Play</span>
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white truncate">{game.name}</h3>
                  <div className="flex justify-between items-center text-xs text-gray-400"><span>{game.provider}</span><span>{game.type}</span></div>
                </div>
              </div>
            ))}
          </div>
          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <BarChart2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No table games found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TableGamesPage;