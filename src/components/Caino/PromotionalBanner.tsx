import React from 'react';
import { Zap, Users, Award } from 'lucide-react';
import gameImage9 from '../../assets/g22.jpg';
import gameImage2 from '../../assets/g19.jpg';
import gameImage3 from '../../assets/g12.jpg';


const PromotionalBanners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
      {/* Spin Wars Banner */}
      <div className="p-6 rounded-2xl relative overflow-hidden "  style={{ backgroundImage: `url(${gameImage9})` }}>
        <div className="relative z-10">
          <div className="text-xs text-orange-200 mb-2 font-semibold uppercase tracking-wider">
            Whale Tournament
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">SPIN WARS</h3>
          <div className="text-3xl font-bold text-white mb-2">$30,000</div>
          <div className="text-sm text-orange-100 mb-4">
            Same Battle.<br />
            New Games.
          </div>
        </div>
        
        {/* Decorative slot machine */}
        <div className="absolute -right-4 -top-4 opacity-20">
          <div className="w-32 h-32 bg-red-800 rounded-lg transform rotate-12">
            <div className="flex items-center justify-center h-full">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-yellow-400 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* VOL 5 Badge */}
        <div className="absolute top-4 right-4 bg-red-700 text-white px-3 py-1 rounded-full text-sm font-bold">
          VOL 5
        </div>
      </div>

      {/* Break Live88 Banner */}
      <div className=" p-6 rounded-2xl relative overflow-hidden" style={{ backgroundImage: `url(${gameImage2})` }}>
        <div className="relative z-10">
          <div className="text-xs text-gray-300 mb-2 font-semibold uppercase tracking-wider">
            Whale Tournament
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Break Live88</h3>
          <div className="text-3xl font-bold text-white mb-2">$20,000</div>
          <div className="text-sm text-gray-300 mb-4">
            Bet on Live88 tables. Break<br />
            the house. Win the bag.
          </div>
          
          {/* Live88 Badge */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>live88</span>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute right-0 top-0 w-full h-full opacity-10">
          <Users className="w-32 h-32 absolute top-4 right-4" />
        </div>
      </div>

      {/* Hacksaw Gaming Banner */}
      <div className="p-6 rounded-2xl relative overflow-hidden" style={{ backgroundImage: `url(${gameImage3})` }}>
        <div className="relative z-10">
          <div className="text-xs text-orange-200 mb-2 font-semibold uppercase tracking-wider">
            Provider of the Month
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">HACKSAW</h3>
          <h3 className="text-2xl font-bold text-white mb-4">GAMING</h3>
          <div className="text-sm text-orange-100">
            Too Volatile For<br />
            Amateurs!
          </div>
        </div>
        
        {/* Decorative character */}
        <div className="absolute -right-6 -bottom-6 opacity-30">
          <div className="w-32 h-32 bg-orange-800 rounded-full flex items-center justify-center">
            <Award className="w-16 h-16 text-orange-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanners;