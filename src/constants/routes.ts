// Main routes
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  TOURNAMENTS: '/tournaments',
  EARN: '/earn',
  TASK_DASHBOARD: '/task-dashboard',
  TOKEN_DASHBOARD: '/token-dashboard',
  PROMOTIONS: '/promotions',
  LOOTBOXES: '/lootboxes',
  GAME_LOBBY: '/lobby',
  
  // Game routes
  GAMES: '/games',
  SLOTS: '/slots',
  TABLE_GAMES: '/table-games',
  ROULETTE: '/roulette',
  BLACKJACK: '/blackjack',
  JACKPOTS: '/jackpots',
  
  // Casino routes
  CASINO: '/casino',
  LIVE_CASINO: '/live-casino',
  
  // Sports routes
  SPORTS: '/sports',
  
  // Wallet routes
  DEPOSIT: '/deposit',
  WITHDRAW: '/withdraw',
  WALLET: '/wallet',
  
  // Community routes
  COMMUNITY: '/community',
  
  // Support routes
  SUPPORT: '/support',
  HELP: '/help',
  CONTACT: '/contact',
  RESPONSIBLE_GAMING: '/responsible-gaming',
  FAIRNESS: '/fairness',
  
  // Legal routes
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COOKIES: '/cookies',
  LICENSING: '/licensing',
  SECURITY: '/security',
} as const;

// Navigation structure
export const NAVIGATION = {
  MAIN: [
    { id: 'home', name: 'Home', path: ROUTES.HOME },
    { id: 'casino', name: 'Casino', path: ROUTES.CASINO },
    { id: 'games', name: 'Games', path: ROUTES.GAMES },
    { id: 'sports', name: 'Sports', path: ROUTES.SPORTS },
    { id: 'lootboxes', name: 'Lootboxes', path: ROUTES.LOOTBOXES },
    { id: 'promotions', name: 'Promotions', path: ROUTES.PROMOTIONS },
    { id: 'tournaments', name: 'Tournaments', path: ROUTES.TOURNAMENTS },
    { id: 'earn', name: 'Earn', path: ROUTES.EARN },
    { id: 'community', name: 'Community', path: ROUTES.COMMUNITY },
  ],
  USER: [
    { id: 'profile', name: 'Profile', path: ROUTES.PROFILE },
    { id: 'wallet', name: 'Wallet', path: ROUTES.WALLET },
    { id: 'task-dashboard', name: 'Task Dashboard', path: ROUTES.TASK_DASHBOARD },
    { id: 'token-dashboard', name: 'Token Dashboard', path: ROUTES.TOKEN_DASHBOARD },
  ],
  SUPPORT: [
    { id: 'support', name: 'Support', path: ROUTES.SUPPORT },
    { id: 'help', name: 'Help Center', path: ROUTES.HELP },
    { id: 'contact', name: 'Contact Us', path: ROUTES.CONTACT },
    { id: 'responsible-gaming', name: 'Responsible Gaming', path: ROUTES.RESPONSIBLE_GAMING },
    { id: 'fairness', name: 'Fairness', path: ROUTES.FAIRNESS },
  ],
  LEGAL: [
    { id: 'terms', name: 'Terms of Service', path: ROUTES.TERMS },
    { id: 'privacy', name: 'Privacy Policy', path: ROUTES.PRIVACY },
    { id: 'cookies', name: 'Cookie Policy', path: ROUTES.COOKIES },
    { id: 'licensing', name: 'Licensing', path: ROUTES.LICENSING },
    { id: 'security', name: 'Security', path: ROUTES.SECURITY },
  ],
} as const; 