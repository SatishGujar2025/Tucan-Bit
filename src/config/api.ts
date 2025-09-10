// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://13.51.168.77:8080',
  ENDPOINTS: {
    LOGIN: '/login',
    REGISTER: '/register',
    REGISTER_COMPLETE: '/register/complete',
    REGISTER_RESEND: '/register/resend-verification',
    USER_PROFILE: '/api/user/profile',
    WALLET_CHALLENGE: '/api/wallet/challenge',
    WALLET_VERIFY: '/api/wallet/verify',
    WALLET_LOGIN: '/api/wallet/login',
    USER_BALANCE: '/api/balance',
    BALANCE_EXCHANGE: '/api/balance/exchange',
    BALANCE_LOGS: '/api/balance/logs',
    BALANCE_WS: '/ws/balance/player',
    // Password Reset Endpoints
    PASSWORD_FORGET: '/api/user/password/forget',
    PASSWORD_FORGET_VERIFY: '/api/user/password/forget/verify',
    PASSWORD_RESET: '/api/user/password/reset',
  }
};
