import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Star, TrendingUp, Flame, Gamepad2, BookOpen, Users, ChevronLeft, ChevronRight, Sparkles, X, Menu, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import g1 from '../../assets/g1.jpg';
import g3 from '../../assets/g3.jpg';
import sidebarPromo from '../../assets/sidebar_promo.png';
import promoMagicGame from '../../assets/promo_tucanbit_magic_game.jpg';
import promoGatekeeper from '../../assets/tucanbit_promo_gatekeeper.png';

interface LeaderboardEntry {
  id: number;
  playerName: string;
  betAmount: number;
  currency: string;
  isNew?: boolean;
}

interface Promotion {
  id: number;
  title: string;
  description: string;
  endTime: Date;
  image: string;
  link: string;
}

interface HotGame {
  id: number;
  name: string;
  players: number;
  image: string;
}

interface PromotionalSidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromotionalSidebar: React.FC<PromotionalSidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();


  
  const [showTournamentRules, setShowTournamentRules] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Add/remove modal-open class when any modal is open
  useEffect(() => {
    if (showTournamentRules || showLeaderboard) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showTournamentRules, showLeaderboard]);
  const itemsPerPage = 10;
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { id: 1, playerName: 'Player_***123', betAmount: 1250.50, currency: 'T' },
    { id: 2, playerName: 'User_***456', betAmount: 890.25, currency: 'T' },
    { id: 3, playerName: 'Gamer_***789', betAmount: 675.80, currency: 'T' },
    { id: 4, playerName: 'Winner_***321', betAmount: 543.20, currency: 'T' },
    { id: 5, playerName: 'Lucky_***654', betAmount: 432.10, currency: 'T' },
  ]);

  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  
  const [promotions] = useState<Promotion[]>([
    {
      id: 1,
      title: "SPIN WARS",
      description: "VOL 5 - Same Battle. New Games.",
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      image: sidebarPromo,
      link: "/promotions/hot-summer"
    },
    {
      id: 2,
      title: "TucanBIT Tournament",
      description: "Break Live88 - Bet on Live88 tables. Break the house. Win the bag.",
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      image: promoMagicGame,
      link: "/promotions/weekend-special"
    },
    {
      id: 3,
      title: "HACKSAW GAMING",
      description: "Provider of the Month - Too Volatile For Amateurs!",
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
      image: promoGatekeeper,
      link: "/tournaments/vip"
    }
  ]);

  const currentPromotion = promotions[currentPromoIndex];

  const [hotGames] = useState<HotGame[]>([
    { id: 1, name: "Crazy Time", players: 1247, image: "🎰" },
    { id: 2, name: "Sweet Bonanza", players: 892, image: "🍭" },
    { id: 3, name: "Gates of Olympus", players: 756, image: "⚡" },
    { id: 4, name: "Book of Dead", players: 634, image: "📚" },
    { id: 5, name: "Starburst", players: 521, image: "💎" },
  ]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = currentPromotion.endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor(distance / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPromotion.endTime]);

  // Simulate real-time leaderboard updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(prev => {
        const newLeaderboard = [...prev];
        const randomIndex = Math.floor(Math.random() * newLeaderboard.length);
        const randomIncrease = Math.random() * 100 + 10;
        
        newLeaderboard[randomIndex] = {
          ...newLeaderboard[randomIndex],
          betAmount: parseFloat((newLeaderboard[randomIndex].betAmount + randomIncrease).toFixed(2)),
          isNew: true
        };

        // Sort by bet amount
        newLeaderboard.sort((a, b) => b.betAmount - a.betAmount);

        // Remove the "new" flag after a short delay
        setTimeout(() => {
          setLeaderboard(current => 
            current.map(entry => ({ ...entry, isNew: false }))
          );
        }, 2000);

        return newLeaderboard;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>

      {/* Show button when sidebar is collapsed - positioned at top - Hidden on mobile */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="fixed z-[9999] bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg transition-all duration-300 border border-white/30 hover:border-white/50 top-4 right-4 p-2 rounded-lg hidden lg:block modal-open:hidden"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}

      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className={`fixed inset-y-0 right-0 z-30 bg-gray-900 shadow-2xl border-l border-gray-800 overflow-y-auto transition-all duration-300 hidden lg:block ${
        isExpanded ? 'w-80 translate-x-0' : 'w-0 translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-800 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex items-center space-x-3">
              {/* Promotional Sidebar Toggle Button - Before Live Activity */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg transition-all duration-300 border border-white/30 hover:border-white/50 p-2 rounded-lg hidden lg:block"
              >
                {isExpanded ? (
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
              
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  <span>Live Activity</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Real-time updates & promotions</p>
              </div>
            </div>
          </div>

          {/* Promotional Countdown */}
          <div className="p-3 sm:p-4 border-b border-gray-800">
            <div 
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl overflow-hidden relative cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => navigate(currentPromotion.link)}
            >
              <div className="relative h-32 sm:h-48 bg-gradient-to-br from-pink-400 to-purple-500">
                {/* Fallback background if image doesn't load */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500"></div>
                <img 
                  src={currentPromotion.image} 
                  alt="Promotion" 
                  className="w-full h-full object-cover relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 z-20"></div>
                
                {/* Navigation Buttons - Mobile responsive */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPromoIndex((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
                  }}
                  className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPromoIndex((prev) => (prev === promotions.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                
                <div className="absolute inset-0 p-2 sm:p-4 flex flex-col justify-between z-30">
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-white mb-1">{currentPromotion.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-200">{currentPromotion.description}</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-2 sm:p-3">
                    <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      <span className="text-xs sm:text-sm text-white font-semibold">Ends in:</span>
                    </div>
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="bg-white/20 rounded px-1 sm:px-2 py-1">
                        <span className="text-white font-bold text-xs sm:text-sm">{timeLeft.hours.toString().padStart(2, '0')}</span>
                      </div>
                      <span className="text-white text-xs sm:text-sm">:</span>
                      <div className="bg-white/20 rounded px-1 sm:px-2 py-1">
                        <span className="text-white font-bold text-xs sm:text-sm">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                      </div>
                      <span className="text-white text-xs sm:text-sm">:</span>
                      <div className="bg-white/20 rounded px-1 sm:px-2 py-1">
                        <span className="text-white font-bold text-xs sm:text-sm">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Promo Indicators */}
              <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 z-40 flex space-x-1">
                {promotions.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPromoIndex(index);
                    }}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      index === currentPromoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons - Mobile responsive */}
          <div className="p-3 sm:p-4 border-b border-gray-800 space-y-2 sm:space-y-3">
            <button 
              onClick={() => setShowTournamentRules(true)}
              className="w-full bg-gray-800/60 hover:bg-gray-700/70 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg border border-gray-600/50 backdrop-blur-sm text-sm sm:text-base"
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Tournament Rules</span>
            </button>
            
            <button 
              onClick={() => setShowLeaderboard(true)}
              className="w-full bg-gray-800/60 hover:bg-gray-700/70 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg border border-gray-600/50 backdrop-blur-sm text-sm sm:text-base"
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Leaderboard</span>
            </button>
          </div>

          {/* Live Leaderboard - Mobile responsive */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Live Leaderboard</h3>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Header */}
            <div className="grid grid-cols-3 gap-3 mb-3 sm:mb-4 text-sm font-semibold text-gray-400 border-b border-gray-700 pb-2">
              <div className="flex items-center space-x-2">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Place</span>
              </div>
              <div>Player</div>
              <div className="text-right">Prize</div>
            </div>
            
            <div className="space-y-4 sm:space-y-5">
              {leaderboard.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className={`bg-gray-800/60 rounded-xl p-3 sm:p-4 border transition-all duration-300 hover:bg-gray-700/60 ${
                    entry.isNew ? 'border-green-500 bg-green-500/10' : 'border-gray-700/50'
                  }`}
                >
                  <div className="grid grid-cols-3 gap-3 items-center">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-gray-400' :
                          'text-orange-500'
                        }`} />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base truncate">{entry.playerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold text-sm sm:text-base">${(Math.random() * 3000 + 500).toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Games - Mobile responsive */}
          <div className="p-4 sm:p-6 border-t border-gray-800">
            <h4 className="text-sm sm:text-base font-bold text-white mb-4 sm:mb-6 flex items-center space-x-3">
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span>🔥 Hot Games</span>
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {hotGames.map((game) => (
                <div key={game.id} className="bg-gray-800/60 rounded-xl p-3 sm:p-4 hover:bg-gray-700/60 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                        <span className="text-xl sm:text-2xl">{game.image}</span>
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm sm:text-base mb-1">{game.name}</h5>
                        <p className="text-xs sm:text-sm text-gray-400">{game.players.toLocaleString()} players</p>
                      </div>
                    </div>
                    <div className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full border border-green-500/30">
                      HOT
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Rules Modal - Mobile responsive */}
      {showTournamentRules && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-2 sm:p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-2xl lg:max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Tournament Rules</h3>
              <button 
                onClick={() => setShowTournamentRules(false)} 
                className="text-gray-400 hover:text-white text-xl sm:text-2xl p-1"
              >
                ×
              </button>
            </div>
            <div className="text-gray-300 space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="text-white font-semibold mb-1 sm:mb-2">1. Tournament Entry</h4>
                <p>• Players must register before the tournament starts</p>
                <p>• Entry fee is non-refundable once tournament begins</p>
                <p>• Minimum bet requirements apply to all tournament games</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1 sm:mb-2">2. Scoring System</h4>
                <p>• Points are awarded based on bet amounts and wins</p>
                <p>• Multiplier bonuses for consecutive wins</p>
                <p>• Bonus points for high-value bets</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1 sm:mb-2">3. Prize Distribution</h4>
                <p>• Top 10 players receive prizes</p>
                <p>• Prizes are distributed within 24 hours</p>
                <p>• All prizes are subject to wagering requirements</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1 sm:mb-2">4. Fair Play</h4>
                <p>• No cheating or manipulation allowed</p>
                <p>• TucanBit reserves the right to disqualify players</p>
                <p>• All decisions are final</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Modal - Mobile responsive */}
      {showLeaderboard && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-2 sm:p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md sm:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header with X close icon */}
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">Tournament Leaderboard</h3>
              <button 
                onClick={() => setShowLeaderboard(false)} 
                className="text-gray-400 hover:text-white text-lg sm:text-xl lg:text-2xl p-1"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
              {/* Header */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2 lg:gap-4 mb-2 sm:mb-3 lg:mb-4 text-xs sm:text-sm font-semibold text-gray-400">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Place</span>
                </div>
                <div>Player</div>
                <div>Points</div>
                <div className="hidden sm:block">Prize</div>
                <div className="hidden sm:block">Avatar</div>
              </div>
              
              {/* Leaderboard Entries */}
              <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                {[
                  { place: 1, player: "TucanHunter", points: "12,456", prize: "$15,000", avatar: "👤" },
                  { place: 2, player: "LuckyDragon", points: "11,234", prize: "$10,000", avatar: "👤" },
                  { place: 3, player: "GoldenTiger", points: "10,567", prize: "$7,500", avatar: "👤" },
                  { place: 4, player: "VoiceChatHelm93677", points: "9,749", prize: "$1,500", avatar: "👤" },
                  { place: 5, player: "Duck lover", points: "9,107", prize: "$1,200", avatar: "👤" },
                  { place: 6, player: "🤙🏻", points: "8,403", prize: "$1,000", avatar: "👤" },
                  { place: 7, player: "Nish", points: "7,201", prize: "$850", avatar: "👤" },
                  { place: 8, player: "🏆 WIN", points: "7,066", prize: "$750", avatar: "👤" },
                  { place: 9, player: "mdnoverflow", points: "6,117", prize: "$650", avatar: "👤" },
                  { place: 10, player: "Cryptopunter", points: "5,951", prize: "$600", avatar: "👤" },
                  { place: 11, player: "Player_011", points: "5,234", prize: "$550", avatar: "👤" },
                  { place: 12, player: "Player_012", points: "4,876", prize: "$500", avatar: "👤" },
                  { place: 13, player: "Player_013", points: "4,521", prize: "$450", avatar: "👤" },
                  { place: 14, player: "Player_014", points: "4,123", prize: "$400", avatar: "👤" },
                  { place: 15, player: "Player_015", points: "3,876", prize: "$350", avatar: "👤" },
                  { place: 16, player: "Player_016", points: "3,654", prize: "$300", avatar: "👤" },
                  { place: 17, player: "Player_017", points: "3,432", prize: "$250", avatar: "👤" },
                  { place: 18, player: "Player_018", points: "3,210", prize: "$200", avatar: "👤" },
                  { place: 19, player: "Player_019", points: "2,987", prize: "$150", avatar: "👤" },
                  { place: 20, player: "Player_020", points: "2,765", prize: "$100", avatar: "👤" },
                ].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((entry, index) => (
                  <div key={entry.place} className="bg-gray-700 rounded-lg p-2 sm:p-3 lg:p-4">
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2 lg:gap-4 items-center">
                      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                          entry.place === 1 ? 'bg-yellow-500 text-black' :
                          entry.place === 2 ? 'bg-gray-400 text-black' :
                          entry.place === 3 ? 'bg-orange-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {entry.place}
                        </div>
                        {entry.place <= 3 && (
                          <Trophy className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${
                            entry.place === 1 ? 'text-yellow-400' :
                            entry.place === 2 ? 'text-gray-400' :
                            'text-orange-500'
                          }`} />
                        )}
                      </div>
                      <div className="text-white font-medium text-xs sm:text-sm truncate">{entry.player}</div>
                      <div className="text-green-400 font-bold text-xs sm:text-sm">{entry.points}</div>
                      <div className="text-yellow-400 font-bold text-xs sm:text-sm hidden sm:block">{entry.prize}</div>
                      <div className="text-base sm:text-lg lg:text-2xl hidden sm:block">{entry.avatar}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer with Close button - Mobile responsive */}
            <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                {/* Pagination */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    Previous
                  </button>
                  <div className="flex space-x-1">
                    {[1, 2].map(page => (
                      <button 
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                          currentPage === page 
                            ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white' 
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(2, prev + 1))}
                    disabled={currentPage === 2}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    Next
                  </button>
                </div>
                
                {/* Close button */}
                <button 
                  onClick={() => setShowLeaderboard(false)} 
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-3 sm:px-4 lg:px-6 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionalSidebar; 