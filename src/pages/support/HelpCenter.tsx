import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, Book, CreditCard, Shield, Users, ChevronDown, ChevronRight } from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      color: 'blue',
      articles: [
        { title: 'How to create an account', views: 1250 },
        { title: 'Account verification process', views: 980 },
        { title: 'First deposit guide', views: 1100 },
        { title: 'How to claim welcome bonus', views: 890 },
        { title: 'Understanding cryptocurrency', views: 750 }
      ]
    },
    {
      id: 'deposits-withdrawals',
      title: 'Deposits & Withdrawals',
      icon: CreditCard,
      color: 'green',
      articles: [
        { title: 'Supported cryptocurrencies', views: 1450 },
        { title: 'How to make a deposit', views: 1200 },
        { title: 'Withdrawal process and limits', views: 1350 },
        { title: 'Transaction fees explained', views: 680 },
        { title: 'Processing times', views: 920 }
      ]
    },
    {
      id: 'gaming',
      title: 'Gaming & Rules',
      icon: Users,
      color: 'purple',
      articles: [
        { title: 'Game rules and payouts', views: 1100 },
        { title: 'Provably fair gaming', views: 850 },
        { title: 'Bonus terms and conditions', views: 950 },
        { title: 'Wagering requirements', views: 780 },
        { title: 'Maximum win limits', views: 650 }
      ]
    },
    {
      id: 'security',
      title: 'Security & Safety',
      icon: Shield,
      color: 'red',
      articles: [
        { title: 'Two-factor authentication setup', views: 720 },
        { title: 'Account security tips', views: 890 },
        { title: 'Responsible gaming tools', views: 560 },
        { title: 'How to report suspicious activity', views: 340 },
        { title: 'Data protection and privacy', views: 480 }
      ]
    }
  ];

  const popularArticles = [
    { title: 'How to make your first deposit', category: 'Deposits', views: 2340 },
    { title: 'Understanding wagering requirements', category: 'Gaming', views: 1890 },
    { title: 'Account verification guide', category: 'Getting Started', views: 1670 },
    { title: 'Withdrawal processing times', category: 'Withdrawals', views: 1450 },
    { title: 'Provably fair gaming explained', category: 'Gaming', views: 1230 }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          {/* <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button> */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Help Center</h1>
            <p className="text-gray-300">Find answers to your questions and get support</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/20 border border-[#3C1A4F]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3C1A4F]/50 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
            <div className="space-y-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const isExpanded = expandedCategory === category.id;
                
                return (
                  <div
                    key={category.id}
                    className="bg-black/20 rounded-xl border border-[#3C1A4F]/20 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${category.color}-500/20`}>
                          <Icon className={`w-6 h-6 text-${category.color}-400`} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                          <p className="text-gray-400">{category.articles.length} articles</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="border-t border-[#3C1A4F]/20 p-6 pt-4">
                        <div className="space-y-3">
                          {category.articles.map((article, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                            >
                              <span className="text-white">{article.title}</span>
                              <span className="text-gray-400 text-sm">{article.views} views</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <div className="bg-black/20 rounded-xl p-6 border border-[#3C1A4F]/20">
              <h3 className="text-xl font-bold text-white mb-4">Popular Articles</h3>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <h4 className="text-white font-medium mb-1">{article.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{article.category}</span>
                      <span className="text-gray-400 text-sm">{article.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Need More Help?</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Can't find what you're looking for? Our support team is here to help 24/7.
              </p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;