import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Wallet, User, Gamepad2, ShieldCheck, Bitcoin, Gem, Zap } from 'lucide-react';
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
import { useAppContext } from './context/AppContext';

// This component is now only responsible for the home page content.
const HomePage: React.FC = () => {
 const { walletAddress, openModal } = useAppContext();
  // Data for the page content remains here.
  const featuredGames = [
    { id: 1, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: gameImage1, type: 'Slot', volatility: 'High', rtp: '96.5%', maxWin: 'x5000', isNew: false, isHot: true },
    { id: 2, name: 'Crazy Time', provider: 'Evolution', image: gameImage2, type: 'Live Game', volatility: 'Very High', rtp: '96.08%', maxWin: 'x25000', isNew: false, isHot: true },
    { id: 3, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage3, type: 'Slot', volatility: 'High', rtp: '96.21%', maxWin: 'x5000', isNew: false, isHot: true },
    { id: 4, name: 'Mega Roulette', provider: 'Evolution', image: gameImage4, type: 'Roulette', volatility: 'Medium', rtp: '97.30%', maxWin: 'x36', isNew: true, isHot: false },
    { id: 5, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage5, type: 'Slot', volatility: 'High', rtp: '96.51%', maxWin: 'x21000', isNew: false, isHot: true },
    { id: 6, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage6, type: 'Blackjack', volatility: 'Low', rtp: '99.50%', maxWin: 'x30', isNew: false, isHot: false },
    { id: 7, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage7, type: 'Slot', volatility: 'Medium', rtp: '96.01%', maxWin: 'x2500', isNew: false, isHot: false },
       { id: 8, name: 'Monopoly Live', provider: 'Evolution', image: gameImage8, type: 'Live Game', volatility: 'High', rtp: '96.23%', maxWin: 'x10000', theme: 'Board Game', isNew: false, isHot: true, minBet: '0.50', maxBet: '2000' },
    { id: 9, name: 'Starburst', provider: 'NetEnt', image: gameImage9, type: 'Slot', volatility: 'Low', rtp: '96.09%', maxWin: 'x500', theme: 'Space', isNew: false, isHot: false, minBet: '0.10', maxBet: '100' },
    { id: 10, name: 'Gonzo\'s Quest', provider: 'NetEnt', image: gameImage10, type: 'Slot', volatility: 'Medium', rtp: '95.77%', maxWin: 'x2500', theme: 'Adventure', isNew: false, isHot: false, minBet: '0.20', maxBet: '50' },
    { id: 11, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage11, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 12, name: 'Lightning Roulette', provider: 'Evolution', image: gameImage13, type: 'Roulette', volatility: 'Medium', rtp: '97.30%', maxWin: 'x500', theme: 'Classic', isNew: false, isHot: true, minBet: '0.20', maxBet: '2000' },
    { id: 13, name: 'Dead or Alive 2', provider: 'NetEnt', image: gameImage14, type: 'Slot', volatility: 'Very High', rtp: '96.82%', maxWin: 'x100000', theme: 'Wild West', isNew: false, isHot: true, minBet: '0.09', maxBet: '18' },
    { id: 14, name: 'Dragon Tiger', provider: 'Evolution', image: gameImage15, type: 'Card Game', volatility: 'Low', rtp: '96.27%', maxWin: 'x11', theme: 'Asian', isNew: false, isHot: false, minBet: '1', maxBet: '5000' },
    { id: 15, name: 'Big Bass Bonanza', provider: 'Pragmatic Play', image: gameImage16, type: 'Slot', volatility: 'Medium', rtp: '96.71%', maxWin: 'x2100', theme: 'Fishing', isNew: true, isHot: true, minBet: '0.20', maxBet: '240' },
    { id: 16, name: 'Monopoly Live', provider: 'Evolution', image: gameImage17, type: 'Live Game', volatility: 'High', rtp: '96.23%', maxWin: 'x10000', theme: 'Board Game', isNew: false, isHot: true, minBet: '0.50', maxBet: '2000' },
    { id: 17, name: 'Starburst', provider: 'NetEnt', image: gameImage19, type: 'Slot', volatility: 'Low', rtp: '96.09%', maxWin: 'x500', theme: 'Space', isNew: false, isHot: false, minBet: '0.10', maxBet: '100' },
    { id: 18, name: 'Gonzo\'s Quest', provider: 'NetEnt', image: gameImage18, type: 'Slot', volatility: 'Medium', rtp: '95.77%', maxWin: 'x2500', theme: 'Adventure', isNew: false, isHot: false, minBet: '0.20', maxBet: '50' },
    { id: 19, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage19, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 20, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage22, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 21, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage21, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 22, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage3, type: 'Slot', volatility: 'High', rtp: '96.21%', maxWin: 'x5000', theme: 'Ancient Egypt', isNew: false, isHot: true, minBet: '0.10', maxBet: '50' },
    { id: 23, name: 'Mega Roulette', provider: 'Evolution', image: gameImage4, type: 'Roulette', volatility: 'Medium', rtp: '97.30%', maxWin: 'x36', theme: 'Classic', isNew: true, isHot: false, minBet: '0.10', maxBet: '5000' },
    { id: 24, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: gameImage5, type: 'Slot', volatility: 'High', rtp: '96.51%', maxWin: 'x21000', theme: 'Candy', isNew: false, isHot: true, minBet: '0.20', maxBet: '100' },
    { id: 25, name: 'Lightning Blackjack', provider: 'Evolution', image: gameImage6, type: 'Blackjack', volatility: 'Low', rtp: '99.50%', maxWin: 'x30', theme: 'Card Game', isNew: false, isHot: false, minBet: '1', maxBet: '5000' },
    { id: 26, name: 'Wolf Gold', provider: 'Pragmatic Play', image: gameImage7, type: 'Slot', volatility: 'Medium', rtp: '96.01%', maxWin: 'x2500', theme: 'Wild West', isNew: false, isHot: false, minBet: '0.25', maxBet: '125' },
    { id: 27, name: 'Monopoly Live', provider: 'Evolution', image: gameImage8, type: 'Live Game', volatility: 'High', rtp: '96.23%', maxWin: 'x10000', theme: 'Board Game', isNew: false, isHot: true, minBet: '0.50', maxBet: '2000' },
    { id: 28, name: 'Starburst', provider: 'NetEnt', image: gameImage9, type: 'Slot', volatility: 'Low', rtp: '96.09%', maxWin: 'x500', theme: 'Space', isNew: false, isHot: false, minBet: '0.10', maxBet: '100' },
    { id: 29, name: 'Gonzo\'s Quest', provider: 'NetEnt', image: gameImage10, type: 'Slot', volatility: 'Medium', rtp: '95.77%', maxWin: 'x2500', theme: 'Adventure', isNew: false, isHot: false, minBet: '0.20', maxBet: '50' },
    { id: 30, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage11, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 31, name: 'Lightning Roulette', provider: 'Evolution', image: gameImage13, type: 'Roulette', volatility: 'Medium', rtp: '97.30%', maxWin: 'x500', theme: 'Classic', isNew: false, isHot: true, minBet: '0.20', maxBet: '2000' },
    { id: 32, name: 'Dead or Alive 2', provider: 'NetEnt', image: gameImage14, type: 'Slot', volatility: 'Very High', rtp: '96.82%', maxWin: 'x100000', theme: 'Wild West', isNew: false, isHot: true, minBet: '0.09', maxBet: '18' },
    { id: 33, name: 'Dragon Tiger', provider: 'Evolution', image: gameImage15, type: 'Card Game', volatility: 'Low', rtp: '96.27%', maxWin: 'x11', theme: 'Asian', isNew: false, isHot: false, minBet: '1', maxBet: '5000' },
    { id: 34, name: 'Big Bass Bonanza', provider: 'Pragmatic Play', image: gameImage16, type: 'Slot', volatility: 'Medium', rtp: '96.71%', maxWin: 'x2100', theme: 'Fishing', isNew: true, isHot: true, minBet: '0.20', maxBet: '240' },
    { id: 35, name: 'Monopoly Live', provider: 'Evolution', image: gameImage17, type: 'Live Game', volatility: 'High', rtp: '96.23%', maxWin: 'x10000', theme: 'Board Game', isNew: false, isHot: true, minBet: '0.50', maxBet: '2000' },
    { id: 36, name: 'Starburst', provider: 'NetEnt', image: gameImage19, type: 'Slot', volatility: 'Low', rtp: '96.09%', maxWin: 'x500', theme: 'Space', isNew: false, isHot: false, minBet: '0.10', maxBet: '100' },
    { id: 37, name: 'Gonzo\'s Quest', provider: 'NetEnt', image: gameImage18, type: 'Slot', volatility: 'Medium', rtp: '95.77%', maxWin: 'x2500', theme: 'Adventure', isNew: false, isHot: false, minBet: '0.20', maxBet: '50' },
    { id: 38, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage19, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 39, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage22, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 40, name: 'Mega Moolah', provider: 'Microgaming', image: gameImage21, type: 'Slot', volatility: 'Medium', rtp: '88.12%', maxWin: 'Progressive', theme: 'Jungle', isNew: false, isHot: true, minBet: '0.25', maxBet: '6.25' },
    { id: 41, name: 'Book of Dead', provider: 'Play\'n GO', image: gameImage3, type: 'Slot', volatility: 'High', rtp: '96.21%', maxWin: 'x5000', theme: 'Ancient Egypt', isNew: false, isHot: true, minBet: '0.10', maxBet: '50' },
    { id: 42, name: 'Mega Roulette', provider: 'Evolution', image: gameImage4, type: 'Roulette', volatility: 'Medium', rtp: '97.30%', maxWin: 'x36', theme: 'Classic', isNew: true, isHot: false, minBet: '0.10', maxBet: '5000' },
 
  ];

  return (
    <>
       {/* Hero Section - Showcasing the background image */}
        <section className="relative overflow-hidden h-[55vh] min-h-[150px] flex items-center">
          <div
            className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center "
            style={{ backgroundPosition: 'center 30%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">TucanBit</span> Crypto Casino
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                The most thrilling crypto gambling experience with instant payouts, provably fair games, and exclusive bonuses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/lobby"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>Play Now</span>
                </Link>
                 <button
                onClick={() => openModal('walletConnect')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 flex items-center justify-center space-x-2"
              >
                <Wallet className="w-6 h-6" />
                <span>{walletAddress ? `${walletAddress.slice(0, 6)}...` : 'Connect Wallet'}</span>
              </button>
              </div>
            </div>
          </div>
        </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {featuredGames.map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
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
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/casino" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-2 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4" />
              <span>See Over 300+ Games</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose TucanBit?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Provably Fair</h3>
              <p className="text-gray-300">All our games use blockchain technology to ensure complete transparency and fairness in every outcome.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4"><Bitcoin className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
              <p className="text-gray-300">Withdraw your winnings instantly to your crypto wallet with no delays or unnecessary verifications.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4"><Gem className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Selection</h3>
              <p className="text-gray-300">Over 2,000 games from top providers including Pragmatic Play, Evolution, and NetEnt.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Winning?</h2>
          <p className="text-xl text-gray-300 mb-10">Join TucanBit now and get your 200% welcome bonus up to 5 BTC plus 200 free spins!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
              <User className="w-6 h-6" />
              <span>Sign Up Now</span>
            </Link>
            <Link to="/casino" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
              <Play className="w-6 h-6" />
              <span>Play as Guest</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;