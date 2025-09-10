import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Award } from 'lucide-react';
import gameImage9 from '../../assets/g22.jpg';
import gameImage2 from '../../assets/g19.jpg';
import gameImage3 from '../../assets/g12.jpg';

const PromotionalBanners = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
      {/* Spin Wars Banner */}
      <div 
        className="h-64 rounded-2xl relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"  
        onClick={() => navigate('/promotions?category=tournament&promo=spin-wars')}
      >
        <img 
          src={gameImage9} 
          alt="Spin Wars promotion" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Changed z-10 to z-20 to bring text to the very front */}
        <div className="relative z-20 h-full p-6 flex flex-col justify-center">
          <div className="text-xs text-orange-200 mb-2 font-semibold uppercase tracking-wider">
            TucanBit Tournament
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">SPIN WARS</h3>
          <div className="text-3xl font-bold text-white mb-2">$30,000</div>
          <div className="text-sm text-orange-100 mb-4">
            Same Battle.<br />
            New Games.
          </div>
        </div>
        
        {/* This large decorative element stays on a lower layer */}
        <div className="absolute -right-4 -top-4 opacity-20 z-10">
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
        
        {/* This badge is important, so it comes to the front with the text */}
        <div className="absolute top-4 right-4 bg-red-700 text-white px-3 py-1 rounded-full text-sm font-bold z-20">
          VOL 5
        </div>
      </div>

      {/* Break Live88 Banner */}
      <div 
        className="h-64 rounded-2xl relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform" 
        onClick={() => navigate('/promotions?category=tournament&promo=tucanbit-tournament')}
      >
        <img 
          src={gameImage2} 
          alt="Break Live88 promotion" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 h-full p-6 flex flex-col justify-center">
          <div className="text-xs text-gray-300 mb-2 font-semibold uppercase tracking-wider">
            TucanBIT Tournament
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Break Live88</h3>
          <div className="text-3xl font-bold text-white mb-2">$20,000</div>
          <div className="text-sm text-gray-300 mb-4">
            Bet on Live88 tables. Break<br />
            the house. Win the bag.
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>live88</span>
            </div>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 w-full h-full opacity-10 z-10">
          <Users className="w-32 h-32 absolute top-4 right-4 text-white" />
        </div>
      </div>

      {/* Hacksaw Gaming Banner */}
      <div 
        className="h-64 rounded-2xl relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform" 
        onClick={() => navigate('/promotions?category=tournament&promo=hacksaw')}
      >
        <img 
          src={gameImage3} 
          alt="Hacksaw Gaming promotion" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 h-full p-6 flex flex-col justify-center">
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
        
        <div className="absolute -right-6 -bottom-6 opacity-30 z-10">
          <div className="w-32 h-32 bg-orange-800 rounded-full flex items-center justify-center">
            <Award className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanners;