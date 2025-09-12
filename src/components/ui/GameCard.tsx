import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Zap, Gem, Bitcoin, Gift } from 'lucide-react';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    image: string;
    provider: string;
    isLive?: boolean;
    badge?: string;
  };
  badgeType?: 'ranking' | 'resume' | 'crypto' | 'buy' | 'jackpot' | 'live';
  index?: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, badgeType, index }) => {
  const getBadgeContent = () => {
    switch (badgeType) {
      case 'ranking':
        return {
          className: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          icon: null,
          text: `#${(index || 0) + 1}`
        };
      case 'resume':
        return {
          className: 'bg-gradient-to-r from-green-500 to-blue-500',
          icon: <Play className="w-2 h-2 mr-0.5" />,
          text: 'RESUME'
        };
      case 'crypto':
        return {
          className: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          icon: <Bitcoin className="w-2 h-2 mr-0.5" />,
          text: 'CRYPTO'
        };
      case 'buy':
        return {
          className: 'bg-gradient-to-r from-purple-500 to-pink-500',
          icon: <Gift className="w-2 h-2 mr-0.5" />,
          text: 'BUY'
        };
      case 'jackpot':
        return {
          className: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          icon: <Gem className="w-2 h-2 mr-0.5" />,
          text: 'JACKPOT'
        };
      default:
        return null;
    }
  };

  const badgeContent = getBadgeContent();

  return (
    <div className="flex-shrink-0 group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30 mr-4">
      <Link to={`/game/${game.id}`}>
        <div className="relative w-full h-48 bg-black overflow-hidden">
          {/* Image full visible */}
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Badge Left Top */}
          {badgeContent && (
            <div className={`absolute top-1 left-1 ${badgeContent.className} text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center`}>
              {badgeContent.icon}
              <span>{badgeContent.text}</span>
            </div>
          )}
          
          {/* Badge Right Top */}
          {game.badge && (
            <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center">
              <Zap className="w-2 h-2 mr-0.5" />
              <span>{game.badge}</span>
            </div>
          )}
          
          {/* Live Badge */}
          {(game.isLive || badgeType === 'live') && (
            <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center">
              <span>LIVE</span>
            </div>
          )}

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-xs">{game.provider}</span>
              <span className="text-white text-xs">{game.isLive ? 'Live' : 'Slot'}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1 text-white">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span className="text-xs">x5000</span>
              </div>
              <span className="text-xs px-1 py-0.5 rounded bg-gray-500/30 text-white">High</span>
            </div>
          </div>
          
          {/* Hover Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white text-black px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
              <Play className="w-4 h-4" />
              <span>{badgeType === 'resume' ? 'Continue' : badgeType === 'buy' ? 'Buy Feature' : 'Play'}</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
