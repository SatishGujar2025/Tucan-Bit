import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, User, Gamepad2, ShieldCheck, Bitcoin, Gem, Star, Trophy, Gift, Crown, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllGames } from '../utils/gameUtils';
import { 
  SearchBar, 
  HeroBanner, 
  GameSection, 
  CashbackCountdown, 
  FeatureSection, 
  CallToAction, 
  PromotionalBanner 
} from '../components';
import bannerMiddlePage from '../assets/home-page-games/banner-middle-page1.jpeg';
import h1 from '../assets/tuckan new 21-02.jpg';
import h2 from '../assets/tuckan 1 (2).jpg';
import h3 from '../assets/hg.jpeg';
import trendingIcon from '../assets/home-page-games/icons8-trending-32.png';
import zeusImage from '../assets/zeus-image-removebg-preview.png';
import { useTranslationsGetQuery } from '../services/cms/__generated__/hooks';



const HomePage: React.FC = () => {
  const { openModal } = useAppContext();
  
  // Filter and search state
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the centralized game data
  const allGames = getAllGames();
  const featuredGames = allGames.slice(0, 24);

  // Translations
  const language = "en_US"
  const { data } = useTranslationsGetQuery({ language });
  console.log("Dictionary data");
  console.log(data);

  // Banner data
  const banners = [
    { id: '1', image: h1, alt: 'Welcome Gift Banner', link: '/promotion/welcome-gift' },
    { id: '2', image: h2, alt: 'Daily Rewards Banner', link: '/promotion/daily-cashback' },
    { id: '3', image: h3, alt: 'Whale Tournament Banner', link: '/promotion/whale-tournament' }
  ];

  // Feature data
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-black" />,
      title: "Provably Fair",
      description: "All our games use blockchain technology to ensure complete transparency and fairness in every outcome."
    },
    {
      icon: <Bitcoin className="w-6 h-6 text-black" />,
      title: "Instant Payouts",
      description: "Withdraw your winnings instantly to your crypto wallet with no delays or unnecessary verifications."
    },
    {
      icon: <Gem className="w-6 h-6 text-black" />,
      title: "Premium Selection",
      description: "Over 2,000 games from top providers including Pragmatic Play, Evolution, and NetEnt."
    }
  ];

  // CTA buttons data
  const ctaButtons = [
    { text: "Join Now", link: "/register", icon: <User className="w-5 h-5" />, variant: "primary" as const },
    { text: "Start Playing", link: "/casino", icon: <Play className="w-5 h-5" />, variant: "secondary" as const },
    { text: "View Leaderboards", link: "/leaderboards", icon: <Crown className="w-5 h-5" />, variant: "secondary" as const },
    { text: "View Achievements", link: "/achievements", icon: <Star className="w-5 h-5" />, variant: "secondary" as const }
  ];

  // Filter games based on current filter and search term
  const getFilteredGames = () => {
    let filtered = allGames;

    // Apply filter
    switch (currentFilter) {
      case 'jackpot':
        filtered = filtered.filter(game => game.badge && game.badge.toLowerCase().includes('jackpot'));
        break;
      case 'new':
        filtered = filtered.filter(game => game.provider === 'Live88' || game.provider === 'Peter & Sons');
        break;
      case 'slots':
        filtered = filtered.filter(game => !game.isLive);
        break;
      case 'featured':
        filtered = filtered.filter(game => game.provider === 'TucanBit' || game.provider === 'Live88');
        break;
      case 'live':
        filtered = filtered.filter(game => game.isLive);
        break;
      case 'shows':
        filtered = filtered.filter(game => game.provider === 'Evolution' || game.title.toLowerCase().includes('show'));
        break;
      case 'table':
        filtered = filtered.filter(game => game.title.toLowerCase().includes('blackjack') || 
                                         game.title.toLowerCase().includes('roulette') || 
                                         game.title.toLowerCase().includes('baccarat') ||
                                         game.title.toLowerCase().includes('poker'));
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredGames = getFilteredGames();



  return (
    <div className="max-w-full overflow-x-hidden">
      {/* Hero Section */}
      <HeroBanner banners={banners} />


      {/* Search Games Section */}
      <section className="py-0 bg-black">
        <div className="px-4 sm:px-6 lg:px-8">
          <SearchBar 
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            onSearchChange={setSearchTerm}
          />
        </div>
      </section>




      {/* Trending Games Section */}
      {filteredGames.length > 0 ? (
        <GameSection
          title="Trending Games"
          icon={<img src={trendingIcon} alt="Trending" className="w-6 h-6 mr-1 filter brightness-0 invert" />}
          games={filteredGames.slice(0, 12)}
          viewAllLink="/casino"
          badgeType="ranking"
        />
      ) : (
        <section className="py-4 bg-black">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No games found matching your criteria</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter</p>
            </div>
          </div>
        </section>
      )}

      {/* Continue Playing Section */}
      <GameSection
        title="Continue Playing"
        icon={<Play className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(0, 8)}
        viewAllLink="/casino"
        badgeType="resume"
      />

      {/* Top 10 */}
      <GameSection
        title="Top 10"
        icon={<Star className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(8, 16)}
        viewAllLink="/casino"
        badgeType="ranking"
      />




      {/* Cashback Countdown Section */}
      <CashbackCountdown backgroundImage={zeusImage} />

      {/* New Arrivals Section */}
      <GameSection
        title="New Arrivals"
        icon={<Gift className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(0, 8)}
        viewAllLink="/casino"
      />
      
      <section className="py-4 bg-black">
        <div className="text-center">
          <Link to="/casino" className="bg-white text-black px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-200 inline-flex items-center space-x-2">
            <Gamepad2 className="w-4 h-4" />
            <span>See over 4,000+ games</span>
          </Link>
        </div>
      </section>

      {/* Crypto Games Section */}
      <GameSection
        title="Crypto Games"
        icon={<Bitcoin className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(6, 14)}
        viewAllLink="/casino"
        badgeType="crypto"
      />

      {/* Buy Feature Section */}
      <GameSection
        title="Buy Feature"
        icon={<Trophy className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(0, 6)}
        viewAllLink="/casino"
        badgeType="buy"
        layout="grid"
      />

      {/* Promotional Banner */}
      <PromotionalBanner 
        backgroundImage={bannerMiddlePage}
        link="/tribes"
        alt="Promotional Banner"
      />

      {/* Popular Games Section */}
      <GameSection
        title="Popular Games"
        icon={<Crown className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(14, 22)}
        viewAllLink="/casino"
      />

      {/* Live Casino Section */}
      <GameSection
        title="Live Casino"
        icon={<Video className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(22, 30)}
        viewAllLink="/live-casino"
        badgeType="live"
      />

      {/* Jackpot Games Section */}
      <GameSection
        title="Jackpot Games"
        icon={<Gem className="w-5 h-5 text-white mr-1" />}
        games={featuredGames.slice(30, 38)}
        viewAllLink="/jackpots"
        badgeType="jackpot"
      />

      {/* Features Section */}
      <FeatureSection title="Why Choose TucanBit?" features={features} />

      {/* Call to Action Section */}
      <CallToAction 
        title="Ready to Start Winning?"
        subtitle="Join TucanBit now and get your 200% welcome bonus up to 5 BTC plus 200 free spins!"
        buttons={ctaButtons}
      />
    </div>
  );
};

export default HomePage;