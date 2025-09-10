import React, { useEffect } from 'react';
import { useIntercomContext } from '../context/IntercomContext';

//  Example 1 Basic User Login and Intercom Boot
export const LoginExample: React.FC = () => {
  const { boot, isInitialized } = useIntercomContext();

  const handleLogin = async (userData: any) => {
    try {
      // Boot Intercom with user data
      await boot({
        user_id: userData.id,
        email: userData.email,
        name: userData.name,
        created_at: Math.floor(new Date(userData.createdAt).getTime() / 1000),
        current_balance: userData.balance,
        vip_level: userData.vipLevel,
        account_status: userData.status,
        verification_status: userData.verificationStatus,
        country: userData.country,
        language: userData.language
      });

      console.log('Intercom booted successfully!');
    } catch (error) {
      console.error('Failed to boot Intercom:', error);
    }
  };

  return (
    <div>
      <h3>Login Example</h3>
      <button onClick={() => handleLogin({
        id: 'user123',
        email: 'user@example.com',
        name: 'John Doe',
        createdAt: new Date(),
        balance: 1000,
        vipLevel: 'Gold',
        status: 'active',
        verificationStatus: 'verified',
        country: 'US',
        language: 'en'
      })}>
        Login User
      </button>
      <p>Intercom Status: {isInitialized ? 'Initialized' : 'Not Initialized'}</p>
    </div>
  );
};

// Example 2 Secure Mode Implementation
export const SecureModeExample: React.FC = () => {
  const { boot } = useIntercomContext();

  const handleSecureLogin = async (userData: any) => {
    try {
      // Get secure mode data from your backend
      const response = await fetch('/api/intercom/secure-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userData.id })
      });
      
      const { data: secureModeData } = await response.json();

      // Boot Intercom with secure mode
      await boot({
        user_id: userData.id,
        email: userData.email,
        name: userData.name,
        created_at: Math.floor(new Date(userData.createdAt).getTime() / 1000),
        current_balance: userData.balance,
        vip_level: userData.vipLevel
      }, secureModeData);

      console.log('Intercom booted with secure mode!');
    } catch (error) {
      console.error('Failed to boot Intercom with secure mode:', error);
    }
  };

  return (
    <div>
      <h3>Secure Mode Example</h3>
      <button onClick={() => handleSecureLogin({
        id: 'user123',
        email: 'user@example.com',
        name: 'John Doe',
        createdAt: new Date(),
        balance: 1000,
        vipLevel: 'Gold'
      })}>
        Login with Secure Mode
      </button>
    </div>
  );
};

// Example 3: Event Tracking
export const EventTrackingExample: React.FC = () => {
  const { 
    trackDeposit, 
    trackWithdrawal, 
    trackGamePlayed, 
    trackBonusClaimed 
  } = useIntercomContext();

  const handleDeposit = async () => {
    await trackDeposit(100, 'USD', 'credit_card');
  };

  const handleWithdrawal = async () => {
    await trackWithdrawal(50, 'USD', 'pending');
  };

  const handleGamePlayed = async () => {
    await trackGamePlayed('Sweet Bonanza', 10, 25, true); // Win
  };

  const handleBonusClaimed = async () => {
    await trackBonusClaimed('welcome_bonus', 100, 'USD');
  };

  return (
    <div>
      <h3>Event Tracking Examples</h3>
      <div className="space-y-2">
        <button onClick={handleDeposit} className="block w-full">
          Track Deposit ($100)
        </button>
        <button onClick={handleWithdrawal} className="block w-full">
          Track Withdrawal ($50)
        </button>
        <button onClick={handleGamePlayed} className="block w-full">
          Track Game Played (Win)
        </button>
        <button onClick={handleBonusClaimed} className="block w-full">
          Track Bonus Claimed
        </button>
      </div>
    </div>
  );
};

