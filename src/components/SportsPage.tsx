import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, Users, Coins, Zap, Crown, 
  Home, Dice5, Trophy, Gamepad2, BarChart2, ChevronDown, ChevronRight, 
  Wallet, User, Search, Filter, TrendingUp, Play, Heart, Clock, Target,
  ChevronRight as ChevronRightIcon, Plus, Minus, DollarSign, Award
} from 'lucide-react';

interface SportEvent {
  id: string;
  sport: string;
  team1: string;
  team2: string;
  status: 'live' | 'upcoming' | 'finished';
  time: string;
  odds1: number;
  oddsX?: number;
  odds2: number;
  score?: string;
  period?: string;
  isFavorite: boolean;
}

interface BetSlip {
  id: string;
  event: string;
  bet: string;
  odds: number;
}

interface Championship {
  id: string;
  name: string;
  icon: string;
  eventCount: number;
}

const SportsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedTab, setSelectedTab] = useState('live');
  const [selectedSport, setSelectedSport] = useState('all');
  const [betSlip, setBetSlip] = useState<BetSlip[]>([]);
  const [betAmount, setBetAmount] = useState(55.00);
  const [activeTab, setActiveTab] = useState('turbo-combo');
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('sports');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);

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

  const featuredEvents: SportEvent[] = [
    {
      id: '1',
      sport: 'Tennis',
      team1: 'Rublev Andrey',
      team2: 'Gaston Hugo',
      status: 'live',
      time: 'Set 1 LIVE',
      odds1: 1.10,
      odds2: 7.00,
      score: '6-4, 3-2',
      period: 'Set 1',
      isFavorite: false
    },
    {
      id: '2',
      sport: 'LoL',
      team1: 'Eintracht Frankfurt',
      team2: 'BIG',
      status: 'upcoming',
      time: 'Jul 30 - 21:00',
      odds1: 5.55,
      odds2: 1.11,
      isFavorite: false
    },
    {
      id: '3',
      sport: 'Football',
      team1: 'Qarabag',
      team2: 'Shelbourne Dub',
      status: 'upcoming',
      time: 'Live in 49m',
      odds1: 1.17,
      oddsX: 7.00,
      odds2: 21.00,
      isFavorite: false
    }
  ];

  const liveEvents: SportEvent[] = [
    {
      id: '4',
      sport: 'Football',
      team1: 'Al-Duhail',
      team2: 'Kifisias AE',
      status: 'live',
      time: "Half 2 '46 LIVE",
      odds1: 1.29,
      oddsX: 4.70,
      odds2: 9.80,
      score: '2-1',
      period: 'Half 2',
      isFavorite: false
    },
    {
      id: '5',
      sport: 'Football',
      team1: 'Qarabag',
      team2: 'Shelbourne Dublin',
      status: 'upcoming',
      time: 'Live in: 49m',
      odds1: 1.17,
      oddsX: 7.00,
      odds2: 21.00,
      isFavorite: false
    },
    {
      id: '6',
      sport: 'Football',
      team1: 'Malmo FF',
      team2: 'Rigas FS',
      status: 'upcoming',
      time: 'Live in: 1h 49m',
      odds1: 1.39,
      oddsX: 4.90,
      odds2: 8.20,
      isFavorite: false
    },
    {
      id: '7',
      sport: 'Football',
      team1: 'Ludogorets',
      team2: 'Rijeka',
      status: 'upcoming',
      time: 'Jul 30 - Jul 31, 2025',
      odds1: 1.72,
      oddsX: 3.45,
      odds2: 5.70,
      isFavorite: false
    }
  ];

  const championships: Championship[] = [
    { id: '1', name: 'UEFA Champions League', icon: '🏆', eventCount: 12 },
    { id: '2', name: 'UEFA Europa League', icon: '🏆', eventCount: 8 },
    { id: '3', name: 'Conference League UEFA', icon: '🏆', eventCount: 6 }
  ];

  const sportsCategories = [
    { id: 'football', name: 'Football', icon: '⚽', live: true },
    { id: 'tennis', name: 'Tennis', icon: '🎾', live: true },
    { id: 'cs2', name: 'CS2', icon: '🎮', live: true },
    { id: 'dota2', name: 'Dota 2', icon: '🎮', live: true },
    { id: 'horse-racing', name: 'Horse Racing', icon: '🐎', live: false },
    { id: 'efootball', name: 'eFootball', icon: '⚽', live: true }
  ];

  const addToBetSlip = (event: SportEvent, bet: string, odds: number) => {
    const newBet: BetSlip = {
      id: `${event.id}-${bet}`,
      event: `${event.team1} vs ${event.team2}`,
      bet: bet,
      odds: odds
    };
    setBetSlip([...betSlip, newBet]);
  };

  const removeFromBetSlip = (betId: string) => {
    setBetSlip(betSlip.filter(bet => bet.id !== betId));
  };

  const calculateTotalOdds = () => {
    return betSlip.reduce((total, bet) => total * bet.odds, 1);
  };

  const calculatePossibleWin = () => {
    return betAmount * calculateTotalOdds();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
    
      {/* className={`lg:ml-64 ${sidebarOpen ? 'ml-64' : ''} lg:mr-80`} */}
      {/* Main Content */}
       {/* <button 
              onClick={() => setIsBetSlipOpen(true)}
              className="lg:hidden bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-sm relative"
            >
              Bet Slip
              {betSlip.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs">
                  {betSlip.length}
                </span>
              )}
            </button> */}
      <div  className='flex-1 lg:mr-64'>
      

        {/* Featured Events Carousel */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {featuredEvents.map((event) => (
              <div key={event.id} className="flex-shrink-0 bg-gray-800 rounded-lg p-4 min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{event.sport}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    event.status === 'live' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {event.status === 'live' ? 'LIVE' : 'UPCOMING'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{event.team1}</span>
                    <span className="text-sm font-bold">{event.odds1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{event.team2}</span>
                    <span className="text-sm font-bold">{event.odds2}</span>
                  </div>
                  {event.oddsX && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Draw</span>
                      <span className="text-sm font-bold">{event.oddsX}</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-400">{event.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 border-b border-gray-700 hidden md:block">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setSelectedTab('live')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                selectedTab === 'live' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Live 89</span>
            </button>
            <button
              onClick={() => setSelectedTab('top')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                selectedTab === 'top' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Top 76</span>
            </button>
            <button
              onClick={() => setSelectedTab('favorites')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                selectedTab === 'favorites' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Favorites 0</span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm">🏆</span>
              <span className="text-sm">UEFA Champions League</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">🏆</span>
              <span className="text-sm">UEFA Europa League</span>
            </div>
          </div>
        </div>

        {/* Search and Championships */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">Top Championships</h3>
            <div className="space-y-2">
              {championships.map((champ) => (
                <div key={champ.id} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span>{champ.icon}</span>
                    <span className="text-sm">{champ.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{champ.eventCount} events</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sports Categories */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold mb-3">Prime Picks</h3>
          <div className="space-y-2">
            {sportsCategories.map((sport) => (
              <div key={sport.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{sport.icon}</span>
                  <span className="text-sm">{sport.name}</span>
                  {sport.live && (
                    <span className="text-xs bg-red-500 px-2 py-1 rounded">LIVE</span>
                  )}
                </div>
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Live Events */}
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold">Friendly matches. Clubs</h3>
          </div>
          
          {liveEvents.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">⚽</span>
                  <span className="text-sm font-semibold">{event.sport}</span>
                  {event.status === 'live' && (
                    <span className="text-xs bg-red-500 px-2 py-1 rounded">LIVE</span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{event.time}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{event.team1}</span>
                  <button
                    onClick={() => addToBetSlip(event, 'Winner. 1-st half', event.odds1)}
                    className="text-sm font-bold hover:bg-blue-600 px-3 py-1 rounded"
                  >
                    {event.odds1}
                  </button>
                </div>
                {event.oddsX && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Draw</span>
                    <button
                      onClick={() => addToBetSlip(event, 'Draw', event.oddsX!)}
                      className="text-sm font-bold hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      {event.oddsX}
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm">{event.team2}</span>
                  <button
                    onClick={() => addToBetSlip(event, 'Winner. 2-nd half', event.odds2)}
                    className="text-sm font-bold hover:bg-blue-600 px-3 py-1 rounded"
                  >
                    {event.odds2}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Football Challenge */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">FOOTBALL CHALLENGE</h3>
                <p className="text-sm">Jul 30 - Jul 31, 2025</p>
              </div>
              <span className="text-4xl">⚽</span>
            </div>
            <div className="text-sm">
              <span>FINISH IN</span>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-sm font-semibold mb-3">
              <span>PLACE</span>
              <span>USER</span>
              <span>POINTS</span>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <span>1st</span>
                <span>exhilarating starfish</span>
                <span>5000</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <span>2nd</span>
                <span>jubilant quail</span>
                <span>2300</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <span>3rd</span>
                <span>dazzling octopus</span>
                <span>1133.6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Bet Slip */}
      <div className={`
        fixed inset-y-0 right-0 w-64 bg-gray-800 border-l border-gray-700 
        flex flex-col transition-transform duration-300
        ${isBetSlipOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:flex
      `}>
        <div className="flex flex-col h-full">
          {/* Balance */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm">Balance</span>
              <span className="text-lg font-bold">$0</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('bet-slip')}
              className={`flex-1 py-3 text-sm font-semibold ${
                activeTab === 'bet-slip' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
              }`}
            >
              Bet Slip
            </button>
            <button
              onClick={() => setActiveTab('my-bets')}
              className={`flex-1 py-3 text-sm font-semibold ${
                activeTab === 'my-bets' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
              }`}
            >
              My bets
            </button>
            <button
              onClick={() => setActiveTab('turbo-combo')}
              className={`flex-1 py-3 text-sm font-semibold ${
                activeTab === 'turbo-combo' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
              }`}
            >
              Turbo Combo
            </button>
          </div>

          {/* Turbo Combo Content */}
          {activeTab === 'turbo-combo' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">Turbo Combo</span>
                <span className="text-lg font-bold">{calculateTotalOdds().toFixed(2)}</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded mb-4">
                Update
              </button>

              {/* Bet Slip Items */}
              <div className="space-y-3 mb-4">
                {betSlip.map((bet) => (
                  <div key={bet.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{bet.event}</span>
                      <button
                        onClick={() => removeFromBetSlip(bet.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{bet.bet}</span>
                      <span className="text-sm font-bold">{bet.odds}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bonus */}
              <div className="bg-green-600 rounded-lg p-3 mb-4">
                <p className="text-sm font-semibold">WoW! You've got x1.08</p>
              </div>

              {/* Bet Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bet amount</span>
                  <button className="text-xs bg-blue-600 px-2 py-1 rounded">Max</button>
                </div>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
                <div className="text-xs text-gray-400">
                  Max. Bet: $0 / $289.4
                </div>
                <button className="w-full text-left text-xs text-blue-400 hover:underline">
                  Want to bet more? Deposit now.
                </button>
              </div>

              {/* Toggle */}
              <div className="flex items-center justify-between my-4">
                <span className="text-sm">Accept all odds changes</span>
                <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </div>
              </div>

              {/* Possible Win */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">Possible win:</span>
                <span className="text-lg font-bold">${calculatePossibleWin().toFixed(2)}</span>
              </div>

              {/* Place Bet Button */}
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold">
                Place Bet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Wallet Connection Modal */}
      {/* {showWalletModal && (
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
      )} */}
    </div>
  );
};

export default SportsPage; 