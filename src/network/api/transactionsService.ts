import axios from 'axios';
import { 
  GET_TRANSACTIONS_API, 
  OPRATION_TYPES,
  TRANSACTION_DETAIL, 
 } from "./endpoints";

const toISOStringWithTime = (date: string | Date): string => {
  return new Date(date).toISOString(); // results in "2025-06-01T00:00:00.000Z"
};

export interface OperationalType {
  id: string;
  name: string;
}

interface ApiLog {
  id: string;
  user_id: string;
  component: string;
  currency: string;
  description: string;
  change_amount: string;
  operational_group_id: string;
  operational_type_id: string;
  timestamp: string;
  type: 'deposit' | 'transfer' | string;
  balance_after_update: string;
  transaction_id: string;
  status: string;
}

interface ApiResponse {
  status: string;
  data: {
    page: number;
    total_pages: number;
    logss: ApiLog[];
  };
}


// types.ts
export interface OperationalType {
  id: string;
  name: string;
}

export interface BalanceLogDetail {
  id: string;
  user_id: string;
  component: string;
  currency: string;
  description: string;
  change_amount: string;
  operational_group_id: string;
  operational_type: OperationalType;
  timestamp: string;
  type: string;
  balance_after_update: string;
  transaction_id: string;
  status: string;
}


// Enhanced interface for transaction filtering
interface TransactionFilters {
  page: number;
  per_page: number;
  search?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  min_amount?: number;
  max_amount?: number;
}

// Accepts pagination object, filters, and token
export const fetchTransactions = async (
  params: TransactionFilters,
  token: string
): Promise<ApiResponse> => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page.toString());
    queryParams.append('per-page', params.per_page.toString());

    if (params.search) {
      queryParams.append('transaction_id', params.search);
    }
    if (params.type && params.type !== 'all') {
      queryParams.append('operation_type_id', params.type);
    }
    if (params.start_date) {
      queryParams.append('start_date', toISOStringWithTime(params.start_date));
    }
    if (params.end_date) {
      queryParams.append('end_date', toISOStringWithTime(params.end_date));
    }
    if (params.min_amount !== undefined) {
      queryParams.append('start_amount', params.min_amount.toString());
    }
    if (params.max_amount !== undefined) {
      queryParams.append('end_amount', params.max_amount.toString());

    }
    console.log("🚀 ~ res ~ queryParams:", queryParams)



    const res = await axios.get<ApiResponse>(`${GET_TRANSACTIONS_API}?${queryParams.toString()}`, {
      headers: {

        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch transactions"
    );
  }
};

// Export the filters interface for use in components
export type { TransactionFilters };



export const fetchOperationalTypes = async (token: string): Promise<OperationalType[]> => {
  try {
    const response = await axios.get<OperationalType[]>(OPRATION_TYPES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching operational types:', error);
    throw error;
  }
};



export const fetchBalanceLogDetail = async (
  id: string,
  token: string
): Promise<BalanceLogDetail> => {
  try {
    const res = await axios.get<BalanceLogDetail>(`${TRANSACTION_DETAIL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return res.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Unknown error occurred';
    throw new Error(`Failed to fetch balance log detail: ${message}`);
  }
};
