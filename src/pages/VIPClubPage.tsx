import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Star, Gift, Clock, Users, Trophy, Diamond, Zap, Shield, Percent, Award } from 'lucide-react';

const VIPClubPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState('bronze');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const vipTiers = [
    {
      id: 'bronze',
      name: 'Bronze',
      icon: '🥉',
      color: 'from-orange-600 to-orange-800',
      borderColor: 'border-orange-500',
      requirements: 'Deposit $100+',
      benefits: [
        '5% Cashback on losses',
        'Faster withdrawal processing',
        'Priority customer support',
        'Exclusive monthly bonuses',
        'Access to VIP chat'
      ],
      monthlyBonus: '$50',
      cashbackRate: '5%',
      withdrawalTime: '2-4 hours'
    },
    {
      id: 'silver',
      name: 'Silver',
      icon: '🥈',
      color: 'from-gray-400 to-gray-600',
      borderColor: 'border-gray-400',
      requirements: 'Deposit $500+',
      benefits: [
        '10% Cashback on losses',
        'Personal account manager',
        'Exclusive game access',
        'Higher betting limits',
        'VIP tournaments access',
        'Birthday bonus'
      ],
      monthlyBonus: '$200',
      cashbackRate: '10%',
      withdrawalTime: '1-2 hours'
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: '🥇',
      color: 'from-yellow-500 to-yellow-700',
      borderColor: 'border-yellow-500',
      requirements: 'Deposit $1,000+',
      benefits: [
        '15% Cashback on losses',
        'Dedicated VIP manager',
        'Exclusive live events',
        'Custom betting limits',
        'Free spins monthly',
        'Luxury gifts',
        'Invitation to VIP parties'
      ],
      monthlyBonus: '$500',
      cashbackRate: '15%',
      withdrawalTime: '30 minutes'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      icon: '💎',
      color: 'from-purple-500 to-purple-700',
      borderColor: 'border-purple-500',
      requirements: 'Deposit $5,000+',
      benefits: [
        '20% Cashback on losses',
        '24/7 personal concierge',
        'Exclusive game development input',
        'Unlimited betting limits',
        'Private jet experiences',
        'Luxury vacations',
        'Meet & greet with celebrities'
      ],
      monthlyBonus: '$2,000',
      cashbackRate: '20%',
      withdrawalTime: 'Instant'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      icon: '💎',
      color: 'from-blue-500 to-blue-700',
      borderColor: 'border-blue-500',
      requirements: 'Invitation Only',
      benefits: [
        '25% Cashback on losses',
        'Personal gaming suite',
        'Custom game development',
        'Private island access',
        'Luxury car collection',
        'Exclusive crypto insights',
        'Partnership opportunities'
      ],
      monthlyBonus: '$10,000',
      cashbackRate: '25%',
      withdrawalTime: 'Instant'
    }
  ];

  const currentTier = vipTiers.find(tier => tier.id === selectedTier);

  const exclusiveGames = [
    { name: 'VIP Blackjack Pro', provider: 'Evolution Gaming', minBet: '$50', maxBet: '$50,000' },
    { name: 'High Stakes Roulette', provider: 'Pragmatic Play', minBet: '$25', maxBet: '$25,000' },
    { name: 'Diamond Slots', provider: 'NetEnt', minBet: '$10', maxBet: '$10,000' },
    { name: 'VIP Baccarat Elite', provider: 'Microgaming', minBet: '$100', maxBet: '$100,000' }
  ];

  const vipEvents = [
    { name: 'VIP Tournament Series', date: 'Monthly', prize: '$100,000', status: 'Active' },
    { name: 'Luxury Casino Night', date: 'Quarterly', prize: 'Luxury Prizes', status: 'Upcoming' },
    { name: 'Crypto Trading Masterclass', date: 'Bi-monthly', prize: 'Exclusive Access', status: 'Active' },
    { name: 'Celebrity Poker Night', date: 'Annually', prize: 'Meet & Greet', status: 'Upcoming' }
  ];

  return (
    <div className="p-6 bg-gray-900">
      <div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Hero Section */}
        <section className="relative overflow-hidden h-[40vh] min-h-[300px] flex items-center mb-12">
          <div className="absolute inset-0 bg-[url('https://cdn.midjourney.com/54d71f3e-7598-4f36-a850-d7dd929d5e7c/0_3.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">VIP Club</span> Elite
            </h1>
            <p className="text-xl text-gray-300">Exclusive benefits and luxury experiences for our most valued players</p>
          </div>
        </section>

        {/* VIP Tiers */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">VIP Tiers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vipTiers.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`bg-gray-800 rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                  selectedTier === tier.id ? tier.borderColor : 'border-gray-700'
                } hover:border-yellow-500/50`}
              >
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center text-2xl`}>
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-gray-400 text-sm">{tier.requirements}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Monthly Bonus:</span>
                    <span className="text-yellow-400 font-bold">{tier.monthlyBonus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Cashback:</span>
                    <span className="text-green-400 font-bold">{tier.cashbackRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Withdrawal:</span>
                    <span className="text-blue-400 font-bold">{tier.withdrawalTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Tier Details */}
        {currentTier && (
          <section className="mb-12">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentTier.color} flex items-center justify-center text-xl mr-4`}>
                  {currentTier.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentTier.name} Tier Benefits</h3>
                  <p className="text-gray-400">Unlock exclusive privileges and rewards</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Gift className="w-5 h-5 text-yellow-400 mr-2" />
                    Exclusive Benefits
                  </h4>
                  <ul className="space-y-2">
                    {currentTier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                    Tier Statistics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-gray-300">Monthly Bonus</span>
                      <span className="text-yellow-400 font-bold">{currentTier.monthlyBonus}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-gray-300">Cashback Rate</span>
                      <span className="text-green-400 font-bold">{currentTier.cashbackRate}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-gray-300">Withdrawal Time</span>
                      <span className="text-blue-400 font-bold">{currentTier.withdrawalTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Exclusive Games */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Exclusive VIP Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exclusiveGames.map((game, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{game.name}</h3>
                  <p className="text-gray-400 text-sm">{game.provider}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Min Bet:</span>
                    <span className="text-green-400">{game.minBet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Bet:</span>
                    <span className="text-yellow-400">{game.maxBet}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                  Play Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* VIP Events */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Exclusive VIP Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {vipEvents.map((event, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{event.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{event.prize}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* VIP Application */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-8">
            <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Join the VIP Club?</h2>
            <p className="text-gray-300 mb-6">Start your journey to exclusive benefits and luxury experiences</p>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
              Apply for VIP Status
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VIPClubPage; 