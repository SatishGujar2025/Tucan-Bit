import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, Wallet, User, Dice5, ArrowRight, Zap, Flame,
  Search, Grid, List, Star as StarIcon, Filter as FilterIcon, ChevronDown, ArrowLeft
} from 'lucide-react';

const BlackJacksPage: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedVolatility, setSelectedVolatility] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const generateBlackJackGames = () => {
    const BlackJackNames = ['Gates of Olympus', 'Sweet Bonanza', 'Wolf Gold', 'Starburst', 'Gonzo\'s Quest', 'Book of Dead', 'Dead or Alive 2', 'Big Bass Bonanza'];
    const providers = ['Pragmatic Play', 'NetEnt', 'Play\'n GO', 'Microgaming', 'Red Tiger'];
    const themes = ['Greek Mythology', 'Ancient Egypt', 'Wild West', 'Space', 'Adventure'];
    const volatilities = ['Low', 'Medium', 'High', 'Very High'];
    const maxWins = ['x5000', 'x10000', 'x25000', 'Progressive'];

    return Array.from({ length: 300 }, (_, i) => ({
      id: i + 1,
      name: BlackJackNames[i % BlackJackNames.length],
      provider: providers[i % providers.length],
      image: `https://picsum.photos/300/200?random=${i + 1000}`,
      theme: themes[i % themes.length],
      volatility: volatilities[i % volatilities.length],
      rtp: `${(95 + Math.random() * 3).toFixed(2)}%`,
      maxWin: maxWins[i % maxWins.length],
      isHot: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9,
      isMegaways: Math.random() > 0.6,
      rating: (3 + Math.random() * 2).toFixed(1),
      players: Math.floor(Math.random() * 2000) + 1,
      reels: Math.floor(Math.random() * 3) + 3,
      paylines: Math.floor(Math.random() * 20) + 1
    }));
  };

  const allBlackJackGames = generateBlackJackGames();

  const providers = ['all', ...Array.from(new Set(allBlackJackGames.map(game => game.provider)))];
  const themes = ['all', ...Array.from(new Set(allBlackJackGames.map(game => game.theme)))];
  const volatilities = ['all', 'Low', 'Medium', 'High', 'Very High'];

  const filteredGames = allBlackJackGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = selectedProvider === 'all' || game.provider === selectedProvider;
    const matchesTheme = selectedTheme === 'all' || game.theme === selectedTheme;
    const matchesVolatility = selectedVolatility === 'all' || game.volatility === selectedVolatility;
    return matchesSearch && matchesProvider && matchesTheme && matchesVolatility;
  });

  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="absolute animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }}>
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center opacity-20"><Dice5 className="w-3 h-3 text-white" /></div>
              </div>
            ))}
          </div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">{allBlackJackGames.length}+ BlackJack Games Available</span>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">BlackJackS PARADISE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Spin your way to fortune! Discover the most exciting BlackJack games with massive jackpots, free spins, and bonus features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/casino" className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Casino</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="p-6 bg-gray-800/50">
        <div>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search blackjack games, providers, variants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}><Grid className="w-5 h-5" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}><List className="w-5 h-5" /></button>
              </div>
              <div className="text-gray-400"><span className="font-semibold text-white">{filteredGames.length}</span> blackjack games found</div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-6">
        <div>
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' : 'grid-cols-1'}`}>
            {filteredGames.map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-yellow-500/50 bg-gray-800/50 transform hover:scale-105">
                
           
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {game.isHot && <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"><Flame className="w-3 h-3 mr-1" /><span>HOT</span></div>}
                    {game.isNew && <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-bold"><span>NEW</span></div>}
                    {game.isFeatured && <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"><StarIcon className="w-3 h-3 mr-1" /><span>FEATURED</span></div>}
                    {game.isMegaways && <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"><Zap className="w-3 h-3 mr-1" /><span>MEGAWAYS</span></div>}
                  </div>

                  <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center space-x-1"><StarIcon className="w-3 h-3 text-yellow-400" /><span className="text-white text-xs font-bold">{game.rating}</span></div>
                  <div className="absolute bottom-2 right-2 bg-black/70 rounded-full px-2 py-1"><span className="text-white text-xs">{game.players}</span></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                      <Play className="w-4 h-4" />
                      <span>Play</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white mb-1 truncate" title={game.name}>{game.name}</h3>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-yellow-400 text-xs truncate">{game.provider}</span>
                    <span className="text-gray-400 text-xs">{game.theme}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-1 text-gray-300"><Zap className="w-3 h-3 text-green-400" /><span className="text-xs">{game.maxWin}</span></div>
                    <span className={`text-xs px-1 py-0.5 rounded ${game.volatility === 'High' || game.volatility === 'Very High' ? 'bg-red-500/10 text-red-400' : game.volatility === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>{game.volatility}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{game.reels} Reels</span>
                    <span className="text-xs text-gray-400">{game.paylines} Paylines</span>
                  </div>
                </div>
                
                
              </div>
            ))}
          </div>
          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <Dice5 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No BlackJack games found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlackJacksPage;