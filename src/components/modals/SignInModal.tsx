import React, { useState } from 'react';
import './LoginPopup.css';
import { API_CONFIG } from '../../config/api';
import { walletService } from '../../services/walletService';
import { useToast } from '../../context/ToastContext';
import { useAppContext } from '../../context/AppContext';
import tucanLogo from '../../assets/tucan.png';

interface SignInModalProps {
  onClose: () => void;
  onShowVerification: () => void; // Add this to show registration modal
  onShowPasswordReset?: () => void; // Add this to show password reset modal
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onShowVerification, onShowPasswordReset }) => {
  const [formData, setFormData] = useState({
    login_id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState<string | null>(null);
  const { showToast } = useToast();
  const { fetchUserProfile } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.login_id.trim() || !formData.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      console.log('Calling login API:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        
        // Store authentication token
        localStorage.setItem('access_token', result.access_token);
        
        // Show success toast
        showToast('success', 'Login Successful!', 'Welcome back!');
        
        // Fetch user profile using AppContext function (includes balance fetching)
        try {
          await fetchUserProfile();
          // Close modal and complete login
          onClose();
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Still close modal as login was successful
          onClose();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Cannot connect to backend server. Please check if the backend is running on http://13.51.168.77:8080');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleWalletConnect = async (walletType: string) => {
    try {
      setIsConnectingWallet(walletType);
      
      let authResponse;
      switch (walletType) {
        case 'MetaMask':
          authResponse = await walletService.connectMetaMask();
          break;
        case 'Trust Wallet':
          authResponse = await walletService.connectTrustWallet();
          break;
        case 'WalletConnect':
          authResponse = await walletService.connectWalletConnect();
          break;
        case 'Coinbase':
          authResponse = await walletService.connectCoinbaseWallet();
          break;
        case 'Phantom':
          authResponse = await walletService.connectPhantom();
          break;
        case 'Ledger':
          authResponse = await walletService.connectLedger();
          break;
        default:
          throw new Error('Unsupported wallet type');
      }
      
      // Store authentication tokens
      localStorage.setItem('access_token', authResponse.access_token);
      localStorage.setItem('refresh_token', authResponse.refresh_token);
      
      // Show success message
      showToast('success', 'Wallet Connected!', `${walletType} connected and authenticated successfully!`);
      
      // Fetch user profile and close modal
      try {
        await fetchUserProfile();
        onClose();
      } catch (error) {
        console.error('Error fetching user profile:', error);
        onClose();
      }
      
    } catch (error) {
      console.error(`${walletType} connection error:`, error);
      showToast('error', 'Connection Failed', error instanceof Error ? error.message : `Failed to connect ${walletType}`);
    } finally {
      setIsConnectingWallet(null);
    }
  };

  const socialLoginOptions = [
    {
      icon: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
      label: "Google",
      showLabel: false,
      type: "social",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
      label: "MetaMask",
      showLabel: false,
      type: "wallet",
    },
    {
      icon: "https://trustwallet.com/assets/images/media/assets/TWT.png",
      label: "Trust Wallet",
      showLabel: false,
      type: "wallet",
    },
    {
      icon: "https://logowik.com/content/uploads/images/phantom3506.jpg",
      label: "Phantom",
      showLabel: false,
      type: "wallet",
    },
    {
      icon: "https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp",
      label: "Coinbase Wallet",
      showLabel: false,
      type: "wallet",
    },
    {
      icon: "https://images.seeklogo.com/logo-png/43/2/walletconnect-logo-png_seeklogo-430923.png",
      label: "WalletConnect",
      showLabel: false,
      type: "wallet",
    },
  ];

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={handlePopupContentClick}>
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="popup-image-section"></div>
        <div className="popup-form-section">
          <div className="logo-container">
            <img src={tucanLogo} alt="TucanBit" className="logo-tucan-image" />
            <h2 className="welcome-text">Welcome to TucanBit</h2>
          </div>
          <div className="social-login-icons">
            {socialLoginOptions.map((option) => (
              <button 
                key={option.label} 
                className="social-icon-btn"
                onClick={() => {
                  if (option.type === 'wallet') {
                    handleWalletConnect(option.label);
                  } else {
                    // Handle social login (coming soon)
                    alert(`${option.label} login coming soon!`);
                  }
                }}
                disabled={isConnectingWallet === option.label}
              >
                <img src={option.icon} alt={`${option.label} logo`} className="social-icon-img" />
                {option.showLabel && <span className="social-icon-label">{option.label}</span>}
                {isConnectingWallet === option.label && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-text">or</span>
            <span className="separator-line"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="login_id">Email</label>
              <input
                type="email"
                id="login_id"
                name="login_id"
                placeholder="Enter your email"
                value={formData.login_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="error-message" style={{ color: '#ff7b7b', fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem', minHeight: '1rem' }}>
              {error}
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
            
            {/* Forgot Password Link */}
            {onShowPasswordReset && (
              <div className="forgot-password-link" style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button 
                  onClick={onShowPasswordReset}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#36CFC9', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem',
                    textDecoration: 'underline'
                  }}
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>
          
          <div className="sign-up-link" style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Don't have an account? </span>
            <button 
              onClick={() => {
                // Clear any stored email to allow fresh registration
                localStorage.removeItem('registrationEmail');
                onShowVerification();
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#36CFC9', 
                cursor: 'pointer', 
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal; 