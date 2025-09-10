import React, { useState, useEffect } from 'react';
import EthereumProvider from '@walletconnect/ethereum-provider';
import { API_CONFIG } from '../../config/api';

interface WalletConnectQRModalProps {
  onClose: () => void;
  onSuccess: (authResponse: any) => void;
  onError: (error: string) => void;
}

const WalletConnectQRModal: React.FC<WalletConnectQRModalProps> = ({ onClose, onSuccess, onError }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    initializeWalletConnect();
    
    return () => {
      setIsConnecting(false);
    };
  }, []);

  const initializeWalletConnect = async () => {
    try {
      setIsConnecting(true);

      console.log('Initializing WalletConnect...');

      // Initialize WalletConnect provider
      const provider = await EthereumProvider.init({
        projectId: 'db721a1a35ebd983b0f9c07526cbebd7',
        chains: [1],
        showQrModal: true, // This will show WalletConnect's default QR modal
        metadata: {
          name: 'TucanBIT',
          description: 'TucanBIT Online Casino',
          url: 'http://13.51.168.77:5174',
          icons: ['https://tucanbit.com/icon.png']
        }
      });

      console.log('WalletConnect provider initialized');

      // Listen for connection events
      provider.on('connect', async (connectInfo) => {
        console.log('WalletConnect connected:', connectInfo);
        
        try {
          // Get accounts
          const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
          if (!accounts || accounts.length === 0) {
            throw new Error('No accounts found');
          }

          const walletAddress = accounts[0];
          console.log('Wallet address:', walletAddress);

          // Authenticate with backend
          await authenticateWallet(provider, walletAddress);
        } catch (error) {
          console.error('Authentication error:', error);
          onError(error instanceof Error ? error.message : 'Authentication failed');
        }
      });

      provider.on('disconnect', () => {
        console.log('WalletConnect disconnected');
        onClose();
      });

      provider.on('session_delete', () => {
        console.log('WalletConnect session deleted');
        onClose();
      });

      // Enable the provider (this will show the QR modal)
      console.log('Enabling WalletConnect provider...');
      await provider.enable();
      console.log('WalletConnect provider enabled');

    } catch (error) {
      console.error('WalletConnect initialization error:', error);
      onError(error instanceof Error ? error.message : 'Failed to initialize WalletConnect');
    } finally {
      setIsConnecting(false);
    }
  };

  const authenticateWallet = async (provider: any, walletAddress: string) => {
    try {
      console.log('Creating wallet challenge...');
      
      // Create challenge
      const challengeResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WALLET_CHALLENGE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_type: 'walletconnect',
          wallet_address: walletAddress,
        }),
      });

      if (!challengeResponse.ok) {
        throw new Error('Failed to create challenge');
      }

      const challenge = await challengeResponse.json();
      console.log('Challenge created:', challenge);

      // Sign the challenge message
      console.log('Requesting signature...');
      const signature = await provider.request({
        method: 'personal_sign',
        params: [challenge.challenge_message, walletAddress],
      });

      console.log('Message signed:', signature);

      // Login with wallet
      console.log('Authenticating with backend...');
      const loginResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WALLET_LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_type: 'walletconnect',
          wallet_address: walletAddress,
          signature,
          message: challenge.challenge_message,
          nonce: challenge.nonce,
        }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Failed to authenticate wallet');
      }

      const authResponse = await loginResponse.json();
      console.log('WalletConnect authentication successful:', authResponse);
      onSuccess(authResponse);

    } catch (error) {
      console.error('Wallet authentication error:', error);
      onError(error instanceof Error ? error.message : 'Failed to authenticate wallet');
    }
  };

  // Don't render anything - let WalletConnect handle the UI
  return null;
};

export default WalletConnectQRModal;