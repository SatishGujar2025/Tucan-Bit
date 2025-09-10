// Utility to test wallet detection and help debug wallet conflicts
export const testWalletDetection = () => {
  const ethereum = window.ethereum as any;
  
  if (!ethereum) {
    console.log(' No wallet detected');
    return {
      hasWallet: false,
      metamask: false,
      phantom: false,
      coinbase: false,
      brave: false,
      providers: []
    };
  }

  const results = {
    hasWallet: true,
    metamask: !!(ethereum.isMetaMask),
    phantom: !!(ethereum.isPhantom),
    coinbase: !!(ethereum.isCoinbaseWallet),
    brave: !!(ethereum.isBraveWallet),
    providers: ethereum.providers ? ethereum.providers.map((p: any) => ({
      isMetaMask: p.isMetaMask,
      isPhantom: p.isPhantom,
      isCoinbaseWallet: p.isCoinbaseWallet,
      isBraveWallet: p.isBraveWallet
    })) : []
  };

  console.log('🔍 Wallet Detection Results:', results);
  
  if (results.phantom && results.metamask) {
    console.log('⚠️  Both Phantom and MetaMask detected! This may cause conflicts.');
    console.log('💡 Solution: Disable Phantom Wallet extension temporarily to use MetaMask.');
  }
  
  if (results.phantom && !results.metamask) {
    console.log('⚠️  Only Phantom detected. MetaMask may be overridden.');
  }

  return results;
};

// Function to help users switch to MetaMask
export const switchToMetaMask = async () => {
  const ethereum = window.ethereum as any;
  
  if (!ethereum) {
    throw new Error('No wallet detected');
  }

  if (!ethereum.isMetaMask) {
    throw new Error('MetaMask not detected');
  }

  // If multiple providers are available, try to switch to MetaMask
  if (ethereum.providers) {
    const metamaskProvider = ethereum.providers.find((provider: any) => 
      provider.isMetaMask && !provider.isPhantom
    );
    
    if (metamaskProvider) {
      try {
        ethereum.setSelectedProvider(metamaskProvider);
        console.log('Switched to MetaMask provider');
        return true;
      } catch (error) {
        console.error(' Failed to switch to MetaMask provider:', error);
        return false;
      }
    }
  }

  return false;
};

// Function to get detailed wallet information
export const getWalletInfo = () => {
  const ethereum = window.ethereum as any;
  
  if (!ethereum) {
    return { error: 'No wallet detected' };
  }

  return {
    currentProvider: {
      isMetaMask: ethereum.isMetaMask,
      isPhantom: ethereum.isPhantom,
      isCoinbaseWallet: ethereum.isCoinbaseWallet,
      isBraveWallet: ethereum.isBraveWallet
    },
    availableProviders: ethereum.providers ? ethereum.providers.map((p: any) => ({
      isMetaMask: p.isMetaMask,
      isPhantom: p.isPhantom,
      isCoinbaseWallet: p.isCoinbaseWallet,
      isBraveWallet: p.isBraveWallet
    })) : [],
    hasMultipleProviders: !!(ethereum.providers && ethereum.providers.length > 1)
  };
}; 