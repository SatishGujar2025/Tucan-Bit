import React, { useState } from 'react';
import {
  Play, TrendingUp, Shield, Zap, Star, Award, Users, Clock, Trophy,
  ExternalLink, Twitter, Facebook, Instagram, Youtube, Gift, Crown,
  Gamepad2, Home, Wallet, Coins, Dice5, HelpCircle, Mail, Settings,
  ChevronDown, ChevronRight, LogOut, User, CreditCard, BarChart2,
  Heart, Gem, Bitcoin, Aperture, Sparkles, Bell, ShieldCheck, RotateCw,
  Currency, ArrowRight, Target, Flame, Rocket, Diamond, Crown as CrownIcon,
  Search, Filter, Grid, List,ZapIcon, Star as StarIcon, TrendingUp as TrendingUpIcon
} from 'lucide-react';

type RoulettePageProps = {
  onNavigate?: (page: string) => void;
};
const generateSlotGames = () => {
    const slotNames = [
      'Gates of Olympus', 'Sweet Bonanza', 'Wolf Gold', 'Starburst', 'Gonzo\'s Quest',
      'Book of Dead', 'Dead or Alive 2', 'Big Bass Bonanza', 'Book of Fortune', 'Golden Dragon',
      'Lucky Leprechaun', 'Egyptian Fortune', 'Aztec Gold', 'Viking Conquest', 'Samurai Slots',
      'Ninja Warriors', 'Dragon\'s Fire', 'Phoenix Rising', 'Golden Phoenix', 'Lucky 7s',
      'Diamond Mine', 'Treasure Hunt', 'Pirate\'s Gold', 'Ocean Treasure', 'Deep Sea Diving',
      'Coral Reef', 'Tropical Paradise', 'Island Adventure', 'Desert Storm', 'Arabian Nights',
      'Persian Palace', 'Royal Fortune', 'King\'s Crown', 'Queen\'s Jewels', 'Princess Power',
      'Knight\'s Quest', 'Castle Siege', 'Medieval Magic', 'Fantasy Forest', 'Enchanted Garden',
      'Magic Mirror', 'Crystal Ball', 'Wizard\'s Spell', 'Dragon Slayer', 'Hero\'s Quest',
      'Epic Adventure', 'Legendary Tales', 'Mythical Creatures', 'Ancient Gods', 'Olympus Games',
      'Zeus Thunder', 'Poseidon\'s Wrath', 'Athena\'s Wisdom', 'Apollo\'s Light', 'Artemis Hunt',
      'Hermes Speed', 'Ares Battle', 'Hades Underworld', 'Demeter Harvest', 'Hestia Hearth',
      'Hephaestus Forge', 'Dionysus Wine', 'Aphrodite Love', 'Eros Arrow', 'Psyche Soul',
      'Orpheus Music', 'Hercules Strength', 'Perseus Quest', 'Theseus Labyrinth', 'Jason Argonauts',
      'Odysseus Journey', 'Achilles Heel', 'Hector Troy', 'Paris Choice', 'Helen Beauty',
      'Agamemnon King', 'Menelaus Revenge', 'Ajax Warrior', 'Diomedes Courage', 'Nestor Wisdom',
      'Patroclus Friend', 'Briseis Prize', 'Cassandra Prophecy', 'Andromache Wife', 'Hecuba Queen',
      'Priam King', 'Hecate Magic', 'Circe Sorceress', 'Calypso Island', 'Scylla Monster',
      'Charybdis Whirlpool', 'Sirens Song', 'Lotus Eaters', 'Cyclops Eye', 'Polyphemus Giant',
      'Aeolus Wind', 'Helios Sun', 'Selene Moon', 'Eos Dawn', 'Nyx Night', 'Hypnos Sleep',
      'Thanatos Death', 'Nemesis Revenge', 'Tyche Fortune', 'Moirai Fate', 'Erinyes Furies',
      'Muses Art', 'Graces Beauty', 'Fates Destiny', 'Furies Vengeance', 'Sirens Temptation',
      'Harpies Storm', 'Gorgons Stone', 'Medusa Snake', 'Stheno Strength', 'Euryale Wide',
      'Chimera Beast', 'Hydra Heads', 'Cerberus Guard', 'Minotaur Maze', 'Centaur Half',
      'Satyr Party', 'Nymph Nature', 'Dryad Tree', 'Naiad Water', 'Oread Mountain',
      'Hamadryad Oak', 'Meliae Ash', 'Oreads Hills', 'Nereids Sea', 'Oceanids Ocean',
      'Potamoi Rivers', 'Lampades Torch', 'Corybantes Dance', 'Curetes Shield', 'Dactyls Finger',
      'Telchines Magic', 'Cabiri Mystery', 'Corybantes Wild', 'Curetes Young', 'Dactyls Mountain',
      'Telchines Sea', 'Cabiri Secret', 'Golden Megaways', 'Diamond Megaways', 'Ruby Megaways',
      'Emerald Megaways', 'Sapphire Megaways', 'Amethyst Megaways', 'Topaz Megaways', 'Opal Megaways',
      'Pearl Megaways', 'Jade Megaways', 'Crystal Megaways', 'Platinum Megaways', 'Silver Megaways',
      'Bronze Megaways', 'Copper Megaways', 'Iron Megaways', 'Steel Megaways', 'Gold Rush',
      'Diamond Rush', 'Ruby Rush', 'Emerald Rush', 'Sapphire Rush', 'Amethyst Rush',
      'Topaz Rush', 'Opal Rush', 'Pearl Rush', 'Jade Rush', 'Crystal Rush', 'Platinum Rush',
      'Silver Rush', 'Bronze Rush', 'Copper Rush', 'Iron Rush', 'Steel Rush', 'Golden Quest',
      'Diamond Quest', 'Ruby Quest', 'Emerald Quest', 'Sapphire Quest', 'Amethyst Quest',
      'Topaz Quest', 'Opal Quest', 'Pearl Quest', 'Jade Quest', 'Crystal Quest', 'Platinum Quest',
      'Silver Quest', 'Bronze Quest', 'Copper Quest', 'Iron Quest', 'Steel Quest', 'Golden Legend',
      'Diamond Legend', 'Ruby Legend', 'Emerald Legend', 'Sapphire Legend', 'Amethyst Legend',
      'Topaz Legend', 'Opal Legend', 'Pearl Legend', 'Jade Legend', 'Crystal Legend', 'Platinum Legend',
      'Silver Legend', 'Bronze Legend', 'Copper Legend', 'Iron Legend', 'Steel Legend', 'Golden Myth',
      'Diamond Myth', 'Ruby Myth', 'Emerald Myth', 'Sapphire Myth', 'Amethyst Myth',
      'Topaz Myth', 'Opal Myth', 'Pearl Myth', 'Jade Myth', 'Crystal Myth', 'Platinum Myth',
      'Silver Myth', 'Bronze Myth', 'Copper Myth', 'Iron Myth', 'Steel Myth', 'Golden Saga',
      'Diamond Saga', 'Ruby Saga', 'Emerald Saga', 'Sapphire Saga', 'Amethyst Saga',
      'Topaz Saga', 'Opal Saga', 'Pearl Saga', 'Jade Saga', 'Crystal Saga', 'Platinum Saga',
      'Silver Saga', 'Bronze Saga', 'Copper Saga', 'Iron Saga', 'Steel Saga', 'Golden Empire',
      'Diamond Empire', 'Ruby Empire', 'Emerald Empire', 'Sapphire Empire', 'Amethyst Empire',
      'Topaz Empire', 'Opal Empire', 'Pearl Empire', 'Jade Empire', 'Crystal Empire', 'Platinum Empire',
      'Silver Empire', 'Bronze Empire', 'Copper Empire', 'Iron Empire', 'Steel Empire'
    ];

    const providers = ['Pragmatic Play', 'NetEnt', 'Play\'n GO', 'Microgaming', 'Red Tiger', 'Yggdrasil', 'Quickspin', 'Thunderkick', 'Push Gaming', 'Relax Gaming'];
    const themes = ['Greek Mythology', 'Ancient Egypt', 'Wild West', 'Space', 'Adventure', 'Jungle', 'Candy', 'Fishing', 'Asian', 'Fantasy', 'Medieval', 'Pirates', 'Ocean', 'Desert', 'Forest', 'Castle', 'Royal', 'Magic', 'Dragon', 'Vikings', 'Egypt', 'Rome', 'China', 'Japan', 'India', 'Africa', 'America', 'Europe', 'Australia', 'Arctic'];
    const volatilities = ['Low', 'Medium', 'High', 'Very High'];
    const maxWins = ['x500', 'x1000', 'x2500', 'x5000', 'x10000', 'x25000', 'x50000', 'x100000', 'Progressive'];
    const features = ['Megaways', 'Free Spins', 'Bonus Buy', 'Cascading', 'Expanding Wilds', 'Sticky Wilds', 'Multipliers', 'Scatter Symbols', 'Wild Symbols', 'Bonus Rounds', 'Jackpot', 'Gamble Feature', 'Auto Play', 'Turbo Mode'];

    return Array.from({ length: 300 }, (_, i) => ({
      id: i + 1,
      name: slotNames[i % slotNames.length],
      provider: providers[i % providers.length],
      image: `https://picsum.photos/300/200?random=${i + 1000}`,
      theme: themes[i % themes.length],
      volatility: volatilities[i % volatilities.length],
      rtp: `${(95 + Math.random() * 3).toFixed(2)}%`,
      maxWin: maxWins[i % maxWins.length],
      features: features.slice(0, Math.floor(Math.random() * 4) + 1),
      isHot: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9,
      isMegaways: Math.random() > 0.6,
      minBet: (0.1 + Math.random() * 0.9).toFixed(2),
      maxBet: (50 + Math.random() * 1950).toFixed(0),
      rating: (3 + Math.random() * 2).toFixed(1),
      players: Math.floor(Math.random() * 2000) + 1,
      reels: Math.floor(Math.random() * 3) + 3, // 3-5 reels
      paylines: Math.floor(Math.random() * 20) + 1 // 1-20 paylines
    }));
  };

  const allSlotGames = generateSlotGames();
