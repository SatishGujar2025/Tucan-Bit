import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const WalletConnectModal: React.FC = () => {
  // Get functions to CLOSE the modal and SET the wallet state from the context
  const { closeModal, setWalletAddress, setWalletBalance, setWalletCurrency } = useAppContext();

  const [isConnecting, setIsConnecting] = useState(false);

  // --- Wallet Providers List (from your original file) ---
  const walletProviders = [
    { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', description: 'Connect using your MetaMask wallet' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png', description: 'Scan QR code with mobile wallet' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp', description: 'Connect with Coinbase extension' },
    { id: 'phantom', name: 'Phantom', icon: 'https://logowik.com/content/uploads/images/phantom3506.jpg', description: 'Solana & Ethereum compatible' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png', description: 'Mobile wallet connection' },
    { id: 'ledger', name: 'Ledger', icon: 'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/60fbcaf3bd0478862b605203_ledger.jpg', description: 'Connect your hardware wallet' }
  ];

  // --- Full Wallet Connection Functions (from your original file) ---
  const connectWallet = async (walletType: string) => {
    if (walletType === 'metamask') await connectMetaMask();
    else if (walletType === 'walletconnect' || walletType === 'trustwallet' || walletType === 'ledger') await connectWalletConnect();
    else if (walletType === 'coinbase') await connectCoinbaseWallet();
    else if (walletType === 'phantom') await connectPhantom();
    
    closeModal();
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum === 'undefined') return alert('MetaMask is not installed.');
    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        const address = accounts[0];
        const balance = await provider.getBalance(address);
        
        setWalletAddress(address);
        setWalletBalance(ethers.formatEther(balance));
        setWalletCurrency('ETH');

        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletBalance', ethers.formatEther(balance));
        localStorage.setItem('walletCurrency', 'ETH');
      }
    } catch (error) { console.error("MetaMask connection error:", error); } 
      finally { setIsConnecting(false); }
  };

  const connectWalletConnect = async () => {
    try {
      setIsConnecting(true);
      const provider = await EthereumProvider.init({
        projectId: 'db721a1a35ebd983b0f9c07526cbebd7', // YOUR_PROJECT_ID
        chains: [1],
        showQrModal: true,
      });
      await provider.enable();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const accounts = await ethersProvider.send('eth_accounts', []);
      if (accounts.length > 0) {
        const address = accounts[0];
        const balance = await ethersProvider.getBalance(address);

        setWalletAddress(address);
        setWalletBalance(ethers.formatEther(balance));
        setWalletCurrency('ETH');

        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletBalance', ethers.formatEther(balance));
        localStorage.setItem('walletCurrency', 'ETH');
      }
    } catch (error) { console.error('WalletConnect error:', error); } 
      finally { setIsConnecting(false); }
  };
  
  // You can add the full implementations for connectPhantom and connectCoinbaseWallet here as well
  const connectPhantom = async () => { alert("Connecting Phantom..."); };
  const connectCoinbaseWallet = async () => { alert("Connecting Coinbase Wallet..."); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Connect Wallet</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="space-y-3 mb-6">
          {walletProviders.map((wallet) => (
            <button 
              key={wallet.id} 
              onClick={() => connectWallet(wallet.id)} 
              disabled={isConnecting}
              className="flex items-center w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200 disabled:opacity-50"
            >
              <img src={wallet.icon} alt={wallet.name} className="w-10 h-10 mr-4" />
              <div className="text-left">
                <div className="font-medium text-white">{wallet.name}</div>
                <div className="text-sm text-gray-400">{wallet.description}</div>
              </div>
              {isConnecting && <div className="ml-auto w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>}
            </button>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm">
          By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default WalletConnectModal;