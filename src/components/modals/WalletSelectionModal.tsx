import React, { useState, useEffect } from 'react';
import { walletService } from '../../services/walletService';

interface WalletInfo {
  id: string;
  name: string;
  icon: string;
  isInstalled: boolean;
  isRecentlyUsed: boolean;
  lastUsed?: Date;
  connectionMethod: 'direct' | 'walletconnect';
}

interface WalletSelectionModalProps {
  onClose: () => void;
  onWalletSelected: (walletType: string) => void;
}

const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({ onClose, onWalletSelected }) => {
  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
  const [recentlyUsedWallets, setRecentlyUsedWallets] = useState<WalletInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectAvailableWallets();
  }, []);

  const detectAvailableWallets = () => {
    const wallets: WalletInfo[] = [
      {
        id: 'metamask',
        name: 'MetaMask',
        icon: 'https://cdn.iconscout.com/icon/free/png-512/free-metamask-2728406-2261817.png?f=webp&w=256',
        isInstalled: false,
        isRecentlyUsed: false,
        connectionMethod: 'direct'
      },
      {
        id: 'phantom',
        name: 'Phantom',
        icon: 'https://cdn.iconscout.com/icon/free/png-512/free-phantom-3521426-2944869.png?f=webp&w=256',
        isInstalled: false,
        isRecentlyUsed: false,
        connectionMethod: 'direct'
      },
      {
        id: 'trustwallet',
        name: 'Trust Wallet',
        icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png',
        isInstalled: false,
        isRecentlyUsed: false,
        connectionMethod: 'walletconnect'
      },
      {
        id: 'coinbase',
        name: 'Coinbase Wallet',
        icon: 'https://cdn.iconscout.com/icon/free/png-512/free-coinbase-3521426-2944869.png?f=webp&w=256',
        isInstalled: false,
        isRecentlyUsed: false,
        connectionMethod: 'walletconnect'
      },
      {
        id: 'brave',
        name: 'Brave Wallet',
        icon: 'https://cdn.iconscout.com/icon/free/png-512/free-brave-3521426-2944869.png?f=webp&w=256',
        isInstalled: false,
        isRecentlyUsed: false,
        connectionMethod: 'direct'
      },
      {
        id: 'walletconnect',
        name: 'WalletConnect',
        icon: 'https://cdn.iconscout.com/icon/free/png-512/free-walletconnect-3521426-2944869.png?f=webp&w=256',
        isInstalled: true, // Always available
        isRecentlyUsed: false,
        connectionMethod: 'walletconnect'
      }
    ];

    // Detect installed wallets
    if (window.ethereum) {
      const provider = window.ethereum as any;
      
      if (provider.isMetaMask) {
        wallets.find(w => w.id === 'metamask')!.isInstalled = true;
      }
      if (provider.isPhantom) {
        wallets.find(w => w.id === 'phantom')!.isInstalled = true;
      }
      if (provider.isTrust) {
        wallets.find(w => w.id === 'trustwallet')!.isInstalled = true;
      }
      if (provider.isCoinbaseWallet) {
        wallets.find(w => w.id === 'coinbase')!.isInstalled = true;
      }
      if (provider.isBraveWallet) {
        wallets.find(w => w.id === 'brave')!.isInstalled = true;
      }
    }

    // Get recently used wallets from localStorage
    const recentlyUsed = localStorage.getItem('recentlyUsedWallets');
    if (recentlyUsed) {
      try {
        const recentData = JSON.parse(recentlyUsed);
        wallets.forEach(wallet => {
          const recent = recentData.find((r: any) => r.id === wallet.id);
          if (recent) {
            wallet.isRecentlyUsed = true;
            wallet.lastUsed = new Date(recent.lastUsed);
          }
        });
      } catch (error) {
        console.error('Error parsing recently used wallets:', error);
      }
    }

    // Separate recently used and available wallets
    const recent = wallets.filter(w => w.isRecentlyUsed).sort((a, b) => 
      (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0)
    );
    const available = wallets.filter(w => w.isInstalled || w.id === 'walletconnect');

    setRecentlyUsedWallets(recent);
    setAvailableWallets(available);
    setIsLoading(false);
  };

  const handleWalletSelect = (wallet: WalletInfo) => {
    // Update recently used wallets
    const recent = recentlyUsedWallets.filter(w => w.id !== wallet.id);
    const updatedRecent = [
      { id: wallet.id, name: wallet.name, lastUsed: new Date().toISOString() },
      ...recent.slice(0, 4) // Keep only 5 most recent
    ];
    localStorage.setItem('recentlyUsedWallets', JSON.stringify(updatedRecent));

    onWalletSelected(wallet.id);
  };

  const getConnectionMethodText = (method: string) => {
    return method === 'walletconnect' ? 'QR Code' : 'Direct';
  };

  const getConnectionMethodColor = (method: string) => {
    return method === 'walletconnect' ? 'text-blue-400' : 'text-green-400';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-[400px] max-w-full border border-gray-700 shadow-2xl">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-white">Detecting wallets...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-[500px] max-w-full border border-gray-700 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Recently Used Wallets */}
        {recentlyUsedWallets.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Recently Used</h4>
            <div className="grid grid-cols-2 gap-3">
              {recentlyUsedWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletSelect(wallet)}
                  className="flex items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600"
                >
                  <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 rounded mr-3" />
                  <div className="text-left">
                    <div className="text-white font-medium text-sm">{wallet.name}</div>
                    <div className={`text-xs ${getConnectionMethodColor(wallet.connectionMethod)}`}>
                      {getConnectionMethodText(wallet.connectionMethod)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Available Wallets */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">
            {recentlyUsedWallets.length > 0 ? 'All Available Wallets' : 'Available Wallets'}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {availableWallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet)}
                className={`flex items-center p-3 rounded-lg transition-colors border ${
                  wallet.isInstalled 
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                    : 'bg-gray-800 hover:bg-gray-700 border-gray-700 opacity-60'
                }`}
                disabled={!wallet.isInstalled && wallet.id !== 'walletconnect'}
              >
                <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 rounded mr-3" />
                <div className="text-left">
                  <div className="text-white font-medium text-sm">{wallet.name}</div>
                  <div className={`text-xs ${getConnectionMethodColor(wallet.connectionMethod)}`}>
                    {getConnectionMethodText(wallet.connectionMethod)}
                  </div>
                  {!wallet.isInstalled && wallet.id !== 'walletconnect' && (
                    <div className="text-xs text-red-400">Not installed</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-700">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="text-sm text-blue-300">
              <p className="font-medium mb-1">Connection Methods:</p>
              <p className="text-blue-400">• Direct: Connect directly through browser extension</p>
              <p className="text-blue-400">• QR Code: Scan with mobile wallet app</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSelectionModal; 