const RoulettePage: React.FC<RoulettePageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [currentPage, setCurrentPage] = useState('roulette');
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

  // Generate roulette games data
  const generateRouletteGames = () => {
    const gameNames = [
      'European Roulette', 'American Roulette', 'French Roulette', 'Lightning Roulette', 'Mega Roulette',
      'Auto Roulette', 'Multi-Wheel Roulette', 'Immersive Roulette', 'Speed Roulette', 'VIP Roulette',
      'Roulette Royale', 'Roulette Elite', 'Roulette Supreme', 'Roulette Master', 'Roulette Champion',
      'Roulette Legend', 'Roulette Gold', 'Roulette Platinum', 'Roulette Diamond', 'Roulette Imperial',
      'Roulette Luxury', 'Roulette Premium', 'Roulette Classic', 'Roulette Professional', 'Roulette Expert',
      'Roulette Advanced', 'Roulette Pro', 'Roulette Plus', 'Roulette Max', 'Roulette Ultra',
      'Roulette Extreme', 'Roulette Ultimate', 'Roulette Perfect', 'Roulette Prime', 'Roulette Select',
      'Roulette Special', 'Roulette Deluxe', 'Roulette Exclusive', 'Roulette Private', 'Roulette VIP',
      'Roulette High Stakes', 'Roulette Low Stakes', 'Roulette Mid Stakes', 'Roulette Micro', 'Roulette Mini',
      'Roulette Standard', 'Roulette Premium', 'Roulette Gold', 'Roulette Platinum', 'Roulette Diamond',
      'Roulette Emerald', 'Roulette Sapphire', 'Roulette Ruby', 'Roulette Pearl', 'Roulette Crystal',
      'Roulette Silver', 'Roulette Bronze', 'Roulette Copper', 'Roulette Iron', 'Roulette Steel',
      'Roulette Titanium', 'Roulette Carbon', 'Roulette Silicon', 'Roulette Neon', 'Roulette Cyber',
      'Roulette Digital', 'Roulette Virtual', 'Roulette Online', 'Roulette Live', 'Roulette Real',
      'Roulette Authentic', 'Roulette Genuine', 'Roulette Original', 'Roulette Traditional', 'Roulette Modern',
      'Roulette Contemporary', 'Roulette Innovative', 'Roulette Revolutionary', 'Roulette Breakthrough', 'Roulette Game-Changer',
      'Roulette Pioneer', 'Roulette Trailblazer', 'Roulette Visionary', 'Roulette Mastermind', 'Roulette Genius',
      'Roulette Wizard', 'Roulette Magician', 'Roulette Sorcerer', 'Roulette Enchanter', 'Roulette Mystic',
      'Roulette Oracle', 'Roulette Prophet', 'Roulette Sage', 'Roulette Philosopher', 'Roulette Scholar',
      'Roulette Academic', 'Roulette Professor', 'Roulette Doctor', 'Roulette Scientist', 'Roulette Researcher',
      'Roulette Analyst', 'Roulette Specialist', 'Roulette Consultant', 'Roulette Advisor', 'Roulette Mentor',
      'Roulette Coach', 'Roulette Trainer', 'Roulette Instructor', 'Roulette Teacher', 'Roulette Guide',
      'Roulette Leader', 'Roulette Captain', 'Roulette Commander', 'Roulette General', 'Roulette Admiral',
      'Roulette Marshal', 'Roulette Colonel', 'Roulette Major', 'Roulette Lieutenant', 'Roulette Sergeant',
      'Roulette Corporal', 'Roulette Private', 'Roulette Recruit', 'Roulette Cadet', 'Roulette Officer'
    ];

    const providers = ['Evolution', 'Pragmatic Play', 'Play\'n GO', 'NetEnt', 'Microgaming', 'Red Tiger', 'Yggdrasil', 'Quickspin', 'Thunderkick', 'Push Gaming'];
    const types = ['European', 'American', 'French', 'Lightning', 'Mega', 'Auto', 'Multi-Wheel', 'Immersive', 'Speed', 'VIP'];
    const volatilities = ['Low', 'Medium', 'High', 'Very High'];
    const maxWins = ['x35', 'x36', 'x37', 'x50', 'x100', 'x200', 'x500', 'x1000', 'x2000', 'Progressive'];
    const themes = ['Classic', 'VIP', 'Professional', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Supreme', 'Master', 'Champion', 'Legend', 'Royal', 'Imperial', 'Luxury', 'Premium'];

    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: gameNames[i % gameNames.length],
      provider: providers[i % providers.length],
      image: `https://picsum.photos/300/200?random=${i + 2000}`,
      type: types[i % types.length],
      volatility: volatilities[i % volatilities.length],
      rtp: `${(95 + Math.random() * 3).toFixed(2)}%`,
      maxWin: maxWins[i % maxWins.length],
      theme: themes[i % themes.length],
      isHot: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9,
      isLive: Math.random() > 0.6,
      minBet: (0.1 + Math.random() * 0.9).toFixed(2),
      maxBet: (50 + Math.random() * 1950).toFixed(0),
      rating: (3 + Math.random() * 2).toFixed(1),
      players: Math.floor(Math.random() * 100) + 1,
      dealer: Math.random() > 0.5 ? 'Male' : 'Female',
      language: ['English', 'Spanish', 'French', 'German', 'Italian'][Math.floor(Math.random() * 5)],
      wheels: Math.floor(Math.random() * 3) + 1
    }));
  };

  const allRouletteGames = generateRouletteGames();

  const gameCategories = [
    { id: 'all', name: 'All Roulette', icon: BarChart2, color: 'from-red-500 to-pink-500', count: allRouletteGames.length },
    { id: 'european', name: 'European', icon: BarChart2, color: 'from-green-500 to-emerald-500', count: allRouletteGames.filter(g => g.type === 'European').length },
    { id: 'american', name: 'American', icon: BarChart2, color: 'from-blue-500 to-cyan-500', count: allRouletteGames.filter(g => g.type === 'American').length },
    { id: 'french', name: 'French', icon: BarChart2, color: 'from-purple-500 to-pink-500', count: allRouletteGames.filter(g => g.type === 'French').length },
    { id: 'lightning', name: 'Lightning', icon: Zap, color: 'from-yellow-500 to-orange-500', count: allRouletteGames.filter(g => g.type === 'Lightning').length },
    { id: 'live', name: 'Live Games', icon: Users, color: 'from-indigo-500 to-purple-500', count: allRouletteGames.filter(g => g.isLive).length },
  ];

  const filteredGames = allRouletteGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.theme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'european' && game.type === 'European') ||
                           (selectedCategory === 'american' && game.type === 'American') ||
                           (selectedCategory === 'french' && game.type === 'French') ||
                           (selectedCategory === 'lightning' && game.type === 'Lightning') ||
                           (selectedCategory === 'live' && game.isLive);
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
                  <button onClick={() => handleNavigate('roulette')} className="flex items-center space-x-2 p-2 text-sm text-white bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded">
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
              onClick={() => onNavigate && onNavigate('promotions')}
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
                  <button onClick={() => onNavigate && onNavigate('deposit')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                    <CreditCard className="w-4 h-4" />
                    <span>Deposit</span>
                  </button>
                  <button onClick={() => onNavigate && onNavigate('withdraw')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span>Withdraw</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tournaments */}
            <button
              onClick={() => onNavigate && onNavigate('tournaments')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'tournaments' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Tournaments</span>
            </button>

            {/* Earn */}
            <button
              onClick={() => onNavigate && onNavigate('earn')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'earn' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Coins className="w-5 h-5" />
              <span>Earn</span>
            </button>

            {/* Token Dashboard */}
            <button
              onClick={() => onNavigate && onNavigate('token-dashboard')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'token-dashboard' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Token Dashboard</span>
            </button>

            {/* Support */}
            <button
              onClick={() => onNavigate && onNavigate('support')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'support' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Support</span>
            </button>

            {/* Community */}
            <button
              onClick={() => onNavigate && onNavigate('community')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'community' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <User className="w-5 h-5" />
              <span>Community</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => onNavigate && onNavigate('settings')}
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
        {/* Hero Section */}
         <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                      <div className="max-w-7xl mx-auto">
                        {/* Floating Slot Icons */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(30)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute animate-float"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                              }}
                            >
                              <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center opacity-20">
                                <Dice5 className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
            
                        <div className="relative z-10 text-center">
                          <div className="mb-8">
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
                              <ZapIcon className="w-5 h-5 text-yellow-400" />
                              <span className="text-yellow-400 font-semibold">400+ Roulette Games Available</span>
                              <ZapIcon className="w-5 h-5 text-yellow-400" />
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                               ROULETTE GAMES
                              </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                              Spin your way to fortune! Discover the most exciting table games with 
                              <span className="text-yellow-400 font-bold"> massive jackpots</span>, 
                              <span className="text-orange-400 font-bold"> free spins</span>, and 
                              <span className="text-pink-400 font-bold"> bonus features</span>.
                            </p>
            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                              <button onClick={() => handleNavigate('casino')} className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                                <Play className="w-6 h-6 group-hover:animate-pulse" />
                                <span>Spin & Win Now</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </button>
                              
                              <button onClick={() => setShowWalletModal(true)} className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                                <Wallet className="w-6 h-6 group-hover:animate-bounce" />
                                <span>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}</span>
                              </button>
                            </div>
            
                            {/* Stats Banner */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-blue-400">{allSlotGames.length}+</div>
                                <div className="text-sm text-gray-300">Roulette Games</div>
                              </div>
                              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-green-400">25K+</div>
                                <div className="text-sm text-gray-300">Roulette Players</div>
                              </div>
                              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-400">$1.5M+</div>
                                <div className="text-sm text-gray-300">Roulette Winnings</div>
                              </div>
                              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-purple-400">96.5%</div>
                                <div className="text-sm text-gray-300">Average RTP</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search roulette games, providers, themes..."
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
                      {game.isLive && (
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>LIVE</span>
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
                        <span className="text-sm">Spin</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate" title={game.name}>{game.name}</h3>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-yellow-400 text-xs truncate">{game.provider}</span>
                      <span className="text-gray-400 text-xs">{game.type}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
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
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{game.dealer}</span>
                      <span className="text-xs text-gray-400">{game.wheels} Wheel{game.wheels > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredGames.length === 0 && (
              <div className="text-center py-20">
                <BarChart2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No roulette games found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RoulettePage; 