import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gift, Star, Clock, Crown, Zap, Target, Copy, Check, Award
} from 'lucide-react';

const PromotionsPage: React.FC = () => {
  // State specific to this page's functionality
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // All wallet and sidebar state has been removed.

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const promotions = [
    { id: 1, title: 'Welcome Bonus', subtitle: 'New Player Special', description: 'Get 100% match on your first deposit up to 5 BTC plus 100 free spins on our most popular slots', image: 'https://cdn.midjourney.com/0ac3937e-6f1e-438c-b549-124318dd6b3f/0_2.png', bonus: '100% Match + 100 Spins', code: 'WELCOME100', category: 'welcome', featured: true, timeLeft: '6 days', requirements: ['Minimum deposit: 0.01 BTC', 'Wagering requirement: 35x'], maxBonus: '5 BTC', games: 'All slots' },
    { id: 2, title: 'Daily Cashback', subtitle: 'Every Day Rewards', description: 'Earn 10% cashback on all losses every day. No wagering requirements, instant credit.', image: 'https://iili.io/FwUxYcN.png', bonus: '10% Daily Cashback', code: 'DAILY10', category: 'daily', featured: true, timeLeft: 'Ongoing', requirements: ['Minimum loss: 0.001 BTC', 'No wagering'], maxBonus: '1 BTC per day', games: 'All games' },
    { id: 3, title: 'VIP Rewards Program', subtitle: 'Exclusive Benefits', description: 'Join our VIP program for exclusive bonuses, faster withdrawals, and personal account manager.', image: 'https://cdn.midjourney.com/54d71f3e-7598-4f36-a850-d7dd929d5e7c/0_3.png', bonus: 'Up to 25% Cashback', code: 'VIPCLUB', category: 'vip', featured: true, timeLeft: 'Invitation Only', requirements: ['Invitation required', 'Exclusive benefits'], maxBonus: 'No limit', games: 'All games' },
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
    <div className="p-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[40vh] min-h-[300px] flex items-center mb-12">
          <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Exclusive <span className="bg-gradient-to-r from-[#F25287] to-[#36CFC9] bg-clip-text text-transparent">Promotions</span>
            </h1>
            <p className="text-xl text-gray-300">Boost your gaming with our amazing bonuses and rewards</p>
          </div>
        </section>

        {/* Featured Promotions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Crown className="w-7 h-7 text-yellow-400 mr-3" />
            Featured Promotions
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredPromotions.map((promo) => (
              <div key={promo.id} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/30">
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>FEATURED</span>
                </div>
                <div className="aspect-[3/2] relative overflow-hidden">
                  <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{promo.title}</h3>
                  <p className="text-yellow-400 font-semibold mb-4">{promo.subtitle}</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-black/30 rounded-lg px-3 py-2 font-mono text-sm text-center">
                      <span className="text-yellow-400">{promo.code}</span>
                    </div>
                    <button onClick={() => copyToClipboard(promo.code)} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
                      {copiedCode === promo.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode === promo.code ? 'Copied!' : 'Copy'}</span>
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
            {categories.map((category) => (
              <button key={category.id} onClick={() => setActiveTab(category.id)} className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === category.id ? 'bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white' : 'bg-black/20 text-gray-300 hover:bg-[#3C1A4F]/20'}`}>
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All Promotions Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredPromotions.map((promo) => (
            <div key={promo.id} className="bg-gradient-to-br from-[#3C1A4F]/30 to-[#36CFC9]/30 border border-[#3C1A4F]/20 rounded-2xl overflow-hidden">
              <div className="flex">
                <div className="w-1/3 relative"><img src={promo.image} alt={promo.title} className="w-full h-full object-cover" /></div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{promo.title}</h3>
                  <p className="text-[#F25287] font-semibold text-sm mb-3">{promo.subtitle}</p>
                  <p className="text-gray-300 text-sm mb-4">{promo.description}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <ul className="space-y-1">
                      {promo.requirements.map((req, index) => (
                        <li key={index} className="text-xs text-gray-300 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-[#36CFC9] rounded-full"></div><span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Award className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Important Information</h3>
              <p className="text-gray-300 text-sm">
                All promotions are subject to terms and conditions. Wagering requirements apply. Please play responsibly.
              </p>
            </div>
          </div>
        </div>

        <style>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
      </div>
    </div>
  );
};

export default PromotionsPage;