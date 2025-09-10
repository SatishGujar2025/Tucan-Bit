import EthereumProvider from '@walletconnect/ethereum-provider';

// API Configuration
const API_CONFIG = {
  BASE_URL: 'http://13.51.168.77:8080',
  ENDPOINTS: {
    LOGIN: '/login',
    REGISTER: '/register',
    REGISTER_COMPLETE: '/register/complete',
    USER_PROFILE: '/api/user/profile',
    WALLET_CONNECT: '/api/wallet/connect',
    WALLET_CHALLENGE: '/api/wallet/challenge',
    WALLET_VERIFY: '/api/wallet/verify',
    WALLET_LOGIN: '/api/wallet/login',
  }
};

// Define the response types
interface WalletChallenge {
  message: string;
  challenge_message: string;
  nonce: string;
  expires_at: string;
}

interface WalletAuthResponse {
  message: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  is_new_user: boolean;
  user_profile?: any;
}



class WalletService {
  // --- CONNECT WALLET STEP ---
  private async connectWallet(walletType: string, walletAddress: string, chainType: string = 'ethereum'): Promise<any> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WALLET_CONNECT}`;
    const body = {
      wallet_type: walletType,
      wallet_address: walletAddress,
      chain_type: chainType,
    };
    
    console.log('Connecting wallet:', { url, body });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Wallet connection failed:', errorData);
      throw new Error(errorData.description || errorData.message || 'Failed to connect wallet');
    }

    const result = await response.json();
    console.log('Wallet connected successfully:', result);
    return result;
  }

  private async requestChallenge(walletType: string, walletAddress: string, chainType: string = 'ethereum' ): Promise<WalletChallenge> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WALLET_CHALLENGE}`;
    const body = {
      wallet_type: walletType,
      wallet_address: walletAddress,
      chain_type: chainType,
    };
    
    console.log('Creating wallet challenge:', { url, body });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Challenge creation failed:', errorData);
      throw new Error(errorData.description || errorData.message || 'Failed to create challenge');
    }

    const result = await response.json();
    console.log('Challenge created successfully:', result);
    return result;
  }

  // --- LOGIN WITH WALLET SIGNATURE (handles both signup and login) ---
  private async loginWithWallet(
    walletType: string,
    walletAddress: string,
    signature: string,
    message: string,
    nonce: string,
    chainType: string = 'ethereum'
  ): Promise<WalletAuthResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WALLET_LOGIN}`;
    const body = {
      wallet_type: walletType,
      wallet_address: walletAddress,
      chain_type: chainType,
      signature,
      message,
      nonce,
    };
    
    console.log('Logging in with wallet signature:', { url, body: { ...body, signature: signature.substring(0, 10) + '...' } });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Wallet login failed:', errorData);
      // Throw the specific error from the backend for the UI to handle
      throw new Error(errorData.description || errorData.message || 'Failed to login with wallet');
    }

    const result = await response.json();
    console.log('Wallet login successful:', result);
    return result;
  }

  private getChainTypeFromChainId(chainId: string): string {
    const chainMap: { [key: string]: string } = {
      '0x1': 'ethereum',
      '0x89': 'polygon',
      '0x38': 'bsc',
      '0xa86a': 'avalanche',
      '0xa4b1': 'arbitrum',
      '0xa': 'optimism'
    };
    return chainMap[chainId] || 'ethereum';
  }

  // --- THIS FUNCTION IS NOW STREAMLINED ---
  async connectMetaMask(): Promise<WalletAuthResponse> {
    // Check if MetaMask is specifically available
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    // Get the correct MetaMask provider
    let metamaskProvider = this.getMetaMaskProvider();
    
    if (!metamaskProvider) {
      throw new Error('MetaMask is not detected. Please make sure MetaMask is installed and enabled.');
    }

    // Use the MetaMask provider
    return this.connectWithProvider(metamaskProvider, 'metamask');
  }

  // Helper method to get the correct MetaMask provider
  private getMetaMaskProvider(): any {
    const ethereum = window.ethereum as any;
    
    // If there are multiple providers, find MetaMask specifically
    if (ethereum.providers && ethereum.providers.length > 0) {
      const metamaskProvider = ethereum.providers.find((provider: any) => 
        provider.isMetaMask && !provider.isPhantom
      );
      if (metamaskProvider) {
        console.log('Found MetaMask provider in providers array');
        return metamaskProvider;
      }
    }
    
    // If the current provider is MetaMask, use it
    if (ethereum.isMetaMask && !ethereum.isPhantom) {
      console.log('Current provider is MetaMask');
      return ethereum;
    }
    
    // If the current provider is Phantom, try to find MetaMask in providers
    if (ethereum.isPhantom && ethereum.providers) {
      const metamaskProvider = ethereum.providers.find((provider: any) => 
        provider.isMetaMask && !provider.isPhantom
      );
      if (metamaskProvider) {
        console.log('Found MetaMask provider while Phantom is active');
        return metamaskProvider;
      }
    }
    
    return null;
  }

  // Helper method to connect with a specific provider
  private async connectWithProvider(provider: any, walletType: string): Promise<WalletAuthResponse> {
    try {
      console.log(`${walletType} detected, requesting account access...`);
      const accounts = await provider.request({ method: 'eth_requestAccounts' });

      if (!accounts || accounts.length === 0) {
        throw new Error(`No accounts found. Please connect your ${walletType} wallet.`);
      }

      const chainId = await provider.request({ method: 'eth_chainId' });
      const walletAddress = accounts[0];
      const chainType = this.getChainTypeFromChainId(chainId);
      console.log(`${walletType} connected:`, walletAddress, 'on chain:', chainType);

      // The flow is now: Challenge -> Sign -> Verify -> Login (for new users)
      // Note: Wallet connection happens after successful login for existing users
      console.log('Creating wallet challenge...');
      const challenge = await this.requestChallenge(walletType, walletAddress, chainType);

      console.log(`Requesting signature from ${walletType}...`);
      const signature = await provider.request({
        method: 'personal_sign',
        params: [challenge.challenge_message, walletAddress],
      });

      console.log('Authenticating with backend...');
      return await this.loginWithWallet(
        walletType,
        walletAddress,
        signature,
        challenge.challenge_message,
        challenge.nonce,
        chainType
      );

    } catch (error) {
      console.error(`${walletType} connection error:`, error);
      
      // Provide user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes('User rejected') || error.message.includes('rejected')) {
          throw new Error(`You cancelled the ${walletType} connection. Please try again.`);
        } else if (error.message.includes('Already processing')) {
          throw new Error(`${walletType} is already processing a request. Please check your wallet.`);
        }
      }
      
      // Re-throw the original or new error to be caught by the UI component
      throw error;
    }
  }

  async connectTrustWallet(): Promise<WalletAuthResponse> {
    // Trust Wallet and others use WalletConnect
    return this.connectWalletConnect();
  }

  async connectWalletConnect(): Promise<WalletAuthResponse> {
    try {
      const provider = await EthereumProvider.init({
        projectId: 'db721a1a35ebd983b0f9c07526cbebd7',
        chains: [1], // Ethereum mainnet
        showQrModal: true,
        metadata: {
          name: 'TucanBIT',
          description: 'TucanBIT Online Casino',
          url: window.location.origin,
          icons: ['https://tucanbit.com/icon.png']
        }
      } );

      console.log('WalletConnect provider initialized, waiting for connection...');
      await provider.enable();

      const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found after WalletConnect.');
      }

      const walletAddress = accounts[0];
      const chainType = 'ethereum'; // WalletConnect v2 is chain-agnostic, but we default to eth
      console.log('WalletConnect connected:', walletAddress);

      // The flow is now: Challenge -> Sign -> Verify -> Login (for new users)
      console.log('Creating wallet challenge...');
      const challenge = await this.requestChallenge('walletconnect', walletAddress, chainType);

      const signature = await provider.request({
        method: 'personal_sign',
        params: [challenge.challenge_message, walletAddress],
      }) as string;

      console.log('Authenticating with backend...');
      return await this.loginWithWallet(
        'walletconnect',
        walletAddress,
        signature,
        challenge.challenge_message,
        challenge.nonce,
        chainType
      );

    } catch (error) {
      console.error('WalletConnect connection error:', error);
      // WalletConnect's modal has its own error handling, but we catch others here.
      if (error instanceof Error && error.message.includes('User closed modal')) {
        throw new Error('You closed the WalletConnect modal.');
      }
      throw error;
    }
  }

  // --- Placeholder functions for other wallets ---
  async connectCoinbaseWallet(): Promise<WalletAuthResponse> {
    throw new Error('Coinbase Wallet integration coming soon.');
  }

  async connectPhantom(): Promise<WalletAuthResponse> {
    throw new Error('Phantom Wallet integration coming soon.');
  }

  async connectLedger(): Promise<WalletAuthResponse> {
    throw new Error('Ledger Wallet integration coming soon.');
  }

  async connectBraveWallet(): Promise<WalletAuthResponse> {
    // Brave Wallet often injects an `isBraveWallet` property
    if (window.ethereum && (window.ethereum as any).isBraveWallet) {
      return this.connectMetaMask(); // Brave Wallet is compatible with the MetaMask flow
    }
    throw new Error('Brave Wallet not detected.');
  }

  // Utility method to check available wallets
  getAvailableWallets(): { metamask: boolean; phantom: boolean; coinbase: boolean; brave: boolean } {
    const ethereum = window.ethereum as any;
    
    if (!ethereum) {
      return { metamask: false, phantom: false, coinbase: false, brave: false };
    }
    
    // Check if there are multiple providers
    if (ethereum.providers && ethereum.providers.length > 0) {
      const providers = ethereum.providers;
      return {
        metamask: providers.some((provider: any) => provider.isMetaMask && !provider.isPhantom),
        phantom: providers.some((provider: any) => provider.isPhantom),
        coinbase: providers.some((provider: any) => provider.isCoinbaseWallet),
        brave: providers.some((provider: any) => provider.isBraveWallet)
      };
    }
    
    // Single provider case
    return {
      metamask: !!(ethereum.isMetaMask && !ethereum.isPhantom),
      phantom: !!ethereum.isPhantom,
      coinbase: !!ethereum.isCoinbaseWallet,
      brave: !!ethereum.isBraveWallet
    };
  }

  // Utility method to help users switch to MetaMask
  async switchToMetaMask(): Promise<void> {
    const wallets = this.getAvailableWallets();
    
    if (!wallets.metamask) {
      throw new Error('MetaMask is not installed. Please install MetaMask first.');
    }

    if (wallets.phantom && !wallets.metamask) {
      throw new Error('Phantom Wallet is currently active. Please:\n1. Disable Phantom Wallet extension\n2. Refresh the page\n3. Try connecting MetaMask again');
    }

    // If multiple wallets are installed, try to switch to MetaMask
    const ethereum = window.ethereum as any;
    if (ethereum.providers && ethereum.providers.length > 0) {
      const metamaskProvider = ethereum.providers.find((provider: any) => provider.isMetaMask && !provider.isPhantom);
      if (metamaskProvider) {
        // Try to switch to MetaMask provider
        if (ethereum.setSelectedProvider) {
          ethereum.setSelectedProvider(metamaskProvider);
          console.log('Switched to MetaMask provider');
        } else {
          console.log('setSelectedProvider not available, will use provider directly');
        }
      }
    }
  }
}

// Export a singleton instance
export const walletService = new WalletService();
