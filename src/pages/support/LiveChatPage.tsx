import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Mail, Clock, User, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const LiveChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to TucanBit support. How can I help you today?',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate support response
      setIsTyping(true);
      setTimeout(() => {
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. Our support team will respond shortly. In the meantime, you can check our FAQ section for quick answers.',
          sender: 'support',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, supportMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] p-4">
      <div className="">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Live Chat Support</h1>
          <p className="text-gray-300 text-lg">Get instant help from our 24/7 support team</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Window */}
          <div className="lg:col-span-2">
            <div className="bg-black/20 backdrop-blur-sm border border-[#3C1A4F]/30 rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#3C1A4F] to-[#5B2A8C] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <h3 className="text-white font-semibold">TucanBit Support</h3>
                      <p className="text-gray-300 text-sm">Online • Responds in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">24/7</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-[#F25287] to-[#FF6B9D] text-white'
                          : 'bg-[#3C1A4F]/30 text-gray-200 border border-[#3C1A4F]/50'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-pink-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#3C1A4F]/30 border border-[#3C1A4F]/50 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-[#3C1A4F]/30">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="w-full bg-[#3C1A4F]/20 border border-[#3C1A4F]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-[#F25287] focus:ring-1 focus:ring-[#F25287]"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-[#F25287] to-[#FF6B9D] text-white p-3 rounded-xl hover:from-[#E04176] hover:to-[#F55A8C] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Support Info Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-black/20 backdrop-blur-sm border border-[#3C1A4F]/30 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-[#3C1A4F]/30 hover:bg-[#3C1A4F]/50 border border-[#3C1A4F]/50 rounded-xl px-4 py-3 text-left text-gray-300 hover:text-white transition-colors">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3" />
                    <span>Account Issues</span>
                  </div>
                </button>
                <button className="w-full bg-[#3C1A4F]/30 hover:bg-[#3C1A4F]/50 border border-[#3C1A4F]/50 rounded-xl px-4 py-3 text-left text-gray-300 hover:text-white transition-colors">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>Payment Problems</span>
                  </div>
                </button>
                <button className="w-full bg-[#3C1A4F]/30 hover:bg-[#3C1A4F]/50 border border-[#3C1A4F]/50 rounded-xl px-4 py-3 text-left text-gray-300 hover:text-white transition-colors">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3" />
                    <span>Technical Support</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-black/20 backdrop-blur-sm border border-[#3C1A4F]/30 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-[#F25287]" />
                  <span>support@tucanbit.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-3 text-[#F25287]" />
                  <span>24/7 Support Available</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-4 h-4 mr-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Average Response: 30 seconds</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-r from-[#3C1A4F] to-[#5B2A8C] rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-3">Need Quick Answers?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Check our comprehensive FAQ section for instant solutions to common questions.
              </p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 py-3 transition-colors">
                Browse FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatPage; 