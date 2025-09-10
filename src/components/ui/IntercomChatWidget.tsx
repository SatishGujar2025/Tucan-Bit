import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';

interface IntercomChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
}

const IntercomChatWidget: React.FC<IntercomChatWidgetProps> = ({ 
  position = 'bottom-right',
  theme = 'light'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  // Handle chat toggle - Simplified to prevent disappearing
  const handleChatToggle = () => {
    console.log('Chat toggle clicked, current state:', isOpen);
    setIsOpen(!isOpen);
    // Don't call Intercom methods here to prevent conflicts
  };

  // Handle minimize - Simplified to prevent disappearing
  const handleMinimize = () => {
    console.log('Minimize clicked');
    setIsOpen(false);
    setIsMinimized(true);
    // Don't call Intercom methods here to prevent conflicts
  };

  // Reset minimized state when opening
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  return (
    <div className={`fixed z-[9999] ${getPositionClasses()}`}>
      {/* Chat Button */}
      {!isOpen && !isMinimized && (
        <button
          onClick={handleChatToggle}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center bg-white hover:bg-gray-100 hover:scale-110 border-2 border-gray-200"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 rounded-lg shadow-2xl border-2 bg-white border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-gray-800" />
              <span className="font-semibold text-gray-800">Live Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMinimize}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={handleChatToggle}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">How can we help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to assist you 24/7
              </p>
              <button
                onClick={handleChatToggle}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Start Chat
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Powered by Intercom • 24/7 Support
            </p>
          </div>
        </div>
      )}

      {/* Minimized Indicator */}
      {isMinimized && !isOpen && (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleChatToggle}
            className="px-4 py-2 rounded-lg shadow-lg bg-white text-gray-800 border-2 border-gray-200 hover:scale-105 transition-all duration-200 hover:bg-gray-50"
          >
            <MessageCircle className="w-4 h-4 mr-2 inline text-gray-800" />
            Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default IntercomChatWidget; 