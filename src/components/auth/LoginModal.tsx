import React, { useState } from 'react';
import './LoginPopup.css';

// --- UPDATED PROPS ---
// The component now needs to know how to signal the parent to show the OTP popup.
interface LoginPopupProps {
  onClose: () => void;
  onShowOtp: () => void; // This is the new function to switch modals
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onShowOtp }) => {
  const [email, setEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // This function remains the same
  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // --- UPDATED SUBMIT HANDLER ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would first send the email to your server.
    // For now, we will just log it and then switch to the OTP view.
    console.log('Email submitted for OTP:', {
      email,
      ageConfirmed: isConfirmed,
    });
    
    // This is the key change: instead of an alert,
    // it calls the function passed from App.tsx to switch the view.
    onShowOtp(); 
  };

  const socialLoginOptions = [
    {
      icon: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
      label: "Google",
      showLabel: false,
    },
    {
      icon: "https://www.vectorlogo.zone/logos/telegram/telegram-icon.svg",
      label: "Telegram",
      showLabel: false,
    },
    {
      icon: "https://www.vectorlogo.zone/logos/whatsapp/whatsapp-icon.svg",
      label: "WhatsApp",
      showLabel: false,
    },
    {
      icon: "https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg",
      label: "Facebook",
      showLabel: false,
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-512/free-metamask-2728406-2261817.png?f=webp&w=256",
      label: "MetaMask",
      showLabel: false,
    },
    {
    
      icon: "data:image/jpeg;base64,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" ,
      label: "Trust Wallet",
      showLabel: false,
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
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="logo-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path></svg>
            <h1 className="logo-text">TucanBit</h1>
          </div>
          <h2 className="welcome-text">Welcome to TucanBit</h2>
          <div className="social-login-icons">
            {socialLoginOptions.map((option) => (
              <button key={option.label} className="social-icon-btn">
                <img src={option.icon} alt={`${option.label} logo`} className="social-icon-img" />
                {option.showLabel && <span className="social-icon-label">{option.label}</span>}
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
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
