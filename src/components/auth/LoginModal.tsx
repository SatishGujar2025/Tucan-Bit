// import React, { useState } from 'react';
// import { X, User, Lock, Eye, EyeOff } from 'lucide-react';

// interface LoginModalProps {
//   onClose: () => void;
//   onLogin: (username: string, password: string) => boolean;
// }

// const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!isLogin) {
//       // Sign up validation
//       if (password !== confirmPassword) {
//         setError('Passwords do not match');
//         setLoading(false);
//         return;
//       }
//       if (password.length < 6) {
//         setError('Password must be at least 6 characters');
//         setLoading(false);
//         return;
//       }
//       if (!email.includes('@')) {
//         setError('Please enter a valid email address');
//         setLoading(false);
//         return;
//       }
//     }

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     if (isLogin) {
//       const success = onLogin(username, password);
//       if (!success) {
//         setError('Invalid username or password. Try test/test');
//       }
//     } else {
//       // For signup, automatically log in with test credentials
//       const success = onLogin(username, password);
//       if (!success) {
//         setError('Registration failed. Please try again.');
//       }
//     }

//     setLoading(false);
//   };

//   const fillTestCredentials = () => {
//     setUsername('test');
//     setPassword('test');
//     if (!isLogin) {
//       setConfirmPassword('test');
//       setEmail('test@example.com');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-gradient-to-br from-gray-900 via-[#3C1A4F] to-gray-900 rounded-2xl p-8 max-w-md w-full border border-[#3C1A4F]/30">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-white">
//             {isLogin ? 'Welcome Back' : 'Create Account'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Test Credentials Helper */}
//         <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
//           <p className="text-blue-200 text-sm mb-2">
//             <strong>Test Credentials:</strong> username: test, password: test
//           </p>
//           <button
//             onClick={fillTestCredentials}
//             className="text-blue-400 hover:text-blue-300 text-sm font-medium"
//           >
//             Click to fill test credentials
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Username */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Username
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors"
//                 placeholder="Enter your username"
//               />
//             </div>
//           </div>

//           {/* Email (Sign up only) */}
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors"
//                 placeholder="Enter your email"
//               />
//             </div>
//           )}

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password (Sign up only) */}
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3C1A4F] transition-colors"
//                   placeholder="Confirm your password"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
//               <p className="text-red-400 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-[#3C1A4F] to-[#36CFC9] text-white py-3 rounded-lg font-semibold hover:from-[#3C1A4F]/80 hover:to-[#36CFC9]/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
//           </button>
//         </form>

//         {/* Toggle between Login/Signup */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-400">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setError('');
//                 setUsername('');
//                 setPassword('');
//                 setConfirmPassword('');
//                 setEmail('');
//               }}
//               className="ml-2 text-[#36CFC9] hover:text-[#36CFC9]/80 font-medium transition-colors"
//             >
//               {isLogin ? 'Sign Up' : 'Sign In'}
//             </button>
//           </p>
//         </div>

//         {/* Terms */}
//         <div className="mt-4 text-center">
//           <p className="text-gray-500 text-xs">
//             By continuing, you agree to our Terms of Service and Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;









import React, { useState } from 'react';
import './LoginPopup.css';



// Define the props for the component
interface LoginPopupProps {
  onClose: () => void; // A function to handle closing the popup
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Prevents the popup from closing when clicking inside it
  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      email,
      ageConfirmed: isConfirmed,
    });
    alert('Login form submitted!');
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


  },{
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
    icon: "http://www.w3.org/2000/svg",
    label: "Trust Wallet",
    showLabel: false,
  },

 
  
];
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={handlePopupContentClick}>

        {/* Left Side - Image and Cashback Banner */}
        <div className="popup-image-section">
        
        </div>

        {/* Right Side - Login Form */}
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