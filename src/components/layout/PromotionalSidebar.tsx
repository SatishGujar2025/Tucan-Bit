import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Crown, MoreHorizontal } from 'lucide-react';
import tucanIcon from '../../assets/tucan.png';

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  avatar: string;
  level?: number;
  isOfficial?: boolean;
}

interface PromotionalSidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromotionalSidebar: React.FC<PromotionalSidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [messageInput, setMessageInput] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(474);
  const [showChatRules, setShowChatRules] = useState(false);

  // Sample chat messages with random content
  const [chatMessages] = useState<ChatMessage[]>([
    { id: 1, username: 'haidar', message: 'Anyone playing Crazy Time?', timestamp: '16:05', avatar: 'tucan', level: 1 },
    { id: 2, username: 'z400i', message: 'Just won 500x on Sweet Bonanza!', timestamp: '16:50', avatar: 'tucan', level: 11 },
    { id: 3, username: 'bittudelhi', message: 'Good luck everyone!', timestamp: '17:25', avatar: 'tucan', level: 18 },
    { id: 4, username: 'Tucaner', message: 'Battlepass > Available Rewards > Daily Cashback ✨', timestamp: '17:54', avatar: 'crown', isOfficial: true },
    { id: 5, username: 'gamer123', message: 'Anyone tried the new slots?', timestamp: '18:10', avatar: 'tucan', level: 5 },
    { id: 6, username: 'slotking', message: 'Gates of Olympus is insane today!', timestamp: '18:15', avatar: 'tucan', level: 22 },
    { id: 7, username: 'lucky777', message: 'Just hit a 1000x multiplier!', timestamp: '18:20', avatar: 'tucan', level: 7 },
    { id: 8, username: 'casinopro', message: 'Anyone want to join a tournament?', timestamp: '18:25', avatar: 'tucan', level: 15 },
    { id: 9, username: 'TucanBit', message: 'New games coming this week! Stay tuned! 🎮', timestamp: '18:30', avatar: 'tucan', isOfficial: true },
    { id: 10, username: 'winningstreak', message: 'On fire today! 5 wins in a row!', timestamp: '18:35', avatar: 'tucan', level: 9 },
  ]);

  // Simulate online users changing
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Show button when sidebar is collapsed */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="fixed z-[9999999] bg-transparent hover:bg-white/10 text-white shadow-lg transition-all duration-300 border border-white/20 hover:border-white/40 top-4 right-4 p-2 rounded-lg hidden lg:block modal-open:hidden"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}

      {/* Live Chat Sidebar */}
      <div className={`fixed z-[9999998] inset-y-0 right-0 bg-gray-900 shadow-2xl border-l border-gray-800 overflow-y-auto scrollbar-hide transition-all duration-300 hidden lg:block ${
        isExpanded ? 'w-80 translate-x-0' : 'w-0 translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header with Navigation */}
          <div className="p-4 border-b border-gray-800 bg-gray-800">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Menu Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveMenu('main')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    activeMenu === 'main' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Main
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {onlineUsers}
                  </div>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className="group">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        {message.avatar === 'tucan' ? (
                          <img src={tucanIcon} alt="User" className="w-full h-full object-cover" />
                        ) : message.avatar === 'crown' ? (
                          <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center">
                            <Crown className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                            {message.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {message.username}
                          {message.level && (
                            <span className="ml-1 text-xs text-gray-400">({message.level})</span>
                          )}
                        </span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        {message.isOfficial && (
                          <Crown className="w-3 h-3 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{message.message}</p>
                      
                      {/* Message Actions - Three dots */}
                      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs text-gray-500 hover:text-blue-400 transition-colors">
                          Reply
                        </button>
                        <button className="text-xs text-gray-500 hover:text-green-400 transition-colors">
                          👍
                        </button>
                        <button className="text-xs text-gray-500 hover:text-red-400 transition-colors">
                          ❤️
                        </button>
                        <button className="text-xs text-gray-500 hover:text-yellow-400 transition-colors">
                          🎉
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input Area - Moved up to avoid Intercom widget */}
          <div className="p-4 pb-8 border-t border-gray-800">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Say something..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onFocus={() => !isSignedIn && setMessageInput('')}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  disabled={!isSignedIn}
                />
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  😊
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  📎
                </button>
              </div>
              
              {/* Sign In Required Message - Shows when user tries to type */}
              {!isSignedIn && (
                <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-300">
                      Sign in to chat
                    </div>
                    <button
                      onClick={() => setIsSignedIn(true)}
                      className="bg-white hover:bg-gray-100 text-black px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <button 
                  onClick={() => setShowChatRules(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Chat Rules
                </button>
                <span>{messageInput.length}/120</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Rules Modal - Full Screen Overlay */}
      {showChatRules && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <h3 className="text-lg font-bold text-white">Chat Rules</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowChatRules(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Got it
                </button>
                <button
                  onClick={() => setShowChatRules(false)}
                  className="text-gray-400 hover:text-white text-xl p-1"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Welcome Section */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🐦</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Welcome to the TucanBIT Community!</h4>
                  <p className="text-gray-300 text-sm">
                    Glad you're here. We keep things fun, exciting, and fair, so read this before you dive in:
                  </p>
                </div>
              </div>

              {/* Do This Section */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🔥</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Do This, And You're Good:</h4>
                  <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Have fun, celebrate your wins, and connect with the flock</li>
                    <li>Network, share strategies, and celebrate together</li>
                    <li>Respect each other. We're here to build, not bicker</li>
                    <li>English only (unless you're in a dedicated language topic)</li>
                    <li>Need help? Hit up Support, they're fast and friendly</li>
                  </ol>
                </div>
              </div>

              {/* What Gets You Kicked Section */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">⚠️</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">What Gets You Kicked:</h4>
                  <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Abuse, spam, scams, hard no</li>
                    <li>No external links or ads. No promos</li>
                    <li>Break the rules = instant removal. No warning, no drama.</li>
                  </ol>
                </div>
              </div>

              {/* Quick Note Section */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🧠</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Quick Note:</h4>
                  <p className="text-gray-300 text-sm">
                    TucanBIT mods will update rules as needed to keep things flowing for everyone. Full terms live{' '}
                    <a href="/terms-of-service" className="text-blue-400 hover:text-blue-300 underline">
                      here
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionalSidebar; 