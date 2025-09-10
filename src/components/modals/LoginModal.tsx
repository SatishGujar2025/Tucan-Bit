import React, { useState } from 'react';
import './LoginPopup.css';
import { walletService } from '../../services/walletService';
import { testWalletDetection } from '../../utils/walletDetectionTest';
import { useToast } from '../../context/ToastContext';
import { useAppContext } from '../../context/AppContext';

// --- UPDATED PROPS ---
// The component now needs to know how to signal the parent to show the verification modal or sign in modal.
interface LoginPopupProps {
  onClose: () => void;
  onShowVerification: () => void; // This now shows verification modal directly
  onShowSignIn: () => void; // This shows sign in modal
  onShowWalletConnect: () => void; // This shows wallet connect modal
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onShowVerification, onShowSignIn, onShowWalletConnect }) => {
  const [email, setEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState<string | null>(null);
  const { showToast } = useToast();
  const { loginWithWallet, fetchUserProfile } = useAppContext();

  // This function remains the same
  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // --- UPDATED SUBMIT HANDLER ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store email in localStorage for use in verification modal
    localStorage.setItem('registrationEmail', email);
    
    console.log('Email stored for registration:', {
      email,
      ageConfirmed: isConfirmed,
    });
    
    // Now show verification modal directly (skipping OTP for now)
    onShowVerification(); 
  };

  // --- WALLET CONNECTION HANDLER ---
  const handleWalletConnect = async (walletType: string) => {
    console.log('handleWalletConnect called with:', walletType);
    
    if (walletType === 'Trust Wallet') {
      // For Trust Wallet, open the WalletConnect modal
      onShowWalletConnect();
      return;
    }
    
    try {
      setIsConnectingWallet(walletType);
      let authResponse;

      switch (walletType) {
        case 'MetaMask':
          // Check if Phantom is interfering
          const wallets = walletService.getAvailableWallets();
          if (wallets.phantom && !wallets.metamask) {
            showToast('warning', 'Wallet Conflict', 'Phantom Wallet is currently active instead of MetaMask. Please disable Phantom Wallet extension, refresh the page, and try connecting MetaMask again.');
            return;
          }
          
          // Try to switch to MetaMask if multiple wallets are installed
          if (wallets.phantom && wallets.metamask) {
            try {
              await walletService.switchToMetaMask();
            } catch (switchError) {
              console.log('Could not automatically switch to MetaMask:', switchError);
            }
          }
          
          authResponse = await walletService.connectMetaMask();
          break;
        case 'Phantom':
          authResponse = await walletService.connectPhantom();
          break;
        case 'Coinbase Wallet':
          authResponse = await walletService.connectCoinbaseWallet();
          break;
        case 'Brave Wallet':
          authResponse = await walletService.connectBraveWallet();
          break;
        case 'WalletConnect':
          // For WalletConnect, open the WalletConnect modal
          onShowWalletConnect();
          return;
        default:
          throw new Error('Unsupported wallet type');
      }

      // Store tokens
      localStorage.setItem('access_token', authResponse.access_token);
      localStorage.setItem('refresh_token', authResponse.refresh_token);

      // Show success message
      if (authResponse.is_new_user) {
        showToast('success', 'Welcome to TucanBIT!', `Your ${walletType} wallet has been connected successfully!`);
      } else {
        showToast('success', 'Welcome back!', `${walletType} wallet connected successfully!`);
      }

      // Close modal and update UI without reload
      onClose();
      
      // Update user profile in context
      loginWithWallet(authResponse);
      
      // Fetch user profile from API to get complete user information
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Failed to fetch user profile after wallet login:', error);
        // Don't show error to user as login was successful
      }

    } catch (error) {
      console.error(`${walletType} connection error:`, error);
      
      // Provide more helpful error messages
      let errorMessage = error instanceof Error ? error.message : `Failed to connect ${walletType}`;
      
      if (errorMessage.includes('Phantom Wallet is currently active')) {
        errorMessage = 'Phantom Wallet is currently active instead of MetaMask. Please disable Phantom Wallet extension, refresh the page, and try connecting MetaMask again.';
      } else if (errorMessage.includes('switch to MetaMask')) {
        errorMessage = 'Please switch to MetaMask in your browser or disable other wallet extensions temporarily.';
      }
      
      showToast('error', 'Connection Failed', errorMessage);
    } finally {
      setIsConnectingWallet(null);
    }
  };

  const socialLoginOptions = [
    {
      icon: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
      label: "Google",
      showLabel: false,
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
      label: "MetaMask",
      showLabel: false,
      isWallet: true,
    },
    {
      icon: "https://trustwallet.com/assets/images/media/assets/TWT.png",
      label: "Trust Wallet",
      showLabel: false,
      isWallet: true,
    },
    {
      icon: "https://logowik.com/content/uploads/images/phantom3506.jpg",
      label: "Phantom",
      showLabel: false,
      isWallet: true,
    },
    {
      icon: "https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp",
      label: "Coinbase Wallet",
      showLabel: false,
      isWallet: true,
    },
    {
      icon: "https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png",
      label: "WalletConnect",
      showLabel: false,
      isWallet: true,
    },
  ];

 
  return (
    <div className="popup-overlay " onClick={onClose}>
      <div className="popup-container " onClick={handlePopupContentClick}>
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="popup-image-section"></div>
        <div className="popup-form-section">
          
          {/* Wallet Detection Warning */}
          {(() => {
            const wallets = walletService.getAvailableWallets();
            const availableWallets = [];
            if (wallets.metamask) availableWallets.push('MetaMask');
            if (wallets.phantom) availableWallets.push('Phantom');
            if (wallets.coinbase) availableWallets.push('Coinbase Wallet');
            if (wallets.brave) availableWallets.push('Brave Wallet');
            // WalletConnect is always available via QR code
            availableWallets.push('WalletConnect');
            
            if (availableWallets.length > 0) {
              return (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
                  <strong> Wallets Detected:</strong> {availableWallets.join(', ')} {availableWallets.length > 1 ? 'are' : 'is'} available for connection.
                </div>
              );
            }
            return (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-md text-sm">
                <strong> Web3 Wallets:</strong> Install MetaMask, Phantom, Coinbase Wallet, or Brave Wallet to connect and start playing!
              </div>
            );
          })()}
          
          <div className="social-login-icons">
            {socialLoginOptions.map((option) => {
              // Check wallet status for wallet options
              let walletStatus = null;
              if (option.isWallet) {
                const wallets = walletService.getAvailableWallets();
                if (option.label === 'MetaMask' && wallets.metamask) {
                  walletStatus = 'Available';
                } else if (option.label === 'Trust Wallet') {
                  walletStatus = 'QR Connect';
                } else if (option.label === 'Phantom' && wallets.phantom) {
                  walletStatus = 'Available';
                } else if (option.label === 'Coinbase Wallet' && wallets.coinbase) {
                  walletStatus = 'Available';
                } else if (option.label === 'Brave Wallet' && wallets.brave) {
                  walletStatus = 'Available';
                } else if (option.label === 'WalletConnect') {
                  walletStatus = 'QR Connect';
                }
              }

              return (
                <button 
                  key={option.label} 
                  className="social-icon-btn"
                  onClick={() => {
                    console.log('Social login icon clicked:', option.label);
                    if (option.isWallet) {
                      console.log('Starting wallet connection for:', option.label);
                      handleWalletConnect(option.label);
                    } else {
                      // For other social logins (Google, etc.)
                      console.log('Other social login clicked:', option.label);
                      alert(`${option.label} login coming soon!`);
                    }
                  }}
                  disabled={isConnectingWallet === option.label}
                >
                  <img src={option.icon} alt={`${option.label} logo`} className="social-icon-img" />
                  {option.showLabel && <span className="social-icon-label">{option.label}</span>}
                  {walletStatus && (
                    <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full">
                      {walletStatus}
                    </span>
                  )}
                  {isConnectingWallet === option.label && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-text">or</span>
            <span className="separator-line"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                required
              />
              <label htmlFor="terms">
                I confirm that I am 18 years old and I have read the Terms of Service
              </label>
            </div>
            <button type="submit" className="submit-btn">
              Continue Registration
            </button>
            
            <div className="sign-in-link">
              <span>Already have an account? </span>
              <button onClick={onShowSignIn}>
                Sign In
              </button>
            </div>
          </form>
          
          {/* Debug button for developers */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button 
                onClick={() => {
                  const results = testWalletDetection();
                  console.log('Wallet detection test results:', results);
                  alert(`Wallet Detection Results:\n\nMetaMask: ${results.metamask}\nPhantom: ${results.phantom}\nCoinbase: ${results.coinbase}\nBrave: ${results.brave}\n\nCheck console for detailed info.`);
                }}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#666', 
                  cursor: 'pointer', 
                  fontSize: '0.7rem',
                  textDecoration: 'underline'
                }}
              >
                Debug Wallet Detection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
