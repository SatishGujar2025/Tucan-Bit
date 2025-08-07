import React, { useEffect } from 'react';
import { X, Flame, Sparkles, Crown, Heart, Gift, Star, Zap, Trophy, Coins, Diamond, CheckCircle, Clock, Users } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import sidebarPromo from '../../assets/sidebar_promo.png';

interface PromotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  adType?: string;
}

const PromotionalModal: React.FC<PromotionalModalProps> = ({ isOpen, onClose, adType = 'tournament' }) => {
  const { isAuthenticated, openModal, setShowPromoModal } = useAppContext();

  // Add/remove modal-open class to body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaimNow = () => {
    if (!isAuthenticated) {
      openModal('login');
      onClose();
    } else {
      showSuccessMessage();
      onClose();
    }
  };

  const handleMaybeLater = () => {
    showInfoMessage();
    onClose();
  };

  const showSuccessMessage = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-[9999] transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <div class="font-semibold">🎉 Bonus Claimed!</div>
          <div class="text-sm opacity-90">Check your account</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const showInfoMessage = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg z-[9999] transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <div class="font-semibold">💡 No worries!</div>
          <div class="text-sm opacity-90">Claim anytime from promotions</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const getPromotionData = () => {
    switch (adType) {
      case 'tournament':
        return {
          title: '🔥 TOURNAMENT BONUS 🔥',
          subtitle: 'Tournament Entry Package',
          description: 'Get exclusive tournament bonuses and free entries!',
          icon: <Trophy className="w-6 h-6 text-yellow-400" />,
          benefits: [
            { text: 'Free Tournament Entry', value: 'FREE' },
            { text: '200% Bonus on Entry', value: '200%' },
            { text: 'VIP Tournament Access', value: 'UNLOCKED' }
          ],
          timeLimit: '24 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'welcome':
        return {
          title: '🎉 WELCOME BONUS 🎉',
          subtitle: 'New Player Package',
          description: 'Start your journey with amazing welcome rewards!',
          icon: <Gift className="w-6 h-6 text-yellow-400" />,
          benefits: [
            { text: '100% Welcome Bonus', value: '100%' },
            { text: 'Free Spins Package', value: '50 SPINS' },
            { text: 'No Deposit Bonus', value: 'FREE' }
          ],
          timeLimit: '7 days',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'deposit':
        return {
          title: '💰 DEPOSIT BONUS 💰',
          subtitle: 'Deposit Bonus Package',
          description: 'Get rewarded for every deposit you make!',
          icon: <Coins className="w-6 h-6 text-yellow-400" />,
          benefits: [
            { text: '50% Deposit Bonus', value: '50%' },
            { text: 'Cashback Rewards', value: '10%' },
            { text: 'Free Spins', value: '25 SPINS' }
          ],
          timeLimit: '48 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'vip':
        return {
          title: '👑 VIP ACCESS 👑',
          subtitle: 'VIP Membership Package',
          description: 'Unlock exclusive VIP benefits and rewards!',
          icon: <Crown className="w-6 h-6 text-yellow-400" />,
          benefits: [
            { text: 'VIP Status Upgrade', value: 'GOLD' },
            { text: 'Exclusive Bonuses', value: 'VIP ONLY' },
            { text: 'Personal Manager', value: 'ASSIGNED' }
          ],
          timeLimit: '30 days',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'jackpot':
        return {
          title: '🎰 JACKPOT ALERT 🎰',
          subtitle: 'Jackpot Bonus Package',
          description: 'Win massive jackpots with special bonuses!',
          icon: <Diamond className="w-6 h-6 text-yellow-400" />,
          benefits: [
            { text: 'Jackpot Multiplier', value: '5X' },
            { text: 'Free Jackpot Spins', value: '100 SPINS' },
            { text: 'Progressive Bonus', value: 'ACTIVE' }
          ],
          timeLimit: '12 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      default:
        return {
          title: '🎁 SPECIAL OFFER 🎁',
          subtitle: 'Limited Time Package',
          description: 'Don\'t miss this exclusive opportunity!',
          icon: <Star className="w-6 h-6 text-yellow-400" />,
          benefits: [
            { text: 'Special Bonus', value: '150%' },
            { text: 'Free Spins', value: '75 SPINS' },
            { text: 'VIP Access', value: 'UNLOCKED' }
          ],
          timeLimit: '24 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
    }
  };

  const promotionData = getPromotionData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`relative bg-gradient-to-br ${promotionData.bgGradient} rounded-2xl p-4 max-w-md w-full mx-4 border border-gray-600/30 shadow-2xl overflow-hidden`}>
        {/* Close button - Mobile responsive */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors z-10 bg-black/40 rounded-full p-2 hover:bg-black/60"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center relative">
          {/* Promotional Image - Reduced height */}
          <div className="relative mb-4">
            <div className="w-full h-32 rounded-xl overflow-hidden border border-gray-600/30">
              <img 
                src={sidebarPromo} 
                alt="Promotion" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            {/* Icon overlay */}
            <div className="absolute top-2 left-2 bg-black/40 rounded-full p-2 backdrop-blur-sm">
              {promotionData.icon}
            </div>
            
            {/* Time limit badge */}
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{promotionData.timeLimit}</span>
            </div>
          </div>

          {/* Title and Description - Simplified */}
          <h2 className="text-xl font-bold text-white mb-2">
            {promotionData.title}
          </h2>
          
          <div className="bg-white/10 rounded-xl p-3 mb-4 border border-white/20">
            <h3 className="text-white text-base font-semibold mb-1">
              {promotionData.subtitle}
            </h3>
            <p className="text-gray-200 text-sm">
              {promotionData.description}
            </p>
          </div>
          
          {/* Benefits - Compact */}
          <div className="space-y-2 mb-4">
            {promotionData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-between text-white bg-white/10 p-3 rounded-xl border border-white/20">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-sm">{benefit.text}</span>
                </span>
                <span className="font-bold text-base text-yellow-400">
                  {benefit.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Limited time offer - Compact */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-3 rounded-xl mb-4 border border-red-500/30">
            <p className="text-white font-bold text-sm mb-1">
              ⏰ LIMITED TIME OFFER
            </p>
            <p className="text-white/90 text-xs">
              Only available for {promotionData.timeLimit}!
            </p>
          </div>
          
          {/* Action Buttons - Mobile responsive */}
          <div className="flex gap-2">
            <button
              onClick={handleClaimNow}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-xl font-bold hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-green-500/30 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Claim Now!</span>
            </button>
            <button
              onClick={handleMaybeLater}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-500/30 flex items-center justify-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm">Later</span>
            </button>
          </div>
          
          <p className="text-gray-300 text-xs mt-3">
            *Terms and conditions apply
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionalModal;