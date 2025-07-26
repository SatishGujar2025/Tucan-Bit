import React, { useState, useEffect } from 'react';
import {
  Play, Wallet, Dice5, User, Gamepad2, Zap, TrendingUp, Shield,  Star, Award, Users, Clock, Trophy,
  ExternalLink, Twitter, Facebook, Instagram, Youtube, Gift, Crown,
   Home,  Coins,  HelpCircle, Mail, Settings,
  ChevronDown, ChevronRight, LogOut, CreditCard, BarChart2,
  Heart, Gem, Bitcoin, Aperture, Sparkles, Bell, ShieldCheck, RotateCw,
  Currency
} from 'lucide-react';

import Sidebar from './Sidebar';
import CasinoPage from './Caino/CasinoPage';
import gameImage1 from '../assets/g1.jpg';
import gameImage2 from '../assets/g2.jpg';
import gameImage3 from '../assets/g3.jpg';
import gameImage4 from '../assets/g4.jpg';
import gameImage5 from '../assets/g5.jpeg';
import gameImage6 from '../assets/g6.jpg';
import gameImage7 from '../assets/g7.jpg';
import gameImage8 from '../assets/g8.jpg';
import gameImage9 from '../assets/g9.jpg';
import gameImage10 from '../assets/g10.jpg';
import gameImage11 from '../assets/g11.jpg';
import gameImage12 from '../assets/g12.jpg';
import gameImage13 from '../assets/g13.jpg';
import gameImage14 from '../assets/g14.jpg';
import gameImage15 from '../assets/g15.jpg';
import gameImage16 from '../assets/g16.jpg';
import gameImage17 from '../assets/g17.jpg';
import gameImage18 from '../assets/g18.jpg';
import gameImage19 from '../assets/g19.jpg';
import gameImage20 from '../assets/g20.jpg';
import gameImage21 from '../assets/g21.jpg';
import gameImage22 from '../assets/g22.jpg';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const onNavigate = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const connectWallet = async (walletType) => {
    if (walletType === 'metamask' && typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      } finally {
        setIsConnecting(false);
        setShowWalletModal(false);
      }
    } else if (walletType === 'metamask') {
        alert('MetaMask is not installed. Please install MetaMask to connect your wallet.');
        window.open('https://metamask.io/download/', '_blank');
    } else {
      setTimeout(() => {
        const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        setWalletAddress(mockAddress);
        localStorage.setItem('walletAddress', mockAddress);
        setShowWalletModal(false);
      }, 1000);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const walletProviders = [
    { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', description: 'Connect using your MetaMask wallet' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png', description: 'Scan QR code with mobile wallet' },
   {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'https://altcoinsbox.com/wp-content/uploads/2023/03/coinbase-wallet-logo.png',
      description: 'Connect with Coinbase extension'
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: 'https://phantom.app/favicon.ico',
      description: 'Solana & Ethereum compatible'
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png',
      description: 'Mobile wallet connection'
    },
    {
      id: 'ledger',
      name: 'Ledger',
      icon: 'https://www.ledger.com/wp-content/uploads/2021/09/Ledger-favicon-1.png',
      description: 'Connect your hardware wallet'
    }
  
  
  ];

  const featuredGames = [
    { id: 1, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage1, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 2, name: 'Crazy Time', provider: 'Evolution', image: gameImage2, type: 'Live Game', volatility: 'Very High', isHot: true, isNew: false, maxWin: 'x25000' },
    { id: 3, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage3, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 4, name: 'Mega Roulette', provider: 'Evolution', image: gameImage4, type: 'Roulette', volatility: 'Medium', isHot: false, isNew: true, maxWin: 'x36' },
    { id: 5, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage5, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x21000' },
    { id: 6, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage6, type: 'Blackjack', volatility: 'Low', isHot: false, isNew: false, maxWin: 'x30' },
    { id: 7, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage7, type: 'Slot', volatility: 'Medium', isHot: false, isNew: false, maxWin: 'x2500' },


     { id: 8, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage8, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 9, name: 'Crazy Time', provider: 'Evolution', image: gameImage9, type: 'Live Game', volatility: 'Very High', isHot: true, isNew: false, maxWin: 'x25000' },
    { id: 10, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage10, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 11, name: 'Mega Roulette', provider: 'Evolution', image: gameImage11, type: 'Roulette', volatility: 'Medium', isHot: false, isNew: true, maxWin: 'x36' },
    { id: 12, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage12, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x21000' },
    { id: 13, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage13, type: 'Blackjack', volatility: 'Low', isHot: false, isNew: false, maxWin: 'x30' },
    { id: 14, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage14, type: 'Slot', volatility: 'Medium', isHot: false, isNew: false, maxWin: 'x2500' },


     { id: 14, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage15, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 16, name: 'Crazy Time', provider: 'Evolution', image: gameImage16, type: 'Live Game', volatility: 'Very High', isHot: true, isNew: false, maxWin: 'x25000' },
    { id: 17, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage17, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 18, name: 'Mega Roulette', provider: 'Evolution', image: gameImage18, type: 'Roulette', volatility: 'Medium', isHot: false, isNew: true, maxWin: 'x36' },
    { id: 19, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage19, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x21000' },
    { id: 20, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage20, type: 'Blackjack', volatility: 'Low', isHot: false, isNew: false, maxWin: 'x30' },
    { id: 21, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage21, type: 'Slot', volatility: 'Medium', isHot: false, isNew: false, maxWin: 'x2500' },



     { id: 22, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage22, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 23, name: 'Crazy Time', provider: 'Evolution', image: gameImage3, type: 'Live Game', volatility: 'Very High', isHot: true, isNew: false, maxWin: 'x25000' },
    { id: 24, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage3, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 24, name: 'Mega Roulette', provider: 'Evolution', image: gameImage4, type: 'Roulette', volatility: 'Medium', isHot: false, isNew: true, maxWin: 'x36' },
    { id: 26, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage5, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x21000' },
    { id: 27, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage6, type: 'Blackjack', volatility: 'Low', isHot: false, isNew: false, maxWin: 'x30' },
    { id: 28, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage7, type: 'Slot', volatility: 'Medium', isHot: false, isNew: false, maxWin: 'x2500' },

    { id: 29, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage15, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 30, name: 'Crazy Time', provider: 'Evolution', image: gameImage16, type: 'Live Game', volatility: 'Very High', isHot: true, isNew: false, maxWin: 'x25000' },
    { id: 31, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage17, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 32, name: 'Mega Roulette', provider: 'Evolution', image: gameImage18, type: 'Roulette', volatility: 'Medium', isHot: false, isNew: true, maxWin: 'x36' },
    { id: 33, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage19, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x21000' },
    { id: 34, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage20, type: 'Blackjack', volatility: 'Low', isHot: false, isNew: false, maxWin: 'x30' },
    { id: 35, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage21, type: 'Slot', volatility: 'Medium', isHot: false, isNew: false, maxWin: 'x2500' },


     { id: 36, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage8, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 37, name: 'Crazy Time', provider: 'Evolution', image: gameImage9, type: 'Live Game', volatility: 'Very High', isHot: true, isNew: false, maxWin: 'x25000' },
    { id: 38, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage10, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 39, name: 'Mega Roulette', provider: 'Evolution', image: gameImage11, type: 'Roulette', volatility: 'Medium', isHot: false, isNew: true, maxWin: 'x36' },
    { id: 40, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage12, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x21000' },
    { id: 41, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage13, type: 'Blackjack', volatility: 'Low', isHot: false, isNew: false, maxWin: 'x30' },
    { id: 42, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage14, type: 'Slot', volatility: 'Medium', isHot: false, isNew: false, maxWin: 'x2500' },
  
  
   { id: 43, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage15, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 44, name: 'Crazy Time', provider: 'Evolution', image: gameImage16, type: 'Live Game', volatility: 'Very High', isHot: true, isNew: false, maxWin: 'x25000' },
    { id: 45, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage17, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x5000' },
    { id: 46, name: 'Mega Roulette', provider: 'Evolution', image: gameImage18, type: 'Roulette', volatility: 'Medium', isHot: false, isNew: true, maxWin: 'x36' },
    { id: 46, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage19, type: 'Slot', volatility: 'High', isHot: true, isNew: false, maxWin: 'x21000' },
    { id: 47, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage20, type: 'Blackjack', volatility: 'Low', isHot: false, isNew: false, maxWin: 'x30' },
    { id: 48, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage21, type: 'Slot', volatility: 'Medium', isHot: false, isNew: false, maxWin: 'x2500' },

  
  ];

  const OriginalHomePageContent = () => (
    <main className={`lg:ml-64 pt-16 lg:pt-0 ${sidebarOpen ? 'ml-64' : ''}`}>
      <section className="relative overflow-hidden h-[70vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">TucanBit</span> Crypto Casino
            </h1>
            <p className="text-xl text-gray-300 mb-8">The most thrilling crypto gambling experience with instant payouts, provably fair games, and exclusive bonuses.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => onNavigate('lobby')} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Play className="w-6 h-6" />
                <span>Play Now</span>
              </button>
              <button onClick={() => setShowWalletModal(true)} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Wallet className="w-6 h-6" />
                <span>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {featuredGames.map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30" onClick={() => onNavigate(`game/${game.id}`)}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {game.isHot && <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>HOT</span></div>}
                  {game.isNew && <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>NEW</span></div>}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white mb-1 truncate">{game.name}</h3>
                  <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.type}</span></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">{game.maxWin}</span></div>
                    <span className={`text-xs px-1 py-0.5 rounded ${game.volatility === 'High' || game.volatility === 'Very High' ? 'bg-red-500/10 text-red-400' : game.volatility === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>{game.volatility}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => onNavigate('lobby')} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-2 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4" />
              <span>see over 300+ games</span>
            </button>
          </div>

         
        </div>
      </section>
       <section className="py-16 bg-gray-900 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Why Choose TucanBit?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Provably Fair</h3>
                <p className="text-gray-300">
                  All our games use blockchain technology to ensure complete transparency and fairness in every outcome.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Bitcoin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
                <p className="text-gray-300">
                  Withdraw your winnings instantly to your crypto wallet with no delays or unnecessary verifications.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Gem className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Premium Selection</h3>
                <p className="text-gray-300">
                  Over 2,000 games from top providers including Pragmatic Play, Evolution, and NetEnt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Winning?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join TucanBit now and get your 200% welcome bonus up to 5 BTC plus 200 free spins!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('register')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <User className="w-6 h-6" />
                <span>Sign Up Now</span>
              </button>
              <button
                onClick={() => onNavigate('lobby')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Play className="w-6 h-6" />
                <span>Play as Guest</span>
              </button>
            </div>
          </div>
        </section>


    </main>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'casino':
        return <CasinoPage />;
      case 'home':
      default:
        return <OriginalHomePageContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Connect Wallet</h3>
              <button onClick={() => setShowWalletModal(false)} className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <div className="space-y-3 mb-6">
              {walletProviders.map((wallet) => (
                <button key={wallet.id} onClick={() => connectWallet(wallet.id)} className="flex items-center w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200">
                  <img src={wallet.icon} alt={wallet.name} className="w-10 h-10 mr-4" />
                  <div className="text-left"><div className="font-medium text-white">{wallet.name}</div><div className="text-sm text-gray-400">{wallet.description}</div></div>
                </button>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm">By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a></p>
          </div>
        </div>
      )}

      <Sidebar 
        sidebarOpen={sidebarOpen}
        activeSubmenu={activeSubmenu}
        toggleSubmenu={toggleSubmenu}
        onNavigate={onNavigate}
        walletAddress={walletAddress}
        disconnectWallet={disconnectWallet}
        setShowWalletModal={setShowWalletModal}
        currentPage={currentPage}
      />
      
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white z-40"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"><div className="flex items-center space-x-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"><svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg></div><h1 className="text-xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></h1></div></div>
        <div className="w-6"></div>
      </header>

      {renderCurrentPage()}
    </div>
  );
};

export default App;
