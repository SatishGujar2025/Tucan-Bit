import React, { useState } from 'react';
import './LoginPopup.css';
import { API_CONFIG } from '../../config/api';
import { useToast } from '../../context/ToastContext';
import tucanLogo from '../../assets/tucan.png';
import { Mail, Key, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface PasswordResetModalProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

type ResetStep = 'email' | 'otp' | 'password';

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ onClose, onBackToLogin }) => {
  const [step, setStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { showToast } = useToast();

  //  Request password reset
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      console.log('Requesting password reset for:', email);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PASSWORD_FORGET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: email
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Password reset initiated:', result);
        
        showToast('success', 'Reset Code Sent!', 'A password reset code has been sent to your email.');
        setStep('otp');
        
        // Start cooldown timer (60 seconds) for resend functionality
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
        console.log('Password reset error response:', errorData);
        
        // Handle specific error cases
        if (response.status === 404 || response.status === 400) {
          setError('No account found with this email address. Please check your email or create a new account.');
        } else if (response.status === 429) {
          setError('Too many reset attempts. Please wait before trying again.');
        } else {
          setError(errorData.message || 'Failed to send reset code. Please try again.');
        }
      }
    } catch (err) {
      console.error('Password reset request error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Verify OTP
  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setError('Please enter the verification code');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      console.log('Verifying OTP for password reset');
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PASSWORD_FORGET_VERIFY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: email,
          otp_code: otp
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('OTP verified successfully:', result);
        
        // Store the reset token for the next step
        if (result.reset_token) {
          setResetToken(result.reset_token);
        }
        
        showToast('success', 'Code Verified!', 'Please enter your new password.');
        setStep('password');
      } else {
        const errorData = await response.json();
        console.log('OTP verification error response:', errorData);
        
        // Handle specific error cases
        if (response.status === 400) {
          setError('Invalid or expired verification code. Please try again or request a new code.');
        } else if (response.status === 404) {
          setError('Verification session expired. Please start the password reset process again.');
        } else if (response.status === 429) {
          setError('Too many verification attempts. Please wait before trying again.');
        } else {
          setError(errorData.message || 'Invalid verification code. Please try again.');
        }
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend password reset OTP
  const handleResendResetOTP = async () => {
    if (resendCooldown > 0) return;
    
    setIsResending(true);
    setError('');
    
    try {
      console.log('Resending password reset OTP to:', email);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PASSWORD_FORGET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: email
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Password reset OTP resent successfully:', result);
        
        showToast('success', 'Code Resent!', 'A new password reset code has been sent to your email.');
        
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
        console.log('Resend password reset error response:', errorData);
        
        if (response.status === 404 || response.status === 400) {
          setError('No account found with this email address. Please check your email or create a new account.');
        } else if (response.status === 429) {
          setError('Too many reset attempts. Please wait before trying again.');
        } else {
          setError(errorData.message || 'Failed to resend reset code. Please try again.');
        }
      }
    } catch (err) {
      console.error('Resend password reset error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Reset password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password complexity
    const password = newPassword;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    if (!hasLowercase) {
      setError('Password must contain at least one lowercase letter.');
      return;
    }
    
    if (!hasUppercase) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    
    if (!hasNumber) {
      setError('Password must contain at least one number.');
      return;
    }
    
    if (!hasSpecialChar) {
      setError('Password must contain at least one special character (!#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~).');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      console.log('Resetting password');
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PASSWORD_RESET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: email,
          otp_code: otp,
          new_password: newPassword,
          reset_token: resetToken
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Password reset successfully:', result);
        
        showToast('success', 'Password Reset!', 'Your password has been successfully updated. You can now log in with your new password.');
        onBackToLogin();
      } else {
        const errorData = await response.json();
        console.log('Password reset error response:', errorData);
        
        // Handle specific error cases
        if (response.status === 400) {
          setError('Invalid or expired reset token. Please start the password reset process again.');
        } else if (response.status === 404) {
          setError('Reset session expired. Please start the password reset process again.');
        } else if (response.status === 422) {
          setError('Password does not meet security requirements. Please check the password criteria.');
        } else {
          setError(errorData.message || 'Failed to reset password. Please try again.');
        }
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('email');
    } else if (step === 'password') {
      setStep('otp');
    } else {
      onBackToLogin();
    }
    setError('');
  };

  const getStepTitle = () => {
    switch (step) {
      case 'email': return '';
      case 'otp': return '';
      case 'password': return 'Set New Password';
      default: return 'Reset Password';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'email': return 'Enter your email address to receive a password reset code';
      case 'otp': return 'Enter the verification code sent to your email';
      case 'password': return 'Create a new secure password for your account';
      default: return '';
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
        
        <div className="popup-form-section otp-form-section">
          <div className="logo-container">
            <img src={tucanLogo} alt="TucanBit" className="logo-tucan-image" />
            <h1 className="logo-text">TucanBit</h1>
          </div>
          
          <h2 className="welcome-text">{getStepTitle()}</h2>
          <p className="step-description">{getStepDescription()}</p>

          {/* Back button */}
          <button 
            type="button" 
            onClick={handleBack}
            className="back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <form onSubmit={
            step === 'email' ? handleEmailSubmit :
            step === 'otp' ? handleOTPSubmit :
            handlePasswordSubmit
          }>
            {/* Email Step */}
            {step === 'email' && (
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors pl-10"
                  />
                </div>
              </div>
            )}

            {/* OTP Step */}
            {step === 'otp' && (
              <>
                <div className="input-group">
                  <label htmlFor="otp">Verification Code</label>
                  <div className="input-with-icon">
                    <Key className="input-icon" />
                    <input
                      type="text"
                      id="otp"
                      placeholder="Enter verification code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors pl-10"
                    />
                  </div>
                </div>
                
                {/* Resend OTP Button */}
                <div className="resend-section" style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <button 
                    type="button" 
                    onClick={handleResendResetOTP}
                    disabled={isResending || resendCooldown > 0}
                    className="resend-btn"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: resendCooldown > 0 ? '#ccc' : '#3C1A4F',
                      cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline',
                      padding: '0.5rem',
                      opacity: resendCooldown > 0 ? 0.8 : 1
                    }}
                  >
                    {isResending ? 'Sending...' : 
                     resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 
                     'Resend Code'}
                  </button>
                  <p className="resend-text" style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                    Didn't receive the code? Check your spam folder or resend.
                  </p>
                </div>
              </>
            )}

            {/* Password Step */}
            {step === 'password' && (
              <>
                <div className="input-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="input-with-icon">
                    <Key className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      placeholder="Min 8 chars: Aa1! (uppercase, lowercase, number, special)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="input-with-icon">
                    <Key className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="password-toggle"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}
         
            <div className="error-message" style={{ color: '#ff7b7b', fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem', minHeight: '1rem' }}>
              {error}
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 
               step === 'email' ? 'Send Reset Code' :
               step === 'otp' ? 'Verify Code' :
               'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;