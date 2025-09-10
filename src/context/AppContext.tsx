import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
import { LaunchGameOptions } from '../utils/groove';
import { API_CONFIG } from '../config/api';
import { balanceService, Balance } from '../services/balanceService';
import { initGameLauncher } from '../services/gameLauncher';

// Define all possible modal views
type ModalView = 'login' | 'signin' | 'otp' | 'verification' | 'deposit' | 'visa' | 'history' | 'withdrawConfirm' | 'walletConnect' | 'passwordReset' | 'gameLaunch' | null;

// Define user profile interface
interface UserProfile {
  username: string;
  phone_number: string;
  email: string;
  user_id: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  type: string;
  referral_code: string;
}

// Define the data for the withdraw confirmation modal
interface WithdrawDetails {
  amount: string;
  address: string;
  currency: any;
}

// Define the full shape of our shared context
type WalletCurrency = 'ETH' | 'SOL' | null;
interface AppContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: UserProfile | null;
  balance: number;
  userBalances: Balance[];
  modalView: ModalView;
  login: (userProfile: UserProfile) => void;
  loginWithWallet: (authResponse: any) => void;
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
  fetchUserProfile: () => Promise<void>;
  fetchUserBalances: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  gameUrl: string | null;
  launchGame: (opts: LaunchGameOptions) => void;
  closeGame: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to false - user needs to login/signup
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Add loading state for auth check
  const [modalView, setModalView] = useState<ModalView>(null);
  const [user, setUser] = useState<UserProfile | null>(null); // Set to null - no user initially
  const [balance, setBalance] = useState(0); // Will be updated with real balance
  const [userBalances, setUserBalances] = useState<Balance[]>([]);
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
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const openModal = useCallback((v: ModalView) => setModalView(v), []);
  const closeModal = useCallback(() => setModalView(null), []);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const launchGame = useMemo(() =>
    initGameLauncher({
      grooveDomain: import.meta.env.VITE_GROOVE_DOMAIN as string,
      operatorId: import.meta.env.VITE_GROOVE_OPERATOR_ID as string,
      license: import.meta.env.VITE_GROOVE_LICENSE as string,
      defaultLang: (import.meta.env.VITE_GROOVE_DEFAULT_LANG as string) ?? 'en_US',
      defaultCurrency: (import.meta.env.VITE_GROOVE_DEFAULT_CURRENCY as string) ?? 'USD',
      defaultCountry: (import.meta.env.VITE_GROOVE_DEFAULT_COUNTRY as string) ?? 'MX',
      historyUrl: (import.meta.env.VITE_GROOVE_HISTORY_URL as string) ?? `${origin}/history`,
      homeUrl: (import.meta.env.VITE_GROOVE_HOME_URL as string) ?? `${origin}/`,
      rcUrl: (import.meta.env.VITE_GROOVE_RC_URL as string) || undefined,

      isAuthenticated,
      username: user?.username,
      openLoginModal: () => openModal('login'),
      openGameModal: () => openModal('gameLaunch'),
      setGameUrl,
    }),
    [isAuthenticated, user?.username, openModal]
  );

  const closeGame = useCallback(() => {
    setGameUrl(null);
    closeModal();
  }, [closeModal]);

  // Initialize authentication state on app start
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔍 Initializing authentication...');
      const accessToken = localStorage.getItem('access_token');
      const savedAddress = localStorage.getItem('walletAddress');
      
      console.log('📝 Access token found:', !!accessToken);
      console.log('📝 Wallet address found:', !!savedAddress);
      
      if (savedAddress) {
        setWalletAddress(savedAddress);
        setWalletBalance(localStorage.getItem('walletBalance'));
        setWalletCurrency(localStorage.getItem('walletCurrency') as WalletCurrency);
      }
      
      // If we have an access token, try to fetch user profile
      if (accessToken) {
        console.log('Access token exists, fetching user profile...');
        try {
          await fetchUserProfile();
          console.log('Authentication initialized successfully');
        } catch (error) {
          console.error(' Failed to initialize authentication:', error);
          // Clear invalid tokens
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsAuthenticated(false);
        }
      } else {
        console.log(' No access token found, user not authenticated');
        setIsAuthenticated(false);
      }
      
      // Set loading to false after auth check is complete
      setIsAuthLoading(false);
    };
    
    initializeAuth();
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
        // Show after 5 seconds to let the signup process complete and user see the dropdown
        const timer = setTimeout(() => {
          showRandomAd();
          localStorage.setItem('lastPromoShown', currentTime.toString());
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated]);
  
  // --- THIS IS THE CORRECTED LOGIN FUNCTION ---
  const login = (userProfile: UserProfile) => {
    setIsAuthenticated(true);
    setUser(userProfile);
    // Close any open modals after successful login
    closeModal();
  };

  // --- WALLET AUTHENTICATION FUNCTION ---
  const loginWithWallet = (authResponse: any) => {
    if (authResponse.user_profile) {
      setIsAuthenticated(true);
      setUser(authResponse.user_profile);
      
      // Store wallet information
      if (authResponse.wallet_address) {
        setWalletAddress(authResponse.wallet_address);
        localStorage.setItem('walletAddress', authResponse.wallet_address);
      }
      
      if (authResponse.wallet_balance) {
        setWalletBalance(authResponse.wallet_balance);
        localStorage.setItem('walletBalance', authResponse.wallet_balance);
      }
      
      if (authResponse.chain_type) {
        setWalletCurrency(authResponse.chain_type.toUpperCase() as WalletCurrency);
        localStorage.setItem('walletCurrency', authResponse.chain_type.toUpperCase());
      }
    }
    closeModal();
  };

  // --- FETCH USER PROFILE FUNCTION ---
  const fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error(' No access token found in fetchUserProfile');
        return;
      }

      console.log('Fetching user profile from:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_PROFILE}`);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_PROFILE}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Profile API response status:', response.status);

      if (response.ok) {
        const userProfile: UserProfile = await response.json();
        setUser(userProfile);
        setIsAuthenticated(true);
        console.log('User profile fetched successfully:', userProfile);
        console.log('Username from API:', userProfile.username);
        console.log('First name from API:', userProfile.first_name);
        console.log('Authentication state set to:', true);
        
        // Fetch balances after profile is loaded
        await fetchUserBalances();
      } else {
        console.error('Failed to fetch user profile, status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setIsAuthenticated(false);
    }
  };

  // --- FETCH USER BALANCES FUNCTION ---
  const fetchUserBalances = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('No access token found for balance fetch');
        return;
      }

      const balances = await balanceService.getUserBalances();
      setUserBalances(balances);
      
      // Update the main balance with the primary balance
      const primaryBalance = balanceService.getPrimaryBalance(balances);
      if (primaryBalance) {
        const totalAmount = parseFloat(primaryBalance.real_money) + parseFloat(primaryBalance.bonus_money);
        setBalance(totalAmount);
      }
      
      console.log('User balances fetched:', balances);
    } catch (error) {
      console.error('Error fetching user balances:', error);
    }
  };

  // --- REFRESH BALANCE FUNCTION ---
  const refreshBalance = async () => {
    await fetchUserBalances();
  };

  const logout = async () => {
    try {
      // Show loading state
      console.log('Starting logout process...');
      
      // Clear all authentication state
      setIsAuthenticated(false);
      setUser(null);
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletCurrency(null);
      setWithdrawDetails(null);
      
      // Clear all localStorage data comprehensively
      const keysToRemove = [
        'access_token',
        'refresh_token',
        'walletAddress',
        'walletBalance', 
        'walletCurrency',
        'registrationEmail',
        'otp_id',
        'user_id',
        'lastPromoShown',
        'recentlyUsedWallets'
      ];
      
      // Remove each key individually for better error handling
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn(`Failed to remove ${key} from localStorage:`, error);
        }
      });
      
      // Clear any remaining localStorage data (comprehensive cleanup)
      try {
        localStorage.clear();
      } catch (error) {
        console.warn('Failed to clear localStorage:', error);
      }
      
      // Close any open modals
      closeModal();
      
      // Reset promotional modal state
      setShowPromoModal(false);
      setPromoShown(false);
      
      // Optional: Call backend logout endpoint if needed
      // This would invalidate the session on the server side
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          await fetch(`${API_CONFIG.BASE_URL}/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
        }
      } catch (error) {
        // Ignore backend logout errors - we've already cleared local data
        console.warn('Backend logout failed (this is okay):', error);
      }
      
      console.log('Logout completed successfully');
      
      // Redirect to home page after logout
      window.location.href = '/';
      
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, we should still clear local state
      setIsAuthenticated(false);
      setUser(null);
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletCurrency(null);
      localStorage.clear();
      window.location.href = '/';
    }
  };

  // --- Wallet Connection Logic ---
  const connectWallet = async (walletType: string) => {
    // Open the wallet connection modal instead of directly connecting
    console.log("Opening wallet connection modal for", walletType);
    openModal('walletConnect');
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletCurrency(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('walletCurrency');
  };

  const value: AppContextType = {
    isAuthenticated,
    isAuthLoading,
    user,
    balance,
    userBalances,
    modalView,
    login,
    loginWithWallet,
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
    setCurrentAdType,
    fetchUserProfile,
    fetchUserBalances,
    refreshBalance,
    gameUrl,
    launchGame,
    closeGame,
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