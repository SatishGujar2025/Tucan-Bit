import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, TrendingUp, Search, Eye, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';

// Import assets specific to this page
import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpeg';
import g6 from '../assets/g6.jpg';
import g8 from '../assets/g8.jpg';
import g9 from '../assets/g9.jpg';
import g10 from '../assets/g10.jpg';
import tb from '../assets/TB.png';

// Interfaces specific to the Lootbox Page
interface LootboxItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  contents: string[];
  color: string;
  brand: string;
  backgroundImage: string;
}

interface RecentWin {
  user: string;
  amount: number;
  currency: string;
}

const LootboxPage: React.FC = () => {
  // State related to lootbox page functionality remains here.
  const [selectedLootbox, setSelectedLootbox] = useState<LootboxItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [collection, setCollection] = useState('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Data specific to this page
  const recentWins: RecentWin[] = [
    { user: 'Alekorns', amount: 0.07, currency: 'T' },
    { user: 'user_15712712', amount: 10.00, currency: 'T' },
    { user: 'OnTiltHUD5560', amount: 5.50, currency: 'T' },
     { user: 'Alekorns', amount: 0.07, currency: 'T' },
    { user: 'user_15712712', amount: 10.00, currency: 'T' },
    { user: 'OnTiltHUD5560', amount: 5.50, currency: 'T' },
     { user: 'Alekorns', amount: 0.07, currency: 'T' },
    { user: 'user_15712712', amount: 10.00, currency: 'T' },
    
    
    
  ];

  const lootboxes: LootboxItem[] = [
    { id: '1', name: 'Bonus Buy', price: 37.0025, currency: 'T', rarity: 'rare', image: '🐋', description: 'Always Win', contents: ['Bonus Spins', 'Free Games', 'Multipliers'], color: 'bg-orange-500', brand: 'Whale', backgroundImage: g1 },
    { id: '2', name: 'Free Spins', price: 3.0002, currency: 'T', rarity: 'common', image: '🎰', description: 'Always Win', contents: ['Free Spins', 'Bonus Rounds'], color: 'bg-pink-500', brand: 'Whale', backgroundImage: g2 },
    { id: '3', name: 'Highroller Lootbox', price: 20000.3600, currency: 'T', rarity: 'legendary', image: '👑', description: 'HIGHROLLER', contents: ['VIP Rewards', 'Exclusive Items', 'High Stakes'], color: 'bg-yellow-500', brand: 'Premium', backgroundImage: g3 },
    { id: '4', name: 'JAMBO Lootbox', price: 15.0010, currency: 'T', rarity: 'epic', image: '🎯', description: 'Always Win', contents: ['JAMBO Rewards', 'Special Bonuses'], color: 'bg-blue-500', brand: 'Whale', backgroundImage: g4 },
    { id: '5', name: '$KINGY Swag', price: 1.5001, currency: 'T', rarity: 'common', image: '👕', description: 'Always Win', contents: ['Merchandise', 'Branded Items'], color: 'bg-red-500', brand: 'Whale', backgroundImage: g5 },
    { id: '6', name: 'Mega Bonus Buy', price: 299.0203, currency: 'T', rarity: 'epic', image: '💎', description: 'Always Win', contents: ['Mega Bonuses', 'Premium Rewards'], color: 'bg-purple-500', brand: 'Whale', backgroundImage: g6 },
    { id: '8', name: 'JAMBO Lootbox', price: 15.0010, currency: 'T', rarity: 'epic', image: '🎯', description: 'Always Win', contents: ['JAMBO Rewards', 'Special Bonuses'], color: 'bg-blue-500', brand: 'Whale', backgroundImage: g9 },
    { id: '9', name: 'JAMBO Lootbox', price: 15.0010, currency: 'T', rarity: 'epic', image: '🎯', description: 'Always Win', contents: ['JAMBO Rewards', 'Special Bonuses'], color: 'bg-blue-500', brand: 'Whale', backgroundImage: g8 },
    { id: '10', name: 'JAMBO Lootbox', price: 15.0010, currency: 'T', rarity: 'epic', image: '🎯', description: 'Always Win', contents: ['JAMBO Rewards', 'Special Bonuses'], color: 'bg-blue-500', brand: 'Whale', backgroundImage: g10 },
  ];
  
  const handlePurchase = (lootbox: LootboxItem) => {
    alert(`Purchasing ${lootbox.name} for ${lootbox.price} ${lootbox.currency}`);
  };

  return (
    <>
      <div className="text-white">
        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center space-x-3">
              <Gift className="w-6 h-6 text-blue-400" />
              <span>Lootboxes</span>
            </h1>
          </div>

          {/* Banner */} 
          <div className="relative mb-8 overflow-hidden rounded-xl p-8" style={{ backgroundImage: `url(${tb})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2 text-yellow-700">OPEN LOOTBOXES WIN PRIZES EVERY TIME!</h2>
              <p className="text-lg text-yellow-500 mb-4">Unbox Crypto, Free Spins, Merch & more! Win every time, sell what you don't want.</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>Recent Wins</span>
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {recentWins.map((win, index) => (
                <div key={index} className="flex-shrink-0 bg-gray-800 rounded-lg p-3 min-w-[120px]">
                  <div className="text-sm text-gray-400">{win.user}</div>
                  <div className="text-lg font-bold text-green-400">{win.currency} {win.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search for lootbox" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Collection:</span>
                <select value={collection} onChange={(e) => setCollection(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option value="all">All</option>
                  <option value="whale">Whale</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lootboxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
            {lootboxes.map((lootbox) => (
              <div key={lootbox.id} className="group cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => setSelectedLootbox(lootbox)}>
                <div className="relative rounded-xl p-6 h-48 flex flex-col justify-between overflow-hidden" style={{ backgroundImage: `url(${lootbox.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="text-center"><div className="text-4xl mb-2">{lootbox.image}</div></div>
                    <div className="text-center"><div className="text-2xl font-bold text-white">{lootbox.currency} {lootbox.price.toFixed(4)}</div></div>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button onClick={(e) => { e.stopPropagation(); setSelectedLootbox(lootbox); setShowPreview(true); }} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button onClick={(e) => { e.stopPropagation(); handlePurchase(lootbox); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"><ShoppingCart className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview Modal */}
          {showPreview && selectedLootbox && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Preview: {selectedLootbox.name}</h3>
                  <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <div className="text-center mb-6">
                  <div className={`${selectedLootbox.color} rounded-xl p-8 mb-4`}>
                    <div className="text-6xl mb-2">{selectedLootbox.image}</div>
                    <h4 className="text-xl font-bold">{selectedLootbox.name}</h4>
                    <p className="text-sm opacity-90">{selectedLootbox.description}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold mb-3">Possible Contents:</h4>
                  <ul className="space-y-2">
                    {selectedLootbox.contents.map((content, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setShowPreview(false)} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">Close</button>
                  <button onClick={() => { setShowPreview(false); handlePurchase(selectedLootbox); }} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Purchase</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 mb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>What are Lootboxes?</h3>
                {openFAQ === 0 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 0 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">Lootboxes are mystery boxes containing various rewards and bonuses.</p></div>
              )}
            </div>
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>

            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>

            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>
            <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-750">
                 <h3 className="text-sm font-semibold text-white flex items-center"><span className="text-blue-500 mr-2 text-xs">Q:</span>How do I purchase a Lootbox?</h3>
                 {openFAQ === 1 ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3"><p className="text-xs text-gray-300">To purchase a lootbox, connect your wallet and use the "Purchase" button.</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LootboxPage;