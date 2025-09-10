import React, { useState } from 'react';
import { API_CONFIG } from '../../config/api';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft } from 'lucide-react';

// Define the props the component expects from App.tsx
interface VerificationModalProps {
  onClose: () => void;
  onVerificationComplete: () => void;
  onBack?: () => void; // Optional back handler
}

const VerificationModal: React.FC<VerificationModalProps> = ({ onClose, onVerificationComplete, onBack }) => {
  const { showToast } = useToast();
  
  // State for the form data - updated to match backend API (minimal fields only)
  const [formData, setFormData] = useState({
    email: localStorage.getItem('registrationEmail') || '',
    username: '',
    password: '',
    default_currency: 'USD',
    type: 'PLAYER'
  });
  
  // State for the checkbox and any potential errors
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for back button
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      onClose(); // Fallback to close if no back handler provided
    }
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    // Basic validation
    if (!termsAccepted) {
      setError('You must accept the terms and conditions.');
      return;
    }
    
    // Validate required fields (minimal validation)
    if (!formData.username.trim()) {
      setError('Username is required.');
      return;
    }
    
    if (!formData.password || formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    // Validate password complexity to match backend requirements
    const password = formData.password;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
    
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
    
    if (!formData.email.trim()) {
      setError('Email is required.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare the request body according to backend API
      // Remove accounts array - backend will generate IDs and accounts
      const requestBody = {
        ...formData
      };
      
      console.log('Registration request body:', requestBody);
      console.log('Calling backend API:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`);
      
      // Make API call to backend /register endpoint
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        
        // Show success toast
        showToast('success', 'Registration Successful!', 'Please check your email for verification code.');
        
        // Store OTP details for next step
        localStorage.setItem('otp_id', result.otp_id);
        localStorage.setItem('user_id', result.user_id);
        localStorage.setItem('registrationEmail', result.email);
        
        // Proceed to OTP verification
        onVerificationComplete();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        showToast('error', 'Registration Failed', errorMessage);
      }
    } catch (err) {
      console.error('Registration error:', err);
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage = 'Cannot connect to backend server. Please check if the backend is running on http://13.51.168.77:8080';
      }
      
      setError(errorMessage);
      showToast('error', 'Registration Failed', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* We embed the CSS directly here for a self-contained component */}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup-container {
          background-color: #000000;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          color: #fff;
          overflow: hidden;
        }

        .verification-container {
          width: 90%;
          max-width: 500px;
          height: auto;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .verification-form-section {
          padding: 2rem 2.5rem;
          overflow-y: auto;
        }
        
        .verification-form-section::-webkit-scrollbar {
            width: 8px;
        }
        .verification-form-section::-webkit-scrollbar-track {
            background: #1e2540;
        }
        .verification-form-section::-webkit-scrollbar-thumb {
            background-color: #4a5588;
            border-radius: 10px;
            border: 2px solid #1e2540;
        }

        .verification-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        @media (min-width: 500px) {
            .form-row {
                flex-direction: row;
            }
        }

        .form-row .input-group {
          flex: 1;
        }

        .verification-form .input-group label {
          font-size: 0.8rem;
          color: #aaa;
          margin-bottom: 6px;
          display: block;
        }

        .verification-form .input-group input,
        .verification-form .input-group select {
          width: 100%;
          padding: 12px;
          background-color: #333333;
          border: 1px solid #666;
          border-radius: 8px;
          color: #fff;
          font-size: 0.9rem;
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .verification-form .input-group input:invalid {
          border-color: #ff7b7b;
        }
        
        .verification-form .input-group input:valid {
          border-color: #4a5588;
        }

        .verification-form .input-group input:focus,
        .verification-form .input-group select:focus {
            outline: none;
            border-color: #4a5588;
            box-shadow: 0 0 0 2px rgba(74, 85, 136, 0.3);
        }

        .verification-form .input-group input:read-only {
          background-color: #1a1a1a;
          cursor: not-allowed;
        }

        .verification-form .input-group select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 1em;
        }
        
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 1rem;
        }
        
        .checkbox-group input[type='checkbox'] {
            width: 18px;
            height: 18px;
            accent-color: #666;
        }

        .checkbox-group label {
            font-size: 0.9rem;
            color: #ccc;
        }
        
        .submit-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #4a5588, #667eea);
            border: none;
            border-radius: 8px;
            color: #ffffff;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 0;
        }
        
        .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            background: linear-gradient(135deg, #5a6598, #7680fa);
            box-shadow: 0 6px 20px rgba(74, 85, 136, 0.4);
        }
        
        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .error-message {
            color: #ff7b7b;
            font-size: 0.85rem;
            text-align: center;
            margin-top: 1rem;
            height: 1rem;
        }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background-color: rgba(51, 51, 51, 0.5);
          border: 1px solid #333333;
          border-radius: 8px;
          padding: 12px 15px;
          margin-top: 1.5rem;
        }

        .info-icon {
          font-size: 1.1rem;
          margin-top: 2px;
          color: #666;
        }

        .info-text {
          font-size: 0.8rem;
          color: #a0a0b0;
          line-height: 1.6;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid #4a5588;
          color: #4a5588;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
        }

        .back-btn:hover {
          background: rgba(74, 85, 136, 0.1);
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-1px);
        }

        .back-btn:active {
          transform: translateY(0);
        }
      `}</style>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-container verification-container" onClick={(e) => e.stopPropagation()}>
          <div className="verification-form-section">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Complete Registration</h2>
            <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Just a few more details to complete your registration.
            </p>

            {/* Back button */}
            <button 
              type="button" 
              onClick={handleBack}
              className="back-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <form onSubmit={handleSubmit} className="verification-form">
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="Enter your email"
                  readOnly={!!localStorage.getItem('registrationEmail')}
                  required 
                />
              </div>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Min 8 chars: Aa1! (uppercase, lowercase, number, special)" value={formData.password} onChange={handleChange} required />
                <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
                  Must contain: uppercase, lowercase, number, and special character
                </div>
              </div>
              <div className="checkbox-group">
                <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <label htmlFor="terms">I agree with Terms and Conditions</label>
              </div>
              
              <div className="error-message">{error}</div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
               {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </button>
            </form>

            <div className="info-card">
              <span className="info-icon">ℹ️</span>
              <p className="info-text">
                Your information is used solely for verification and is protected under our privacy policy. We will not share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationModal;
