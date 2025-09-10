import { gameData } from '../components/ui/data/games';

export interface Game {
  id: string;
  title: string;
  provider: string;
  image: string;
  isLive?: boolean;
  badge?: string;
}

/**
 * Get all games from all categories
 */
export const getAllGames = (): Game[] => {
  return [
    ...gameData.newArrivals,
    ...gameData.topGames,
    ...gameData.tucanbitSpecials,
    ...gameData.spinWars,
    ...gameData.liveCasino,
    ...gameData.liveTableGames,
    ...gameData.liveGameShows,
  ];
};

/**
 * Find a game by ID
 */
export const findGameById = (gameId: string): Game | undefined => {
  const allGames = getAllGames();
  return allGames.find(game => game.id === gameId);
};

/**
 * Get games by provider
 */
export const getGamesByProvider = (provider: string): Game[] => {
  const allGames = getAllGames();
  return allGames.filter(game => game.provider === provider);
};

/**
 * Get similar games (same provider, excluding the current game)
 */
export const getSimilarGames = (currentGameId: string, limit: number = 3): Game[] => {
  const currentGame = findGameById(currentGameId);
  if (!currentGame) return [];

  const similarGames = getGamesByProvider(currentGame.provider)
    .filter(game => game.id !== currentGameId)
    .slice(0, limit);

  return similarGames;
};

/**
 * Validate if a game ID exists
 */
export const isValidGameId = (gameId: string): boolean => {
  return findGameById(gameId) !== undefined;
}; 