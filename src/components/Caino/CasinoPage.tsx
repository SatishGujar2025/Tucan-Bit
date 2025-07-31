import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import {
  Play, TrendingUp, Shield, Zap, Star, Award, Users, Clock, Trophy,
  ExternalLink, Twitter, Facebook, Instagram, Youtube, Gift, Crown,
  Gamepad2, Home, Wallet, Coins, Dice5, HelpCircle, Mail, Settings,
  ChevronDown, ChevronRight, LogOut, User, CreditCard, BarChart2,
  Heart, Gem, Bitcoin, Aperture, Sparkles, Bell, ShieldCheck, RotateCw,
  Currency
} from 'lucide-react';
import SearchBar from './SearchBar';
import GameSection from './GameSection';
import { gameData } from './data/games';
import Header from './Header';

type CasinoPageProps = {
  onNavigate?: (page: string) => void;
};

const CasinoPage: React.FC<CasinoPageProps> = ({ onNavigate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);
  const [currentPage, setCurrentPage] = useState('casino');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const connectWallet = async (walletType: string) => {
    if (walletType === 'metamask') {
      setWalletCurrency('ETH');
      localStorage.setItem('walletCurrency', 'ETH');
      await connectMetaMask();
    } else if (
      walletType === 'trustwallet' ||
      walletType === 'walletconnect' ||
      walletType === 'ledger'
    ) {
      setWalletCurrency('ETH');
      localStorage.setItem('walletCurrency', 'ETH');
      await connectWalletConnect();
    } else if (walletType === 'coinbase') {
      setWalletCurrency('ETH');
      localStorage.setItem('walletCurrency', 'ETH');
      await connectCoinbaseWallet();
    } else if (walletType === 'phantom') {
      await connectPhantom();
    } else {
      setTimeout(() => {
        const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        setWalletAddress(mockAddress);
        setWalletCurrency(null); // Clear currency if using mock
        localStorage.setItem('walletAddress', mockAddress);
        localStorage.setItem('walletCurrency', 'ETH'); // Default to ETH for mock
        setShowWalletModal(false);
      }, 1000);
    }
  };

  const connectPhantom = async () => {
    try {
      setIsConnecting(true);
      if (window.phantom && window.phantom.ethereum) {
        setWalletCurrency('ETH');
        localStorage.setItem('walletCurrency', 'ETH');
        const provider = window.phantom.ethereum;
        await provider.request({ method: 'eth_requestAccounts' });
        const ethersProvider = new ethers.BrowserProvider(provider);
        const accounts = await ethersProvider.send('eth_accounts', []);
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          localStorage.setItem('walletAddress', address);
          const balance = await ethersProvider.getBalance(address);
          setWalletBalance(ethers.formatEther(balance));
          localStorage.setItem('walletBalance', ethers.formatEther(balance));
        }
        setShowWalletModal(false);
      } else if (window.phantom && window.phantom.solana) {
        setWalletCurrency('SOL');
        localStorage.setItem('walletCurrency', 'SOL');
        await connectPhantomSolana();
      } else {
        alert('Phantom wallet is not installed. Please install Phantom.');
        window.open('https://phantom.app/', '_blank' );
      }
    } catch (error) {
      console.error('Error connecting with Phantom:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred while connecting with Phantom.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantomSolana = async () => {
    try {
      const solanaProvider = window.phantom!.solana;
      if (!solanaProvider) {
        alert('Phantom Solana provider not found.');
        return;
      }
      const resp = await solanaProvider.connect();
      const publicKey = resp.publicKey?.toString();
      if (publicKey) {
        setWalletAddress(publicKey);
        localStorage.setItem('walletAddress', publicKey);
        const solanaRpc = 'https://api.mainnet-beta.solana.com';
        const balanceResp = await fetch(solanaRpc, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getBalance',
            params: [publicKey]
          } )
        });
        const balanceJson = await balanceResp.json();
        const lamports = balanceJson.result?.value || 0;
        const sol = lamports / 1e9;
        setWalletBalance(sol.toString());
        localStorage.setItem('walletBalance', sol.toString());
        setShowWalletModal(false);
      } else {
        alert('Failed to get Solana public key from Phantom.');
      }
    } catch (error) {
      console.error('Error connecting with Phantom Solana:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred while connecting with Phantom Solana.');
      }
    }
  };

  const connectCoinbaseWallet = async () => {
    try {
      setIsConnecting(true);
      const APP_NAME = 'TucanBit';
      const APP_LOGO_URL = 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp';
      const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/';
      const DEFAULT_CHAIN_ID = 1;

      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
      } );
      const provider = coinbaseWallet.makeWeb3Provider({
        rpcUrl: DEFAULT_ETH_JSONRPC_URL,
        chainId: DEFAULT_CHAIN_ID,
        options: 'all'
      });
      await provider.request({ method: 'eth_requestAccounts' });
      const ethersProvider = new ethers.BrowserProvider(provider);
      const accounts = await ethersProvider.send('eth_accounts', []);
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        const balance = await ethersProvider.getBalance(address);
        setWalletBalance(ethers.formatEther(balance));
        localStorage.setItem('walletBalance', ethers.formatEther(balance));
      }
      setShowWalletModal(false);
    } catch (error) {
      console.error('Error connecting with Coinbase Wallet:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred while connecting with Coinbase Wallet.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    try {
      setIsConnecting(true);
      const provider = await EthereumProvider.init({
        projectId: 'db721a1a35ebd983b0f9c07526cbebd7',
        chains: [1],
        showQrModal: true,
      });
      await provider.enable();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const accounts = await ethersProvider.send('eth_accounts', []);
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        const balance = await ethersProvider.getBalance(address);
        setWalletBalance(ethers.formatEther(balance));
        localStorage.setItem('walletBalance', ethers.formatEther(balance));
      }
      setShowWalletModal(false);
    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred while connecting with WalletConnect.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          localStorage.setItem('walletAddress', address);
          const balance = await provider.getBalance(address);
          setWalletBalance(ethers.formatEther(balance));
          localStorage.setItem('walletBalance', ethers.formatEther(balance));
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An unknown error occurred while connecting to MetaMask.');
        }
      } finally {
        setIsConnecting(false);
        setShowWalletModal(false);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to connect your wallet.');
      window.open('https://metamask.io/download/', '_blank' );
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletCurrency(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('walletCurrency');
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    const savedCurrency = localStorage.getItem('walletCurrency') as 'ETH' | 'SOL' | null;
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setWalletBalance(savedBalance);
      setWalletCurrency(savedCurrency);
    }
  }, []);

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const walletProviders = [
    { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', description: 'Connect using your MetaMask wallet' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png', description: 'Scan QR code with mobile wallet' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp', description: 'Connect with Coinbase extension' },
    { id: 'phantom', name: 'Phantom', icon: 'https://logowik.com/content/uploads/images/phantom3506.jpg', description: 'Solana & Ethereum compatible' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png', description: 'Mobile wallet connection' },
    { id: 'ledger', name: 'Ledger', icon: 'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/60fbcaf3bd0478862b605203_ledger.jpg', description: 'Connect your hardware wallet' }
  ];

  const MainContent = () => {
    return (
      <div className="flex-1 p-6 bg-gray-900">
        <Header />
        <SearchBar />
        
        <div className="space-y-8">
          <GameSection 
            title="New Arrivals" 
            games={gameData.newArrivals}
            showViewAll={true}
          />
          
          <GameSection 
            title="Top 10" 
            games={gameData.topGames}
            showViewAll={false}
          />

           <GameSection 
            title="Whale Specials" 
            games={gameData.whaleSpecials}
            showViewAll={false}
          />

           <GameSection 
            title="Spin Wars" 
            games={gameData.spinWars}
            showViewAll={false}
          />


           <GameSection 
            title="Crypto Games" 
            games={gameData.topGames}
            showViewAll={false}
          />


           <GameSection 
            title="Live Casino" 
            games={gameData.newArrivals}
            showViewAll={false}
          />

           <GameSection 
            title="Buy Features" 
            games={gameData.spinWars}
            showViewAll={false}
          />


           <GameSection 
            title="Win Big" 
            games={gameData.topGames}
            showViewAll={false}
          />

             <GameSection 
            title="Bingo Games" 
            games={gameData.newArrivals}
            showViewAll={false}
          />


   <GameSection 
            title="Book Games" 
            games={gameData.newArrivals}
            showViewAll={true}
          />


            <GameSection 
            title="Cluster Games" 
            games={gameData.whaleSpecials}
            showViewAll={false}
          />


           <GameSection 
            title="Megaways" 
            games={gameData.topGames}
            showViewAll={false}
          />
          
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Wallet Connection Modal*/}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Connect Wallet</h3>
              <button onClick={() => setShowWalletModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="space-y-3 mb-6">
              {walletProviders.map((wallet) => (
                <button key={wallet.id} onClick={() => connectWallet(wallet.id)} className="flex items-center w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200">
                  <img src={wallet.icon} alt={wallet.name} className="w-10 h-10 mr-4" />
                  <div className="text-left">
                    <div className="font-medium text-white">{wallet.name}</div>
                    <div className="text-sm text-gray-400">{wallet.description}</div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm">By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a></p>
          </div>
        </div>
      )}

      <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg>
              </div>
              <div>
                <span className="text-2xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></span>
                <p className="text-xs text-gray-400 mt-1">Crypto Casino & Sportsbook</p>
              </div>
            </div>
          </div>
          {/* Main Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => handleNavigate('home')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-[15px] text-white ${currentPage === 'home' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            {/* Casino */}
            <button
              onClick={() => handleNavigate('casino')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'casino' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Dice5 className="w-5 h-5" />
              <span>Casino</span>
            </button>

            {/* Sports */}
            <button
              onClick={() => handleNavigate('sports')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'sports' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Sports</span>
            </button>

            {/* Lootboxes */}
            <button
              onClick={() => handleNavigate('lootboxes')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'lootboxes' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Gift className="w-5 h-5" />
              <span>Lootboxes</span>
            </button>

            {/* Games Submenu */}
            <div>
              <button
                onClick={() => toggleSubmenu('games')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 text-white"
              >
                <div className="flex items-center space-x-3">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Games</span>
                </div>
                {activeSubmenu === 'games' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>

              {activeSubmenu === 'games' && (
                <div className="pl-10 pt-2 space-y-2">
                  <button onClick={() => handleNavigate('slots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Dice5 className="w-4 h-4" />
                    <span>Slots</span>
                  </button>
                  <button onClick={() => handleNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Table Games</span>
                  </button>
                  <button onClick={() => handleNavigate('roulette')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Roulette</span>
                  </button>
                  <button onClick={() => handleNavigate('blackjack')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Blackjack</span>
                  </button>
                  <button onClick={() => handleNavigate('live-casino')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Users className="w-4 h-4" />
                    <span>Live Casino</span>
                  </button>
                  <button onClick={() => handleNavigate('jackpots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Coins className="w-4 h-4" />
                    <span>Jackpots</span>
                  </button>
                </div>
              )}
            </div>

            {/* Promotions */}
            <button
              onClick={() => onNavigate && onNavigate('promotions')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'promotions' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Gift className="w-5 h-5" />
              <span>Promotions</span>
            </button>

            {/* Wallet Submenu */}
            <div>
              <button
                onClick={() => toggleSubmenu('wallet')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 text-white"
              >
                <div className="flex items-center space-x-3">
                  <Wallet className="w-5 h-5" />
                  <span>Wallet</span>
                </div>
                {activeSubmenu === 'wallet' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>

              {activeSubmenu === 'wallet' && (
                <div className="pl-10 pt-1 space-y-1">
                  <button onClick={() => onNavigate && onNavigate('deposit')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                    <CreditCard className="w-4 h-4" />
                    <span>Deposit</span>
                  </button>
                  <button onClick={() => onNavigate && onNavigate('withdraw')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span>Withdraw</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tournaments */}
            <button
              onClick={() => onNavigate && onNavigate('tournaments')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'tournaments' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Tournaments</span>
            </button>

            {/* Earn */}
            <button
              onClick={() => onNavigate && onNavigate('earn')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'earn' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Coins className="w-5 h-5" />
              <span>Earn</span>
            </button>

            {/* Token Dashboard */}
            <button
              onClick={() => onNavigate && onNavigate('token-dashboard')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'token-dashboard' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Token Dashboard</span>
            </button>

            {/* Support */}
            <button
              onClick={() => onNavigate && onNavigate('support')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'support' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Support</span>
            </button>

            {/* Community */}
            <button
              onClick={() => onNavigate && onNavigate('community')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'community' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <User className="w-5 h-5" />
              <span>Community</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => onNavigate && onNavigate('settings')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white ${currentPage === 'settings' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'hover:bg-gray-800'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-800">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                  {walletBalance && <div className="flex items-center gap-2 mt-1"><span className="text-base font-bold text-yellow-400">{parseFloat(walletBalance).toFixed(4)}</span><span className="text-xs font-semibold text-gray-300">{walletCurrency}</span></div>}
                  <button onClick={disconnectWallet} className="text-xs text-orange-400 hover:text-orange-300">Disconnect</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowWalletModal(true)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-orange-600 transition-all">
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white z-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" fill="currentColor" /><path d="M18 10L24 7L22 12L18 10Z" fill="currentColor" /></svg>
            </div>
            <h1 className="text-xl font-bold text-white"><span className="text-yellow-400">Tucan</span><span className="text-orange-500">Bit</span></h1>
          </div>
        </div>
        <div className="w-6"></div>
      </header>

      {/* Main content with sidebar offset */}
      <main className="pt-16 lg:pt-0 lg:ml-64">
        <MainContent />
      </main>
    </div>
  );
};

export default CasinoPage;