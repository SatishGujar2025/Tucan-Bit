import axios from 'axios';
import {
  GET_BALANCE_API,
  GET_USER_PROFILE,
  POST_USER_INFO,
  GET_USER_COINS,
  CONFIRM_PROFILE_UPDATE,
  STREET_KING_GET_API,
  PlaceBetAPI,
  CASH_OUT_API,
} from './endpoints';

// Types
interface UserProfileData {
  name?: string;
  email?: string;
  avatar?: string;
  // Add more fields as needed
}

interface BetData {
  bet_amount: string | number;
  version: string;
  // Add more fields as needed
}


export interface BetHistoryData {
    page: number;
    per_page: number;
    version: string;
  }
  
// Get Balance
export const getBalance = async () => {
  const response = await axios.get<number>(GET_BALANCE_API);
  return response.data;
};

// Get User Profile
export const getUserProfile = async () => {
  const response = await axios.get<UserProfileData>(GET_USER_PROFILE);
  return response.data;
};

// Update User Profile
export const postUserInfo = async (data: UserProfileData) => {
  const response = await axios.post<UserProfileData>(POST_USER_INFO, data);
  return response.data;
};

// Confirm Profile Update
export const confirmProfileUpdate = async (data: UserProfileData) => {
  const response = await axios.post(CONFIRM_PROFILE_UPDATE, data);
  return response.data;
};

// Get User Coins
export const getUserCoins = async () => {
  const response = await axios.get<number>(GET_USER_COINS);
  return response.data;
};

// Get Street Kings Data
export const getStreetKingsHistory = async (data: BetHistoryData, token: string) => {
    const response = await axios.get(STREET_KING_GET_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: data.page,
        perPage: data.per_page,
        version: data.version,
      },
    });
  
    return response.data;
  };

// Place Bet
export const placeBet = async (data: BetData, token: string) => {
    const response = await axios.post(PlaceBetAPI, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const cashOut = async (  data: { round_id: string },token: string): Promise<any> => {
    const response = await axios.post(CASH_OUT_API, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  
