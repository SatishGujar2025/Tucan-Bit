import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark, TrendingUp, Star } from 'lucide-react';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All News', icon: '📰' },
    { id: 'updates', name: 'Platform Updates', icon: '🔄' },
    { id: 'games', name: 'New Games', icon: '🎮' },
    { id: 'promotions', name: 'Promotions', icon: '🎁' },
    { id: 'crypto', name: 'Crypto News', icon: '₿' },
    { id: 'tournaments', name: 'Tournaments', icon: '🏆' }
  ];

  const newsArticles = [
    {
      id: 1,
      title: "TucanBit Launches Revolutionary Provably Fair Gaming System",
      excerpt: "We're excited to announce the launch of our new provably fair gaming system, ensuring complete transparency and fairness for all players.",
      content: "TucanBit has always been committed to providing the most transparent and fair gaming experience possible. Our new provably fair system uses advanced cryptographic algorithms to ensure that every game outcome is verifiable and cannot be manipulated. Players can now verify the fairness of every bet, spin, and hand in real-time.",
      category: 'updates',
      author: 'TucanBit Team',
      date: '2025-01-15',
      readTime: '3 min read',
      image: 'https://iili.io/FwSX1Xj.png',
      featured: true,
      tags: ['Provably Fair', 'Transparency', 'Security']
    },
    {
      id: 2,
      title: "New Hacksaw Gaming Slots Added to Our Collection",
      excerpt: "Experience the thrill of Hacksaw Gaming's latest slot releases with massive jackpots and innovative features.",
      content: "We're thrilled to announce the addition of 15 new Hacksaw Gaming slots to our platform. These games feature cutting-edge graphics, innovative bonus features, and massive jackpot potential. From classic fruit machines to modern video slots, there's something for every player.",
      category: 'games',
      author: 'Game Team',
      date: '2025-01-14',
      readTime: '2 min read',
      image: 'https://iili.io/FwUxYcN.png',
      featured: false,
      tags: ['Hacksaw Gaming', 'New Games', 'Slots']
    },
    {
      id: 3,
      title: "Bitcoin Surges Past $50,000 - What This Means for Crypto Gaming",
      excerpt: "The recent Bitcoin rally is creating new opportunities for crypto gaming enthusiasts and investors alike.",
      content: "Bitcoin's impressive rally above $50,000 has brought renewed interest to the crypto gaming sector. As more players discover the benefits of crypto gaming - including instant transactions, lower fees, and enhanced privacy - we're seeing record-breaking activity on our platform.",
      category: 'crypto',
      author: 'Crypto Analyst',
      date: '2025-01-13',
      readTime: '4 min read',
      image: 'https://cdn.midjourney.com/54d71f3e-7598-4f36-a850-d7dd929d5e7c/0_3.png',
      featured: true,
      tags: ['Bitcoin', 'Crypto Gaming', 'Market Analysis']
    },
    {
      id: 4,
      title: "SPIN WARS Tournament Returns with $100,000 Prize Pool",
      excerpt: "The biggest slot tournament of the year is back with an even larger prize pool and exciting new features.",
      content: "SPIN WARS VOL 6 is here with a massive $100,000 prize pool! This tournament features our most popular slots with enhanced multipliers and special bonus rounds. Players can compete across multiple games and climb the leaderboard for a chance to win life-changing prizes.",
      category: 'tournaments',
      author: 'Tournament Team',
      date: '2025-01-12',
      readTime: '3 min read',
      image: 'https://iili.io/FwSX1Xj.png',
      featured: false,
      tags: ['SPIN WARS', 'Tournament', 'Prize Pool']
    },
    {
      id: 5,
      title: "New VIP Rewards Program - Exclusive Benefits for High Rollers",
      excerpt: "Our enhanced VIP program offers exclusive bonuses, faster withdrawals, and personalized account management.",
      content: "We've completely revamped our VIP rewards program to provide even more value to our most loyal players. New benefits include exclusive game access, personalized account managers, faster withdrawal processing, and special event invitations.",
      category: 'promotions',
      author: 'VIP Team',
      date: '2025-01-11',
      readTime: '2 min read',
      image: 'https://cdn.midjourney.com/0ac3937e-6f1e-438c-b549-124318dd6b3f/0_2.png',
      featured: false,
      tags: ['VIP', 'Rewards', 'Exclusive']
    },
    {
      id: 6,
      title: "Live Casino Expansion - New Tables and Dealers",
      excerpt: "We're expanding our live casino with new tables, professional dealers, and enhanced streaming quality.",
      content: "Our live casino section is getting a major upgrade with 10 new tables, professional dealers from around the world, and enhanced HD streaming. Players can now enjoy live blackjack, roulette, baccarat, and poker with crystal-clear video and audio.",
      category: 'games',
      author: 'Live Casino Team',
      date: '2025-01-10',
      readTime: '3 min read',
      image: 'https://iili.io/FwUxYcN.png',
      featured: false,
      tags: ['Live Casino', 'New Tables', 'HD Streaming']
    }
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeCategory);

  const featuredArticles = newsArticles.filter(article => article.featured);

  return (
    <div className="page-content p-6 bg-gray-900">
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
          <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Latest News</span> & Updates
            </h1>
            <p className="text-xl text-gray-300">Stay informed about the latest developments in crypto gaming</p>
          </div>
        </section>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {activeCategory === 'all' && featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-400 mr-3" />
              Featured Articles
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                    <p className="text-gray-300 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <div key={article.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 