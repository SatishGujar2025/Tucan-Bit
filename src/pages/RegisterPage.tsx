import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      icon: "data:image/jpeg;base64,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",
      label: "Trust Wallet",
      showLabel: false,
    },
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isConfirmed) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the registration data to your server
      console.log('Registration data:', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        ageConfirmed: isConfirmed,
      });
      
      // For now, just navigate to login page
      navigate('/login');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Register Form */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">TucanBit</h1>
            </div>
            <h2 className="text-xl font-semibold text-white">Create Your Account</h2>
            <p className="text-gray-400 mt-2">Join the ultimate crypto gaming experience</p>
          </div>

          {/* Social Login Options */}
          <div className="mb-6">
            <div className="flex justify-center space-x-3">
              {socialLoginOptions.map((option) => (
                <button key={option.label} className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <img src={option.icon} alt={`${option.label} logo`} className="w-5 h-5" />
                </button>
              ))}
            </div>
            <div className="text-center mt-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex-1 h-px bg-gray-600"></div>
                <span className="text-gray-400 text-sm px-4">or register with email</span>
                <div className="flex-1 h-px bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                    errors.username ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
              </div>
              {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={isConfirmed}
                onChange={(e) => {
                  setIsConfirmed(e.target.checked);
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }));
                  }
                }}
                className="mt-1 w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-300">
                I confirm that I am 18 years old and I have read and agree to the{' '}
                <Link to="/terms" className="text-yellow-500 hover:text-yellow-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-yellow-500 hover:text-yellow-400">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-red-400 text-sm">{errors.terms}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-500 hover:text-yellow-400 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 