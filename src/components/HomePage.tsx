// TypeScript declaration for Phantom wallet (EVM)
declare global {
  interface Window {
    phantom?: {
      ethereum?: any;
      solana?: any;
    };
  }
}
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
import { BsPeople } from 'react-icons/bs';
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



type HomePageProps = {
  onNavigate: (route: string) => void;
  language?: string;
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate, language }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<'ETH' | 'SOL' | null>(null);

  // Wallet connection functions
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
      // Simulate other wallet connections
      setTimeout(() => {
        const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        setWalletAddress(mockAddress);
        setWalletCurrency('ETH');
        localStorage.setItem('walletAddress', mockAddress);
        localStorage.setItem('walletCurrency', 'ETH');
        setShowWalletModal(false);
      }, 1000);
    }
  };

  // Phantom wallet connection (EVM or Solana)
  const connectPhantom = async () => {
    try {
      setIsConnecting(true);
      // EVM support
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
          // Fetch balance
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
        window.open('https://phantom.app/', '_blank');
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

  // Phantom Solana connection
  const connectPhantomSolana = async () => {
    try {
      const solanaProvider = window.phantom!.solana;
      if (!solanaProvider) {
        alert('Phantom Solana provider not found.');
        return;
      }
      // Connect to Phantom
      const resp = await solanaProvider.connect();
      const publicKey = resp.publicKey?.toString();
      if (publicKey) {
        setWalletAddress(publicKey);
        localStorage.setItem('walletAddress', publicKey);
        // Fetch SOL balance
        const solanaRpc = 'https://api.mainnet-beta.solana.com';
        const balanceResp = await fetch(solanaRpc, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getBalance',
            params: [publicKey]
          })
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

  // Coinbase Wallet connection
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
      });
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
        // Fetch balance
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

  // WalletConnect (Trust Wallet) connection
  const connectWalletConnect = async () => {
    try {
      setIsConnecting(true);
      // WalletConnect v2 provider
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
        // Fetch balance
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
          // Fetch balance
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
      window.open('https://metamask.io/download/', '_blank');
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

  // Check for existing connection on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    const savedCurrency = localStorage.getItem('walletCurrency');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setWalletBalance(savedBalance);
      setWalletCurrency(savedCurrency === 'SOL' ? 'SOL' : 'ETH');
    }
  }, []);

  // Toggle sidebar submenus
  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  // Wallet providers data
  const walletProviders = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
      description: 'Connect using your MetaMask wallet'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png',
      description: 'Scan QR code with mobile wallet'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp',
      description: 'Connect with Coinbase extension'
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: 'https://logowik.com/content/uploads/images/phantom3506.jpg',
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
      icon: 'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/60fbcaf3bd0478862b605203_ledger.jpg',
      description: 'Connect your hardware wallet'
    }
  ];

  // Game categories
  const gameCategories = [
    {
      name: 'Slots',
      icon: <Dice5 className="w-5 h-5" />,
      count: 450,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Live Casino',
      icon: <Users className="w-5 h-5" />,
      count: 32,
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Table Games',
      icon: <BarChart2 className="w-5 h-5" />,
      count: 28,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Jackpots',
      icon: <Coins className="w-5 h-5" />,
      count: 18,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Crypto Games',
      icon: <Bitcoin className="w-5 h-5" />,
      count: 15,
      color: 'from-amber-500 to-red-500'
    }
  ];

  // Featured games (15+ real casino games with details)
  const featuredGames = [
    {
      id: 1,
      name: 'Gates of Olympus',
      provider: 'Pragmatic Play',
      image: gameImage1,
      type: 'Slot',
      volatility: 'High',
      rtp: '96.5%',
      maxWin: 'x5000',
      theme: 'Greek Mythology',
      isNew: false,
      isHot: true,
      minBet: '0.20',
      maxBet: '100'
    },
    {
      id: 2,
      name: 'Crazy Time',
      provider: 'Evolution',
      image: gameImage2,
      type: 'Live Game',
      volatility: 'Very High',
      rtp: '96.08%',
      maxWin: 'x25000',
      theme: 'Game Show',
      isNew: false,
      isHot: true,
      minBet: '0.10',
      maxBet: '2000'
    },
    {
      id: 3,
      name: 'Book of Dead',
      provider: 'Play\'n GO',
      image: gameImage3,
      type: 'Slot',
      volatility: 'High',
      rtp: '96.21%',
      maxWin: 'x5000',
      theme: 'Ancient Egypt',
      isNew: false,
      isHot: true,
      minBet: '0.10',
      maxBet: '50'
    },
    {
      id: 4,
      name: 'Mega Roulette',
      provider: 'Evolution',
      image: gameImage4,
      type: 'Roulette',
      volatility: 'Medium',
      rtp: '97.30%',
      maxWin: 'x36',
      theme: 'Classic',
      isNew: true,
      isHot: false,
      minBet: '0.10',
      maxBet: '5000'
    },
    {
      id: 5,
      name: 'Sweet Bonanza',
      provider: 'Pragmatic Play',
      image: gameImage5,
      type: 'Slot',
      volatility: 'High',
      rtp: '96.51%',
      maxWin: 'x21000',
      theme: 'Candy',
      isNew: false,
      isHot: true,
      minBet: '0.20',
      maxBet: '100'
    },
    {
      id: 6,
      name: 'Lightning Blackjack',
      provider: 'Evolution',
      image: gameImage6,
      type: 'Blackjack',
      volatility: 'Low',
      rtp: '99.50%',
      maxWin: 'x30',
      theme: 'Card Game',
      isNew: false,
      isHot: false,
      minBet: '1',
      maxBet: '5000'
    },
    {
      id: 7,
      name: 'Wolf Gold',
      provider: 'Pragmatic Play',
      image: gameImage7,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '96.01%',
      maxWin: 'x2500',
      theme: 'Wild West',
      isNew: false,
      isHot: false,
      minBet: '0.25',
      maxBet: '125'
    },
    {
      id: 8,
      name: 'Monopoly Live',
      provider: 'Evolution',
      image: gameImage8,
      type: 'Live Game',
      volatility: 'High',
      rtp: '96.23%',
      maxWin: 'x10000',
      theme: 'Board Game',
      isNew: false,
      isHot: true,
      minBet: '0.50',
      maxBet: '2000'
    },
    {
      id: 9,
      name: 'Starburst',
      provider: 'NetEnt',
      image: gameImage9,
      type: 'Slot',
      volatility: 'Low',
      rtp: '96.09%',
      maxWin: 'x500',
      theme: 'Space',
      isNew: false,
      isHot: false,
      minBet: '0.10',
      maxBet: '100'
    },
    {
      id: 10,
      name: 'Gonzo\'s Quest',
      provider: 'NetEnt',
      image: gameImage10,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '95.77%',
      maxWin: 'x2500',
      theme: 'Adventure',
      isNew: false,
      isHot: false,
      minBet: '0.20',
      maxBet: '50'
    },
    {
      id: 11,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage11,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },
    {
      id: 12,
      name: 'Lightning Roulette',
      provider: 'Evolution',
      image: gameImage13,
      type: 'Roulette',
      volatility: 'Medium',
      rtp: '97.30%',
      maxWin: 'x500',
      theme: 'Classic',
      isNew: false,
      isHot: true,
      minBet: '0.20',
      maxBet: '2000'
    },
    {
      id: 13,
      name: 'Dead or Alive 2',
      provider: 'NetEnt',
      image: gameImage14,
      type: 'Slot',
      volatility: 'Very High',
      rtp: '96.82%',
      maxWin: 'x100000',
      theme: 'Wild West',
      isNew: false,
      isHot: true,
      minBet: '0.09',
      maxBet: '18'
    },
    {
      id: 14,
      name: 'Dragon Tiger',
      provider: 'Evolution',
      image: gameImage15,
      type: 'Card Game',
      volatility: 'Low',
      rtp: '96.27%',
      maxWin: 'x11',
      theme: 'Asian',
      isNew: false,
      isHot: false,
      minBet: '1',
      maxBet: '5000'
    },
    {
      id: 15,
      name: 'Big Bass Bonanza',
      provider: 'Pragmatic Play',
      image: gameImage16,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '96.71%',
      maxWin: 'x2100',
      theme: 'Fishing',
      isNew: true,
      isHot: true,
      minBet: '0.20',
      maxBet: '240'
    },
    {
      id: 16,
      name: 'Monopoly Live',
      provider: 'Evolution',
      image: gameImage17,
      type: 'Live Game',
      volatility: 'High',
      rtp: '96.23%',
      maxWin: 'x10000',
      theme: 'Board Game',
      isNew: false,
      isHot: true,
      minBet: '0.50',
      maxBet: '2000'
    },
    {
      id: 17,
      name: 'Starburst',
      provider: 'NetEnt',
      image: gameImage19,
      type: 'Slot',
      volatility: 'Low',
      rtp: '96.09%',
      maxWin: 'x500',
      theme: 'Space',
      isNew: false,
      isHot: false,
      minBet: '0.10',
      maxBet: '100'
    },
    {
      id: 18,
      name: 'Gonzo\'s Quest',
      provider: 'NetEnt',
      image: gameImage18,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '95.77%',
      maxWin: 'x2500',
      theme: 'Adventure',
      isNew: false,
      isHot: false,
      minBet: '0.20',
      maxBet: '50'
    },
    {
      id: 19,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage19,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },
      {
      id: 20,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage22,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },
      {
      id: 21,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage21,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },





    {
      id: 22,
      name: 'Book of Dead',
      provider: 'Play\'n GO',
      image: gameImage3,
      type: 'Slot',
      volatility: 'High',
      rtp: '96.21%',
      maxWin: 'x5000',
      theme: 'Ancient Egypt',
      isNew: false,
      isHot: true,
      minBet: '0.10',
      maxBet: '50'
    },
    {
      id: 23,
      name: 'Mega Roulette',
      provider: 'Evolution',
      image: gameImage4,
      type: 'Roulette',
      volatility: 'Medium',
      rtp: '97.30%',
      maxWin: 'x36',
      theme: 'Classic',
      isNew: true,
      isHot: false,
      minBet: '0.10',
      maxBet: '5000'
    },
    {
      id: 24,
      name: 'Sweet Bonanza',
      provider: 'Pragmatic Play',
      image: gameImage5,
      type: 'Slot',
      volatility: 'High',
      rtp: '96.51%',
      maxWin: 'x21000',
      theme: 'Candy',
      isNew: false,
      isHot: true,
      minBet: '0.20',
      maxBet: '100'
    },
    {
      id: 25,
      name: 'Lightning Blackjack',
      provider: 'Evolution',
      image: gameImage6,
      type: 'Blackjack',
      volatility: 'Low',
      rtp: '99.50%',
      maxWin: 'x30',
      theme: 'Card Game',
      isNew: false,
      isHot: false,
      minBet: '1',
      maxBet: '5000'
    },
    {
      id: 26,
      name: 'Wolf Gold',
      provider: 'Pragmatic Play',
      image: gameImage7,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '96.01%',
      maxWin: 'x2500',
      theme: 'Wild West',
      isNew: false,
      isHot: false,
      minBet: '0.25',
      maxBet: '125'
    },
    {
      id: 27,
      name: 'Monopoly Live',
      provider: 'Evolution',
      image: gameImage8,
      type: 'Live Game',
      volatility: 'High',
      rtp: '96.23%',
      maxWin: 'x10000',
      theme: 'Board Game',
      isNew: false,
      isHot: true,
      minBet: '0.50',
      maxBet: '2000'
    },
    {
      id: 28,
      name: 'Starburst',
      provider: 'NetEnt',
      image: gameImage9,
      type: 'Slot',
      volatility: 'Low',
      rtp: '96.09%',
      maxWin: 'x500',
      theme: 'Space',
      isNew: false,
      isHot: false,
      minBet: '0.10',
      maxBet: '100'
    },
    {
      id: 29,
      name: 'Gonzo\'s Quest',
      provider: 'NetEnt',
      image: gameImage10,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '95.77%',
      maxWin: 'x2500',
      theme: 'Adventure',
      isNew: false,
      isHot: false,
      minBet: '0.20',
      maxBet: '50'
    },
    {
      id: 30,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage11,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },
    {
      id: 31,
      name: 'Lightning Roulette',
      provider: 'Evolution',
      image: gameImage13,
      type: 'Roulette',
      volatility: 'Medium',
      rtp: '97.30%',
      maxWin: 'x500',
      theme: 'Classic',
      isNew: false,
      isHot: true,
      minBet: '0.20',
      maxBet: '2000'
    },
    {
      id: 32,
      name: 'Dead or Alive 2',
      provider: 'NetEnt',
      image: gameImage14,
      type: 'Slot',
      volatility: 'Very High',
      rtp: '96.82%',
      maxWin: 'x100000',
      theme: 'Wild West',
      isNew: false,
      isHot: true,
      minBet: '0.09',
      maxBet: '18'
    },
    {
      id: 33,
      name: 'Dragon Tiger',
      provider: 'Evolution',
      image: gameImage15,
      type: 'Card Game',
      volatility: 'Low',
      rtp: '96.27%',
      maxWin: 'x11',
      theme: 'Asian',
      isNew: false,
      isHot: false,
      minBet: '1',
      maxBet: '5000'
    },
    {
      id: 34,
      name: 'Big Bass Bonanza',
      provider: 'Pragmatic Play',
      image: gameImage16,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '96.71%',
      maxWin: 'x2100',
      theme: 'Fishing',
      isNew: true,
      isHot: true,
      minBet: '0.20',
      maxBet: '240'
    },
    {
      id: 35,
      name: 'Monopoly Live',
      provider: 'Evolution',
      image: gameImage17,
      type: 'Live Game',
      volatility: 'High',
      rtp: '96.23%',
      maxWin: 'x10000',
      theme: 'Board Game',
      isNew: false,
      isHot: true,
      minBet: '0.50',
      maxBet: '2000'
    },
    {
      id: 36,
      name: 'Starburst',
      provider: 'NetEnt',
      image: gameImage19,
      type: 'Slot',
      volatility: 'Low',
      rtp: '96.09%',
      maxWin: 'x500',
      theme: 'Space',
      isNew: false,
      isHot: false,
      minBet: '0.10',
      maxBet: '100'
    },
    {
      id: 37,
      name: 'Gonzo\'s Quest',
      provider: 'NetEnt',
      image: gameImage18,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '95.77%',
      maxWin: 'x2500',
      theme: 'Adventure',
      isNew: false,
      isHot: false,
      minBet: '0.20',
      maxBet: '50'
    },



    {
      id: 36,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage19,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },
      {
      id: 37,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage22,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },
      {
      id: 38,
      name: 'Mega Moolah',
      provider: 'Microgaming',
      image: gameImage21,
      type: 'Slot',
      volatility: 'Medium',
      rtp: '88.12%',
      maxWin: 'Progressive',
      theme: 'Jungle',
      isNew: false,
      isHot: true,
      minBet: '0.25',
      maxBet: '6.25'
    },





    {
      id: 39,
      name: 'Book of Dead',
      provider: 'Play\'n GO',
      image: gameImage3,
      type: 'Slot',
      volatility: 'High',
      rtp: '96.21%',
      maxWin: 'x5000',
      theme: 'Ancient Egypt',
      isNew: false,
      isHot: true,
      minBet: '0.10',
      maxBet: '50'
    },
    {
      id: 40,
      name: 'Mega Roulette',
      provider: 'Evolution',
      image: gameImage4,
      type: 'Roulette',
      volatility: 'Medium',
      rtp: '97.30%',
      maxWin: 'x36',
      theme: 'Classic',
      isNew: true,
      isHot: false,
      minBet: '0.10',
      maxBet: '5000'
    },
  ];

  // Promotions
  const promotions = [
    {
      title: 'Welcome Package',
      description: 'Get up to 5 BTC + 200 free spins across your first 3 deposits',
      image: 'https://iili.io/FwUxYcN.png',
      bonus: '200% Match',
      code: 'TUCAN200',
      featured: true
    },
    {
      title: 'Daily Cashback',
      description: '10% cashback on all losses every day for VIP members',
      image: 'https://cdn.midjourney.com/0ac3937e-6f1e-438c-b549-124318dd6b3f/0_2.png',
      bonus: '10% Cashback',
      code: 'CASHBACK10'
    },
    {
      title: 'High Roller Bonus',
      description: 'Exclusive 25% bonus on deposits over 1 BTC',
      image: 'https://cdn.midjourney.com/54d71f3e-7598-4f36-a850-d7dd929d5e7c/0_3.png',
      bonus: '25% Extra',
      code: 'HIGHROLLER'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Connect Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {walletProviders.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => connectWallet(wallet.id)}
                  className="flex items-center w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200"
                >
                  <img src={wallet.icon} alt={wallet.name} className="w-10 h-10 mr-4" />
                  <div className="text-left">
                    <div className="font-medium text-white">{wallet.name}</div>
                    <div className="text-sm text-gray-400">{wallet.description}</div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-gray-400 text-sm">
              By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
            </p>
          </div>
        </div>
      )}

      {/* Sidebar */}
