import React from 'react';
import { Video, Users, Clock, Star } from 'lucide-react';
import SearchBar from '../../components/ui/SearchBar';
import GameSection from '../../components/ui/GameSection';
import { gameData } from '../../components/ui/data/games';

const LiveCasinoPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900">
      {/* Enhanced Header for Live Casino */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Live Casino</h1>
            <p className="text-gray-400">Experience the thrill of real-time gaming with live dealers</p>
          </div>
        </div>
        
        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live Now</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">24/7</p>
            <p className="text-gray-400 text-xs">Always Available</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Active Players</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">1,247</p>
            <p className="text-gray-400 text-xs">Online Now</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Next Game</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">00:15</p>
            <p className="text-gray-400 text-xs">Crazy Time</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Top Provider</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">Evolution</p>
            <p className="text-gray-400 text-xs">Gaming</p>
          </div>
        </div>
      </div>

      <SearchBar />
      
      <div className="mt-8 space-y-8">
        {/* Featured Live Games */}
        <GameSection 
          title="Featured Live Games" 
          games={gameData.liveCasino}
          showViewAll={true}
        />
        
        {/* Live Table Games */}
        <GameSection 
          title="Live Table Games" 
          games={gameData.liveTableGames}
          showViewAll={true}
        />

        {/* Live Game Shows */}
        <GameSection 
          title="Live Game Shows" 
          games={gameData.liveGameShows}
          showViewAll={true}
        />

        {/* Popular Live Games */}
        <GameSection 
          title="Most Popular Live Games" 
          games={gameData.liveCasino.slice(0, 6)}
          showViewAll={false}
        />

        {/* New Live Games */}
        <GameSection 
          title="New Live Games" 
          games={gameData.liveTableGames.slice(0, 6)}
          showViewAll={false}
        />

        {/* High Stakes Live */}
        <GameSection 
          title="High Stakes Live Tables" 
          games={gameData.liveGameShows.slice(0, 6)}
          showViewAll={false}
        />
      </div>

      {/* Live Casino Features */}
      <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Why Choose Live Casino?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real Dealers</h3>
            <p className="text-gray-400 text-sm">Play with professional live dealers in real-time HD streaming</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">24/7 Availability</h3>
            <p className="text-gray-400 text-sm">Games available around the clock with multiple tables</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Premium Experience</h3>
            <p className="text-gray-400 text-sm">High-quality streaming with multiple camera angles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCasinoPage; 