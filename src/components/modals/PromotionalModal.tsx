import React from 'react';
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

  if (!isOpen) return null;

  const handleClaimNow = () => {
    if (!isAuthenticated) {
      // If not authenticated, open login modal
      openModal('login');
      onClose();
    } else {
      // If authenticated, show success message and close
      showSuccessMessage();
      onClose();
    }
  };

  const handleMaybeLater = () => {
    showInfoMessage();
    onClose();
  };

  const showSuccessMessage = () => {
    // Create a professional success notification
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
          <div class="font-semibold">🎉 Bonus Claimed Successfully!</div>
          <div class="text-sm opacity-90">Check your account for the rewards</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  };

  const showInfoMessage = () => {
    // Create a professional info notification
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
          <div class="text-sm opacity-90">You can claim this bonus anytime from your promotions page</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  };

  const getPromotionData = () => {
    switch (adType) {
      case 'tournament':
        return {
          title: '🔥 TOURNAMENT BONUS 🔥',
          subtitle: 'Tournament Entry Package',
          description: 'Get exclusive tournament bonuses and free entries!',
          icon: <Trophy className="w-8 h-8 text-gray-300" />,
          benefits: [
            { text: 'Free Tournament Entry', value: 'FREE', color: 'brand' },
            { text: '200% Bonus on Entry', value: '200%', color: 'brand' },
            { text: 'VIP Tournament Access', value: 'UNLOCKED', color: 'brand' }
          ],
          timeLimit: '24 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'welcome':
        return {
          title: '🎉 WELCOME BONUS 🎉',
          subtitle: 'New Player Package',
          description: 'Start your journey with amazing welcome rewards!',
          icon: <Gift className="w-8 h-8 text-gray-300" />,
          benefits: [
            { text: '100% Welcome Bonus', value: '100%', color: 'brand' },
            { text: 'Free Spins Package', value: '50 SPINS', color: 'brand' },
            { text: 'No Deposit Bonus', value: 'FREE', color: 'brand' }
          ],
          timeLimit: '7 days',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'deposit':
        return {
          title: '💰 DEPOSIT BONUS 💰',
          subtitle: 'Deposit Bonus Package',
          description: 'Get rewarded for every deposit you make!',
          icon: <Coins className="w-8 h-8 text-gray-300" />,
          benefits: [
            { text: '50% Deposit Bonus', value: '50%', color: 'brand' },
            { text: 'Cashback Rewards', value: '10%', color: 'brand' },
            { text: 'Free Spins', value: '25 SPINS', color: 'brand' }
          ],
          timeLimit: '48 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'vip':
        return {
          title: '👑 VIP ACCESS 👑',
          subtitle: 'VIP Membership Package',
          description: 'Unlock exclusive VIP benefits and rewards!',
          icon: <Crown className="w-8 h-8 text-gray-300" />,
          benefits: [
            { text: 'VIP Status Upgrade', value: 'GOLD', color: 'brand' },
            { text: 'Exclusive Bonuses', value: 'VIP ONLY', color: 'brand' },
            { text: 'Personal Manager', value: 'ASSIGNED', color: 'brand' }
          ],
          timeLimit: '30 days',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      case 'jackpot':
        return {
          title: '🎰 JACKPOT ALERT 🎰',
          subtitle: 'Jackpot Bonus Package',
          description: 'Win massive jackpots with special bonuses!',
          icon: <Diamond className="w-8 h-8 text-gray-300" />,
          benefits: [
            { text: 'Jackpot Multiplier', value: '5X', color: 'brand' },
            { text: 'Free Jackpot Spins', value: '100 SPINS', color: 'brand' },
            { text: 'Progressive Bonus', value: 'ACTIVE', color: 'brand' }
          ],
          timeLimit: '12 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
      default:
        return {
          title: '🎁 SPECIAL OFFER 🎁',
          subtitle: 'Limited Time Package',
          description: 'Don\'t miss this exclusive opportunity!',
          icon: <Star className="w-8 h-8 text-gray-300" />,
          benefits: [
            { text: 'Special Bonus', value: '150%', color: 'brand' },
            { text: 'Free Spins', value: '75 SPINS', color: 'brand' },
            { text: 'VIP Access', value: 'UNLOCKED', color: 'brand' }
          ],
          timeLimit: '24 hours',
          bgGradient: 'from-gray-900 via-gray-800 to-gray-900'
        };
    }
  };

  const promotionData = getPromotionData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className={`relative bg-gradient-to-br ${promotionData.bgGradient} rounded-2xl p-6 max-w-lg w-full mx-4 border border-gray-600/30 shadow-2xl animate-scaleIn overflow-hidden`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 bg-black/20 rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center relative">
          {/* Promotional Image */}
          <div className="relative mb-6">
            <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-600/30">
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
            <div className="absolute top-4 left-4 bg-black/40 rounded-full p-3 backdrop-blur-sm">
              {promotionData.icon}
            </div>
            
            {/* Time limit badge */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{promotionData.timeLimit}</span>
            </div>
          </div>

          {/* Title and Description */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {promotionData.title}
          </h2>
          
          <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/20">
            <h3 className="text-white text-lg font-semibold mb-2">
              {promotionData.subtitle}
            </h3>
            <p className="text-gray-200 text-sm">
              {promotionData.description}
            </p>
          </div>
          
          {/* Benefits */}
          <div className="space-y-3 mb-6">
            {promotionData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-between text-white bg-white/10 p-4 rounded-xl border border-white/20 hover:scale-[1.02] transition-all duration-300">
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-600">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">{benefit.text}</span>
                </span>
                <span className="font-bold text-lg text-gray-300">
                  {benefit.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Limited time offer */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 rounded-xl mb-6 border border-gray-500/30">
            <p className="text-white font-bold text-lg mb-1">
              ⏰ LIMITED TIME OFFER
            </p>
            <p className="text-white/90 text-sm">
              Only available for {promotionData.timeLimit}!
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClaimNow}
              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 text-white py-4 px-6 rounded-xl font-bold hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-500/30 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Claim Now!</span>
            </button>
            <button
              onClick={handleMaybeLater}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-500/30 flex items-center justify-center space-x-2"
            >
              <Clock className="w-5 h-5" />
              <span>Maybe Later</span>
            </button>
          </div>
          
          <p className="text-gray-300 text-xs mt-4">
            *Terms and conditions apply. Bonus valid for eligible users only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionalModal; 