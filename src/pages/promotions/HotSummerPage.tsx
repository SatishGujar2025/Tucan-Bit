import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
import sidebarPromo from '../../assets/sidebar_promo.png';

const HotSummerPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const participatingGames = [
    { id: 1, name: "Crazy Time", image: "🎰", live88: true },
    { id: 2, name: "Sweet Bonanza", image: "🍭", live88: false },
    { id: 3, name: "Gates of Olympus", image: "⚡", live88: false },
    { id: 4, name: "Book of Dead", image: "📚", live88: false },
    { id: 5, name: "Starburst", image: "💎", live88: false },
    { id: 6, name: "Gonzo's Quest", image: "🏔️", live88: false },
    { id: 7, name: "Wolf Gold", image: "🐺", live88: false },
    { id: 8, name: "Big Bass", image: "🐟", live88: false },
  ];

  const leaderboard = [
    { place: 1, player: "summer_winner", points: "45,230", prize: "$5,000" },
    { place: 2, player: "heat_seeker", points: "32,156", prize: "$3,000" },
    { place: 3, player: "sun_chaser", points: "28,943", prize: "$2,000" },
    { place: 4, player: "beach_bum", points: "25,671", prize: "$1,500" },
    { place: 5, player: "vacation_mode", points: "22,389", prize: "$1,000" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={sidebarPromo} 
          alt="Hot Summer Promotion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="absolute inset-0 flex items-center justify-between p-8">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Hot Summer</h1>
            
            {/* Countdown Timer */}
            <div className="flex space-x-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-white/20 rounded-lg px-4 py-2">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-sm mt-1">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-white/20 rounded-lg px-4 py-2">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm mt-1">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-white/20 rounded-lg px-4 py-2">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm mt-1">Min</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-white/20 rounded-lg px-4 py-2">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm mt-1">Sec</div>
              </div>
            </div>
          </div>
          
          {/* Prize Pool */}
          <div className="text-center">
            <div className="bg-yellow-500 text-black px-6 py-4 rounded-lg">
              <div className="text-sm font-semibold">Prize Pool</div>
              <div className="text-3xl font-bold">$15,000</div>
            </div>
          </div>
          
          {/* Trophy Icon */}
          <div className="absolute top-4 right-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">HOT SUMMER</h2>
          <h3 className="text-2xl font-bold text-yellow-400">EXCLUSIVE BONUSES!</h3>
        </div>

        {/* Rules and Details */}
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">How to Earn Points</h4>
              <ul className="space-y-3 text-gray-300">
                <li>• Every $1 you wager = 1 point</li>
                <li>• Play any summer-themed games to earn points</li>
                <li>• Daily login bonuses count towards your total</li>
                <li>• Special weekend multipliers available</li>
                <li>• Refer friends for bonus points</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Key Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Type</div>
                  <div className="text-white font-semibold">Wager</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Prize Pool</div>
                  <div className="text-white font-semibold">$15,000</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Rank</div>
                  <div className="text-white font-semibold">All</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Participants</div>
                  <div className="text-white font-semibold">247</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participating Games */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Gamepad2 className="w-6 h-6" />
              <span>Participating Games ({participatingGames.length})</span>
            </h3>
            <div className="flex space-x-2">
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {participatingGames.map((game) => (
              <div key={game.id} className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">{game.image}</div>
                <div className="text-sm text-white font-medium">{game.name}</div>
                {game.live88 && (
                  <div className="text-xs text-yellow-400 mt-1">Live88</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center space-x-2 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span>Leaderboard</span>
          </h3>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-700 text-sm font-semibold text-gray-300">
              <div>Place</div>
              <div>Player</div>
              <div>Points</div>
              <div>Prize</div>
            </div>
            
            <div className="space-y-2 p-4">
              {leaderboard.map((entry) => (
                <div key={entry.place} className="grid grid-cols-4 gap-4 items-center py-3 hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.place === 1 ? 'bg-yellow-500 text-black' :
                      entry.place === 2 ? 'bg-gray-400 text-black' :
                      entry.place === 3 ? 'bg-orange-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {entry.place}
                    </div>
                    {entry.place <= 3 && (
                      <Trophy className={`w-5 h-5 ${
                        entry.place === 1 ? 'text-yellow-400' :
                        entry.place === 2 ? 'text-gray-400' :
                        'text-orange-500'
                      }`} />
                    )}
                  </div>
                  <div className="text-white font-medium">{entry.player}</div>
                  <div className="text-green-400 font-bold">{entry.points}</div>
                  <div className="text-yellow-400 font-bold">{entry.prize}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotSummerPage; 