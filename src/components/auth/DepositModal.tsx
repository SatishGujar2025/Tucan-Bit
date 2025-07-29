import React, { useState } from 'react';
import { X, ChevronDown, AlertTriangle } from 'lucide-react';
// Replaced: Switched to 'react-qr-code' for better module compatibility.
import QRCode from "react-qr-code";
import { FaCcVisa,FaBitcoin } from "react-icons/fa";


interface DepositModalProps {
  onClose: () => void;
  onVisaClick: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ onClose, onVisaClick }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState('TON');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('0.00');
  const [withdrawAddress, setWithdrawAddress] = useState('');

  // A sample deposit address for the QR code to encode.
  // In a real application, this would be dynamically fetched or passed as a prop.
  const depositAddress = "TQ1a1y2w3z4x5c6v7b8n9m0q1w2e3r4t5y6u7i8o9p0";




  const currencies = [
    { code: 'USDT', name: 'Tether', icon: '₮' },
    { code: 'BTC', name: 'Bitcoin', icon: '₿' },
    { code: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  ];

  const networks = [
    { code: 'TON', name: 'TON Network' },
    { code: 'BSC', name: 'Binance Smart Chain' },
    { code: 'ETH', name: 'Ethereum Network' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md mx-auto shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-ce
        nter justify-between p-6 border-b border-gray-700">
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
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'deposit'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Deposit
            </span>
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'withdraw'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              Withdraw
            </span>
          </button>
          
          {/* Payment Icons */}
          <div className="flex items-center gap-2 pr-6 py-4">
         <button 
  onClick={onVisaClick}
  className=" text-white px-2 text-12 py-2 rounded text-lg font-bold transition-colors duration-200"
>
   <span className="text-3xl"> 
    <FaCcVisa />
  </span>
</button>
           {/* <button 

  className=" text-white px-2 text-12 py-2 rounded text-lg font-bold transition-colors duration-200"
>
   <span className="text-3xl"> 
    <FaBitcoin />
  </span>
</button> */}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'deposit' ? (
            <>
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Currency
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ₮
                      </div>
                      <span>{selectedCurrency}</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  
                  {isCurrencyOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            setSelectedCurrency(currency.code);
                            setIsCurrencyOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {currency.icon}
                          </div>
                          <span>{currency.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Network Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Network
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                  >
                    <span>{selectedNetwork}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  
                  {isNetworkOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10">
                      {networks.map((network) => (
                        <button
                          key={network.code}
                          onClick={() => {
                            setSelectedNetwork(network.code);
                            setIsNetworkOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {network.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Deposit through Blockchain */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-white font-medium">Deposit through Blockchain</h3>
                </div>
                
                <p className="text-gray-400 text-sm">
                  Direct deposits through blockchain can take up to 10 minutes. Please be patient!
                </p>

                {/* QR Code using react-qr-code */}
                <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                  <QRCode
                    value={depositAddress}
                    size={160} // Adjust size as needed
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    viewBox={`0 0 160 160`}
                  />
                </div>

                {/* Warning */}
                <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-400 text-sm">
                    Please carefully check the deposit wallet address!
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Currency Selection for Withdraw */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Currency
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ₮
                      </div>
                      <span>{selectedCurrency}</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  
                  {isCurrencyOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            setSelectedCurrency(currency.code);
                            setIsCurrencyOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {currency.icon}
                          </div>
                          <span>{currency.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Network Selection for Withdraw */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Network
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                  >
                    <span>{selectedNetwork}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  
                  {isNetworkOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10">
                      {networks.map((network) => (
                        <button
                          key={network.code}
                          onClick={() => {
                            setSelectedNetwork(network.code);
                            setIsNetworkOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {network.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Withdraw through Blockchain */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-white font-medium">Withdraw through Blockchain</h3>
                </div>
                
                <p className="text-gray-400 text-sm">
                  Direct withdrawal through blockchain can take up to 10 minutes. Please be patient!
                </p>

                {/* Withdraw Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Withdraw Address
                  </label>
                  <input
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  />
                </div>

                {/* Withdrawal Amount */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Withdrawal amount
                    </label>
                    <span className="text-sm text-gray-400">Available: 0 USDT</span>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center bg-gray-700 border border-gray-600 rounded-lg">
                      <div className="flex items-center gap-2 px-4 py-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          ₮
                        </div>
                        <input
                          type="text"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="bg-transparent text-white focus:outline-none w-20"
                        />
                      </div>
                      <div className="flex items-center gap-2 px-4">
                        <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200">25%</button>
                        <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200">50%</button>
                        <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200">100%</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-400">Minimal withdraw:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ₮
                      </div>
                      <span className="text-sm text-white">1</span>
                    </div>
                  </div>
                </div>

                {/* Withdraw Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Withdraw
                </button>

                {/* Warning */}
                <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-400 text-sm">
                    We are not supporting memo!
                  </p>
                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