// Example 4: User Data Updates
export const UserUpdateExample: React.FC = () => {
  const { updateUser } = useIntercomContext();

  const handleBalanceUpdate = async () => {
    await updateUser({
      current_balance: 1500,
      last_deposit_date: Math.floor(Date.now() / 1000)
    });
  };

  const handleVIPLevelUpdate = async () => {
    await updateUser({
      vip_level: 'Platinum',
      total_wagered: 50000
    });
  };

  return (
    <div>
      <h3>User Update Examples</h3>
      <div className="space-y-2">
        <button onClick={handleBalanceUpdate} className="block w-full">
          Update Balance & Last Deposit
        </button>
        <button onClick={handleVIPLevelUpdate} className="block w-full">
          Update VIP Level & Total Wagered
        </button>
      </div>
    </div>
  );
};

// Example 5: Custom Event Tracking
export const CustomEventExample: React.FC = () => {
  const { trackEvent } = useIntercomContext();

  const handleCustomEvent = async () => {
    await trackEvent('tournament_joined', {
      tournament_name: 'Weekly Championship',
      entry_fee: 25,
      prize_pool: 10000,
      participants: 150
    });
  };

  const handleUserAction = async () => {
    await trackEvent('feature_used', {
      feature_name: 'live_chat',
      session_duration: 300,
      user_satisfaction: 5
    });
  };

  return (
    <div>
      <h3>Custom Event Examples</h3>
      <div className="space-y-2">
        <button onClick={handleCustomEvent} className="block w-full">
          Track Tournament Joined
        </button>
        <button onClick={handleUserAction} className="block w-full">
          Track Feature Usage
        </button>
      </div>
    </div>
  );
};

// Example 6: Logout and Cleanup
export const LogoutExample: React.FC = () => {
  const { shutdown } = useIntercomContext();

  const handleLogout = async () => {
    try {
      // Shutdown Intercom
      await shutdown();
      console.log('Intercom shutdown successfully');
      
      // Additional cleanup logic...
      // Clear user data, redirect, etc.
    } catch (error) {
      console.error('Failed to shutdown Intercom:', error);
    }
  };

  return (
    <div>
      <h3>Logout Example</h3>
      <button onClick={handleLogout} className="block w-full">
        Logout & Shutdown Intercom
      </button>
    </div>
  );
};

// Example 7: Complete Integration in a Component
export const CompleteIntegrationExample: React.FC = () => {
  const { 
    boot, 
    updateUser, 
    trackDeposit, 
    trackGamePlayed, 
    shutdown,
    isInitialized 
  } = useIntercomContext();

  // Simulate user login
  useEffect(() => {
    const initializeUser = async () => {
      if (!isInitialized) {
        await boot({
          user_id: 'demo_user_123',
          email: 'demo@tucanbit.com',
          name: 'Demo Player',
          created_at: Math.floor(Date.now() / 1000),
          current_balance: 1000,
          vip_level: 'Bronze',
          account_status: 'active',
          verification_status: 'verified',
          country: 'US',
          language: 'en'
        });
      }
    };

    initializeUser();
  }, [boot, isInitialized]);

  // Simulate game session
  const handleGameSession = async () => {
    // Update user data
    await updateUser({
      current_balance: 950,
      number_of_games_played: 5
    });

    // Track game event
    await trackGamePlayed('Crazy Time', 10, 0, false); // Loss
  };

  // Simulate deposit
  const handleDeposit = async () => {
    await trackDeposit(100, 'USD', 'crypto');
    
    // Update balance
    await updateUser({
      current_balance: 1050,
      last_deposit_date: Math.floor(Date.now() / 1000)
    });
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Complete Integration Example</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Status: {isInitialized ? 'Connected' : '⏳ Connecting...'}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleGameSession}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Play Game
          </button>
          
          <button 
            onClick={handleDeposit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Make Deposit
          </button>
        </div>
        
        <button 
          onClick={shutdown}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
        >
          Disconnect Intercom
        </button>
      </div>
    </div>
  );
}; 