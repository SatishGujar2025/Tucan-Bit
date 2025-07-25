import React, { useState } from 'react';
import './LoginPopup.css'; 

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('You must accept the terms and conditions.');
      return;
    }
    console.log('Verification Data Submitted:', formData);
    onVerificationComplete(); // Signal to the parent component
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container verification-container" onClick={(e) => e.stopPropagation()}>
        {/* The verification form doesn't have the image side */}
        <div className="popup-form-section verification-form-section">
          <h2 className="welcome-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome</h2>
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
                <input type="text" name="postalAddress" placeholder="Postal address" value={formData.postalAddress} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="postalCode">Postal code</label>
                <input type="text" name="postalCode" placeholder="Postal code" value={formData.postalCode} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="dob">Date of Birth</label>
                <input type="text" name="dob" placeholder="dd / mm / yyyy" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="country">Select country</label>
                <select name="country" value={formData.country} onChange={handleChange} required>
                  <option value="" disabled>Select</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>
            <div className="checkbox-group" style={{ marginTop: '1rem' }}>
              <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
              <label htmlFor="terms">I agree with Terms and Conditions</label>
            </div>
            <button type="submit" className="submit-btn" style={{ marginTop: '1.5rem' }}>
             Let's GO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
