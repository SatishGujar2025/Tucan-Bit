import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Star, Zap, Clock, DollarSign } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import NotFoundPage from './NotFoundPage';
import { findGameById, getSimilarGames } from '../utils/gameUtils';

const GameDetailPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  // Find the game using the utility function
  const game = gameId ? findGameById(gameId) : undefined;

  // If game is not found, show NotFoundPage
  if (!game) {
    return <NotFoundPage />;
  }

  // Get similar games
  const similarGames = getSimilarGames(gameId!, 3);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="p-6">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Game Content */}
      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Image and Info */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-96 object-cover"
              />
              {game.isLive && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  LIVE
                </div>
              )}
              {game.badge && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  {game.badge}
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
              <p className="text-gray-300 mb-6">
                Experience the thrill of {game.title} by {game.provider}. 
                {game.isLive ? ' Join the live action with real dealers and players from around the world.' : ' Enjoy stunning graphics and exciting gameplay.'}
              </p>

              {/* Game Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-yellow-400 mb-2">
                    <Star className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-sm text-gray-300">Rating</div>
                  <div className="text-lg font-bold">4.8/5</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-green-400 mb-2">
                    <Zap className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-sm text-gray-300">RTP</div>
                  <div className="text-lg font-bold">96.5%</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-blue-400 mb-2">
                    <Clock className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-sm text-gray-300">Volatility</div>
                  <div className="text-lg font-bold">High</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-purple-400 mb-2">
                    <DollarSign className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-sm text-gray-300">Max Win</div>
                  <div className="text-lg font-bold">x5000</div>
                </div>
              </div>

              {/* Play Button */}
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
                <Play className="w-4 h-4" />
                <span>Play Now</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Info Card */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Game Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Provider:</span>
                  <span className="font-semibold">{game.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Type:</span>
                  <span className="font-semibold">{game.isLive ? 'Live Casino' : 'Slot Game'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className={`font-semibold ${game.isLive ? 'text-green-400' : 'text-blue-400'}`}>
                    {game.isLive ? 'Live' : 'Available'}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Games */}
            {similarGames.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Similar Games</h3>
                <div className="space-y-3">
                  {similarGames.map(similarGame => (
                    <Link
                      key={similarGame.id}
                      to={`/game/${similarGame.id}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <img
                        src={similarGame.image}
                        alt={similarGame.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{similarGame.title}</div>
                        <div className="text-xs text-gray-400">{similarGame.provider}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage; 