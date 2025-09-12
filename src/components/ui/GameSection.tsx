import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GameCard from './GameCard';

interface GameSectionProps {
  title: string;
  icon: React.ReactNode;
  games: Array<{
    id: string;
    title: string;
    image: string;
    provider: string;
    isLive?: boolean;
    badge?: string;
  }>;
  viewAllLink: string;
  badgeType?: 'ranking' | 'resume' | 'crypto' | 'buy' | 'jackpot' | 'live';
  layout?: 'scroll' | 'grid';
  showArrows?: boolean;
}

const GameSection: React.FC<GameSectionProps> = ({ 
  title, 
  icon, 
  games, 
  viewAllLink, 
  badgeType,
  layout = 'scroll',
  showArrows = true
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  if (layout === 'grid') {
    return (
      <section className="py-0 bg-black">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
              {icon}
              {title}
            </h2>
            <Link to={viewAllLink} className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                badgeType={badgeType}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-1 bg-black">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center">
            {icon}
            {title}
          </h2>
          <Link to={viewAllLink} className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
            View All →
          </Link>
        </div>
        
        <div className="relative">
          {showArrows && (
            <>
              <button 
                onClick={scrollLeft}
                className="hidden md:inline-flex absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={scrollRight}
                className="hidden md:inline-flex absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto pb-4 scrollbar-hide" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none', 
              WebkitOverflowScrolling: 'touch', 
              scrollBehavior: 'smooth' 
            }}
          >
            {games.map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                badgeType={badgeType}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;