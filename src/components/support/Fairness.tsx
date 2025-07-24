import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, Eye, Zap, Award, Copy, Check } from 'lucide-react';

interface FairnessProps {
  onBack: () => void;
}

const Fairness: React.FC<FairnessProps> = ({ onBack }) => {
  const [copiedSeed, setCopiedSeed] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSeed(type);
    setTimeout(() => setCopiedSeed(null), 2000);
  };

  const verificationSteps = [
    {
      step: 1,
      title: 'Client Seed',
      description: 'You provide a random string (client seed) before the game starts',
      icon: Eye
    },
    {
      step: 2,
      title: 'Server Seed',
      description: 'We generate a random server seed and show you its hash',
      icon: Shield
    },
    {
      step: 3,
      title: 'Game Result',
      description: 'The game outcome is calculated using both seeds',
      icon: Zap
    },
    {
      step: 4,
      title: 'Verification',
      description: 'After the game, you can verify the result using our tools',
      icon: CheckCircle
    }
  ];

  const gameExamples = [
    {
      game: 'Crypto Slots',
      clientSeed: 'player123random',
      serverSeed: 'a1b2c3d4e5f6...',
      serverHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      result: 'Reel positions: [7, 3, 1]',
      verified: true
    },
    {
      game: 'Bitcoin Blackjack',
      clientSeed: 'myRandomSeed456',
      serverSeed: 'x9y8z7w6v5u4...',
      serverHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      result: 'Cards: [K♠, 7♥, 4♦]',
      verified: true
    }
  ];

  const certifications = [
    {
      name: 'iTech Labs',
      description: 'Independent testing of RNG systems',
      status: 'Certified',
      color: 'green'
    },
    {
      name: 'GLI (Gaming Labs)',
      description: 'Game fairness and compliance testing',
      status: 'Certified',
      color: 'blue'
    },
    {
      name: 'eCOGRA',
      description: 'Player protection and fair gaming',
      status: 'Certified',
      color: 'purple'
    },
    {
      name: 'TST (Technical Systems Testing)',
      description: 'Random number generator certification',
      status: 'Certified',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Provably Fair Gaming</h1>
            <p className="text-gray-300">Transparent and verifiable game outcomes</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-black/20 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">What is Provably Fair?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Provably fair gaming is a revolutionary technology that allows players to verify the fairness of every game round. 
              Unlike traditional online casinos where you must trust the operator, our provably fair system provides mathematical 
              proof that games are not manipulated.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Every game result is generated using a combination of your input (client seed) and our server seed, 
              ensuring that neither party can predict or manipulate the outcome.
            </p>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">How Provably Fair Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verificationSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="bg-black/20 rounded-xl p-6 border border-[#3C1A4F]/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 font-bold">{step.step}</span>
                      </div>
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Live Examples */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Live Game Examples</h2>
            <div className="space-y-6">
              {gameExamples.map((example, index) => (
                <div key={index} className="bg-black/20 rounded-xl p-6 border border-[#3C1A4F]/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{example.game}</h3>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold">Verified</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Client Seed</label>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-800 rounded-lg px-3 py-2 font-mono text-sm text-white">
                            {example.clientSeed}
                          </div>
                          <button
                            onClick={() => copyToClipboard(example.clientSeed, `client-${index}`)}
                            className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            {copiedSeed === `client-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-blue-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Server Seed Hash</label>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-800 rounded-lg px-3 py-2 font-mono text-sm text-white truncate">
                            {example.serverHash}
                          </div>
                          <button
                            onClick={() => copyToClipboard(example.serverHash, `hash-${index}`)}
                            className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
                          >
                            {copiedSeed === `hash-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-purple-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Server Seed (Revealed)</label>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-800 rounded-lg px-3 py-2 font-mono text-sm text-white">
                            {example.serverSeed}
                          </div>
                          <button
                            onClick={() => copyToClipboard(example.serverSeed, `server-${index}`)}
                            className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                          >
                            {copiedSeed === `server-${index}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-green-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Game Result</label>
                        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-3 py-2">
                          <span className="text-yellow-400 font-semibold">{example.result}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                      Verify This Game
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verification Tool */}
          <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Verification Tool</h2>
            <p className="text-gray-300 mb-6">
              Use our verification tool to check any game result. Simply enter the game details below:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Client Seed</label>
                <input
                  type="text"
                  placeholder="Enter your client seed"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Server Seed</label>
                <input
                  type="text"
                  placeholder="Enter server seed"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nonce</label>
                <input
                  type="number"
                  placeholder="Enter nonce"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
              Verify Game Result
            </button>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Third-Party Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-${cert.color}-900/30 to-${cert.color}-800/30 border border-${cert.color}-500/20 rounded-xl p-6 text-center`}
                >
                  <div className={`w-12 h-12 bg-${cert.color}-500/20 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Award className={`w-6 h-6 text-${cert.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{cert.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-${cert.color}-500/20 text-${cert.color}-400`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-black/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Can I change my client seed?</h3>
                <p className="text-gray-300">Yes, you can change your client seed at any time before placing a bet. This ensures you have control over the randomness.</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-white mb-2">How do I know the server seed wasn't changed?</h3>
                <p className="text-gray-300">We provide the hash of the server seed before the game starts. After the game, you can verify that the revealed server seed matches the original hash.</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-white mb-2">What is a nonce?</h3>
                <p className="text-gray-300">A nonce is a number that increases with each bet. It ensures that each game round has a unique result even with the same seeds.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Are all games provably fair?</h3>
                <p className="text-gray-300">Yes, all our original games use provably fair technology. Third-party games from providers may use certified RNG systems instead.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Fairness;