import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  LogOut, Wallet, AlertTriangle, Clock
} from 'lucide-react';

const WithdrawPage: React.FC = () => {
  // Get functions from the shared context
  const { openModal, setWithdrawDetails } = useAppContext();

  // State specific to this page
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [withdrawAddress, setWithdrawAddress] = useState('');

  const cryptocurrencies = [
    { 
      symbol: 'BTC', name: 'Bitcoin', icon: '₿', balance: '0.54321', minWithdraw: '0.001',
      maxWithdraw: '10', network: 'Bitcoin', fee: '0.0001', processingTime: '10-30 minutes'
    },
    { 
      symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: '10.987', minWithdraw: '0.01',
      maxWithdraw: '100', network: 'Ethereum', fee: '0.005', processingTime: '5-15 minutes'
    },
    { 
      symbol: 'USDT', name: 'Tether', icon: '₮', balance: '12,345.67', minWithdraw: '10',
      maxWithdraw: '100,000', network: 'Tron', fee: '1', processingTime: '2-10 minutes'
    },
    { 
      symbol: 'SOL', name: 'Solana', icon: 'S', balance: '123.45', minWithdraw: '0.1',
      maxWithdraw: '1000', network: 'Solana', fee: '0.00025', processingTime: '1-5 minutes'
    }
  ];

  const selectedCrypto = cryptocurrencies.find(crypto => crypto.symbol === selectedCurrency);

  // This function now uses the context to open the confirmation modal
  const handleWithdraw = () => {
    if (withdrawAmount && withdrawAddress && selectedCrypto) {
      // Set the details for the modal in the shared context
      setWithdrawDetails({
        amount: withdrawAmount,
        address: withdrawAddress,
        currency: selectedCrypto
      });
      // Open the confirmation modal, which is handled by Layout.tsx
      openModal('withdrawConfirm');
    }
  };

  return (
    <div className="p-6 bg-gray-900">
      <div>
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[40vh] min-h-[300px] flex items-center mb-12">
          <div className="absolute inset-0 bg-[url('https://iili.io/FwSX1Xj.png')] bg-cover bg-center" style={{ backgroundPosition: 'center 30%' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Withdraw</span> Funds
            </h1>
            <p className="text-xl text-gray-300">
              Withdraw your winnings to your cryptocurrency wallet instantly
            </p>
          </div>
        </section>

        {/* Currency Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Select Cryptocurrency</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cryptocurrencies.map((crypto) => (
              <button key={crypto.symbol} onClick={() => setSelectedCurrency(crypto.symbol)} className={`p-4 rounded-xl border-2 transition-all ${selectedCurrency === crypto.symbol ? 'border-yellow-500 bg-yellow-500/20' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl text-white">{crypto.icon}</div>
                  <div className="text-left">
                    <div className="font-bold text-white">{crypto.symbol}</div>
                    <div className="text-xs text-yellow-400">Balance: {crypto.balance}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Withdrawal Form and Info */}
        {selectedCrypto && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Panel */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <LogOut className="w-6 h-6 mr-3 text-yellow-400" />
                Withdraw {selectedCrypto.name}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                  <div className="relative">
                    <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder={`0.00 ${selectedCrypto.symbol}`} className="w-full bg-gray-900 rounded-lg px-4 py-3 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none" />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Available: {selectedCrypto.balance} {selectedCrypto.symbol}</span>
                    <button onClick={() => setWithdrawAmount(selectedCrypto.balance)} className="text-yellow-400 hover:text-yellow-300">Max</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Address</label>
                  <input type="text" value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} placeholder={`Enter your ${selectedCrypto.name} address`} className="w-full bg-gray-900 rounded-lg px-4 py-3 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none font-mono text-sm" />
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><div className="text-gray-400">Network Fee</div><div className="text-white font-semibold">{selectedCrypto.fee} {selectedCrypto.symbol}</div></div>
                    <div><div className="text-gray-400">Min Withdrawal</div><div className="text-white font-semibold">{selectedCrypto.minWithdraw} {selectedCrypto.symbol}</div></div>
                  </div>
                </div>
                <button onClick={handleWithdraw} disabled={!withdrawAmount || !withdrawAddress || parseFloat(withdrawAmount) < parseFloat(selectedCrypto.minWithdraw)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold text-base disabled:opacity-50">
                  Withdraw {selectedCrypto.symbol}
                </button>
              </div>
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl p-6 border border-red-700/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-red-400" />Important Notes</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start space-x-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div><span>Ensure you're using the correct network ({selectedCrypto.network}).</span></li>
                  <li className="flex items-start space-x-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div><span>Withdrawals are irreversible. Double-check your address.</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl p-6 border border-blue-700/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-blue-400" />Withdrawal Process</h3>
                <ol className="space-y-3 text-gray-300 text-sm">
                  <li>Enter the amount and your wallet address.</li>
                  <li>Confirm the transaction details.</li>
                  <li>Processing takes {selectedCrypto.processingTime}.</li>
                </ol>
              </div>
           <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl p-6 border border-green-700/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-green-400" />
                      Recent Withdrawals
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{selectedCrypto.icon}</div>
                          <div>
                            <div className="text-white font-semibold">0.001 {selectedCrypto.symbol}</div>
                            <div className="text-sm text-gray-400">2 hours ago</div>
                          </div>
                        </div>
                        <div className="text-green-400 font-semibold">Completed</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{selectedCrypto.icon}</div>
                          <div>
                            <div className="text-white font-semibold">0.005 {selectedCrypto.symbol}</div>
                            <div className="text-sm text-gray-400">1 day ago</div>
                          </div>
                        </div>
                        <div className="text-yellow-400 font-semibold">Processing</div>
                      </div>
                    </div>
                  </div>
           
            </div>


            
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawPage;