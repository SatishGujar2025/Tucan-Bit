import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, User, Gamepad2, ShieldCheck, Bitcoin, Gem, Zap, Star, Trophy, Gift, Crown, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllGames } from '../utils/gameUtils';
import { SearchBar } from '../components';
import pokerTableBg from '../assets/group-young-players-are-posing-poker-table-casino.avif';
import ongoingTribesBg from '../assets/ongoing_tribes.jpeg';
import bannerMiddlePage from '../assets/home-page-games/banner-middle-page1.jpeg';
import h1 from '../assets/tuckan new 21-02.jpg';
import h2 from '../assets/tuckan 1 (2).jpg';
import h3 from '../assets/hg.jpeg';
import trendingIcon from '../assets/home-page-games/icons8-trending-32.png';
// Zeus image for Daily Cashback
import zeusImage from '../assets/zeus-image-removebg-preview.png';
// Tucan image for Tribes section
import tucanImage from '../assets/tucan.png';
import tucanIcon from '../assets/tucan.png';


713331703
// This component is now only responsible for the home page content.
const HomePage: React.FC = () => {
  const { openModal } = useAppContext();
  
  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 10,
    minutes: 59,
    seconds: 55
  });

  // Banner carousel state
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  
  // Game sections scroll refs
  const continuePlayingRef = useRef<HTMLDivElement>(null);
  const topGamesRef = useRef<HTMLDivElement>(null);
  const trendingGamesRef = useRef<HTMLDivElement>(null);
  const cryptoGamesRef = useRef<HTMLDivElement>(null);
  const popularGamesRef = useRef<HTMLDivElement>(null);
  const liveCasinoRef = useRef<HTMLDivElement>(null);
  const buyFeatureRef = useRef<HTMLDivElement>(null);
  const jackpotGamesRef = useRef<HTMLDivElement>(null);
  
  // Filter and search state
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the centralized game data
  const allGames = getAllGames();
  const featuredGames = allGames.slice(0, 24); // Show first 24 games

  // Filter games based on current filter and search term
  const getFilteredGames = () => {
    let filtered = allGames;

    // Apply filter
    switch (currentFilter) {
      case 'jackpot':
        filtered = filtered.filter(game => game.badge && game.badge.toLowerCase().includes('jackpot'));
        break;
      case 'new':
        filtered = filtered.filter(game => game.provider === 'Live88' || game.provider === 'Peter & Sons');
        break;
      case 'slots':
        filtered = filtered.filter(game => !game.isLive);
        break;
      case 'featured':
        filtered = filtered.filter(game => game.provider === 'TucanBit' || game.provider === 'Live88');
        break;
      case 'live':
        filtered = filtered.filter(game => game.isLive);
        break;
      case 'shows':
        filtered = filtered.filter(game => game.provider === 'Evolution' || game.title.toLowerCase().includes('show'));
        break;
      case 'table':
        filtered = filtered.filter(game => game.title.toLowerCase().includes('blackjack') || 
                                         game.title.toLowerCase().includes('roulette') || 
                                         game.title.toLowerCase().includes('baccarat') ||
                                         game.title.toLowerCase().includes('poker'));
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredGames = getFilteredGames();

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Reset to 24 hours when countdown reaches zero
                days = 0;
                hours = 23;
                minutes = 59;
                seconds = 59;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-sliding banner effect
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 3);
    }, 3000); // 3 seconds

    return () => clearInterval(bannerTimer);
  }, []);

  // Scroll to current banner
  useEffect(() => {
    if (bannerRef.current) {
      const bannerWidth = bannerRef.current.scrollWidth / 3;
      bannerRef.current.scrollTo({
        left: currentBanner * bannerWidth,
        behavior: 'smooth'
      });
    }
  }, [currentBanner]);



  // Scroll functions for game sections
  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      // Scroll by approximately 3 game cards (120px each + gap)
      ref.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      // Scroll by approximately 3 game cards (120px each + gap)
      ref.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-full overflow-x-hidden ">
      {/* Hero Section - Three Promotional Banners */}
      <section className="py-2 bg-black overflow-hidden">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div 
            ref={bannerRef}
            className="relative flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 h-52 md:h-60 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-x-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* WELCOME GIFT - FREE Lootbox Banner */}
            <div className="relative bg-black rounded-xl p-4 border-none transition-all duration-300 flex-shrink-0 w-full md:w-auto snap-start group hover:scale-[1.015] hover:shadow-2xl hover:shadow-black/25 min-h-[208px] md:min-h-[240px]">

              {/* Glowing Border Animation */}
              
              <img 
                src={h1} 
                alt="Welcome Gift Banner" 
                className="absolute inset-0 w-full h-full object-cover rounded-xl group-hover:scale-1015 transition-transform duration-300 opacity-100"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  transform: 'none',
                  transformOrigin: 'center center'
                }}
              />
              {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 to-red-500/80 rounded-xl"></div> */}

             
              <Link to="/promotion/welcome-gift" className="absolute inset-0 z-10"></Link>
            </div>

            {/* DAILY REWARDS - UP TO 20% CASHBACK Banner */}
            <div className="relative bg-black rounded-xl p-4 border-none overflow-hidden flex-shrink-0 w-full md:w-auto snap-start group hover:scale-[1.015] hover:shadow-2xl hover:shadow-black/25 transition-all duration-300 min-h-[208px] md:min-h-[240px]">
              <img 
                src={h2} 
                alt="Daily Rewards Banner" 
                className="absolute inset-0 w-full h-full object-cover rounded-xl group-hover:scale-1015 transition-transform duration-300 opacity-100"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  transform: 'none',
                  transformOrigin: 'center center'
                }}
              />
              {/* <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/80 to-orange-500/80 rounded-xl"></div> */}

              {/* <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">Daily Rewards</h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-center mb-4">
               
                  <h2 className="text-lg font-bold text-white mb-1">UP TO 20% CASHBACK</h2>
                  <p className="text-xs text-yellow-300 font-semibold">#SometimesLoseAlwaysWin</p>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-18 h-18 bg-gradient-to-br from-yellow-500/80 to-orange-500/80 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">20%</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/earn"
                  className="block w-full bg-white text-black text-center py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-sm"
                >
                  Get Cashback
                </Link>
              </div> */}
              <Link to="/promotion/daily-cashback" className="absolute inset-0 z-10"></Link>
            </div>

            {/* WHALE TOURNAMENT - Live Stakes Banner */}
            <div className="relative bg-black rounded-xl p-4 border border-orange-500/30 overflow-hidden flex-shrink-0 w-full md:w-auto snap-start group hover:scale-[1.015] hover:shadow-2xl hover:shadow-black/25 transition-all duration-300 min-h-[208px] md:min-h-[240px]">
              <img 
                src={h3} 
                alt="Whale Tournament Banner" 
                className="absolute inset-0 w-full h-full object-cover rounded-xl group-hover:scale-1015 transition-transform duration-300 opacity-100"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  transform: 'none',
                  transformOrigin: 'center center'
                }}
              />


              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {/* <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Tournament</h3> */}
                  {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div> */}
                </div>
                {/* <h2 className="text-lg font-bold text-white mb-2">Live Stakes $10K Prize Pool</h2>
                <p className="text-sm text-gray-300 mb-4">Go all in. You have 5 days to grab the bag.</p> */}
                {/* <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                      <div className="flex space-x-1">
                        <div className="w-6 h-8 bg-white rounded border-2 border-gray-800 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-800">A</span>
                        </div>
                        <div className="w-6 h-8 bg-white rounded border-2 border-gray-800 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-800">K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <Link
                  to="/tournaments"
                  className="block w-full bg-white text-black text-center py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-sm"
                >
                  Join Tournament
                </Link> */}
              </div>
              <Link to="/promotion/whale-tournament" className="absolute inset-0 z-10"></Link>
            </div>
          </div>

          {/* Banner Indicators */}
          <div className="flex justify-center space-x-1 mt-2 md:hidden">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentBanner === index 
                    ? 'bg-white' 
                    : 'bg-white/30'
                }`}
                style={{ width: '12px', height: '12px', minWidth: '12px', minHeight: '12px', maxWidth: '12px', maxHeight: '12px' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Games Section */}
      <section className="py-0 bg-black">
        <div className="px-4 sm:px-6 lg:px-8">
          <SearchBar 
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            onSearchChange={setSearchTerm}
          />
        </div>
      </section>




        <section className="py-0 bg-black">
       <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                   <img src={trendingIcon} alt="Trending" className="w-6 h-6 mr-1 filter brightness-0 invert" />
           Trending Games
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="relative">
            {/* Left Arrow */}
            <button 
              onClick={() => scrollLeft(topGamesRef)}
              className="hidden md:inline-flex absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Right Arrow */}
            <button 
              onClick={() => scrollRight(topGamesRef)}
              className="hidden md:inline-flex absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div ref={topGamesRef} className="flex overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
            {filteredGames.length > 0 ? (
              filteredGames.slice(0, 12).map((game, index) => (
                <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30 mr-4">
                  <Link to={`/game/${game.id}`}>
                      <div className="relative aspect-[3/2] overflow-hidden">
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>#{index + 1}</span></div>
                      {game.badge && <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                      </div>
                      <div className="p-3">
                      <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                      <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                      <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                          <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                      </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                          <Play className="w-4 h-4" />
                          <span>Play</span>
                        </button>
                      </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex-shrink-0 w-full text-center py-8">
                <p className="text-gray-400 text-lg">No games found matching your criteria</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter</p>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* Continue Playing Section */}
      <section className="py-1 bg-black">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                  <Play className="w-5 h-5 text-white mr-1" />
              Continue Playing
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="relative">
            {/* Left Arrow */}
            <button 
              onClick={() => scrollLeft(continuePlayingRef)}
              className="hidden md:inline-flex absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Right Arrow */}
            <button 
              onClick={() => scrollRight(continuePlayingRef)}
              className="hidden md:inline-flex absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div ref={continuePlayingRef} className="flex overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
            {featuredGames.slice(0, 8).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-green-500/30 mr-4">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Play className="w-2 h-2 mr-0.5" /><span>RESUME</span></div>
                    {game.badge && <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Continue</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

{/* Top 10 */}
 <section className="py-1 bg-black">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                  <Star className="w-5 h-5 text-white mr-1" />
              Top 10
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="relative">
            {/* Left Arrow */}
            <button 
              onClick={() => scrollLeft(continuePlayingRef)}
              className="hidden md:inline-flex absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Right Arrow */}
            <button 
              onClick={() => scrollRight(continuePlayingRef)}
              className="hidden md:inline-flex absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div ref={continuePlayingRef} className="flex overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
            {featuredGames.slice(0, 8).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-green-500/30 mr-4">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Play className="w-2 h-2 mr-0.5" /><span>RESUME</span></div>
                    {game.badge && <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Continue</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>




      {/* Cashback Countdown Section */}
      <section className="py-2 relative border-y border-yellow-500/20">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative h-80 w-full">
            {/* Zeus Image in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={zeusImage} 
                alt="Zeus with Lightning" 
                className="h-full object-contain opacity-60"
              />
            </div>
            
            {/* Moving Border Light Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Animated Glowing Lights */}
        {/* <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50"></div>
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-4 right-4 w-9 h-9 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1.5s' }}></div> */}
        
        {/* Moving Glowing Lights - Circular Pattern */}
        {/* <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle shadow-lg shadow-yellow-500/50"></div>
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle2 shadow-lg shadow-yellow-500/50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle2 shadow-lg shadow-yellow-500/50" style={{ animationDelay: '6s' }}></div> */}
        
        {/* Moving Glowing Lights - Rectangular Pattern */}
        {/* <div className="absolute top-1/3 left-0 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50"></div>
        <div className="absolute top-1/3 right-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-0 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-0 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '3s' }}></div>
         */}
        {/* Rotating Glowing Border */}
        {/* <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-lg animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
         */}
            <div className="relative countdown-timer-section h-full flex items-center">
              <div className="flex flex-col lg:flex-row items-center justify-between w-full px-8 lg:px-16 lg:pr-8">
                {/* Left Side - Text Content */}
                <div className="lg:w-1/2 text-left mb-6 lg:mb-0">
                  <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">DON'T MISS YOUR<br />DAILY CASHBACK</h2>
                  <p className="text-xl text-white mb-2 drop-shadow-md">Up to 20% Back. No BS. #SometimesLoseAlwaysWin</p>
                </div>
                
                {/* Right Side - Timer */}
                <div className="lg:w-auto text-center lg:pr-0 lg:mr-0 lg:-mr-4">
                  <div className="bg-amber-500 text-black px-4 py-2 rounded mb-4 inline-block">
                    <p className="text-lg font-bold">YOUR NEXT CASHBACK DROPS IN</p>
                  </div>
                  <div className="flex justify-center items-center space-x-2 overflow-hidden">
                    <div className="text-center">
                      <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                        <div className="text-lg font-bold text-white leading-tight">{countdown.days.toString().padStart(2, '0')}</div>
                        <div className="text-xs text-gray-300 leading-tight">Days</div>
                      </div>
                    </div>
                    <div className="text-lg text-white font-bold">:</div>
                    <div className="text-center">
                      <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                        <div className="text-lg font-bold text-white leading-tight">{countdown.hours.toString().padStart(2, '0')}</div>
                        <div className="text-xs text-gray-300 leading-tight">Hrs</div>
                      </div>
                    </div>
                    <div className="text-lg text-white font-bold">:</div>
                    <div className="text-center">
                      <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                        <div className="text-lg font-bold text-white leading-tight">{countdown.minutes.toString().padStart(2, '0')}</div>
                        <div className="text-xs text-gray-300 leading-tight">Min</div>
                      </div>
                    </div>
                    <div className="text-lg text-white font-bold">:</div>
                    <div className="text-center">
                      <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                        <div className="text-lg font-bold text-white leading-tight">{countdown.seconds.toString().padStart(2, '0')}</div>
                        <div className="text-xs text-gray-300 leading-tight">Sec</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-4 bg-black">
      <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                  <Gift className="w-5 h-5 text-white mr-1" />
              New Arrivals
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-4 scrollbar-hide">
            {featuredGames.slice(0, 8).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30 mr-4">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" style={{ display: 'block' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {game.badge && <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    {game.isLive && <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>LIVE</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/casino" className="bg-white text-black px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-200 inline-flex items-center space-x-2"
           >
              <Gamepad2 className="w-4 h-4" />
              <span>See over 4,000+ games</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Crypto Games Section */}
      <section className="py-4 bg-black">
   <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                  <Bitcoin className="w-5 h-5 text-white mr-1" />
              Crypto Games
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" style={{ gap: '1rem' }}>
            {featuredGames.slice(6, 14).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Bitcoin className="w-2 h-2 mr-0.5" /><span>CRYPTO</span></div>
                    {game.badge && <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Feature Section */}
      <section className="py-0 bg-black">
       <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                  <Trophy className="w-5 h-5 text-white mr-1" />
              Buy Feature
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.slice(0, 6).map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Gift className="w-2 h-2 mr-0.5" /><span>BUY</span></div>
                    {game.badge && <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Buy Feature</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue Gradient Section */}
      <section className="py-6 bg-black">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative">

            <Link to="/tribes" onClick={() => window.scrollTo(0, 0)} className="block">
              <div className="relative rounded-2xl p-8 border border-blue-400/30 overflow-hidden h-80 opacity-100 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                {/* Banner Background Image */}
                <div className="absolute inset-0 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${bannerMiddlePage})` }}></div>
                {/* Light overlay for reduced contrast */}
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-0 bg-black">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                  <Crown className="w-5 h-5 text-white mr-1" />
              Popular Games
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" style={{ gap: '1rem' }}>
            {featuredGames.slice(14, 22).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {game.badge && <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    {game.isLive && <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>LIVE</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Casino Section */}
      <section className="py-0 bg-black">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Video className="w-5 h-5 text-white mr-1" />
              Live Casino
            </h2>
            <Link to="/live-casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" style={{ gap: '1rem' }}>
            {featuredGames.slice(22, 30).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {game.badge && <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>LIVE</span></div>
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-gray-400 text-xs">Live</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jackpot Games Section */}
      <section className="py-4 bg-black">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
                                  <Gem className="w-5 h-5 text-white mr-1" />
              Jackpot Games
            </h2>
            <Link to="/jackpots" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" style={{ gap: '1rem' }}>
            {featuredGames.slice(30, 38).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Gem className="w-2 h-2 mr-0.5" /><span>JACKPOT</span></div>
                    {game.isLive && <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>LIVE</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-white text-xs">{game.provider}</span><span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-white"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-gray-500/10 text-white">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 bg-black">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose TucanBit?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6 text-black" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Provably Fair</h3>
              <p className="text-gray-300">All our games use blockchain technology to ensure complete transparency and fairness in every outcome.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4"><Bitcoin className="w-6 h-6 text-black" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
              <p className="text-gray-300">Withdraw your winnings instantly to your crypto wallet with no delays or unnecessary verifications.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4"><Gem className="w-6 h-6 text-black" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Selection</h3>
              <p className="text-gray-300">Over 2,000 games from top providers including Pragmatic Play, Evolution, and NetEnt.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="p-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Start Winning?</h2>
          <p className="text-xl text-gray-300 mb-8">Join TucanBit now and get your 200% welcome bonus up to 5 BTC plus 200 free spins!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-black px-6 py-3 rounded-xl font-semibold text-base hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <User className="w-5 h-5" />
                <span>Join Now</span>
              </Link>
              <Link to="/casino" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Play className="w-5 h-5" />
                <span>Start Playing</span>
              </Link>
              <Link to="/leaderboards" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Crown className="w-5 h-5" />
                <span>View Leaderboards</span>
              </Link>
              <Link to="/achievements" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Star className="w-5 h-5" />
                <span>View Achievements</span>
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;