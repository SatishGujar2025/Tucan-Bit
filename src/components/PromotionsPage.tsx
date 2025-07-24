import React, { useState } from 'react';
import { ArrowLeft, Gift, Clock, Star, Trophy, Zap, Crown, Copy, Check, Calendar, Users, Target, Award } from 'lucide-react';

interface PromotionsPageProps {
  onBack: () => void;
}

const PromotionsPage: React.FC<PromotionsPageProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const promotions = [
    {
      id: 1,
      title: 'Welcome Bonus',
      subtitle: 'New Player Special',
      description: 'Get 100% match on your first deposit up to 5 BTC plus 100 free spins on our most popular slots',
      image: 'https://cdn.midjourney.com/0ac3937e-6f1e-438c-b549-124318dd6b3f/0_2.png',
      bonus: '100% Match + 100 Spins',
      code: 'WELCOME100',
      category: 'welcome',
      featured: true,
      timeLeft: '6 days',
      requirements: ['Minimum deposit: 0.01 BTC', 'Wagering requirement: 35x', 'Valid for 30 days'],
      maxBonus: '5 BTC',
      games: 'All slots'
    },
    {
      id: 2,
      title: 'Daily Cashback',
      subtitle: 'Every Day Rewards',
      description: 'Earn 10% cashback on all losses every day. No wagering requirements, instant credit to your account',
      image: 'https://iili.io/FwUxYcN.png',
      bonus: '10% Daily Cashback',
      code: 'DAILY10',
      category: 'daily',
      featured: true,
      timeLeft: 'Ongoing',
      requirements: ['Minimum loss: 0.001 BTC', 'No wagering requirements', 'Credited within 24 hours'],
      maxBonus: '1 BTC per day',
      games: 'All games'
    },
    {
      id: 3,
      title: 'VIP Rewards Program',
      subtitle: 'Exclusive Benefits',
      description: 'Join our VIP program for exclusive bonuses, faster withdrawals, and personal account manager',
      image: 'https://cdn.midjourney.com/54d71f3e-7598-4f36-a850-d7dd929d5e7c/0_3.png',
      bonus: 'Up to 25% Cashback',
      code: 'VIPCLUB',
      category: 'vip',
      featured: true,
      timeLeft: 'Invitation Only',
      requirements: ['Minimum monthly volume: 10 BTC', 'Invitation required', 'Exclusive benefits'],
      maxBonus: 'No limit',
      games: 'All games + Live casino'
    },
    {
      id: 4,
      title: 'Weekend Reload',
      subtitle: 'Weekend Special',
      description: 'Get 50% bonus on deposits made during weekends. Perfect for weekend gaming sessions',
      image: 'https://cdn.midjourney.com/0ac3937e-6f1e-438c-b549-124318dd6b3f/0_2.png',
      bonus: '50% Weekend Bonus',
      code: 'WEEKEND50',
      category: 'reload',
      featured: false,
      timeLeft: '2 days',
      requirements: ['Available Fri-Sun', 'Minimum deposit: 0.005 BTC', 'Wagering: 30x'],
      maxBonus: '2 BTC',
      games: 'Slots & Live games'
    },
    {
      id: 5,
      title: 'High Roller Bonus',
      subtitle: 'For Big Players',
      description: 'Exclusive bonus for high rollers. Deposit 1 BTC or more and get 25% bonus with VIP treatment',
      image: 'https://cdn.midjourney.com/54d71f3e-7598-4f36-a850-d7dd929d5e7c/0_3.png',
      bonus: '25% High Roller',
      code: 'HIGHROLLER',
      category: 'highroller',
      featured: false,
      timeLeft: 'Ongoing',
      requirements: ['Minimum deposit: 1 BTC', 'VIP status required', 'Wagering: 25x'],
      maxBonus: '10 BTC',
      games: 'All games'
    },
    {
      id: 6,
      title: 'Free Spins Friday',
      subtitle: 'Weekly Spins',
      description: 'Every Friday get 50 free spins on featured slot games. No deposit required for existing players',
      image: 'https://iili.io/FwUxYcN.png',
      bonus: '50 Free Spins',
      code: 'FRIDAY50',
      category: 'freespins',
      featured: false,
      timeLeft: '5 days',
      requirements: ['Active account required', 'Available every Friday', 'Wagering: 40x winnings'],
      maxBonus: 'No cash limit',
      games: 'Featured slots only'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Promotions', icon: Gift },
    { id: 'welcome', name: 'Welcome', icon: Star },
    { id: 'daily', name: 'Daily', icon: Clock },
    { id: 'vip', name: 'VIP', icon: Crown },
    { id: 'reload', name: 'Reload', icon: Zap },
    { id: 'freespins', name: 'Free Spins', icon: Target }
  ];

  const filteredPromotions = activeTab === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.category === activeTab);

  const featuredPromotions = promotions.filter(promo => promo.featured);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Exclusive <span className="bg-gradient-to-r from-[#F25287] to-[#36CFC9] bg-clip-text text-transparent">Promotions</span>
            </h1>
            <p className="text-xl text-gray-300">Boost your gaming with our amazing bonuses and rewards</p>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Featured Promotions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Crown className="w-7 h-7 text-yellow-400 mr-3" />
            Featured Promotions
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredPromotions.map((promo) => (
              <div
                key={promo.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>FEATURED</span>
                </div>
                
                <div className="aspect-[3/2] relative overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{promo.title}</h3>
                    <p className="text-yellow-400 font-semibold">{promo.subtitle}</p>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{promo.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg px-3 py-2">
                      <span className="text-yellow-400 font-bold text-lg">{promo.bonus}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Time Left</div>
                      <div className="text-sm font-semibold text-white">{promo.timeLeft}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-black/30 rounded-lg px-3 py-2 font-mono text-sm text-center">
                      <span className="text-yellow-400">{promo.code}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(promo.code)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap ${
                    activeTab === category.id
                      ? 'bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white'
                      : 'bg-black/20 text-gray-300 hover:bg-[#3C1A4F]/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All Promotions Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredPromotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-gradient-to-br from-[#3C1A4F]/30 to-[#36CFC9]/30 backdrop-blur-sm border border-[#3C1A4F]/20 rounded-2xl overflow-hidden hover:border-[#3C1A4F]/40 transition-all duration-300"
            >
              <div className="flex">
                <div className="w-1/3 relative">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{promo.title}</h3>
                      <p className="text-[#F25287] font-semibold text-sm">{promo.subtitle}</p>
                    </div>
                    {promo.featured && (
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        FEATURED
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{promo.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Bonus</div>
                      <div className="text-[#36CFC9] font-semibold text-sm">{promo.bonus}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Max Bonus</div>
                      <div className="text-[#7ED957] font-semibold text-sm">{promo.maxBonus}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Time Left</div>
                      <div className="text-white font-semibold text-sm">{promo.timeLeft}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Games</div>
                      <div className="text-white font-semibold text-sm">{promo.games}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-black/30 rounded-lg px-3 py-2 font-mono text-sm text-center">
                      <span className="text-[#F25287]">{promo.code}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(promo.code)}
                      className="bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white px-3 py-2 rounded-lg font-semibold hover:from-[#3C1A4F]/80 hover:to-[#36CFC9]/80 transition-all duration-200 flex items-center space-x-1"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Requirements */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-xs text-gray-400 mb-2">Requirements:</div>
                    <ul className="space-y-1">
                      {promo.requirements.map((req, index) => (
                        <li key={index} className="text-xs text-gray-300 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-[#36CFC9] rounded-full"></div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotion Stats */}

        {/* Terms Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Award className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Important Information</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                All promotions are subject to terms and conditions. Wagering requirements apply to bonus funds. 
                Players must be 18+ and verify their account. Responsible gaming limits apply. 
                TucanBit reserves the right to modify or cancel promotions at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PromotionsPage;