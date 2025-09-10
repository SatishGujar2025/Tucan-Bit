import { useEffect, useCallback, useState } from 'react';
import { intercomService, IntercomUser, SecureModeData } from '../services/intercomService';

export const useIntercom = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Intercom with user data
  const boot = useCallback(async (user: IntercomUser, secureModeData?: SecureModeData) => {
    setIsLoading(true);
    try {
      await intercomService.boot(user, secureModeData);
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to boot Intercom:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user data
  const updateUser = useCallback(async (userData: Partial<IntercomUser>) => {
    try {
      await intercomService.updateUser(userData);
    } catch (error) {
      console.error('Failed to update Intercom user:', error);
    }
  }, []);

  // Track events
  const trackEvent = useCallback(async (eventName: string, metadata?: Record<string, any>) => {
    try {
      await intercomService.trackEvent({ eventName, metadata });
    } catch (error) {
      console.error('Failed to track Intercom event:', error);
    }
  }, []);

  // Gambling-specific event tracking
  const trackDeposit = useCallback(async (amount: number, currency: string, method: string) => {
    try {
      await intercomService.trackDeposit(amount, currency, method);
    } catch (error) {
      console.error('Failed to track deposit event:', error);
    }
  }, []);

  const trackWithdrawal = useCallback(async (amount: number, currency: string, status: string) => {
    try {
      await intercomService.trackWithdrawal(amount, currency, status);
    } catch (error) {
      console.error('Failed to track withdrawal event:', error);
    }
  }, []);

  const trackGamePlayed = useCallback(async (gameName: string, betAmount: number, winAmount: number, isWin: boolean) => {
    try {
      await intercomService.trackGamePlayed(gameName, betAmount, winAmount, isWin);
    } catch (error) {
      console.error('Failed to track game played event:', error);
    }
  }, []);

  const trackBonusClaimed = useCallback(async (bonusType: string, value: number, currency: string) => {
    try {
      await intercomService.trackBonusClaimed(bonusType, value, currency);
    } catch (error) {
      console.error('Failed to track bonus claimed event:', error);
    }
  }, []);

  // Show/Hide messenger
  const show = useCallback(async () => {
    try {
      await intercomService.show();
    } catch (error) {
      console.error('Failed to show Intercom:', error);
    }
  }, []);

  const hide = useCallback(async () => {
    try {
      await intercomService.hide();
    } catch (error) {
      console.error('Failed to hide Intercom:', error);
    }
  }, []);

  // Shutdown Intercom
  const shutdown = useCallback(async () => {
    try {
      await intercomService.shutdown();
      setIsInitialized(false);
    } catch (error) {
      console.error('Failed to shutdown Intercom:', error);
    }
  }, []);

  // Check if Intercom is loaded
  const checkIntercomLoaded = useCallback(() => {
    return intercomService.getInstance() !== null;
  }, []);

  return {
    // State
    isInitialized,
    isLoading,
    
    // Core functions
    boot,
    updateUser,
    trackEvent,
    
    // Gambling events
    trackDeposit,
    trackWithdrawal,
    trackGamePlayed,
    trackBonusClaimed,
    
    // UI control
    show,
    hide,
    shutdown,
    
    // Utility
    checkIntercomLoaded,
  };
}; 