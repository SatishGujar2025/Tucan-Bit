import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, User, Gamepad2, ShieldCheck, Bitcoin, Gem, Zap, Star, Trophy, Gift, Crown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllGames } from '../utils/gameUtils';
import pokerTableBg from '../assets/group-young-players-are-posing-poker-table-casino.avif';
import ongoingTribesBg from '../assets/ongoing_tribes.jpeg';
import h1 from '../assets/h1.jpg';
import h2 from '../assets/online-casino-purple-banner-with-offer-button.avif';
import h3 from '../assets/h3.jpg';



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
  
  // Use the centralized game data
  const allGames = getAllGames();
  const featuredGames = allGames.slice(0, 24); // Show first 24 games

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

  return (
    <div className="max-w-full overflow-x-hidden">
      {/* Hero Section - Three Promotional Banners */}
      <section className="py-8 bg-gray-900 overflow-hidden">
        <div className="px-0 sm:px-0 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div 
            ref={bannerRef}
            className="relative flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 h-72 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-x-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* WELCOME GIFT - FREE Lootbox Banner */}
            <div className="relative bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border-none transition-all duration-300 flex-shrink-0 w-full md:w-auto snap-start group hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 min-h-[280px]">
              {/* Play Now and Connect Wallet Buttons Overlay */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex gap-3">
                  <Link 
                    to="/casino" 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-bold text-sm hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl min-w-[120px]"
                  >
                    <Play className="w-4 h-4" />
                    <span>Play Now</span>
                  </Link>
                  <button 
                    onClick={() => openModal('walletConnect')}
                    className="bg-gradient-to-r from-purple-800 to-purple-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl min-w-[160px]"
                  >
                    <User className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </button>
                </div>
              </div>
              {/* Glowing Border Animation */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-[length:200%_200%] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-[2px] bg-gray-900 rounded-xl"></div>
              
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-xl overflow-hidden" 
                style={{ backgroundImage: `url(${h1})` }}
              >
              </div>
              {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 to-red-500/80 rounded-xl"></div> */}
              <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              {/* <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wide">Welcome Gift</h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">FREE Lootbox</h2>
                <p className="text-sm text-gray-300 mb-4">Unbox Your First Bonus. Start Strong!</p>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Gift className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">$</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/lootbox"
                  className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-sm"
                >
                  Claim Now
                </Link>
              </div> */}
              <Link to="/promotion/welcome-gift" className="absolute inset-0 z-10"></Link>
            </div>

            {/* DAILY REWARDS - UP TO 20% CASHBACK Banner */}
            <div className="relative bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border-none overflow-hidden flex-shrink-0 w-full md:w-auto snap-start group hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 min-h-[280px]">
              {/* Glowing Border Animation */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-[length:200%_200%] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-[2px] bg-gray-900 rounded-xl"></div>
              
              <div 
                className="absolute inset-0 bg-contain bg-center rounded-xl overflow-hidden bg-gray-900" 
                style={{ backgroundImage: `url(${h2})` }}
              >
              </div>
              {/* <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/80 to-orange-500/80 rounded-xl"></div> */}
              <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
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
                    <div className="w-18 h-18 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">20%</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/earn"
                  className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 text-sm"
                >
                  Get Cashback
                </Link>
              </div> */}
              <Link to="/promotion/daily-cashback" className="absolute inset-0 z-10"></Link>
            </div>

            {/* WHALE TOURNAMENT - Live Stakes Banner */}
            <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-orange-500/30 overflow-hidden flex-shrink-0 w-full md:w-auto snap-start group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 min-h-[280px]">
              {/* Glowing Border Animation */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-[length:200%_200%] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-[2px] bg-gray-900 rounded-xl"></div>
              
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-xl overflow-hidden" 
                style={{ backgroundImage: `url(${h3})` }}
              >
              </div>

              <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 border border-orange-500/30 overflow-hidden group hover:border-orange-400/50 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
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
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm"
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

      {/* Continue Playing Section */}
      <section className="py-8 bg-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Play className="w-5 h-5 text-green-400 mr-2" />
              Continue Playing
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {featuredGames.slice(0, 6).map((game) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-green-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Play className="w-2 h-2 mr-0.5" /><span>RESUME</span></div>
                    {game.badge && <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-green-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-green-500/10 text-green-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Continue</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 10 Games Section */}
      <section className="py-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
              TOP Top 10
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {featuredGames.slice(0, 10).map((game, index) => (
              <div key={game.id} className="flex-shrink-0 w-48 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>#{index + 1}</span></div>
                    {game.badge && <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-yellow-500/10 text-yellow-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
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

      {/* Cashback Countdown Section */}
    <section className="py-12 relative border-y border-yellow-500/20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${pokerTableBg})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
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
        <div className="relative px-0 sm:px-0 lg:px-8 countdown-timer-section">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow-lg">Don't miss your Daily cashback</h2>
            <p className="text-xl text-white mb-2 drop-shadow-md">Up to 20% Back. No BS. #SometimesLoseAlwaysWin</p>
            <p className="text-lg text-yellow-300 font-semibold drop-shadow-md">Your Next Cashback Drops In</p>
          </div>
          <div className="flex justify-center items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8 px-1 sm:px-2 overflow-hidden">
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-1 sm:p-2 md:p-3 lg:p-4 border border-yellow-500/30 min-w-[50px] sm:min-w-[60px] md:min-w-[80px] lg:min-w-[100px] max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] overflow-hidden">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 leading-tight timer-number">{countdown.days.toString().padStart(2, '0')}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 break-words leading-tight timer-label">Days</div>
              </div>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400 font-bold">:</div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-1 sm:p-2 md:p-3 lg:p-4 border border-yellow-500/30 min-w-[50px] sm:min-w-[60px] md:min-w-[80px] lg:min-w-[100px] max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] overflow-hidden">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 leading-tight timer-number">{countdown.hours.toString().padStart(2, '0')}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 break-words leading-tight timer-label">Hrs</div>
              </div>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400 font-bold">:</div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-1 sm:p-2 md:p-3 lg:p-4 border border-yellow-500/30 min-w-[50px] sm:min-w-[60px] md:min-w-[80px] lg:min-w-[100px] max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] overflow-hidden">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 leading-tight timer-number">{countdown.minutes.toString().padStart(2, '0')}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 break-words leading-tight timer-label">Min</div>
              </div>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400 font-bold">:</div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-1 sm:p-2 md:p-3 lg:p-4 border border-yellow-500/30 min-w-[50px] sm:min-w-[60px] md:min-w-[80px] lg:min-w-[100px] max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] overflow-hidden">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 leading-tight timer-number">{countdown.seconds.toString().padStart(2, '0')}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 break-words leading-tight timer-label">Sec</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-8 bg-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              New Arrivals
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {featuredGames.slice(0, 6).map((game) => (
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
                    <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-yellow-500/10 text-yellow-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/casino" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4" />
              <span>See over 4,000+ games</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Crypto Games Section */}
      <section className="py-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Bitcoin className="w-5 h-5 text-yellow-400 mr-2" />
              Crypto Games
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {featuredGames.slice(6, 12).map((game) => (
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
                    <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-yellow-500/10 text-yellow-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
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
      <section className="py-8 bg-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Gift className="w-5 h-5 text-yellow-400 mr-2" />
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
                    <div className="flex justify-between items-center mb-2"><span className="text-purple-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-purple-500/10 text-purple-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
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

      {/* Ongoing Tribes Card with Glowing Animation */}
      <section className="py-8 bg-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl animate-pulse"></div>
            <div className="relative bg-gray-800 rounded-2xl p-8 border border-yellow-500/30 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl" style={{ backgroundImage: `url(${ongoingTribesBg})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 rounded-2xl"></div>
              
              {/* Animated Glowing Lights */}
              <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-4 right-4 w-9 h-9 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm glow-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Moving Glowing Lights - Circular Pattern */}
              <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle shadow-lg shadow-yellow-500/50"></div>
              <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle2 shadow-lg shadow-yellow-500/50" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/4 left-1/4 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '4s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-circle2 shadow-lg shadow-yellow-500/50" style={{ animationDelay: '6s' }}></div>
              
              {/* Moving Glowing Lights - Rectangular Pattern */}
              <div className="absolute top-1/3 left-0 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50"></div>
              <div className="absolute top-1/3 right-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/3 left-0 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/3 right-0 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm move-rectangle shadow-lg shadow-yellow-500/50" style={{ animationDelay: '3s' }}></div>
              
              {/* Rotating Glowing Border */}
              <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-2xl animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center max-w-full overflow-hidden">
                <div className="lg:w-2/3 mb-6 lg:mb-0 lg:pr-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">Ongoing Tribes</h2>
                  <p className="text-sm sm:text-base text-gray-300 mb-5 leading-relaxed">Join the ultimate gaming community and compete with players worldwide in our exclusive tribal tournaments.</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-white">Live tournaments with massive prize pools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-white">Exclusive rewards and bonuses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-white">Real-time leaderboards and rankings</span>
                    </div>
                  </div>
                  <Link to="/tribes" className="mt-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 inline-block text-sm sm:text-base" onClick={() => window.scrollTo(0, 0)}>
                    Join Tribes Now
                  </Link>
                </div>
                <div className="w-full lg:w-1/3 lg:pl-4 lg:ml-auto mt-6 lg:mt-0 flex-shrink-0">
                  <div className="relative flex justify-center lg:justify-start">
                    <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-yellow-500/30 w-full max-w-[200px] sm:max-w-xs">
                      <h3 className="text-xs sm:text-sm font-bold text-white mb-3">Active Tribes</h3>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center p-1.5 bg-gray-700/50 rounded">
                          <span className="text-xs text-white truncate mr-2">Dragon Warriors</span>
                          <span className="text-xs text-yellow-400 flex-shrink-0">1,247</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-gray-700/50 rounded">
                          <span className="text-xs text-white truncate mr-2">Phoenix Clan</span>
                          <span className="text-xs text-yellow-400 flex-shrink-0">892</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-gray-700/50 rounded">
                          <span className="text-xs text-white truncate mr-2">Shadow Hunters</span>
                          <span className="text-xs text-yellow-400 flex-shrink-0">654</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-gray-700/50 rounded">
                          <span className="text-xs text-white truncate mr-2">Golden Eagles</span>
                          <span className="text-xs text-yellow-400 flex-shrink-0">543</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              Popular Games
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {featuredGames.slice(6, 12).map((game) => (
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
                    <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-yellow-500/10 text-yellow-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
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
      <section className="py-8 bg-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <div className="w-5 h-5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              Live Casino
            </h2>
            <Link to="/live-casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {featuredGames.slice(12, 18).map((game) => (
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
                    <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">Live</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-yellow-500/10 text-yellow-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
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
      <section className="py-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-0 sm:px-0 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Gem className="w-5 h-5 text-yellow-400 mr-2" />
              Jackpot Games
            </h2>
            <Link to="/jackpots" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {featuredGames.slice(18, 24).map((game) => (
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
                    <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-yellow-500/10 text-yellow-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
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

      <section className="py-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Choose TucanBit?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Provably Fair</h3>
              <p className="text-gray-300">All our games use blockchain technology to ensure complete transparency and fairness in every outcome.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4"><Bitcoin className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
              <p className="text-gray-300">Withdraw your winnings instantly to your crypto wallet with no delays or unnecessary verifications.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4"><Gem className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Selection</h3>
              <p className="text-gray-300">Over 2,000 games from top providers including Pragmatic Play, Evolution, and NetEnt.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="p-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Start Winning?</h2>
          <p className="text-xl text-gray-300 mb-10">Join TucanBit now and get your 200% welcome bonus up to 5 BTC plus 200 free spins!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
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