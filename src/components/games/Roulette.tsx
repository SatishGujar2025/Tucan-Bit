import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface RouletteProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onBack: () => void;
}

const Roulette: React.FC<RouletteProps> = ({ balance, onBalanceChange, onBack }) => {
  const [spinning, setSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [bets, setBets] = useState<{[key: string]: number}>({});
  const [totalBet, setTotalBet] = useState(0);
  const [lastWin, setLastWin] = useState(0);
  const [selectedChip, setSelectedChip] = useState(100);
  const [rotation, setRotation] = useState(0);

  const numbers = [
    { value: 0, color: 'green' },
    { value: 32, color: 'red' }, { value: 15, color: 'black' }, { value: 19, color: 'red' },
    { value: 4, color: 'black' }, { value: 21, color: 'red' }, { value: 2, color: 'black' },
    { value: 25, color: 'red' }, { value: 17, color: 'black' }, { value: 34, color: 'red' },
    { value: 6, color: 'black' }, { value: 27, color: 'red' }, { value: 13, color: 'black' },
    { value: 36, color: 'red' }, { value: 11, color: 'black' }, { value: 30, color: 'red' },
    { value: 8, color: 'black' }, { value: 23, color: 'red' }, { value: 10, color: 'black' },
    { value: 5, color: 'red' }, { value: 24, color: 'black' }, { value: 16, color: 'red' },
    { value: 33, color: 'black' }, { value: 1, color: 'red' }, { value: 20, color: 'black' },
    { value: 14, color: 'red' }, { value: 31, color: 'black' }, { value: 9, color: 'red' },
    { value: 22, color: 'black' }, { value: 18, color: 'red' }, { value: 29, color: 'black' },
    { value: 7, color: 'red' }, { value: 28, color: 'black' }, { value: 12, color: 'red' },
    { value: 35, color: 'black' }, { value: 3, color: 'red' }, { value: 26, color: 'black' }
  ];

  const chipValues = [10, 50, 100, 500, 1000];

  const placeBet = (betType: string) => {
    if (spinning || selectedChip > balance) return;
    
    const newBets = { ...bets };
    newBets[betType] = (newBets[betType] || 0) + selectedChip;
    setBets(newBets);
    setTotalBet(prev => prev + selectedChip);
    onBalanceChange(balance - selectedChip);
  };

  const clearBets = () => {
    if (spinning) return;
    onBalanceChange(balance + totalBet);
    setBets({});
    setTotalBet(0);
  };

  const spin = () => {
    if (spinning || totalBet === 0) return;
    
    setSpinning(true);
    setLastWin(0);
    setWinningNumber(null);
    
    const randomNumber = Math.floor(Math.random() * 37);
    const spinRotation = rotation + 1800 + (randomNumber * (360 / 37));
    setRotation(spinRotation);
    
    setTimeout(() => {
      setWinningNumber(randomNumber);
      
      let totalWin = 0;
      const winningColor = randomNumber === 0 ? 'green' : randomNumber % 2 === 0 ? 'black' : 'red';
      
      // Check straight up bets
      if (bets[`number-${randomNumber}`]) {
        totalWin += bets[`number-${randomNumber}`] * 36;
      }
      
      // Check color bets
      if (bets[`color-${winningColor}`]) {
        totalWin += bets[`color-${winningColor}`] * 2;
      }
      
      // Check even/odd bets
      if (randomNumber > 0) {
        if (randomNumber % 2 === 0 && bets['even']) {
          totalWin += bets['even'] * 2;
        } else if (randomNumber % 2 === 1 && bets['odd']) {
          totalWin += bets['odd'] * 2;
        }
      }
      
      // Check high/low bets
      if (randomNumber >= 1 && randomNumber <= 18 && bets['low']) {
        totalWin += bets['low'] * 2;
      } else if (randomNumber >= 19 && randomNumber <= 36 && bets['high']) {
        totalWin += bets['high'] * 2;
      }
      
      if (totalWin > 0) {
        setLastWin(totalWin);
        onBalanceChange(balance + totalWin);
      }
      
      setSpinning(false);
      setBets({});
      setTotalBet(0);
    }, 4000);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              onBack();
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lobby</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Ethereum Roulette</h1>
          <div className="text-right">
            <div className="text-lg text-gray-300">Balance</div>
            <div className="text-2xl font-bold text-white">{balance.toLocaleString()} ₿</div>
          </div>
        </div>

        {/* Roulette Wheel */}
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm border border-green-500/20 rounded-3xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="relative w-80 h-80 mx-auto">
              <div
                className="w-full h-full rounded-full border-8 border-yellow-500 bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-2xl transition-transform duration-4000 ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                </div>
                {/* Wheel numbers */}
                {numbers.map((number, index) => {
                  const angle = (index * 360) / numbers.length;
                  const x = Math.cos((angle * Math.PI) / 180) * 120;
                  const y = Math.sin((angle * Math.PI) / 180) * 120;
                  return (
                    <div
                      key={number.value}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        number.color === 'red' ? 'bg-red-600' : 
                        number.color === 'black' ? 'bg-black' : 'bg-green-600'
                      }`}
                      style={{
                        left: `calc(50% + ${x}px - 16px)`,
                        top: `calc(50% + ${y}px - 16px)`,
                      }}
                    >
                      {number.value}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {winningNumber !== null && (
              <div className="mt-6">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-2xl inline-block">
                  Winning Number: {winningNumber}
                </div>
                {lastWin > 0 && (
                  <div className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold text-xl">
                    You won {lastWin.toLocaleString()} TB!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Betting Board */}
          <div className="lg:col-span-2">
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Betting Board</h2>
              
              {/* Number Grid */}
              <div className="grid grid-cols-3 gap-1 mb-4">
                {Array.from({ length: 36 }, (_, i) => i + 1).map((number) => {
                  const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number);
                  const betKey = `number-${number}`;
                  const hasBet = bets[betKey] > 0;
                  
                  return (
                    <button
                      key={number}
                      onClick={() => placeBet(betKey)}
                      disabled={spinning}
                      className={`aspect-square text-white font-bold text-sm rounded transition-all duration-200 disabled:opacity-50 ${
                        isRed ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-900 hover:bg-gray-800'
                      } ${hasBet ? 'ring-2 ring-yellow-500' : ''}`}
                    >
                      {number}
                      {hasBet && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {bets[betKey]}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Zero */}
              <div className="mb-4">
                <button
                  onClick={() => placeBet('number-0')}
                  disabled={spinning}
                  className={`w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-all duration-200 disabled:opacity-50 ${
                    bets['number-0'] > 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  0 {bets['number-0'] > 0 && `(${bets['number-0']})`}
                </button>
              </div>

              {/* Outside Bets */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => placeBet('color-red')}
                  disabled={spinning}
                  className={`py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-all duration-200 disabled:opacity-50 ${
                    bets['color-red'] > 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  Red {bets['color-red'] > 0 && `(${bets['color-red']})`}
                </button>
                <button
                  onClick={() => placeBet('color-black')}
                  disabled={spinning}
                  className={`py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded transition-all duration-200 disabled:opacity-50 ${
                    bets['color-black'] > 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  Black {bets['color-black'] > 0 && `(${bets['color-black']})`}
                </button>
                <button
                  onClick={() => placeBet('even')}
                  disabled={spinning}
                  className={`py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-all duration-200 disabled:opacity-50 ${
                    bets['even'] > 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  Even {bets['even'] > 0 && `(${bets['even']})`}
                </button>
                <button
                  onClick={() => placeBet('odd')}
                  disabled={spinning}
                  className={`py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-all duration-200 disabled:opacity-50 ${
                    bets['odd'] > 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  Odd {bets['odd'] > 0 && `(${bets['odd']})`}
                </button>
                <button
                  onClick={() => placeBet('low')}
                  disabled={spinning}
                  className={`py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-all duration-200 disabled:opacity-50 ${
                    bets['low'] > 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  Low (1-18) {bets['low'] > 0 && `(${bets['low']})`}
                </button>
                <button
                  onClick={() => placeBet('high')}
                  disabled={spinning}
                  className={`py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-all duration-200 disabled:opacity-50 ${
                    bets['high'] > 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  High (19-36) {bets['high'] > 0 && `(${bets['high']})`}
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Chip Selection */}
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Select Chip</h2>
              <div className="grid grid-cols-3 gap-2">
                {chipValues.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setSelectedChip(chip)}
                    disabled={spinning}
                    className={`aspect-square rounded-full font-bold text-sm transition-all duration-200 disabled:opacity-50 ${
                      selectedChip === chip
                        ? 'bg-yellow-500 text-black ring-2 ring-yellow-300'
                        : 'bg-gradient-to-br from-yellow-600 to-yellow-800 text-white hover:from-yellow-500 hover:to-yellow-700'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Controls */}
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Game Controls</h2>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-sm text-gray-300">Total Bet</div>
                  <div className="text-2xl font-bold text-white">{totalBet.toLocaleString()} ₿</div>
                </div>
                <button
                  onClick={spin}
                  disabled={spinning || totalBet === 0}
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                    spinning || totalBet === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  }`}
                >
                  {spinning ? 'Spinning...' : 'Spin Wheel'}
                </button>
                <button
                  onClick={clearBets}
                  disabled={spinning || totalBet === 0}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  Clear Bets
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Stats</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Balance:</span>
                  <span className="text-white font-semibold">{balance.toLocaleString()} ₿</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Last Win:</span>
                  <span className="text-green-400 font-semibold">{lastWin.toLocaleString()} ₿</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">RTP:</span>
                  <span className="text-blue-400 font-semibold">97.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roulette;