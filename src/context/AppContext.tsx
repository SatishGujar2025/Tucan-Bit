import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ethers } from 'ethers';

// Define all possible modal views
type ModalView = 'login' | 'otp' | 'verification' | 'deposit' | 'visa' | 'history' | 'withdrawConfirm' | 'walletConnect' | null;

// Define the data for the withdraw confirmation modal
interface WithdrawDetails {
  amount: string;
  address: string;
  currency: any;
}

// Define the full shape of our shared context
type WalletCurrency = 'ETH' | 'SOL' | null;
interface AppContextType {
  accessToken: string;
  isAuthenticated: boolean;
  user: { username: string } | null;
  balance: number;
  modalView: ModalView;
  login: (username: string) => void;
  logout: () => void;
  openModal: (view: ModalView) => void;
  closeModal: () => void;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  withdrawDetails: WithdrawDetails | null;
  setWithdrawDetails: React.Dispatch<React.SetStateAction<WithdrawDetails | null>>;
  walletAddress: string | null;
  walletBalance: string | null;
  walletCurrency: WalletCurrency;
  isConnecting: boolean;
  connectWallet: (type: string) => Promise<void>;
  disconnectWallet: () => void;
  showPromoModal: boolean;
  setShowPromoModal: React.Dispatch<React.SetStateAction<boolean>>;
  promoShown: boolean;
  setPromoShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentAdType: string;
  setCurrentAdType: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [modalView, setModalView] = useState<ModalView>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [balance, setBalance] = useState(10000);
  const [withdrawDetails, setWithdrawDetails] = useState<WithdrawDetails | null>(null);
  
  // Wallet State
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletCurrency, setWalletCurrency] = useState<WalletCurrency>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Promotional Modal State
  const [showPromoModal, setShowPromoModal] = useState(false); // Set back to false for professional behavior
  const [promoShown, setPromoShown] = useState(false);
  const [currentAdType, setCurrentAdType] = useState('vip'); // Set to VIP to show the VIP modal

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setWalletBalance(localStorage.getItem('walletBalance'));
      setWalletCurrency(localStorage.getItem('walletCurrency') as WalletCurrency);
    }
  }, []);

  // Add/remove modal-open class when any modal is open
  useEffect(() => {
    if (showPromoModal || modalView) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showPromoModal, modalView]);

  // Promotional modal logic: show after signup and then once a week
  useEffect(() => {
    const adTypes = ['tournament', 'welcome', 'deposit', 'vip', 'jackpot'];
    
    const showRandomAd = () => {
      const randomAd = adTypes[Math.floor(Math.random() * adTypes.length)];
      setCurrentAdType(randomAd);
      setShowPromoModal(true);
      console.log('Promotional modal showing with ad type:', randomAd);
    };
    
    // Check if user is authenticated and show promo modal after signup
    if (isAuthenticated) {
      const lastPromoShown = localStorage.getItem('lastPromoShown');
      const currentTime = new Date().getTime();
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      
      // Show promo modal if:
      // 1. User just signed up (no lastPromoShown timestamp)
      // 2. It's been more than a week since last shown
      if (!lastPromoShown || (currentTime - parseInt(lastPromoShown)) > oneWeek) {
        // Show after 2 seconds to let the signup process complete
        const timer = setTimeout(() => {
          showRandomAd();
          localStorage.setItem('lastPromoShown', currentTime.toString());
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated]);
  
  // --- THIS IS THE CORRECTED LOGIN FUNCTION ---
  const login = (username: string) => {
    setIsAuthenticated(true);
    setUser({ username });
    // This is the crucial step: close the current modal and open the next one.
    openModal('deposit'); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const openModal = (view: ModalView) => setModalView(view);
  const closeModal = () => setModalView(null);

  // --- Wallet Connection Logic ---
  const connectWallet = async (walletType: string) => {
    // This is a placeholder for your full connection logic
    console.log("Connecting with", walletType);
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    setWalletAddress(mockAddress);
    setWalletCurrency('ETH');
    setWalletBalance((Math.random() * 2).toFixed(4));
    localStorage.setItem('walletAddress', mockAddress);
    closeModal();
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletCurrency(null);
    localStorage.removeItem('walletAddress');
  };

  const value: AppContextType = {
    isAuthenticated,
    user,
    balance,
    modalView,
    login,
    logout,
    openModal,
    closeModal,
    setBalance,
    withdrawDetails,
    setWithdrawDetails,
    walletAddress,
    walletBalance,
    walletCurrency,
    isConnecting,
    connectWallet,
    disconnectWallet,
    showPromoModal,
    setShowPromoModal,
    promoShown,
    setPromoShown,
    currentAdType,
    setCurrentAdType
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};