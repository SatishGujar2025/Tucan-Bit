import React, { useState } from 'react';
import { TrendingUp, Star, Flame, Zap, Crown } from 'lucide-react';
import { gameData } from './data/games';
import GameCard from './GameCard';

interface GameTabsProps {
  title?: string;
  showViewAll?: boolean;
}

const GameTabs: React.FC<GameTabsProps> = ({ title = "Games", showViewAll = true }) => {
  const [activeTab, setActiveTab] = useState('trending');

  const tabs = [
    {
      id: 'trending',
      name: 'Trending',
      icon: <TrendingUp className="w-4 h-4" />,
      games: gameData.trending
    },
    {
      id: 'newArrivals',
      name: 'New Arrivals',
      icon: <Star className="w-4 h-4" />,
      games: gameData.newArrivals
    },
    {
      id: 'topGames',
      name: 'Top Games',
      icon: <Flame className="w-4 h-4" />,
      games: gameData.topGames
    },
    {
      id: 'tucanbitSpecials',
      name: 'TucanBit Specials',
      icon: <Crown className="w-4 h-4" />,
      games: gameData.tucanbitSpecials
    },
    {
      id: 'spinWars',
      name: 'Spin Wars',
      icon: <Zap className="w-4 h-4" />,
      games: gameData.spinWars
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        
        {showViewAll && (
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            View all
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="flex overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 md:overflow-x-visible scrollbar-hide">
        {activeTabData?.games.map((game) => (
          <div key={game.id} className="flex-shrink-0 w-48 md:w-auto">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameTabs; 