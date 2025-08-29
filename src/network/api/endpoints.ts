const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_SOCKET_URL = import.meta.env.VITE_API_SOCKET_URL;

/**
 * @description Register new user
 */
export const REGISTER_API = `${API_BASE_URL}/register`;

/**
 * @description Change Password
 */
export const CHANGE_PASSWORD = `${API_BASE_URL}/api/user/password`;

/**
 * @description Verfiy the user
 */
export const VERFY_OTP_AFTER_REGISTER = `${API_BASE_URL}/api/user/verify`;

/**
 * @description User login
 */
export const LOGIN_API = `${API_BASE_URL}/login`;

/**
 * @description Request password reset (forgot password)
 */
export const FORGOT_PASSWORD_API = `${API_BASE_URL}/api/user/password/forget`;

/**
 * @description Reset password after verification
 */
export const RESET_PASSWORD_API = `${API_BASE_URL}/api/user/password/reset`;

/**
 * @description Verify OTP for password reset
 */
export const VERIFY_OTP_API = `${API_BASE_URL}/api/user/password/forget/verify`;

/**
 * @description Google OAuth login
 */
export const GOOGLE_AUTH_API = `${API_BASE_URL}/user/oauth/google`;

/**
 * @description Get user balance
 */
export const GET_BALANCE_API = `${API_BASE_URL}/api/balance`;

/**
 * @description Get user transactions
 */
export const GET_TRANSACTIONS_API = `${API_BASE_URL}/api/balance/logs`;

/**
 * @description Initiate deposit
 */
export const DEPOSIT_API = `${API_BASE_URL}/api/deposits`;
/**
 * @description Get user profile details
 */
export const GET_USER_PROFILE = `${API_BASE_URL}/api/user/profile`;

/**
 * @description Post or update user profile information
 */
export const POST_USER_INFO = `${API_BASE_URL}/api/user/profile`;

/**
 * @description Get user earned coins/points
 */
export const GET_USER_COINS = `${API_BASE_URL}/api/users/points`;

/**
 * @description Confirm profile update using OTP or code
 */
export const CONFIRM_PROFILE_UPDATE = `${API_BASE_URL}/api/user/profile/confirm`;

/**
 * @description Get Street Kings betting history
 */
export const STREET_KING_GET_API = `${API_BASE_URL}/api/streetkings/bets`;

/**
 * @description Place a Street Kings bet
 */
export const PlaceBetAPI = `${API_BASE_URL}/api/streetkings/bets`;

/**
 * @description Cash out from Street Kings bet
 */
export const CASH_OUT_API = `${API_BASE_URL}/api/streetkings/bets/cashout`;

/**
 * @description Place a Quick Hustles bet
 */
export const PLACE_BET_API = `${API_BASE_URL}/api/quickhustles`;

/**
 * @description Get Quick Hustles game select options
 */
export const QUICK_HUSTLES_SELECTS_API = `${API_BASE_URL}/api/quickhustles/selects`;

/**
 * @description Get Quick Hustles game history
 */
export const HISTORY_GET_API = `${API_BASE_URL}/api/quickhustles`;

/**
 * @description Get Crypto Kings current price
 */
export const GET_CRYPTO_PRICE = `${API_BASE_URL}/api/cryptokings/price`;

/**
 * @description Place a bet in Crypto Kings
 */
export const CRYPTO_BET_PLACE = `${API_BASE_URL}/api/cryptokings`;

/**
 * @description Roll Da Dice - Place bet and get history
 */
export const ROLL_DA_DICE_BET_PLACE = `${API_BASE_URL}/api/rolldadices`;

/**
 * @description Get active utilities for airtime
 */
export const AIRTIME_ACTIVE_UTILITIES = `${API_BASE_URL}/api/airtime/active/utilities`;

/**
 * @description Claim airtime reward
 */
export const CLAIM_AIRTIME = `${API_BASE_URL}/api/airtime/claim`;

/**
 * @description Get airtime transaction history
 */
export const AIRTIME_TRANSACTIONS = `${API_BASE_URL}/api/airtime/transactions`;

/**
 * @description Place Scratch Card bet and fetch game data
 */
export const PLACE_SCRATCH_CARD_BET_AND_GET = `${API_BASE_URL}/api/scratchcards`;

/**
 * @description Get Scratch Card game price
 */
