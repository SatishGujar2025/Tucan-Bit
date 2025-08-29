import React, { useState, useEffect, FC } from 'react';
import { TrendingUp, History, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSocketContext } from '@/network/sockets/SocketProvider';
import { CustomToast } from '@/components/ui/Toast';
import {
  getStreetKingsHistory,
  placeBet,
  cashOut,
} from '@/network/api/streetKingsService';
import winSound from '@/assets/sounds/win-sound.mp3';
import BackGroundSound from '@/assets/sounds/street-king-background.mp3';
import SoundManager from '@/components/ui/SoundManager';
import Transactions from '@/components/ui/Transactions';
import { COLORS } from '@/constants/theming';
import { PzButton } from '@/components/ui/PzButton';
import { PzErrorPopup } from '@/components/ui/PzErrorPopup';
import {
  DEFAULT_BET,
  DEFAULT_MAX_BET,
  DEFAULT_MIN_BET,
} from '@/constants/numbers';
import { handleBetRange, promisifySuspense } from '@/utils/helper';
import { AnimatedInfoButton } from '@/components/ui/AnimatedInfoButton';
import { GameRulesModal } from '@/components/ui/GameRulesModal';
import { ToastTypes } from '@/constants';
import { useAppContext } from '@/context/AppContext';

/**
 * Formats a number or numeric string into a localized string with commas.
 * @param {number | string} value - The value to format.
 * @returns {string} Formatted number string.
 */
const formatCoins = (value: number | string): string =>
  Number(value).toLocaleString();

type CrashGameProps = {
  onWin: (reward: { type: string; amount: number }) => void;
  balance: number | null;
};

/**
 * CrashGame component: renders the betting interface for Street King Crash Game.
 * @component
 */
