import React, { useState } from 'react';

// Main App component to display and manage the popup
export default function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Default to true to show on load

  const handleVerificationComplete = () => {
    console.log("Verification complete! Closing popup.");
    setIsPopupVisible(false);
    // Here you would typically navigate the user or show a success message
  };

  return (
    <>
      {/* This is the main application background */}
      <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Application Page</h1>
        <p className="text-slate-400 mb-8">Click the button to open the verification popup.</p>
        <button
          onClick={() => setIsPopupVisible(true)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Show Verification Popup
        </button>
      </div>

      {/* Render the popup conditionally */}
      {isPopupVisible && (
        <VerificationPopup
          onClose={() => setIsPopupVisible(false)}
          onVerificationComplete={handleVerificationComplete}
        />
      )}
    </>
  );
}


// The VerificationPopup component
interface VerificationPopupProps {
  onClose: () => void;
  onVerificationComplete: () => void;
}

const VerificationPopup: React.FC<VerificationPopupProps> = ({ onClose, onVerificationComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'ashenafiemu27@gmail.com', // Pre-filled from previous step
    postalAddress: '',
    postalCode: '',
    dob: '',
    country: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms and conditions.');
      return;
    }
    setError('');
    console.log('Verification Data Submitted:', formData);
    onVerificationComplete(); // Signal to the parent component
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
          overflow: hidden; /* Prevents content from spilling out */
        }

        .verification-container {
          width: 90%;
          max-width: 500px; /* Increased max-width for better layout */
          height: auto;
          max-height: 90vh; /* Key property: limits the height */
          display: flex; /* Use flexbox for the main container */
          flex-direction: column;
        }

        .verification-form-section {
          padding: 2rem 2.5rem;
          overflow-y: auto; /* Key property: enables scrolling on the form section */
        }
        
        /* Custom scrollbar for webkit browsers */
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
          display: flex; /* Corrected from inline to flex */
          flex-direction: column; /* Stack on small screens */
          gap: 1rem;
        }
        
        /* Use media query for larger screens */
        @media (min-width: 500px) {
            .form-row {
                flex-direction: row; /* Side-by-side on larger screens */
            }
        }

        .form-row .input-group {
          flex: 1;
        }

        .verification-form .input-group {
          margin-bottom: 0;
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