export const GET_SCRATCH_CARD_PRICE = `${API_BASE_URL}/api/scratchcards/price`;

/**
 * @description Get Plinko game configuration
 */
export const GET_PLNKO_GAME_CONFIG = `${API_BASE_URL}/api/plinko/config`;

/**
 * @description Drop Plinko ball (place bet)
 */
export const PLINKO_DROP = `${API_BASE_URL}/api/plinko/drop`;

/**
 * @description Get Plinko game history
 */
export const GET_PLNKO_GAME_HISTORY = `${API_BASE_URL}/api/plinko/history`;

/**
 * @description Get Plinko game statistics
 */
export const PLINKO_STATS = `${API_BASE_URL}/api/plinko/stats`;

/**
 * @description Get Opration Type
 */
export const OPRATION_TYPES = `${API_BASE_URL}/api/operationaltypes`;

/**
 * @description Get Opration Type
 */
export const TRANSACTION_DETAIL = `${API_BASE_URL}/api/balance/logs`;

/**
 * @description Get wheel price
 */
export const GET_WHEEL_PRICE = `${API_BASE_URL}/api/spinningwheels/price`;
/**
 * @description Get wheel segments
 */
export const GET_WHEEL_CONFIG = `${API_BASE_URL}/api/spinningwheels/configs`;

/**
 * @description Get wheel segments
 */
export const GET_WHEEL_SPINNING = `${API_BASE_URL}/api/spinningwheels`;

/**
 * @description Squad Api
 */
export const SQUAD_CREATE = `${API_BASE_URL}/api/squads`;
export const GET_SQUAD = `${API_BASE_URL}/api/squads`;
export const SEARCH_SQUAD = `${API_BASE_URL}/api/squads/name`;
export const GET_OUR_SQUAD = `${API_BASE_URL}/api/squads/own`;
export const GET_OUR_SQUAD_BY_ID = `${API_BASE_URL}/api/squads/members/bysquadid`;
export const DELETE_MEMBER = `${API_BASE_URL}/api/squads/members/`;
export const DELETE_MEMBER_ALL = `${API_BASE_URL}/api/squads/members/all`;
export const DELETE_SQUAD = `${API_BASE_URL}/api/squads/delete`;
export const ADD_MEMBER_IN_SQUAD = `${API_BASE_URL}/api/squads/members`;
export const JOIN_MEMBER = `${API_BASE_URL}/api/squads/{squad_id}/members/join`;
export const TOTAL_EARN_OF_SQUAD = `${API_BASE_URL}/api/squads/total/earns`;
export const RANKING_TOURNAMENT = `${API_BASE_URL}/api/squads/tournament/ranking`;
export const LEAVE_SQUAD = `${API_BASE_URL}/api/squads/{squad_id}/members/leave`;
export const GET_LEVEL_PROGRESS_OF_SQUAD = `${API_BASE_URL}/api/squads/level/progression`;

/**
 * @description Get notifications
 */
export const GET_NOTIFICATIONS = `${API_BASE_URL}/api/notifications`;

/**
 * @description Mark all notifications as read
 */
export const MARK_ALL_NOTIFICATIONS_READ = `${API_BASE_URL}/api/notifications/mark-all-read`;

/**
 * @description Mark notification as read
 */
export const MARK_NOTIFICATION_READ = `${API_BASE_URL}/api/notifications`;

/**
 * @description Delete notifications
 */
export const DELETE_NOTIFICATION = `${API_BASE_URL}/api/notifications`;
/**
 * @description WebSocket endpoint for single player communication
 */
export const SOCKET_URL_FOR_PLAYER_GAME = `${API_SOCKET_URL}/ws/single/player`;
export const SOCKET_URL_FOR_PLAYER_BALANCE = `${API_SOCKET_URL}/ws/balance/player`;
export const SOCKET_URL_FOR_SQUAD_PROGRESS_LEVEL = `${API_SOCKET_URL}/ws/squads/progress`;
export const SOCKET_URL_FOR_SQUAD_LEVEL = `${API_SOCKET_URL}/ws/player/level/progress`;
export const SOCKET_URL_FOR_NOTIFY = `${API_SOCKET_URL}/ws/notify`;
// export const

// Zendesk chat token endpoint
export const ZENDESK_TOKEN = `${API_BASE_URL}/api/user/zendesk/chat`;
