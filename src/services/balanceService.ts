import { API_CONFIG } from '../config/api';

export interface Balance {
  id: string;
  user_id: string;
  currency: string;
  real_money: string;
  bonus_money: string;
  updated_at: string;
}

export interface BalanceLog {
  id: string;
  user_id: string;
  currency: string;
  amount: string;
  operation: string;
  description: string;
  created_at: string;
}

export interface ExchangeBalanceRequest {
  from_currency: string;
  to_currency: string;
  amount: string;
}

export interface ExchangeBalanceResponse {
  from_balance: Balance;
  to_balance: Balance;
  exchange_rate: string;
  exchanged_amount: string;
}

class BalanceService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async getUserBalances(): Promise<Balance[]> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_BALANCE}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch balances: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user balances:', error);
      throw error;
    }
  }

  async getBalanceLogs(page: number = 1, perPage: number = 20): Promise<BalanceLog[]> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BALANCE_LOGS}?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch balance logs: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching balance logs:', error);
      throw error;
    }
  }

  async exchangeBalance(request: ExchangeBalanceRequest): Promise<ExchangeBalanceResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BALANCE_EXCHANGE}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Failed to exchange balance: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error exchanging balance:', error);
      throw error;
    }
  }

  // Helper method to get total balance across all currencies
  getTotalBalance(balances: Balance[], currency: string = 'USD'): number {
    return balances.reduce((total, balance) => {
      if (balance.currency === currency) {
        return total + parseFloat(balance.real_money) + parseFloat(balance.bonus_money);
      }
      return total;
    }, 0);
  }

  // Helper method to format currency
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // Helper method to get primary balance (first currency or USD)
  getPrimaryBalance(balances: Balance[]): Balance | null {
    if (balances.length === 0) return null;
    
    // Try to find USD first
    const usdBalance = balances.find(b => b.currency === 'USD');
    if (usdBalance) return usdBalance;
    
    // Return first balance if no USD found
    return balances[0];
  }
}

export const balanceService = new BalanceService();