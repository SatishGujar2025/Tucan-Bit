// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  balance: number;
  isVerified: boolean;
}

// Game related types
export interface Game {
  id: string;
  name: string;
  category: string;
  provider: string;
  image: string;
  rtp: string;
  maxWin?: string;
  jackpot?: string;
  players: number;
  featured: boolean;
  new: boolean;
  hot: boolean;
}

// Transaction types
export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  description?: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Ethereum provider types
export interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
}

// Extend window object
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
} 