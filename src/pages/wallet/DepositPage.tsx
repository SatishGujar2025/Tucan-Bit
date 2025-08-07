import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Copy, Check, QrCode, CreditCard as CreditCardIcon, Award, Clock
} from 'lucide-react';

const DepositPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State specific to the deposit page's functionality
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');

  // All duplicated state (sidebarOpen, walletAddress, etc.) has been removed.
  // All duplicated functions (connectWallet, handleNavigate, etc.) have been removed.

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  // Data for the page
  const cryptocurrencies = [
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      icon: '₿', 
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      minDeposit: '0.001',
      network: 'Bitcoin',
      confirmations: '3'
    },
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      icon: 'Ξ', 
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      minDeposit: '0.01',
      network: 'Ethereum',
      confirmations: '12'
    },
    { 
      symbol: 'USDT', 
      name: 'Tether', 
      icon: '₮', 
      address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      minDeposit: '10',
      network: 'Tron',
      confirmations: '20'
    },
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      icon: 'S', 
      address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      minDeposit: '0.1',
      network: 'Solana',
      confirmations: '1'
    }
  ];

  const selectedCrypto = cryptocurrencies.find(crypto => crypto.symbol === selectedCurrency);

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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Deposit</span> Funds
            </h1>
            <p className="text-xl text-gray-300">Add funds to your account instantly with cryptocurrency deposits</p>
          </div>
        </section>

        {/* Currency Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Select Cryptocurrency</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cryptocurrencies.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => setSelectedCurrency(crypto.symbol)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedCurrency === crypto.symbol ? 'border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl text-white">{crypto.icon}</div>
                  <div className="text-left">
                    <div className="font-bold text-white">{crypto.symbol}</div>
                    <div className="text-sm text-gray-400">{crypto.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deposit Information */}
        {selectedCrypto && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* QR Code and Address */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center"><QrCode className="w-6 h-6 mr-3 text-yellow-400" />Deposit {selectedCrypto.name}</h3>
              <div className="text-center mb-6">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img src={selectedCrypto.qrCode} alt={`${selectedCrypto.name} QR Code`} className="w-48 h-48" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Deposit Address</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-900 rounded-lg px-4 py-3 font-mono text-sm text-gray-300 break-all">{selectedCrypto.address}</div>
                  <button onClick={() => copyToClipboard(selectedCrypto.address)} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm">
                    {copiedAddress === selectedCrypto.address ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedAddress === selectedCrypto.address ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><div className="text-gray-400">Minimum Deposit</div><div className="text-white font-semibold">{selectedCrypto.minDeposit} {selectedCrypto.symbol}</div></div>
                <div><div className="text-gray-400">Network</div><div className="text-white font-semibold">{selectedCrypto.network}</div></div>
                <div><div className="text-gray-400">Confirmations</div><div className="text-white font-semibold">{selectedCrypto.confirmations}</div></div>
                <div><div className="text-gray-400">Processing Time</div><div className="text-white font-semibold">5-30 minutes</div></div>
              </div>
            </div>

            {/* Instructions and Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl p-6 border border-blue-700/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center"><CreditCardIcon className="w-5 h-5 mr-2 text-blue-400" />How to Deposit</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3"><span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span><span>Copy the address or scan the QR code</span></li>
                  <li className="flex items-start space-x-3"><span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span><span>Send funds from your personal wallet</span></li>
                  <li className="flex items-start space-x-3"><span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span><span>Wait for network confirmations</span></li>
                </ol>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-2xl p-6 border border-yellow-700/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Award className="w-5 h-5 mr-2 text-yellow-400" />Important Notes</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start space-x-2"><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div><span>Only send {selectedCrypto.symbol} to this address.</span></li>
                  <li className="flex items-start space-x-2"><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div><span>Ensure you are using the {selectedCrypto.network} network.</span></li>
                </ul>
              </div>

               <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl p-6 border border-green-700/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-green-400" />
                      Recent Deposits
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{selectedCrypto.icon}</div>
                          <div>
                            <div className="text-white font-semibold">0.005 {selectedCrypto.symbol}</div>
                            <div className="text-sm text-gray-400">2 minutes ago</div>
                          </div>
                        </div>
                        <div className="text-green-400 font-semibold">Confirmed</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{selectedCrypto.icon}</div>
                          <div>
                            <div className="text-white font-semibold">0.002 {selectedCrypto.symbol}</div>
                            <div className="text-sm text-gray-400">15 minutes ago</div>
                          </div>
                        </div>
                        <div className="text-yellow-400 font-semibold">Pending</div>
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

export default DepositPage;