import React from 'react';
import { Play } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  provider: string;
  image: string;
  isLive?: boolean;
  badge?: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
      {/* Game Image Container */}
      <div
        className={`aspect-square relative flex items-center justify-center ${game.image ? 'bg-cover bg-center' : ''}`}
        style={{ backgroundImage: game.image ? `url(${game.image})` : 'none' }}
      >
        {/* Fallback UI: Only shows if there's no image */}
        {!game.image && (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-400">{game.title.charAt(0)}</span>
          </div>
        )}
        
        {/* Live Badge */}
        {game.isLive && (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live88</span>
          </div>
        )}
        
        {/* Custom Badge */}
        {game.badge && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            {game.badge}
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </div>
      
      {/* Game Info */}
      <div className="p-3">
        <h3 className="text-white text-sm font-medium truncate mb-1">{game.title}</h3>
        <p className="text-gray-400 text-xs truncate">{game.provider}</p>
      </div>
    </div>
  );
};

export default GameCard;