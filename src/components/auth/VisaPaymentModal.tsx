import React, { useState } from 'react';
import { X, ChevronDown, CreditCard, Info } from 'lucide-react';

interface VisaPaymentModalProps {
  onClose: () => void;
}

const VisaPaymentModal: React.FC<VisaPaymentModalProps> = ({ onClose }) => {
  const [amount, setAmount] = useState('50');
  const [currency, setCurrency] = useState('EUR');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const currencies = ['EUR', 'USD', 'GBP'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md mx-auto shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button className="flex-1 py-4 px-6 text-sm font-medium text-gray-400 relative">
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              Deposit
            </span>
          </button>
          <button className="flex-1 py-4 px-6 text-sm font-medium text-gray-400 relative">
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              Withdraw
            </span>
          </button>
          
          {/* Payment Icons */}
          <div className="flex items-center gap-2 pr-6 py-4">
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">₿</div>
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Buy Crypto Header */}
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-blue-500" />
            <h3 className="text-white font-medium text-lg">Buy Crypto</h3>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            Buy crypto instantly, and have it automatically transferred to your Whale wallet.
            Services related to payments are provided by a separate platform which is owned
            by a third party.
          </p>

          {/* You Pay Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              You Pay
            </label>
            
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">€</span>
                  </div>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-white text-xl font-medium focus:outline-none w-20"
                  />
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <span className="font-medium">{currency}</span>
                    <ChevronDown size={16} />
                  </button>
                  
                  {isCurrencyOpen && (
                    <div className="absolute top-full right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 min-w-[80px]">
                      {currencies.map((curr) => (
                        <button
                          key={curr}
                          onClick={() => {
                            setCurrency(curr);
                            setIsCurrencyOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Provider Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Provider
            </label>
            
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="text-white font-medium">pay.io</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Methods
            </label>
            
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-gray-700 px-3 py-2 rounded-lg flex items-center gap-2">
                <div className="w-6 h-4 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🍎</span>
                </div>
                <span className="text-white text-sm font-medium">Pay</span>
              </div>
              
              <div className="bg-gray-700 px-3 py-2 rounded-lg flex items-center gap-2">
                <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-white text-sm font-medium">Pay</span>
              </div>
              
              <div className="bg-gray-700 px-3 py-2 rounded-lg flex items-center gap-2">
                <div className="w-6 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
              </div>
              
              <div className="bg-blue-600 px-3 py-2 rounded-lg">
                <span className="text-white text-sm font-bold">VISA</span>
              </div>
              
              <div className="bg-red-600 px-3 py-2 rounded-lg flex items-center">
                <span className="text-white text-sm font-bold">●●</span>
              </div>
              
              <div className="bg-gray-700 px-3 py-2 rounded-lg flex items-center gap-1">
                <span className="text-white text-xs">🏦</span>
                <span className="text-white text-sm font-medium">BANK</span>
              </div>
            </div>
          </div>

          {/* Buy Crypto Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
            <CreditCard size={16} />
            Buy Crypto
          </button>

          {/* Info Notice */}
          <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4 flex items-start gap-3">
            <Info size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-blue-400 text-sm">
              Depending on the blockchain network, the purchase may take a
              few minutes to arrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaPaymentModal;