import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Dice5, Trophy, Award, Coins, BarChart2, ChevronRight as ChevronRightIcon
} from 'lucide-react';

const SportsSidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800 ">
        <div className="flex items-center">
            <div>
                <span className="text-2xl font-bold text-white"><span className="text-[#36CFC9]">Tucan</span><span className="text-[#36CFC9]">Bit</span></span>
                <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
            </div>
        </div>
      </div>

      {/* Token Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🐋</span>
            <div>
              <p className="text-sm font-semibold text-white">Tucan Bit Token</p>
              <p className="text-xs text-gray-300">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* BattlePass Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-3">
          <h3 className="font-bold text-sm text-white mb-2">BATTLEPASS</h3>
          <p className="text-xs text-white mb-3">Get amazing rewards with Battlepass.</p>
          <button className="w-full bg-white text-orange-500 py-2 rounded text-sm font-semibold">
            Get BattlePass
          </button>
        </div>
      </div>

      {/* Streak Counter */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">Streak</span>
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-white">2</span>
            <ChevronRightIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <Link to="/" className="w-full flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-gray-800"><Home /><span>Home</span></Link>
        <Link to="/casino" className="w-full flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-gray-800"><Dice5 /><span>Casino</span></Link>
        <Link to="/sports" className="w-full flex items-center space-x-3 p-3 rounded-lg text-white bg-yellow-500/20"><Trophy /><span>Sportsbook</span></Link>
        {/* ... other nav items ... */}
      </nav>
    </div>
  );
};

export default SportsSidebar;