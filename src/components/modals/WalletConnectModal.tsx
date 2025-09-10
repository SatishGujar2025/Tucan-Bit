import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { ethers } from 'ethers';
import { walletService } from '../../services/walletService';
import WalletConnectQRModal from './WalletConnectQRModal';

const WalletConnectModal: React.FC = () => {
  // Get functions to CLOSE the modal and SET the wallet state from the context
  const { closeModal, connectWallet: contextConnectWallet, fetchUserProfile } = useAppContext();
  const { showToast } = useToast();

  const [isConnecting, setIsConnecting] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  // Reset modal state when it opens
  useEffect(() => {
    setIsConnecting(false);
    setShowQRModal(false);
    setSelectedWallet(null);
  }, []);


  // --- Wallet Providers List ---
  const walletProviders = [
    { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', description: 'Connect using your MetaMask wallet' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png', description: 'Scan QR code with mobile wallet' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp', description: 'Connect with Coinbase extension' },
    { id: 'phantom', name: 'Phantom', icon: 'https://logowik.com/content/uploads/images/phantom3506.jpg', description: 'Solana & Ethereum compatible' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png', description: 'Mobile wallet connection' },
    { id: 'ledger', name: 'Ledger', icon: 'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/60fbcaf3bd0478862b605203_ledger.jpg', description: 'Connect your hardware wallet' }
  ];

  // --- Full Wallet Connection Functions with Backend Integration ---
  const connectWallet = async (walletType: string) => {
    try {
      setSelectedWallet(walletType);
      setIsConnecting(true);
      
      if (walletType === 'metamask') {
        await connectMetaMaskWithAuth();
      } else if (walletType === 'trustwallet' || walletType === 'walletconnect') {
        // Show QR modal for Trust Wallet and WalletConnect
        setShowQRModal(true);
        return;
      }
    
    closeModal();
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert(error instanceof Error ? error.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  // MetaMask Authentication with Backend Integration
  const connectMetaMaskWithAuth = async () => {
    try {
      console.log('Starting MetaMask authentication...');
      const authResponse = await walletService.connectMetaMask();
      
      // Store authentication tokens
      localStorage.setItem('access_token', authResponse.access_token);
      localStorage.setItem('refresh_token', authResponse.refresh_token);
      
      // Update wallet state using context
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length > 0) {
        const address = accounts[0];
        const balance = await provider.getBalance(address);
        
        // Use context to update wallet state
        contextConnectWallet('metamask');

        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletBalance', ethers.formatEther(balance));
        localStorage.setItem('walletCurrency', 'ETH');
      }
      
      // Show success message based on user type
      if (authResponse.is_new_user) {
        showToast('success', 'Welcome to TucanBIT!', 'Your MetaMask wallet has been connected successfully!');
      } else {
        showToast('success', 'Welcome back!', 'MetaMask wallet connected successfully!');
      }
      
      // Close modal and use proper authentication flow
      closeModal();
      
      // Use the loginWithWallet function from context
      const { loginWithWallet } = useAppContext();
      loginWithWallet(authResponse);
      
      // Fetch user profile from API to get complete user information
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Failed to fetch user profile after MetaMask login:', error);
        // Don't show error to user as login was successful
      }
      
    } catch (error) {
      console.error('MetaMask authentication error:', error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showToast('error', 'MetaMask Connection Failed', errorMessage);
      throw error;
    }
  };

  // Coinbase Wallet Authentication
  const connectCoinbaseWithAuth = async () => {
    try {
      const authResponse = await walletService.connectCoinbaseWallet();
      
      // Store authentication tokens
      localStorage.setItem('access_token', authResponse.access_token);
      localStorage.setItem('refresh_token', authResponse.refresh_token);
      
      // Show success message
      if (authResponse.is_new_user) {
        showToast('success', 'Welcome to TucanBIT!', 'Your Coinbase wallet has been connected successfully!');
      } else {
        showToast('success', 'Welcome back!', 'Coinbase wallet connected successfully!');
      }
      
      // Close modal and use proper authentication flow
      closeModal();
      
      // Use the loginWithWallet function from context
      const { loginWithWallet } = useAppContext();
      loginWithWallet(authResponse);
      
      // Fetch user profile from API to get complete user information
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Failed to fetch user profile after Coinbase login:', error);
        // Don't show error to user as login was successful
      }
      
    } catch (error) {
      console.error('Coinbase authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showToast('error', 'Coinbase Connection Failed', errorMessage);
      throw error;
    }
  };

  // Phantom Wallet Authentication
  const connectPhantomWithAuth = async () => {
    try {
      const authResponse = await walletService.connectPhantom();
      
      // Store authentication tokens
      localStorage.setItem('access_token', authResponse.access_token);
      localStorage.setItem('refresh_token', authResponse.refresh_token);
      
      // Show success message
      if (authResponse.is_new_user) {
        showToast('success', 'Welcome to TucanBIT!', 'Your Phantom wallet has been connected successfully!');
      } else {
        showToast('success', 'Welcome back!', 'Phantom wallet connected successfully!');
      }
      
      // Close modal and use proper authentication flow
      closeModal();
      
      // Use the loginWithWallet function from context
      const { loginWithWallet } = useAppContext();
      loginWithWallet(authResponse);
      
      // Fetch user profile from API to get complete user information
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Failed to fetch user profile after Phantom login:', error);
        // Don't show error to user as login was successful
      }
      
    } catch (error) {
      console.error('Phantom authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showToast('error', 'Phantom Connection Failed', errorMessage);
      throw error;
    }
  };

  // Ledger Wallet Authentication
  const connectLedgerWithAuth = async () => {
    try {
      const authResponse = await walletService.connectLedger();
      
      // Store authentication tokens
      localStorage.setItem('access_token', authResponse.access_token);
      localStorage.setItem('refresh_token', authResponse.refresh_token);
      
      // Show success message
      if (authResponse.is_new_user) {
        showToast('success', 'Welcome to TucanBIT!', 'Your Ledger wallet has been connected successfully!');
      } else {
        showToast('success', 'Welcome back!', 'Ledger wallet connected successfully!');
      }
      
      // Close modal and use proper authentication flow
      closeModal();
      
      // Use the loginWithWallet function from context
      const { loginWithWallet } = useAppContext();
      loginWithWallet(authResponse);
      
      // Fetch user profile from API to get complete user information
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Failed to fetch user profile after Ledger login:', error);
        // Don't show error to user as login was successful
      }
      
    } catch (error) {
      console.error('Ledger authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showToast('error', 'Ledger Connection Failed', errorMessage);
      throw error;
    }
  };

  // QR Modal Success Handler
  const handleQRSuccess = async (authResponse: any) => {
    // Store authentication tokens
    localStorage.setItem('access_token', authResponse.access_token);
    localStorage.setItem('refresh_token', authResponse.refresh_token);
    
    // Show success message based on user type
    if (authResponse.is_new_user) {
      showToast('success', 'Welcome to TucanBIT!', 'Your wallet has been connected successfully!');
    } else {
      showToast('success', 'Welcome back!', 'Wallet connected successfully!');
    }
    
    // Close modals and use proper authentication flow
    setShowQRModal(false);
    closeModal();
    
    // Use the loginWithWallet function from context
    const { loginWithWallet } = useAppContext();
    loginWithWallet(authResponse);
    
    // Fetch user profile from API to get complete user information
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error('Failed to fetch user profile after QR wallet login:', error);
      // Don't show error to user as login was successful
    }
  };

  // QR Modal Error Handler
  const handleQRError = (error: string) => {
    showToast('error', 'Wallet Connection Failed', error);
    setShowQRModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 w-[400px] max-w-full border border-gray-700 shadow-2xl">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center">
              <button className="text-gray-400 hover:text-white mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </button>
          <h3 className="text-lg sm:text-xl font-bold text-white">Connect Wallet</h3>
            </div>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
          </button>
        </div>
          
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {walletProviders.map((wallet) => (
            <button 
              key={wallet.id} 
              onClick={() => connectWallet(wallet.id)} 
              disabled={isConnecting}
                className="flex items-center w-full p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200 disabled:opacity-50"
            >
              <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4" />
              <div className="text-left flex-1">
                <div className="font-medium text-white text-sm sm:text-base">{wallet.name}</div>
                <div className="text-xs sm:text-sm text-gray-400">{wallet.description}</div>
              </div>
                {wallet.id === 'metamask' && (window.ethereum as any)?.isMetaMask && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">INSTALLED</span>
                )}
                {wallet.id === 'coinbase' && (window.ethereum as any)?.isCoinbaseWallet && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">INSTALLED</span>
                )}
                {wallet.id === 'phantom' && (window.ethereum as any)?.isPhantom && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">INSTALLED</span>
                )}
                {wallet.id === 'walletconnect' && (
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">470+</span>
                )}
                {wallet.id === 'trustwallet' && (
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">MOBILE</span>
                )}
                {wallet.id === 'ledger' && (
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">HARDWARE</span>
                )}
                {isConnecting && selectedWallet === wallet.id && (
                  <div className="ml-auto w-4 h-4 sm:w-5 sm:h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                )}
            </button>
          ))}
        </div>
          
        <p className="text-center text-gray-400 text-xs sm:text-sm">
          By connecting, I accept TucanBit's <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>

      {showQRModal && (
        <WalletConnectQRModal
          onClose={() => setShowQRModal(false)}
          onSuccess={handleQRSuccess}
          onError={handleQRError}
        />
      )}
    </>
  );
};

export default WalletConnectModal;