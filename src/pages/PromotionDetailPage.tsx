import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Gift, Zap, Trophy, Clock, Star, Users, DollarSign } from 'lucide-react';
import h1 from '../assets/h1.jpg';
import h2 from '../assets/h2.jpg';
import h3 from '../assets/h3.jpg';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  type: 'welcome' | 'cashback' | 'tournament';
  requirements: string[];
  benefits: string[];
  endDate?: string;
  prizePool?: string;
  participants?: number;
}

const PromotionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const promotions: Record<string, Promotion> = {
    'welcome-gift': {
      id: 'welcome-gift',
      title: 'Welcome Gift',
      subtitle: 'FREE Lootbox',
      description: 'Start your gaming journey with a free lootbox! Unbox amazing rewards and kickstart your adventure with exclusive bonuses.',
      image: h1,
      type: 'welcome',
      requirements: [
        'New user registration',
        'Complete email verification',
        'Make your first deposit'
      ],
      benefits: [
        'Free lootbox worth $50',
        'Exclusive welcome bonus',
        'Instant rewards upon claim',
        'No wagering requirements'
      ]
    },
    'daily-cashback': {
      id: 'daily-cashback',
      title: 'Daily Rewards',
      subtitle: 'UP TO 20% CASHBACK',
      description: 'Get up to 20% cashback on your losses every day! No matter what happens, you always win with our daily cashback program.',
      image: h2,
      type: 'cashback',
      requirements: [
        'Minimum loss of $10',
        'Active account status',
        'Complete KYC verification'
      ],
      benefits: [
        'Up to 20% daily cashback',
        'No wagering requirements',
        'Instant credit to wallet',
        'Available on all games'
      ]
    },
    'whale-tournament': {
      id: 'whale-tournament',
      title: 'Whale Tournament',
      subtitle: 'Live Stakes $10K Prize Pool',
      description: 'Compete in our exclusive whale tournament with a massive $10,000 prize pool! Show your skills and grab the biggest rewards.',
      image: h3,
      type: 'tournament',
      requirements: [
        'Minimum buy-in of $100',
        'Tournament registration',
        'Active participation'
      ],
      benefits: [
        '$10,000 total prize pool',
        'Multiple prize tiers',
        'Live leaderboard tracking',
        'Exclusive tournament rewards'
      ],
      endDate: '2024-02-15',
      prizePool: '$10,000',
      participants: 150
    }
  };

  const promotion = promotions[id || 'welcome-gift'];

  if (!promotion) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Promotion Not Found</h1>
          <Link to="/" className="text-yellow-400 hover:text-yellow-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'welcome':
        return <Gift className="w-6 h-6" />;
      case 'cashback':
        return <Zap className="w-6 h-6" />;
      case 'tournament':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome':
        return 'from-orange-500 to-red-500';
      case 'cashback':
        return 'from-yellow-500 to-orange-500';
      case 'tournament':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(promotion.type)} rounded-lg flex items-center justify-center`}>
                {getTypeIcon(promotion.type)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{promotion.title}</h1>
                <p className="text-sm text-gray-400">{promotion.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={promotion.image} 
          alt={promotion.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {promotion.subtitle}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              {promotion.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Requirements */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Requirements</span>
              </h3>
              <ul className="space-y-3">
                {promotion.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-green-400" />
                <span>Benefits</span>
              </h3>
              <ul className="space-y-3">
                {promotion.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Quick Info</h3>
              <div className="space-y-4">
                {promotion.endDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">End Date:</span>
                    <span className="text-white font-semibold">{promotion.endDate}</span>
                  </div>
                )}
                {promotion.prizePool && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Prize Pool:</span>
                    <span className="text-green-400 font-bold">{promotion.prizePool}</span>
                  </div>
                )}
                {promotion.participants && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Participants:</span>
                    <span className="text-white font-semibold">{promotion.participants}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Ready to Start?</h3>
              <p className="text-yellow-100 mb-6">
                Don't miss out on this amazing opportunity!
              </p>
              <button className="w-full bg-white text-orange-500 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Claim Now
              </button>
            </div>

            {/* Related Promotions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Other Promotions</h3>
              <div className="space-y-3">
                {Object.values(promotions)
                  .filter(p => p.id !== promotion.id)
                  .slice(0, 2)
                  .map(promo => (
                    <Link 
                      key={promo.id}
                      to={`/promotion/${promo.id}`}
                      className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${getTypeColor(promo.type)} rounded-lg flex items-center justify-center`}>
                          {getTypeIcon(promo.type)}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{promo.title}</h4>
                          <p className="text-gray-400 text-sm">{promo.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailPage; 