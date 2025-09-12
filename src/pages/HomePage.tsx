import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, User, Gamepad2, ShieldCheck, Bitcoin, Gem, Star, Trophy, Gift, Crown, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllGames } from '../utils/gameUtils';
import { SearchBar, HeroBanner } from '../components';
import bannerMiddlePage from '../assets/home-page-games/banner-middle-page1.jpeg';
import trendingIcon from '../assets/home-page-games/icons8-trending-32.png';

const HomePage: React.FC = () => {
  const { openModal } = useAppContext();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allGames = getAllGames();
  const featuredGames = allGames.slice(0, 24);

  const getFilteredGames = () => {
    let filtered = allGames;

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
        break;
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredGames = getFilteredGames();

  return (
    <div className="max-w-full overflow-x-hidden">
      <HeroBanner onPlayNow={() => openModal('login')} />

      <section className="py-0 bg-black">
        <div className="px-4 sm:px-6 lg:px-8">
          <SearchBar
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            onSearchChange={setSearchTerm}
          />
        </div>
      </section>

      <section className="py-4 bg-black">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-white mb-4">Featured Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.slice(0, 12).map((game) => (
              <div key={game.id} className="bg-gray-800 rounded-lg p-4">
                <img src={game.image} alt={game.title} className="w-full h-24 object-cover rounded mb-2" />
                <h3 className="text-white text-sm font-semibold truncate">{game.title}</h3>
                <p className="text-gray-400 text-xs">{game.provider}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-black">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative">
            <Link to="/tribes" onClick={() => window.scrollTo(0, 0)} className="block">
              <div className="relative rounded-2xl p-8 border border-blue-400/30 overflow-hidden h-80 opacity-100 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${bannerMiddlePage})` }}></div>
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
              </div>
            </Link>
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