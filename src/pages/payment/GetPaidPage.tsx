import React, { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  Coins, 
  ArrowUpRight, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Shield,
  Clock,
  Info
} from 'lucide-react'; // Add Bank to the import list

const GetPaidPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const withdrawalMethods = [
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Coins,
      description: 'Withdraw to your crypto wallet',
      minAmount: 50,
      maxAmount: 10000,
      fee: '0.5%',
      time: '5-30 minutes'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Wallet, // Changed to Wallet as a placeholder, replace with actual Bank icon if available
      description: 'Direct bank transfer',
      minAmount: 100,
      maxAmount: 5000,
      fee: '2.5%',
      time: '1-3 business days'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Withdraw to your card',
      minAmount: 25,
      maxAmount: 2000,
      fee: '3%',
      time: '2-5 business days'
    }
  ];

  const selectedMethodData = withdrawalMethods.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Get Paid</h1>
          <p className="text-gray-400">Withdraw your winnings to your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdrawal Methods */}
          <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Withdrawal Methods</h2>
              <div className="space-y-3">
                {withdrawalMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                      selectedMethod === method.id
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className={`w-6 h-6 ${
                        selectedMethod === method.id ? 'text-yellow-400' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className={`font-semibold ${
                          selectedMethod === method.id ? 'text-yellow-400' : 'text-white'
                        }`}>
                          {method.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Withdrawal Details</h2>
              
              {selectedMethodData && (
                <div className="space-y-6">
                  {/* Method Info */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Min Amount</p>
                        <p className="text-white font-semibold">${selectedMethodData.minAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Max Amount</p>
                        <p className="text-white font-semibold">${selectedMethodData.maxAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Fee</p>
                        <p className="text-white font-semibold">{selectedMethodData.fee}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Processing Time</p>
                        <p className="text-white font-semibold">{selectedMethodData.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Available balance: $2,450.00
                    </p>
                  </div>

                  {/* Address/Account Input */}
                  {selectedMethod === 'crypto' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your wallet address"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  )}

                  {selectedMethod === 'bank' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bank Account Number</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your bank account number"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  )}

                  {selectedMethod === 'card' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your card number"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="text-blue-400 font-semibold mb-1">Security Notice</h3>
                        <p className="text-blue-300 text-sm">
                          All withdrawals are processed securely and may require additional verification for security purposes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                    <ArrowUpRight className="w-5 h-5" />
                    <span>Process Withdrawal</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPaidPage;