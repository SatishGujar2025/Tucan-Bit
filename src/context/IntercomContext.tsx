import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useIntercom } from '../hooks/useIntercom';
import { IntercomUser, SecureModeData } from '../services/intercomService';

interface IntercomContextType {
  // State
  isInitialized: boolean;
  isLoading: boolean;
  
  // Core functions
  boot: (user: IntercomUser, secureModeData?: SecureModeData) => Promise<void>;
  updateUser: (userData: Partial<IntercomUser>) => Promise<void>;
  trackEvent: (eventName: string, metadata?: Record<string, any>) => Promise<void>;
  
  // Gambling events
  trackDeposit: (amount: number, currency: string, method: string) => Promise<void>;
  trackWithdrawal: (amount: number, currency: string, status: string) => Promise<void>;
  trackGamePlayed: (gameName: string, betAmount: number, winAmount: number, isWin: boolean) => Promise<void>;
  trackBonusClaimed: (bonusType: string, value: number, currency: string) => Promise<void>;
  
  // UI control
  show: () => Promise<void>;
  hide: () => Promise<void>;
  shutdown: () => Promise<void>;
  
  // Utility
  checkIntercomLoaded: () => boolean;
}

const IntercomContext = createContext<IntercomContextType | undefined>(undefined);

interface IntercomProviderProps {
  children: ReactNode;
  appId?: string;
}

export const IntercomProvider: React.FC<IntercomProviderProps> = ({ 
  children, 
  appId = 'YOUR_APP_ID' 
}) => {
  const intercom = useIntercom();

  // Auto-initialize Intercom for anonymous users (optional)
  useEffect(() => {
    // You can auto-initialize Intercom for anonymous users here
    // This is useful for collecting anonymous user data before login
    const initializeAnonymous = async () => {
      // Only initialize if user is not logged in
      // You can check your auth state here
      const isLoggedIn = false; // Replace with your auth check
      
      if (!isLoggedIn) {
        // Initialize with anonymous user
        await intercom.boot({
          user_id: `anonymous_${Date.now()}`,
          email: '',
          name: 'Anonymous User',
          created_at: Math.floor(Date.now() / 1000),
        });
      }
    };

    // Uncomment the line below if you want to auto-initialize for anonymous users
    // initializeAnonymous();
  }, [intercom]);

  return (
    <IntercomContext.Provider value={intercom}>
      {children}
    </IntercomContext.Provider>
  );
};

export const useIntercomContext = (): IntercomContextType => {
  const context = useContext(IntercomContext);
  if (context === undefined) {
    throw new Error('useIntercomContext must be used within an IntercomProvider');
  }
  return context;
}; 