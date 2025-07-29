import React, { useState } from 'react';

// Define the props the component expects from App.tsx
interface VerificationModalProps {
  onClose: () => void;
  onVerificationComplete: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ onClose, onVerificationComplete }) => {
  // State for the form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'ashenafiemu27@gmail.com', // This should ideally be passed as a prop
    postalAddress: '',
    postalCode: '',
    dob: '',
    country: '',
  });
  
  // State for the checkbox and any potential errors
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!termsAccepted) {
      setError('You must accept the terms and conditions.');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    console.log('Verification Data Submitted:', formData);
    
    // *** THIS IS THE KEY STEP ***
    // This function call tells App.tsx that the login is complete.
    // App.tsx will then update its state to show the "Deposit" button.
    onVerificationComplete();
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
          background-color: #1e2540;
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
          background-color: #2c3454;
          border: 1px solid #4a5588;
          border-radius: 8px;
          color: #fff;
          font-size: 0.9rem;
          box-sizing: border-box;
        }

        .verification-form .input-group input:focus,
        .verification-form .input-group select:focus {
            outline: none;
            border-color: #36CFC9;
            box-shadow: 0 0 0 2px rgba(54, 207, 201, 0.3);
        }

        .verification-form .input-group input:read-only {
          background-color: #252c48;
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
            accent-color: #36CFC9;
        }

        .checkbox-group label {
            font-size: 0.9rem;
            color: #ccc;
        }
        
        .submit-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(90deg, #36CFC9, #4A56E2);
            border: none;
            border-radius: 8px;
            color: #fff;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            margin-top: 0;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(54, 207, 201, 0.4);
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
          background-color: rgba(44, 52, 84, 0.5);
          border: 1px solid #2c3454;
          border-radius: 8px;
          padding: 12px 15px;
          margin-top: 1.5rem;
        }

        .info-icon {
          font-size: 1.1rem;
          margin-top: 2px;
          color: #36CFC9;
        }

        .info-text {
          font-size: 0.8rem;
          color: #a0a0b0;
          line-height: 1.6;
        }
      `}</style>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-container verification-container" onClick={(e) => e.stopPropagation()}>
          <div className="verification-form-section">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Welcome</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Confirm your details and get yourself verified.
            </p>

            <form onSubmit={handleSubmit} className="verification-form">
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" value={formData.email} readOnly />
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="postalAddress">Postal address</label>
                  <input type="text" name="postalAddress" placeholder="123 Main Street" value={formData.postalAddress} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="postalCode">Postal code</label>
                  <input type="text" name="postalCode" placeholder="90210" value={formData.postalCode} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" name="dob" placeholder="dd / mm / yyyy" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="country">Select country</label>
                  <select name="country" value={formData.country} onChange={handleChange} required>
                    <option value="" disabled>Select</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="ET">Ethiopia</option>
                  </select>
                </div>
              </div>
              <div className="checkbox-group">
                <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <label htmlFor="terms">I agree with Terms and Conditions</label>
              </div>
              
              <div className="error-message">{error}</div>

              <button type="submit" className="submit-btn">
               Let's GO
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