<div className={`fixed inset-y-0 left-0 z-[60] w-54 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 border-r border-gray-800`}>
        <div className="flex flex-col h-full">
          {/* Logo */}

         
         <div className="p-6 border-b border-gray-800 relative z-50 bg-gray-900">
  <div className="flex items-center space-x-3 relative z-50">
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
      <svg
        className="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
          fill="currentColor"
        />
        <path
          d="M18 10L24 7L22 12L18 10Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div className="relative z-50">
      <span className="text-2xl font-bold text-white">
        <span className="text-yellow-400">Tucan</span>
        <span className="text-orange-500">Bit</span>
      </span>
      <p className="text-xs text-gray-400 mt-1 relative z-50">Crypto Casino & Sportsbook</p>
    </div>
  </div>
</div>
          {/* Main Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
           <button
    onClick={() => onNavigate('home')}
    className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-[15px] text-white"
  >
    <Home className="w-5 h-5" />
    <span>Home</span>
  </button>

  {/* Casino */}
  <button
    onClick={() => onNavigate('casino')}
    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
  >
    <Dice5 className="w-5 h-5" />
    <span>Casino</span>
  </button>

  {/* Sports */}
  <button
    onClick={() => onNavigate('sports')}
    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
  >
    <Trophy className="w-5 h-5" />
    <span>Sports</span>
  </button>

  {/* Lootboxes */}
  <button
    onClick={() => onNavigate('lootboxes')}
    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
  >
    <Gift className="w-5 h-5" />
    <span>Lootboxes</span>
  </button>

            {/* Games Submenu */}
            <div>
              <button
                onClick={() => toggleSubmenu('games')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#2A1B4F] text-white"
              >
                <div className="flex items-center space-x-3">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Games</span>
                </div>
                {activeSubmenu === 'games' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>

              {activeSubmenu === 'games' && (
                <div className="pl-10 pt-2 space-y-2">
                  <button onClick={() => onNavigate('slots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Dice5 className="w-4 h-4" />
                    <span>Slots</span>
                  </button>
                  <button onClick={() => onNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Table Games</span>
                  </button>
                  <button onClick={() => onNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Roulette</span>
                  </button>
                  <button onClick={() => onNavigate('table-games')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <BarChart2 className="w-4 h-4" />
                    <span>Blackjack</span>
                  </button>

                  <button onClick={() => onNavigate('live-casino')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Users className="w-4 h-4" />
                    <span>Live Casino</span>
                  </button>
                  <button onClick={() => onNavigate('jackpots')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white">
                    <Coins className="w-4 h-4" />
                    <span>Jackpots</span>

                  </button>
                </div>
              )}
            </div>

            {/* Promotions */}
            <button
              onClick={() => onNavigate('promotions')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
            >
              <Gift className="w-5 h-5" />
              <span>Promotions</span>
            </button>

            {/* Wallet */}
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
                <button onClick={() => onNavigate('deposit')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <CreditCard className="w-4 h-4" />
                  <span>Deposit</span>
                </button>
                <button onClick={() => onNavigate('withdraw')} className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:text-white w-full text-left">
                  <LogOut className="w-4 h-4" />
                  <span>Withdraw</span>
                </button>
              </div>
            )}



            {/* Tournaments */}
            <button
              onClick={() => onNavigate('tournaments')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
            >
              <Trophy className="w-5 h-5" />
              <span>Tournaments</span>
            </button>

            {/* Earn */}
            <button
              onClick={() => onNavigate('earn')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
            >
              <Coins className="w-5 h-5" />
              <span>Earn</span>
            </button>

            {/* Token Dashboard */}
            <button
              onClick={() => onNavigate('token-dashboard')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Token Dashboard</span>
            </button>

            {/* Support */}
            <button
              onClick={() => onNavigate('support')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Support</span>
            </button>

            {/* Community */}
            <button
              onClick={() => onNavigate('community')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
            >
              <User className="w-5 h-5" />
              <span>Community</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-white"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>

          </nav>

          {/* User Profile / Wallet */}
          <div className="p-4 border-t border-gray-800">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                  {walletBalance && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base font-bold text-yellow-400">
                        {parseFloat(walletBalance).toFixed(4)}
                      </span>
                      <span className="text-xs font-semibold text-gray-300">
                        {walletCurrency === 'SOL' ? 'SOL' : 'ETH'}
                      </span>
                      <button
                        onClick={async () => {
                          // Refresh balance
                          if (walletCurrency === 'ETH' && walletAddress) {
                            try {
                              let provider;
                              if (window.ethereum) {
                                provider = new ethers.BrowserProvider(window.ethereum);
                              } else if (window.phantom && window.phantom.ethereum) {
                                provider = new ethers.BrowserProvider(window.phantom.ethereum);
                              } else {
                                provider = null;
                              }
                              if (provider) {
                                const balance = await provider.getBalance(walletAddress);
                                setWalletBalance(ethers.formatEther(balance));
                                localStorage.setItem('walletBalance', ethers.formatEther(balance));
                              }
                            } catch {}
                          } else if (walletCurrency === 'SOL' && walletAddress) {
                            try {
                              const solanaRpc = 'https://api.mainnet-beta.solana.com';
                              const balanceResp = await fetch(solanaRpc, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  jsonrpc: '2.0',
                                  id: 1,
                                  method: 'getBalance',
                                  params: [walletAddress]
                                })
                              });
                              const balanceJson = await balanceResp.json();
                              const lamports = balanceJson.result?.value || 0;
                              const sol = lamports / 1e9;
                              setWalletBalance(sol.toString());
                              localStorage.setItem('walletBalance', sol.toString());
                            } catch {}
                          }
                        }}
                        className="ml-1 px-1 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-yellow-400 text-xs font-semibold border border-yellow-400/30 transition"
                        title="Refresh Balance"
                      >
                        <RotateCw className="w-3 h-3 inline" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={disconnectWallet}
                    className="text-xs text-orange-400 hover:text-orange-300"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}

  <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700">
  <button 
    onClick={() => setSidebarOpen(!sidebarOpen)} 
    className="text-white z-40"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>
  
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
            fill="currentColor"
          />
          <path
            d="M18 10L24 7L22 12L18 10Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-white">
        <span className="text-yellow-400">Tucan</span>
        <span className="text-orange-500">Bit</span>
      </h1>
    </div>
  </div>
  
  <div className="w-6"></div>
</header>

      {/* Main Content */}
      <main className={`lg:ml-64 pt-16 lg:pt-0 ${sidebarOpen ? 'ml-64' : ''}`}>
        {/* Hero Section - Showcasing the background image */}
        <section className="relative overflow-hidden h-[70vh] min-h-[600px] flex items-center">
          <div
            className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center"
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
                <button
                  onClick={() => onNavigate('lobby')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>Play Now</span>
                </button>

                <button
                  onClick={() => setShowWalletModal(true)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Wallet className="w-6 h-6" />
                  <span>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        {/* <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-8 border-y border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {gameCategories.map((category, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.count}+
                  </div>
                  <div className="flex items-center justify-center text-gray-300">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Featured Games Section */}
        {/* <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white flex items-center mb-4 md:mb-0">
                <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
                Featured Games
              </h2>
              <button
                onClick={() => onNavigate('lobby')}
                className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                <span>View All Games</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {featuredGames.slice(0, 5).map((game) => (
                <div
                  key={game.id}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {game.isHot && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        <span>HOT</span>
                      </div>
                    )}

                    {game.isNew && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Aperture className="w-3 h-3 mr-1" />
                        <span>NEW</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-lg font-bold text-white">{game.name}</h3>
                          <p className="text-yellow-400 text-sm">{game.provider}</p>
                        </div>
                        <span className="bg-gray-900/80 text-white px-2 py-1 rounded text-xs">
                          {game.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-400">Volatility</div>
                        <div className={`text-sm font-medium ${game.volatility === 'High' || game.volatility === 'Very High'
                          ? 'text-red-400'
                          : game.volatility === 'Medium'
                            ? 'text-yellow-400'
                            : 'text-green-400'
                          }`}>
                          {game.volatility}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400">RTP</div>
                        <div className="text-sm font-medium text-green-400">{game.rtp}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400">Max Win</div>
                        <div className="text-sm font-medium text-purple-400">{game.maxWin}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400">Theme</div>
                        <div className="text-sm font-medium text-blue-400">{game.theme}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(`game/${game.id}`)}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Promotions Section */}
        {/* <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white flex items-center mb-4 md:mb-0">
                <Gift className="w-8 h-8 text-yellow-400 mr-3" />
                Latest Promotions
              </h2>
              <button
                onClick={() => onNavigate('promotions')}
                className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                <span>View All Promotions</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {promotions.map((promo, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ${promo.featured ? 'md:col-span-2' : ''}`}
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      {promo.bonus}
                    </div>
                    {promo.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        <span>FEATURED</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{promo.title}</h3>
                    <p className="text-gray-300 mb-4">{promo.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-gray-900/50 text-yellow-400 px-4 py-2 rounded-lg text-sm font-mono border border-yellow-400/20">
                        CODE: {promo.code}
                      </span>
                      <button
                        onClick={() => onNavigate('promotions')}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
                      >
                        Claim Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* All Games Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <h2 className="text-3xl font-bold text-white mb-10 text-center">
              Explore Our Game Collection
            </h2> */}
{/* 
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-medium">
                All Games
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium">
                Slots
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium">
                Live Casino
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium">
                Table Games
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium">
                Jackpots
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium">
                New Releases
              </button>
            </div> */}

            {/* Games Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {featuredGames.map((game) => (
                
                <div
                  key={game.id}
                  className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/30"
                  onClick={() => onNavigate(`game/${game.id}`)}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {game.isHot && (
                      <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center">
                        <Zap className="w-2 h-2 mr-0.5" />
                        <span>HOT</span>
                      </div>
                    )}

                    {game.isNew && (
                      <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center">
                        <span>NEW</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-bold text-white mb-1 truncate">{game.name}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-yellow-400 text-xs">{game.provider}</span>
                      <span className="text-gray-400 text-xs">{game.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span className="text-xs">{game.maxWin}</span>
                      </div>
                      <span className={`text-xs px-1 py-0.5 rounded ${game.volatility === 'High' || game.volatility === 'Very High'
                        ? 'bg-red-500/10 text-red-400'
                        : game.volatility === 'Medium'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-green-500/10 text-green-400'
                        }`}>
                        {game.volatility}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => onNavigate('lobby')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-2 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>see over 300+ games</span>
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
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
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
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


    </div>
  );
};

export default HomePage;