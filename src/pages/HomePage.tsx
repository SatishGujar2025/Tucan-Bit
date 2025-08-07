import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Wallet, User, Gamepad2, ShieldCheck, Bitcoin, Gem, Zap, Star, Trophy, Gift, Crown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllGames } from '../utils/gameUtils';
import pokerTableBg from '../assets/group-young-players-are-posing-poker-table-casino.avif';
import ongoingTribesBg from '../assets/ongoing_tribes.jpeg';

// This component is now only responsible for the home page content.
const HomePage: React.FC = () => {
  const { walletAddress, openModal } = useAppContext();
  
  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 10,
    minutes: 59,
    seconds: 55
  });
  
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

  return (
    <>
       {/* Hero Section - Showcasing the background image */}
        <section className="relative overflow-hidden h-[55vh] min-h-[150px] flex items-center">
          <div
            className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center "
            style={{ backgroundPosition: 'center 30%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>

          <div className="relative p-6 w-full">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">TucanBit</span> Crypto Casino
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                The most thrilling crypto gambling experience with instant payouts, provably fair games, and exclusive bonuses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/game-lobby"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>Play Now</span>
                </Link>
                 <button
                onClick={() => openModal('walletConnect')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 flex items-center justify-center space-x-2"
              >
                <Wallet className="w-5 h-5" />
                <span>{walletAddress ? `${walletAddress.slice(0, 6)}...` : 'Connect Wallet'}</span>
              </button>
              </div>
            </div>
          </div>
        </section>

      {/* Continue Playing Section */}
      <section className="py-16 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Play className="w-6 h-6 text-green-400 mr-3" />
              Continue Playing
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.slice(0, 6).map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-green-500/30">
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
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
              Top 10
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredGames.slice(0, 10).map((game, index) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
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
        <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-lg animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow-lg">Don't miss your Daily cashback</h2>
            <p className="text-xl text-white mb-2 drop-shadow-md">Up to 20% Back. No BS. #SometimesLoseAlwaysWin</p>
            <p className="text-lg text-yellow-300 font-semibold drop-shadow-md">Your Next Cashback Drops In</p>
          </div>
          <div className="flex justify-center items-center space-x-4 sm:space-x-8">
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400">{countdown.days.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">Days</div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl text-yellow-400 font-bold">:</div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400">{countdown.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">Hours</div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl text-yellow-400 font-bold">:</div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400">{countdown.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl text-yellow-400 font-bold">:</div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400">{countdown.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Zap className="w-6 h-6 text-yellow-400 mr-3" />
              New Arrivals
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
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Bitcoin className="w-6 h-6 text-yellow-400 mr-3" />
              Crypto Games
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.slice(6, 12).map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
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
      <section className="py-16 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Gift className="w-6 h-6 text-yellow-400 mr-3" />
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
      <section className="py-16 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
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
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-6 lg:mb-0">
                  <h2 className="text-3xl font-bold text-white mb-4">Ongoing Tribes</h2>
                  <p className="text-gray-300 mb-6">Join the ultimate gaming community and compete with players worldwide in our exclusive tribal tournaments.</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white">Live tournaments with massive prize pools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-white">Exclusive rewards and bonuses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-white">Real-time leaderboards and rankings</span>
                    </div>
                  </div>
                  <Link to="/tribes" className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 inline-block">
                    Join Tribes Now
                  </Link>
                </div>
                <div className="lg:w-1/2 lg:pl-8">
                  <div className="relative">
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/30">
                      <h3 className="text-lg font-bold text-white mb-4">Active Tribes</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                          <span className="text-sm text-white">Dragon Warriors</span>
                          <span className="text-xs text-yellow-400">1,247 members</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                          <span className="text-sm text-white">Phoenix Clan</span>
                          <span className="text-xs text-yellow-400">892 members</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                          <span className="text-sm text-white">Shadow Hunters</span>
                          <span className="text-xs text-yellow-400">654 members</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                          <span className="text-sm text-white">Golden Eagles</span>
                          <span className="text-xs text-yellow-400">543 members</span>
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
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Star className="w-6 h-6 text-yellow-400 mr-3" />
              Popular Games
            </h2>
            <Link to="/casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.slice(6, 12).map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
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
      <section className="py-16 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              Live Casino
            </h2>
            <Link to="/live-casino" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.slice(12, 18).map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
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
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Gem className="w-6 h-6 text-yellow-400 mr-3" />
              Jackpot Games
            </h2>
            <Link to="/jackpots" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.slice(18, 24).map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
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

      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose TucanBit?</h2>
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

      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="p-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Winning?</h2>
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
    </>
  );
};

export default HomePage;