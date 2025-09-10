import React, { useState, useEffect } from 'react';
import './LoginPopup.css'; // Assuming it shares styles with the other popup
import { API_CONFIG } from '../../config/api';
import { useToast } from '../../context/ToastContext';

// --- UPDATED PROPS ---
interface OTPPopupProps {
  onClose: () => void;
  onLoginSuccess: () => void; // This function completes the registration
}

const OTPPopup: React.FC<OTPPopupProps> = ({ onClose, onLoginSuccess }) => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60); // Start with 60 seconds cooldown
  const { showToast } = useToast();

  // Start countdown timer when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle individual digit input
  const handleDigitChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);
    
    // Auto-focus next input if current one is filled
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...otpDigits];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newDigits[i] = pastedData[i];
    }
    
    setOtpDigits(newDigits);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newDigits.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    const nextInput = document.getElementById(`otp-${focusIndex}`);
    nextInput?.focus();
  };

  // Resend OTP functionality
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    setIsResending(true);
    setError('');
    
    try {
      const email = localStorage.getItem('registrationEmail');
      if (!email) {
        setError('Registration session expired. Please start over.');
        return;
      }
      
      console.log('Resending OTP to:', email);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER_RESEND}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('OTP resent successfully:', result);
        
        // Update stored OTP details
        if (result.otp_id) {
          localStorage.setItem('otp_id', result.otp_id);
        }
        if (result.user_id) {
          localStorage.setItem('user_id', result.user_id);
        }
        
        showToast('success', 'OTP Sent!', 'A new verification code has been sent to your email.');
        
        // Start cooldown timer (60 seconds)
        setResendCooldown(60);
        const timer = setInterval(() => {
          setResendCooldown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      } else {
        const errorData = await response.json();
        console.log('Resend OTP error response:', errorData);
        
        // Handle specific error cases
        if (response.status === 404 || response.status === 400) {
          setError('Registration session expired. Please start the registration process again.');
        } else if (response.status === 429) {
          setError('Too many resend attempts. Please wait before trying again.');
        } else {
          setError(errorData.message || 'Failed to resend OTP. Please try again.');
        }
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otp = otpDigits.join('');
    if (!otp.trim()) {
      setError('Please enter the OTP code');
      return;
    }
    
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Get stored OTP details
      const otp_id = localStorage.getItem('otp_id');
      const user_id = localStorage.getItem('user_id');
      
      if (!otp_id || !user_id) {
        setError('Registration session expired. Please start over.');
        return;
      }
      
      console.log('Calling backend API:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER_COMPLETE}`);
      
      // Call backend /register/complete endpoint
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER_COMPLETE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp_code: otp,
          otp_id: otp_id,
          user_id: user_id
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Registration completed successfully:', result);
        
        // Store authentication tokens
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);
        localStorage.setItem('user_id', result.user_id);
        
        // Clear temporary registration data
        localStorage.removeItem('otp_id');
        localStorage.removeItem('registrationEmail');
        
        // Show success toast
        showToast('success', 'Registration Complete!', 'Welcome to TucanBit! Your account has been successfully created.');
        
        // Complete the registration process
        onLoginSuccess();
      } else {
        const errorData = await response.json();
        console.log('OTP verification error response:', errorData);
        
        // Handle specific error cases
        if (response.status === 400) {
          setError('Invalid or expired verification code. Please try again or request a new code.');
        } else if (response.status === 404) {
          setError('Verification session expired. Please start the registration process again.');
        } else if (response.status === 429) {
          setError('Too many verification attempts. Please wait before trying again.');
        } else {
          setError(errorData.message || 'OTP verification failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Cannot connect to backend server. Please check if the backend is running on http://13.51.168.77:8080');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container otp-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="popup-image-section">
      
        </div>
        <div className="popup-form-section otp-form-section">
          <h2 className="welcome-text-small">Almost There! Enter Your Code</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="otp-0">Enter 6-digit code</label>
              <div className="otp-inputs-container">
                {otpDigits.map((digit, index) => (
              <input
                    key={index}
                type="text"
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    maxLength={1}
                required
                    className="otp-digit-input"
              />
                ))}
              </div>
            </div>
         
            <div className="error-message" style={{ color: '#ff7b7b', fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem', minHeight: '1rem' }}>
              {error}
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Complete Registration'}
            </button>
            
            {/* Resend OTP Button */}
            <div className="resend-section">
              <button 
                type="button" 
                onClick={handleResendOTP}
                disabled={isResending || resendCooldown > 0}
                className="resend-btn"
              >
                {isResending ? 'Sending...' : 
                 resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 
                 'Resend Code'}
              </button>
              <p className="resend-text">
                Didn't receive the code? Check your spam folder or resend.
              </p>
            </div>
            
             <div className="info-card">
              <span className="info-icon">ℹ️</span>
              <p className="info-text">
                Check the spam folder for confirmation and mark the email as "Not spam" to get these important emails from us in the future.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPPopup;
