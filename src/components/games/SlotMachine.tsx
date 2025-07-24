import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Plus, Minus, Volume2 } from 'lucide-react';

interface SlotMachineProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onBack: () => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ balance, onBalanceChange, onBack }) => {
  const [bet, setBet] = useState(100);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState(['🍎', '🍌', '🍇']);
  const [lastWin, setLastWin] = useState(0);
  const [totalWins, setTotalWins] = useState(0);

  const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '💎', '⭐', '🔔'];
  const payTable = {
    '💎💎💎': 1000,
    '⭐⭐⭐': 500,
    '🔔🔔🔔': 250,
    '🍎🍎🍎': 100,
    '🍌🍌🍌': 80,
    '🍇🍇🍇': 60,
    '🍊🍊🍊': 40,
    '🍓🍓🍓': 20,
  };

  const spin = () => {
    if (spinning || bet > balance) return;
    
    setSpinning(true);
    setLastWin(0);
    onBalanceChange(balance - bet);

    // Animate reels
    const animationDuration = 2000;
    const spinInterval = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      
      elapsed += spinInterval;
      
      if (elapsed >= animationDuration) {
        clearInterval(interval);
        
        // Final result
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        setReels(finalReels);
        
        // Check for wins
        const combination = finalReels.join('');
        const win = payTable[combination as keyof typeof payTable] || 0;
        
        if (win > 0) {
          const winAmount = win * bet / 100;
          setLastWin(winAmount);
          setTotalWins(prev => prev + winAmount);
          onBalanceChange(balance + winAmount);
        }
        
        setSpinning(false);
      }
    }, spinInterval);
  };

  const adjustBet = (amount: number) => {
    const newBet = Math.max(10, Math.min(1000, bet + amount));
    setBet(newBet);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            onClick={() => {
              window.scrollTo(0, 0);
              onBack();
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lobby</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Crypto Fortune</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors">
              <Volume2 className="w-5 h-5 text-purple-400" />
            </button>
          </div>
        </div>

        {/* Slot Machine */}
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="bg-black/30 rounded-2xl p-8 mb-6">
              <div className="flex justify-center space-x-4 mb-6">
                {reels.map((symbol, index) => (
                  <div
                    key={index}
                    className={`w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-4xl border-2 border-purple-500/30 ${
                      spinning ? 'animate-pulse' : ''
                    }`}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
              
              {lastWin > 0 && (
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-xl animate-pulse">
                  WIN: {lastWin.toLocaleString()} ₿
                </div>
              )}
            </div>

            <button
              onClick={spin}
              disabled={spinning || bet > balance}
              className={`w-32 h-32 rounded-full font-bold text-2xl transition-all duration-200 ${
                spinning || bet > balance
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:scale-105'
              }`}
            >
              {spinning ? (
                <div className="flex items-center justify-center">
                  <RotateCcw className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                'SPIN'
              )}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bet Controls */}
          <div className="bg-black/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Bet Amount</h2>
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => adjustBet(-10)}
                className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <Minus className="w-5 h-5 text-purple-400" />
              </button>
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-white">{bet} ₿</div>
                <div className="text-sm text-gray-400">per spin</div>
              </div>
              <button
                onClick={() => adjustBet(10)}
                className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <Plus className="w-5 h-5 text-purple-400" />
              </button>
            </div>
            <div className="flex space-x-2">
              {[10, 50, 100, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setBet(amount)}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    bet === amount
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-black/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Game Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Balance:</span>
                <span className="text-white font-semibold">{balance.toLocaleString()} ₿</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Wins:</span>
                <span className="text-green-400 font-semibold">{totalWins.toLocaleString()} ₿</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Last Win:</span>
                <span className="text-yellow-400 font-semibold">{lastWin.toLocaleString()} TB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">RTP:</span>
                <span className="text-blue-400 font-semibold">96.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pay Table */}
        <div className="mt-8 bg-black/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Pay Table</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(payTable).map(([combination, multiplier]) => (
              <div key={combination} className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                <span className="text-2xl">{combination.split('').join(' ')}</span>
                <span className="text-yellow-400 font-semibold">{multiplier}x</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;