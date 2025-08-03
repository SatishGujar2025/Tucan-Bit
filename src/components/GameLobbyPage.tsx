import React, { useState, useEffect } from 'react';
import {
  Play, TrendingUp, Shield, Zap, Star, Award, Users, Clock, Trophy,
  ExternalLink, Twitter, Facebook, Instagram, Youtube, Gift, Crown,
  Gamepad2, Home, Wallet, Coins, Dice5, HelpCircle, Mail, Settings,
  ChevronDown, ChevronRight, LogOut, User, CreditCard, BarChart2,
  Heart, Gem, Bitcoin, Aperture, Sparkles, Bell, ShieldCheck, RotateCw,
  Currency, ArrowRight, Target, Flame, Rocket, Diamond, Crown as CrownIcon,
  Search, Filter, Grid, List, Star as StarIcon, TrendingUp as TrendingUpIcon
} from 'lucide-react';

type GameLobbyPageProps = {
  onNavigate?: (page: string) => void;
};

 const GameLobbyPage: React.FC<GameLobbyPageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [currentPage, setCurrentPage] = useState('lobby');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  // Generate tons of game data
  const generateGames = () => {
    const gameNames = [
      'Gates of Olympus', 'Crazy Time', 'Book of Dead', 'Sweet Bonanza', 'Wolf Gold',
      'Starburst', 'Gonzo\'s Quest', 'Mega Moolah', 'Lightning Roulette', 'Dead or Alive 2',
      'Dragon Tiger', 'Big Bass Bonanza', 'Monopoly Live', 'Lightning Blackjack', 'Mega Roulette',
      'Book of Fortune', 'Golden Dragon', 'Lucky Leprechaun', 'Egyptian Fortune', 'Aztec Gold',
      'Viking Conquest', 'Samurai Slots', 'Ninja Warriors', 'Dragon\'s Fire', 'Phoenix Rising',
      'Golden Phoenix', 'Lucky 7s', 'Diamond Mine', 'Treasure Hunt', 'Pirate\'s Gold',
      'Ocean Treasure', 'Deep Sea Diving', 'Coral Reef', 'Tropical Paradise', 'Island Adventure',
      'Desert Storm', 'Arabian Nights', 'Persian Palace', 'Royal Fortune', 'King\'s Crown',
      'Queen\'s Jewels', 'Princess Power', 'Knight\'s Quest', 'Castle Siege', 'Medieval Magic',
      'Fantasy Forest', 'Enchanted Garden', 'Magic Mirror', 'Crystal Ball', 'Wizard\'s Spell',
      'Dragon Slayer', 'Hero\'s Quest', 'Epic Adventure', 'Legendary Tales', 'Mythical Creatures',
      'Ancient Gods', 'Olympus Games', 'Zeus Thunder', 'Poseidon\'s Wrath', 'Athena\'s Wisdom',
      'Apollo\'s Light', 'Artemis Hunt', 'Hermes Speed', 'Ares Battle', 'Hades Underworld',
      'Demeter Harvest', 'Hestia Hearth', 'Hephaestus Forge', 'Dionysus Wine', 'Aphrodite Love',
      'Eros Arrow', 'Psyche Soul', 'Orpheus Music', 'Hercules Strength', 'Perseus Quest',
      'Theseus Labyrinth', 'Jason Argonauts', 'Odysseus Journey', 'Achilles Heel', 'Hector Troy',
      'Paris Choice', 'Helen Beauty', 'Agamemnon King', 'Menelaus Revenge', 'Ajax Warrior',
      'Diomedes Courage', 'Nestor Wisdom', 'Patroclus Friend', 'Briseis Prize', 'Cassandra Prophecy',
      'Andromache Wife', 'Hecuba Queen', 'Priam King', 'Hecate Magic', 'Circe Sorceress',
      'Calypso Island', 'Scylla Monster', 'Charybdis Whirlpool', 'Sirens Song', 'Lotus Eaters',
      'Cyclops Eye', 'Polyphemus Giant', 'Aeolus Wind', 'Helios Sun', 'Selene Moon',
      'Eos Dawn', 'Nyx Night', 'Hypnos Sleep', 'Thanatos Death', 'Nemesis Revenge',
      'Tyche Fortune', 'Moirai Fate', 'Erinyes Furies', 'Muses Art', 'Graces Beauty',
      'Fates Destiny', 'Furies Vengeance', 'Sirens Temptation', 'Harpies Storm', 'Gorgons Stone',
      'Medusa Snake', 'Stheno Strength', 'Euryale Wide', 'Chimera Beast', 'Hydra Heads',
      
      'Cerberus Guard', 'Minotaur Maze', 'Centaur Half', 'Satyr Party', 'Nymph Nature',
      'Dryad Tree', 'Naiad Water', 'Oread Mountain', 'Hamadryad Oak', 'Meliae Ash',
      'Oreads Hills', 'Nereids Sea', 'Oceanids Ocean', 'Potamoi Rivers', 'Lampades Torch',
      'Corybantes Dance', 'Curetes Shield', 'Dactyls Finger', 'Telchines Magic', 'Cabiri Mystery',
      'Corybantes Wild', 'Curetes Young', 'Dactyls Mountain', 'Telchines Sea', 'Cabiri Secret'
    ];

    const providers = ['Pragmatic Play', 'Evolution', 'Play\'n GO', 'NetEnt', 'Microgaming', 'Red Tiger', 'Yggdrasil', 'Quickspin', 'Thunderkick', 'Push Gaming'];
    const types = ['Slot', 'Live Game', 'Roulette', 'Blackjack', 'Card Game', 'Bingo', 'Scratch Card', 'Keno', 'Baccarat', 'Poker'];
    const volatilities = ['Low', 'Medium', 'High', 'Very High'];
    const maxWins = ['x500', 'x1000', 'x2500', 'x5000', 'x10000', 'x25000', 'x50000', 'Progressive'];
    const themes = ['Greek Mythology', 'Ancient Egypt', 'Wild West', 'Space', 'Adventure', 'Jungle', 'Candy', 'Fishing', 'Board Game', 'Asian', 'Fantasy', 'Medieval', 'Pirates', 'Ocean', 'Desert', 'Forest', 'Castle', 'Royal', 'Magic', 'Dragon'];

    return Array.from({ length: 200 }, (_, i) => ({
      id: i + 1,
      name: gameNames[i % gameNames.length],
      provider: providers[i % providers.length],
      image: `https://picsum.photos/300/200?random=${i + 1}`,
      type: types[i % types.length],
      volatility: volatilities[i % volatilities.length],
      rtp: `${(95 + Math.random() * 3).toFixed(2)}%`,
      maxWin: maxWins[i % maxWins.length],
      theme: themes[i % themes.length],
      isHot: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9,
      minBet: (0.1 + Math.random() * 0.9).toFixed(2),
      maxBet: (50 + Math.random() * 1950).toFixed(0),
      rating: (3 + Math.random() * 2).toFixed(1),
      players: Math.floor(Math.random() * 1000) + 1
    }));
  };

  const allGames = generateGames();

  const gameCategories = [
    { id: 'all', name: 'All Games', icon: Gamepad2, color: 'from-purple-500 to-pink-500', count: allGames.length },
    { id: 'slots', name: 'Slots', icon: Dice5, color: 'from-blue-500 to-cyan-500', count: allGames.filter(g => g.type === 'Slot').length },
    { id: 'live', name: 'Live Casino', icon: Users, color: 'from-green-500 to-emerald-500', count: allGames.filter(g => g.type === 'Live Game').length },
    { id: 'table', name: 'Table Games', icon: BarChart2, color: 'from-orange-500 to-red-500', count: allGames.filter(g => ['Roulette', 'Blackjack', 'Baccarat', 'Poker'].includes(g.type)).length },
    { id: 'jackpots', name: 'Jackpots', icon: Crown, color: 'from-yellow-500 to-orange-500', count: allGames.filter(g => g.maxWin === 'Progressive').length },
    { id: 'crypto', name: 'Crypto Games', icon: Bitcoin, color: 'from-indigo-500 to-purple-500', count: allGames.filter(g => g.provider === 'Evolution').length },
  ];

  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.theme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'slots' && game.type === 'Slot') ||
                           (selectedCategory === 'live' && game.type === 'Live Game') ||
                           (selectedCategory === 'table' && ['Roulette', 'Blackjack', 'Baccarat', 'Poker'].includes(game.type)) ||
                           (selectedCategory === 'jackpots' && game.maxWin === 'Progressive') ||
                           (selectedCategory === 'crypto' && game.provider === 'Evolution');
    return matchesSearch && matchesCategory;
  });

  const walletProviders = [
    { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', description: 'Connect using your MetaMask wallet' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png', description: 'Scan QR code with mobile wallet' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp', description: 'Connect with Coinbase extension' },
    { id: 'phantom', name: 'Phantom', icon: 'https://logowik.com/content/uploads/images/phantom3506.jpg', description: 'Solana & Ethereum compatible' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png', description: 'Mobile wallet connection' },
    { id: 'ledger', name: 'Ledger', icon: 'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/60fbcaf3bd0478862b605203_ledger.jpg', description: 'Connect your hardware wallet' }
  ];

  const connectWallet = async (walletType: string) => {
    setTimeout(() => {
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setWalletAddress(mockAddress);
      setWalletCurrency('ETH');
      setShowWalletModal(false);
    }, 1000);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletCurrency(null);
  };

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };



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
          </div>
        </div>
      )}


    

      {/* Main Content */}
      <main >
                {/* Hero Section */}
        {/* <section className="relative overflow-hidden h-[70vh] min-h-[600px] flex items-center">
          <div
            className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center"
            style={{ backgroundPosition: 'center 30%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">TucanBit</span> Game Lobby
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                The most thrilling crypto gambling experience with instant payouts, provably fair games, and exclusive bonuses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => handleNavigate('casino')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>Play Now</span>
                </button>

                <button
                  onClick={() => setShowWalletModal(true)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Wallet className="w-6 h-6" />
                  <span>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}</span>
                </button>
                            </div>
            </div>
          </div>
        </section> */}

        {/* Search and Filter Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search games, providers, themes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-gray-400">
                  <span className="font-semibold text-white">{filteredGames.length}</span> games found
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Categories */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {gameCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'border-yellow-500 bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
                        : 'border-gray-700 hover:border-yellow-500/50 bg-gray-800/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-gray-400 text-xs">{category.count} Games</p>
                    {selectedCategory === category.id && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' 
                : 'grid-cols-1'
            }`}>
              {filteredGames.map((game) => (
                <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-yellow-500/50 bg-gray-800/50 transform hover:scale-105">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Game Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                      {game.isHot && (
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Flame className="w-3 h-3 mr-1" />
                          <span>HOT</span>
                        </div>
                      )}
                      {game.isNew && (
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          <span>NEW</span>
                        </div>
                      )}
                      {game.isFeatured && (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <StarIcon className="w-3 h-3 mr-1" />
                          <span>FEATURED</span>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center space-x-1">
                      <StarIcon className="w-3 h-3 text-yellow-400" />
                      <span className="text-white text-xs font-bold">{game.rating}</span>
                    </div>

                    {/* Players Count */}
                    <div className="absolute bottom-2 right-2 bg-black/70 rounded-full px-2 py-1">
                      <span className="text-white text-xs">{game.players}</span>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100">
                        <Play className="w-4 h-4" />
                        <span className="text-sm">Play</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate" title={game.name}>{game.name}</h3>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-yellow-400 text-xs truncate">{game.provider}</span>
                      <span className="text-gray-400 text-xs">{game.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Zap className="w-3 h-3 text-green-400" />
                        <span className="text-xs">{game.maxWin}</span>
                      </div>
                      <span className={`text-xs px-1 py-0.5 rounded ${
                        game.volatility === 'High' || game.volatility === 'Very High' 
                          ? 'bg-red-500/10 text-red-400' 
                          : game.volatility === 'Medium' 
                          ? 'bg-yellow-500/10 text-yellow-400' 
                          : 'bg-green-500/10 text-green-400'
                      }`}>
                        {game.volatility}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredGames.length === 0 && (
              <div className="text-center py-20">
                <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No games found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>


    </div>
  );
};

export default GameLobbyPage; 