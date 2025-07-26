import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import GameCard from './GameCard';

interface Game {
  id: string;
  title: string;
  provider: string;
  image: string;
  isLive?: boolean;
  badge?: string;
}

interface GameSectionProps {
  title: string;
  games: Game[];
  showViewAll: boolean;
}

const GameSection: React.FC<GameSectionProps> = ({ title, games, showViewAll }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {showViewAll && (
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              View all
            </button>
          )}
          
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

// Fix import
import { Zap } from 'lucide-react';

export default GameSection;