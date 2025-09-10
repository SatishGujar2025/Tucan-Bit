import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Plus, Minus } from 'lucide-react';

interface BlackjackProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onBack: () => void;
}

interface Card {
  suit: string;
  rank: string;
  value: number;
}

const Blackjack: React.FC<BlackjackProps> = ({ balance, onBalanceChange, onBack }) => {
  const [bet, setBet] = useState(100);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'dealer' | 'finished'>('betting');
  const [gameResult, setGameResult] = useState<string>('');
  const [deck, setDeck] = useState<Card[]>([]);
  const [canSplit, setCanSplit] = useState(false);
  const [canDouble, setCanDouble] = useState(false);

  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const createDeck = (): Card[] => {
    const newDeck: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        const value = rank === 'A' ? 11 : ['J', 'Q', 'K'].includes(rank) ? 10 : parseInt(rank);
        newDeck.push({ suit, rank, value });
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const calculateHandValue = (hand: Card[]): number => {
    let value = 0;
    let aces = 0;
    
    for (const card of hand) {
      if (card.rank === 'A') {
        aces++;
      }
      value += card.value;
    }
    
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    
    return value;
  };

  const dealCard = (currentDeck: Card[]): { card: Card; remainingDeck: Card[] } => {
    const card = currentDeck[0];
    const remainingDeck = currentDeck.slice(1);
    return { card, remainingDeck };
  };

  const startGame = () => {
    if (bet > balance) return;
    
    const newDeck = createDeck();
    let currentDeck = newDeck;
    
    // Deal initial cards
    const { card: playerCard1, remainingDeck: deck1 } = dealCard(currentDeck);
    const { card: dealerCard1, remainingDeck: deck2 } = dealCard(deck1);
    const { card: playerCard2, remainingDeck: deck3 } = dealCard(deck2);
    const { card: dealerCard2, remainingDeck: finalDeck } = dealCard(deck3);
    
    const newPlayerHand = [playerCard1, playerCard2];
    const newDealerHand = [dealerCard1, dealerCard2];
    
    setDeck(finalDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameState('playing');
    setGameResult('');
    
    // Check for blackjack
    const playerValue = calculateHandValue(newPlayerHand);
    const dealerValue = calculateHandValue(newDealerHand);
    
    if (playerValue === 21 && dealerValue === 21) {
      setGameResult('Push!');
      setGameState('finished');
      return;
    }
    
    if (playerValue === 21) {
      setGameResult('Blackjack! You win!');
      onBalanceChange(balance + bet * 1.5);
      setGameState('finished');
      return;
    }
    
    onBalanceChange(balance - bet);
    
    // Set available actions
    setCanSplit(newPlayerHand[0].rank === newPlayerHand[1].rank);
    setCanDouble(true);
  };

  const hit = () => {
    if (gameState !== 'playing') return;
    
    const { card, remainingDeck } = dealCard(deck);
    const newPlayerHand = [...playerHand, card];
    
    setPlayerHand(newPlayerHand);
    setDeck(remainingDeck);
    setCanDouble(false);
    setCanSplit(false);
    
    const playerValue = calculateHandValue(newPlayerHand);
    
    if (playerValue > 21) {
      setGameResult('Bust! Dealer wins.');
      setGameState('finished');
    } else if (playerValue === 21) {
      stand();
    }
  };

  const stand = () => {
    if (gameState !== 'playing') return;
    
    setGameState('dealer');
    setCanDouble(false);
    setCanSplit(false);
    
    // Dealer plays
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];
    
    while (calculateHandValue(currentDealerHand) < 17) {
      const { card, remainingDeck } = dealCard(currentDeck);
      currentDealerHand.push(card);
      currentDeck = remainingDeck;
    }
    
    setDealerHand(currentDealerHand);
    setDeck(currentDeck);
    
    // Determine winner
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(currentDealerHand);
    
    setTimeout(() => {
      if (dealerValue > 21) {
        setGameResult('Dealer busts! You win!');
        onBalanceChange(balance + bet * 2);
      } else if (dealerValue > playerValue) {
        setGameResult('Dealer wins!');
      } else if (playerValue > dealerValue) {
        setGameResult('You win!');
        onBalanceChange(balance + bet * 2);
      } else {
        setGameResult('Push!');
        onBalanceChange(balance + bet);
      }
      setGameState('finished');
    }, 1000);
  };

  const double = () => {
    if (gameState !== 'playing' || !canDouble || bet * 2 > balance) return;
    
    onBalanceChange(balance - bet);
    setBet(bet * 2);
    
    const { card, remainingDeck } = dealCard(deck);
    const newPlayerHand = [...playerHand, card];
    
    setPlayerHand(newPlayerHand);
    setDeck(remainingDeck);
    setCanDouble(false);
    setCanSplit(false);
    
    const playerValue = calculateHandValue(newPlayerHand);
    
    if (playerValue > 21) {
      setGameResult('Bust! Dealer wins.');
      setGameState('finished');
    } else {
      stand();
    }
  };

  const adjustBet = (amount: number) => {
    const newBet = Math.max(10, Math.min(1000, bet + amount));
    setBet(newBet);
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameState('betting');
    setGameResult('');
    setCanSplit(false);
    setCanDouble(false);
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
          <h1 className="text-3xl font-bold text-white">Bitcoin Blackjack</h1>
          <div className="text-right">
            <div className="text-lg text-gray-300">Balance</div>
            <div className="text-2xl font-bold text-white">{balance.toLocaleString()} ₿</div>
          </div>
        </div>

        {/* Game Table */}
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm border border-green-500/20 rounded-3xl p-8 mb-8">
          {/* Dealer Hand */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Dealer {gameState === 'playing' ? '(Hidden)' : `(${calculateHandValue(dealerHand)})`}
            </h2>
            <div className="flex justify-center space-x-4">
              {dealerHand.map((card, index) => (
                <div
                  key={index}
                  className={`w-20 h-28 bg-white rounded-lg flex flex-col items-center justify-center text-2xl font-bold shadow-lg ${
                    index === 1 && gameState === 'playing' ? 'bg-blue-900 text-white' : 
                    card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'
                  }`}
                >
                  {index === 1 && gameState === 'playing' ? (
                    <div className="text-center">
                      <div className="text-lg">?</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-lg">{card.rank}</div>
                      <div className="text-xl">{card.suit}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player Hand */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              Player ({calculateHandValue(playerHand)})
            </h2>
            <div className="flex justify-center space-x-4">
              {playerHand.map((card, index) => (
                <div
                  key={index}
                  className={`w-20 h-28 bg-white rounded-lg flex flex-col items-center justify-center text-2xl font-bold shadow-lg ${
                    card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg">{card.rank}</div>
                    <div className="text-xl">{card.suit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Result */}
          {gameResult && (
            <div className="text-center mt-8">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-2xl inline-block">
                {gameResult}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Betting Controls */}
          <div className="bg-black/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Bet Amount</h2>
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => adjustBet(-10)}
                disabled={gameState !== 'betting'}
                className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors disabled:opacity-50"
              >
                <Minus className="w-5 h-5 text-purple-400" />
              </button>
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-white">{bet} TB</div>
              </div>
              <button
                onClick={() => adjustBet(10)}
                disabled={gameState !== 'betting'}
                className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors disabled:opacity-50"
              >
                <Plus className="w-5 h-5 text-purple-400" />
              </button>
            </div>
            <div className="flex space-x-2">
              {[10, 50, 100, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setBet(amount)}
                  disabled={gameState !== 'betting'}
                  className={`flex-1 py-2 rounded-lg transition-colors disabled:opacity-50 ${
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

          {/* Game Actions */}
          <div className="bg-black/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Actions</h2>
            <div className="space-y-3">
              {gameState === 'betting' && (
                <button
                  onClick={startGame}
                  disabled={bet > balance}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
                >
                  Deal Cards
                </button>
              )}
              
              {gameState === 'playing' && (
                <>
                  <button
                    onClick={hit}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                  >
                    Hit
                  </button>
                  <button
                    onClick={stand}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
                  >
                    Stand
                  </button>
                  {canDouble && (
                    <button
                      onClick={double}
                      disabled={bet * 2 > balance}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 disabled:opacity-50"
                    >
                      Double Down
                    </button>
                  )}
                </>
              )}
              
              {gameState === 'finished' && (
                <button
                  onClick={resetGame}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>New Game</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blackjack;