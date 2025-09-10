// Intercom Service for TucanBIT Gambling Site
// Replace 'YOUR_APP_ID' with your actual Intercom App ID

interface IntercomUser {
  user_id: string;
  email: string;
  name: string;
  created_at: number;
  // Custom attributes for gambling site
  current_balance?: number;
  vip_level?: string;
  last_deposit_date?: number;
  total_wagered?: number;
  number_of_games_played?: number;
  account_status?: string;
  verification_status?: string;
  preferred_payment_method?: string;
  country?: string;
  language?: string;
}

interface IntercomEvent {
  eventName: string;
  metadata?: Record<string, any>;
}

interface SecureModeData {
  user_id: string;
  hmac: string;
}

class IntercomService {
  private appId: string;
  private isLoaded: boolean = false;
  private isInitialized: boolean = false;

  constructor(appId: string) {
    this.appId = appId;
    this.checkIntercomLoaded();
  }

  private checkIntercomLoaded(): void {
    if (typeof window !== 'undefined' && window.Intercom) {
      this.isLoaded = true;
    } else {
      // Wait for Intercom to load
      const checkInterval = setInterval(() => {
        if (typeof window !== 'undefined' && window.Intercom) {
          this.isLoaded = true;
          clearInterval(checkInterval);
        }
      }, 100);
    }
  }

  private waitForIntercom(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isLoaded) {
        resolve();
      } else {
        const checkInterval = setInterval(() => {
          if (this.isLoaded) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      }
    });
  }

  /**
   * Initialize Intercom with user data
   * @param user - User data for identification
   * @param secureModeData - Optional secure mode data for verification
   */
  async boot(user: IntercomUser, secureModeData?: SecureModeData): Promise<void> {
    try {
      await this.waitForIntercom();

      const bootData: any = {
        app_id: this.appId,
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        // Custom attributes
        current_balance: user.current_balance,
        vip_level: user.vip_level,
        last_deposit_date: user.last_deposit_date,
        total_wagered: user.total_wagered,
        number_of_games_played: user.number_of_games_played,
        account_status: user.account_status,
        verification_status: user.verification_status,
        preferred_payment_method: user.preferred_payment_method,
        country: user.country,
        language: user.language,
      };

      // Add secure mode if provided
      if (secureModeData) {
        bootData.user_hash = secureModeData.hmac;
      }

      // Boot Intercom
      window.Intercom('boot', bootData);
      this.isInitialized = true;

      console.log('Intercom booted successfully for user:', user.user_id);
    } catch (error) {
      console.error('Failed to boot Intercom:', error);
    }
  }

  /**
   * Update user data without re-booting
   * @param userData - Updated user data
   */
  async updateUser(userData: Partial<IntercomUser>): Promise<void> {
    try {
      await this.waitForIntercom();
      
      if (!this.isInitialized) {
        console.warn('Intercom not initialized. Call boot() first.');
        return;
      }

      window.Intercom('update', userData);
      console.log('Intercom user updated:', userData);
    } catch (error) {
      console.error('Failed to update Intercom user:', error);
    }
  }

  /**
   * Track custom events
   * @param event - Event data
   */
  async trackEvent(event: IntercomEvent): Promise<void> {
    try {
      await this.waitForIntercom();
      
      if (!this.isInitialized) {
        console.warn('Intercom not initialized. Call boot() first.');
        return;
      }

      window.Intercom('trackEvent', event.eventName, event.metadata);
      console.log('Intercom event tracked:', event);
    } catch (error) {
      console.error('Failed to track Intercom event:', error);
    }
  }

  /**
   * Track gambling-specific events
   */
  async trackDeposit(amount: number, currency: string, method: string): Promise<void> {
    await this.trackEvent({
      eventName: 'deposit_successful',
      metadata: {
        amount,
        currency,
        payment_method: method,
        timestamp: Date.now()
      }
    });
  }

  async trackWithdrawal(amount: number, currency: string, status: string): Promise<void> {
    await this.trackEvent({
      eventName: 'withdrawal_requested',
      metadata: {
        amount,
        currency,
        status,
        timestamp: Date.now()
      }
    });
  }

  async trackGamePlayed(gameName: string, betAmount: number, winAmount: number, isWin: boolean): Promise<void> {
    await this.trackEvent({
      eventName: 'game_played',
      metadata: {
        game_name: gameName,
        bet_amount: betAmount,
        win_amount: winAmount,
        is_win: isWin,
        timestamp: Date.now()
      }
    });
  }

  async trackBonusClaimed(bonusType: string, value: number, currency: string): Promise<void> {
    await this.trackEvent({
      eventName: 'bonus_claimed',
      metadata: {
        bonus_type: bonusType,
        value,
        currency,
        timestamp: Date.now()
      }
    });
  }

  /**
   * Show Intercom messenger
   */
  async show(): Promise<void> {
    try {
      await this.waitForIntercom();
      window.Intercom('show');
    } catch (error) {
      console.error('Failed to show Intercom:', error);
    }
  }

  /**
   * Hide Intercom messenger
   */
  async hide(): Promise<void> {
    try {
      await this.waitForIntercom();
      window.Intercom('hide');
    } catch (error) {
      console.error('Failed to hide Intercom:', error);
    }
  }

  /**
   * Shutdown Intercom (call on logout)
   */
  async shutdown(): Promise<void> {
    try {
      await this.waitForIntercom();
      window.Intercom('shutdown');
      this.isInitialized = false;
      console.log('Intercom shutdown successfully');
    } catch (error) {
      console.error('Failed to shutdown Intercom:', error);
    }
  }

  /**
   * Get Intercom instance
   */
  getInstance(): any {
    if (typeof window !== 'undefined' && window.Intercom) {
      return window.Intercom;
    }
    return null;
  }
}

// Create and export singleton instance
export const intercomService = new IntercomService('YOUR_APP_ID');

// Export types for use in components
export type { IntercomUser, IntercomEvent, SecureModeData }; 