const CrashGame: FC<CrashGameProps> = ({ onWin, balance }) => {
  const { accessToken } = useAppContext();
  const { playerGameState, setPlayerGameState, isPlayerGameSocketConnected } =
    useSocketContext();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const navigate = useNavigate();
  const [didWin, setDidWin] = useState(false);

  // Local state
  const [roundId, setRoundId] = useState('');
  const [betAmount, setBetAmount] = useState<number | string>(DEFAULT_BET);
  const [isCrashed, setIsCrashed] = useState(false);
  const [hasBet, setHasBet] = useState(false);
  const [showWinAnim, setShowWinAnim] = useState(false);
  const [displayMultiplier, setDisplayMultiplier] = useState('0.00');
  const [showFundsErrorPopup, setShowFundsErrorPopup] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Fetch paginated game history using infinite query
   */
  const {
    data: historyPages,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useSuspenseInfiniteQuery({
    queryKey: ['history'],
    queryFn: ({ pageParam = 1 }) => {
      if (!accessToken) throw new Error('Access token missing');
      return getStreetKingsHistory(
        { page: pageParam, per_page: 10, version: 'v1' },
        accessToken
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Determine if more pages exist
      if (!lastPage?.total_pages || allPages.length >= lastPage.total_pages)
        return undefined;
      return allPages.length + 1;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      setPlayerGameState(null);
    };
  }, []);

  // Quick fix for negative Crash point value
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    historyPages?.pages?.[0]?.data?.[0]?.crash_point < 0 && setHasBet(false);
  }, [historyPages]);

  /**
   * Mutation: place bet for the current round
   */
  const placeBetMutation = useMutation({
    mutationFn: async () => {
      if (!accessToken) throw new Error('Access token missing');

      const result = await placeBet(
        { bet_amount: Number(betAmount), version: 'v1' },
        accessToken
      );
      if (result?.data?.id) {
        setRoundId(result.data.id);
      }
      return result;
    },
    onSuccess: () => {
      CustomToast(ToastTypes.SUCCESS, 'Bet placed! Good luck!');
    },
  });

  const streetKingRules = [
    {
      title: 'Start the Game',
      description:
        'Enter your desired bet amount and click "Place Bet" before the round starts. The multiplier begins to increase immediately.',
    },
    {
      title: 'Multiplier Growth',
      description:
        'As the round progresses, the multiplier increases over time. The longer you stay in, the more you can potentially win.',
    },
    {
      title: 'Cash Out Anytime',
      description:
        'You can click "Cash Out" at any time during the round to lock in your winnings. Your payout is based on the current multiplier and your bet.',
    },
    {
      title: 'Watch Out for the Crash',
      description:
        'If you don’t cash out before the game crashes, you lose your entire bet. Crashes can happen at any moment.',
    },
    {
      title: 'Game History',
      description:
        'Recent rounds and your results are shown in the game history section. You can also view your full play history.',
    },
  ];

  /**
   * Mutation: cash out current bet
   */
  const cashOutMutation = useMutation({
    mutationFn: () => {
      if (!accessToken) throw new Error('Access token missing');
      setHasBet(false);

      return cashOut({ round_id: roundId }, accessToken);
    },
    onSuccess: (res) => {
      const won = parseFloat(res.data.won_amount);
      const cashoutPoint = res.data.cashout_point || displayMultiplier;
      setDisplayMultiplier(Number(cashoutPoint).toFixed(2));

      CustomToast(ToastTypes.SUCCESS, `Cashed out +${formatCoins(won)} coins`);
      setShowWinAnim(true);
      setDidWin(true);
      setTimeout(() => setShowWinAnim(false), 2000);
      onWin({ type: 'coins', amount: Number(res.data.won_amount) });

      setTimeout(() => {
        if (!isCrashed) {
          setDisplayMultiplier('0.00');
          setDidWin(false);
          setIsPlaying(false);
          refetch();
        }
      }, 3000);
    },
  });

  /**
   * Listen for socket events to update multiplier or crash state
   */
  useEffect(() => {
    if (didWin) return;
    if (playerGameState?.type === 'crash') {
      const crashPoint = Number(playerGameState.data.round.crash_point).toFixed(
        2
      );
      setDisplayMultiplier(crashPoint);
      setIsCrashed(true);
      refetch();
      setHasBet(false);

      setTimeout(() => {
        setIsCrashed(false);
        setIsPlaying(false);
        setDisplayMultiplier('0.00');
      }, 1000);
    } else if (playerGameState?.data?.multiplayer) {
      setDisplayMultiplier(Number(playerGameState.data.multiplayer).toFixed(2));
    } else if (playerGameState?.data?.round?.crash_point) {
      setDisplayMultiplier(
        Number(playerGameState.data.round.crash_point).toFixed(2)
      );
    }
  }, [playerGameState]);

  /** Halves the current bet. */
  const halfBet = () =>
    setBetAmount((prev) =>
      Number(prev)
        ? Math.max(DEFAULT_MIN_BET, Math.floor(Number(prev) / 2))
        : prev
    );

  /** Doubles the current bet up to MAX_BET. */
  const doubleBet = () =>
    setBetAmount((prev) =>
      Number(prev) ? Math.min(DEFAULT_MAX_BET, Number(prev) * 2) : prev
    );

  const onClose = () => {
    setShowTransactionModal(false);
  };

  // Promisify suspense for socket and balance
  promisifySuspense(isPlayerGameSocketConnected);
  promisifySuspense(Number.isFinite(balance));

  const goToHomePage = () => navigate('/');

  const onPlaceBetClick = () => {
    if (Number(balance) < Number(betAmount)) {
      setShowFundsErrorPopup(true);
      return;
    }
    setHasBet(true);
    setIsPlaying(true);
    placeBetMutation.mutate();
  };

  return (
    <div className="min-h-screen text-text-primary relative">
      <SoundManager
        sounds={{
          background: BackGroundSound,
          win: winSound,
        }}
        // loop the background while the game is running:
        backgroundKey={hasBet ? 'background' : null}
        // play one of these exactly once when it changes:
        playKey={didWin ? 'win' : undefined}
        volumes={{
          background: 0.4,
          win: 1.0,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={goToHomePage}
            className="text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Street King</h1>
          <div className="ml-auto">
            <AnimatedInfoButton
              onClick={() => setShowRulesModal(true)}
              label="Rules"
              size={18}
            />
          </div>
        </div>

        {/* Multiplier Display */}
        <section className="bg-surface-card/90 backdrop-blur-sm rounded-2xl p-6 text-center relative overflow-hidden mb-6">
          <header className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp
              size={24}
              color={COLORS.primary}
              className="text-yellow-400"
            />
            <span className="text-sm text-white/60">Current Multiplier</span>
          </header>
          <div
            className={`text-6xl font-bold mb-4 transition-colors ${
              isCrashed
                ? 'text-red-500'
                : showWinAnim
                ? 'text-green-500'
                : displayMultiplier !== '0.00'
                ? `text-[${COLORS.primary}]`
                : 'text-white'
            }`}
          >
            {`${displayMultiplier}x`}
          </div>
          {showWinAnim && (
            <div className="my-3 text-3xl font-bold text-green-400 animate-pulse">
              +
              {formatCoins(
                Math.floor(Number(betAmount) * parseFloat(displayMultiplier))
              )}{' '}
              coins
            </div>
          )}
          <p className="text-sm text-white/60">
            {showWinAnim
              ? 'Cashed out successfully!'
              : displayMultiplier === '0.00' && !hasBet
              ? 'Ready to start playing?'
              : hasBet
              ? 'Game in progress...'
              : isCrashed
              ? 'Game crashed! Place your bet for the next round'
              : displayMultiplier !== '0.00' && !hasBet
              ? 'Game running...'
              : 'Ready to start playing?'}
          </p>
        </section>

        {/* Betting Controls */}
        <section className="bg-surface-card/90 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Bet Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={betAmount}
                  disabled={hasBet}
                  onChange={(event) =>
                    handleBetRange(event, setBetAmount, {
                      maxBet: DEFAULT_MAX_BET,
                      minBet: DEFAULT_MIN_BET,
                    })
                  }
                  className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[${COLORS.primary}] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button
                    onClick={halfBet}
                    disabled={hasBet}
                    className="text-sm bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                    ½
                  </button>
                  <button
                    onClick={doubleBet}
                    disabled={hasBet}
                    className="text-sm bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                    2×
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm text-white/60">
                Balance
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
                <span>{formatCoins(Math.floor(Number(balance)))}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-2 my-1 text-center text-xs text-white/60">
            <span>min: {DEFAULT_MIN_BET}</span>
            <span>max: {DEFAULT_MAX_BET}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PzButton
              text="Place Bet"
              onClick={onPlaceBetClick}
              isDisabled={isPlaying || !Number(betAmount)}
            />
            <PzButton
              text="Cash Out"
              className={`py-3 rounded-lg font-medium ${
                !hasBet
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-400 text-black'
              } disabled:opacity-50`}
              onClick={() => cashOutMutation.mutate()}
              isDisabled={!hasBet}
            />
          </div>
        </section>

        {/* Game History */}
        <section className="bg-surface-card/90 backdrop-blur-sm rounded-2xl p-6">
          <header className="flex items-center gap-2 mb-4 text-lg font-[Anton] text-white">
            <History
              size={20}
              color={COLORS.primary}
              className="text-yellow-400"
            />
            Game History
          </header>
          <div className="space-y-4">
            {historyPages?.pages
              ?.flatMap((page) => page.data || [])
              .map((item, index) => {
                const lost = item.won_status === 'LOSE';
                const profit = parseFloat(item.won_amount);
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg font-[Poppins] ${
                      lost ? 'bg-red-500/10' : 'bg-green-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={lost ? 'text-red-400' : 'text-green-400'}
                      >
                        {lost
                          ? `${parseFloat(item.crash_point).toFixed(2)}x`
                          : `${parseFloat(item.cashout_point).toFixed(2)}x`}
                      </span>
                      <span
                        className={lost ? 'text-red-400' : 'text-green-400'}
                      >
                        {lost
                          ? `-${formatCoins(item.bet_amount)}`
                          : profit > 0
                          ? `+${formatCoins(profit)}`
                          : `${formatCoins(profit)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>Bet: {formatCoins(item.bet_amount)}</span>
                      <span>{dayjs(item.timestamp).format('hh:mm A')}</span>
                    </div>
                  </div>
                );
              })}

            {/* Loading & Load More */}
            {isFetchingNextPage && (
              <div className="text-center text-white/60 py-2">
                Loading more...
              </div>
            )}
            {hasNextPage && (
              <PzButton
                text="View All"
                onClick={() => {
                  setShowTransactionModal(true);
                }}
                isDisabled={isFetchingNextPage}
              />
            )}
            {!hasNextPage &&
              historyPages?.pages?.flatMap((page) => page.data).length ===
                0 && (
                <div className="text-center text-white/40 py-4">
                  No game history yet
                </div>
              )}
          </div>
        </section>
      </div>
      {showTransactionModal && <Transactions onClose={onClose} />}
      {showFundsErrorPopup && (
        <PzErrorPopup
          setShowFundsErrorPopup={setShowFundsErrorPopup}
          cost={Number(betAmount)}
        />
      )}
      <GameRulesModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        gameTitle="Street King"
        rules={streetKingRules}
      />
    </div>
  );
};

export default React.memo(CrashGame);
