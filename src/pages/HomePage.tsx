import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Wallet, User, Gamepad2, ShieldCheck, Bitcoin, Gem, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllGames } from '../utils/gameUtils';

// This component is now only responsible for the home page content.
const HomePage: React.FC = () => {
 const { walletAddress, openModal } = useAppContext();
  
  // Use the centralized game data
  const allGames = getAllGames();
  const featuredGames = allGames.slice(0, 24); // Show first 24 games

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

          <div className="relative p-6 w-full">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">TucanBit</span> Crypto Casino
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                The most thrilling crypto gambling experience with instant payouts, provably fair games, and exclusive bonuses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/game-lobby"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>Play Now</span>
                </Link>
                 <button
                onClick={() => openModal('walletConnect')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 flex items-center justify-center space-x-2"
              >
                <Wallet className="w-5 h-5" />
                <span>{walletAddress ? `${walletAddress.slice(0, 6)}...` : 'Connect Wallet'}</span>
              </button>
              </div>
            </div>
          </div>
        </section>

      <section className="py-16 bg-gray-900">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {featuredGames.map((game) => (
              <div key={game.id} className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30">
                <Link to={`/game/${game.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {game.badge && <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><Zap className="w-2 h-2 mr-0.5" /><span>{game.badge}</span></div>}
                    {game.isLive && <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center"><span>LIVE</span></div>}
                    </div>
                    <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center mb-2"><span className="text-yellow-400 text-xs">{game.provider}</span><span className="text-gray-400 text-xs">{game.isLive ? 'Live' : 'Slot'}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-gray-300"><svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-xs">x5000</span></div>
                        <span className="text-xs px-1 py-0.5 rounded bg-yellow-500/10 text-yellow-400">High</span>
                    </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 transform scale-90 group-hover:scale-100 text-sm">
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </button>
                    </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/casino" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4" />
              <span>See Over 300+ Games</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="p-6">
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
        <div className="p-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Winning?</h2>
          <p className="text-xl text-gray-300 mb-10">Join TucanBit now and get your 200% welcome bonus up to 5 BTC plus 200 free spins!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <User className="w-5 h-5" />
                <span>Join Now</span>
              </Link>
              <Link to="/casino" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Play className="w-5 h-5" />
                <span>Start Playing</span>
              </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;