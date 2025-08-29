import { createContext, useContext, useEffect, useState } from 'react';
import {
  SOCKET_URL_FOR_PLAYER_GAME,
  SOCKET_URL_FOR_SQUAD_LEVEL,
  SOCKET_URL_FOR_SQUAD_PROGRESS_LEVEL,
  SOCKET_URL_FOR_NOTIFY,
  SOCKET_URL_FOR_PLAYER_BALANCE,
} from '../api/endpoints';
import useWebSocket from './useSocket';
import { useAppContext } from '../../context/AppContext';

type AbstractObject = Record<
  string,
  string &
    Record<string, string> &
    Record<string, string & Record<string, string>>
> | null;

type SocketContextType = {
  playerGameSocket: WebSocket | null;
  isPlayerGameSocketConnected: boolean;
  connectPlayerGameSocket: () => void;
  disconnectPlayerGameSocket: () => void;
  playerGameState: AbstractObject;
  setPlayerGameState: (data: AbstractObject) => void;

  playerBalanceSocket: WebSocket | null;
  isPlayerBalanceConnected: boolean;
  connectPlayerBalanceSocket: () => void;
  disconnectPlayerBalanceSocket: () => void;
  playerBalanceState: AbstractObject;
  setPlayerBalanceState: (data: AbstractObject) => void;

  levelPlayerSocket: WebSocket | null;
  isLevelPlayerConnected: boolean;
  connectLevelPlayerSocket: () => void;
  disconnectLevelPlayerSocket: () => void;
  levelPlayerState: AbstractObject;
  setLevelPlayerState: (data: AbstractObject) => void;

  squadLevelSocket: WebSocket | null;
  isSquadLevelConnected: boolean;
  connectSquadLevelSocket: () => void;
  disconnectSquadLevelSocket: () => void;
  squadLevelState: AbstractObject;
  setSquadLevelState: (data: AbstractObject) => void;

  notifySocket: WebSocket | null;
  isNotifyConnected: boolean;
  connectNotifySocket: () => void;
  disconnectNotifySocket: () => void;
  notifyState: AbstractObject;
  setNotifyState: (data: AbstractObject) => void;

  disconnectAllSockets: () => void;
  clearAllSocketStates: () => void;
};
const SocketContext = createContext<SocketContextType | undefined>(undefined);

const handleSocketConnection = (
  socketInstance: WebSocket | null,
  setSocketState: (arg: AbstractObject) => void
) => {
  if (!socketInstance) return;

  const messageHandler = (event: MessageEvent) => {
    try {
      const message = event.data;
      if (
        typeof message === 'string' &&
        (message.startsWith('{') || message.startsWith('['))
      ) {
        const parsed = JSON.parse(message);
        setSocketState(parsed);
      } else {
        console.warn('Non-JSON message received:', message);
      }
    } catch (err) {
      console.error('Error parsing socket data:', err);
    }
  };
  socketInstance.addEventListener('message', messageHandler);

  return () => socketInstance.removeEventListener('message', messageHandler);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppContext();
  // Initialize with connectOnMount: false to prevent auto-connect at start
  const {
    socket: playerGameSocket,
    isConnected: isPlayerGameSocketConnected,
    connect: connectPlayerGameSocket,
    disconnect: disconnectPlayerGameSocket,
  } = useWebSocket(SOCKET_URL_FOR_PLAYER_GAME);

  const {
    socket: playerBalanceSocket,
    isConnected: isPlayerBalanceConnected,
    connect: connectPlayerBalanceSocket,
    disconnect: disconnectPlayerBalanceSocket,
  } = useWebSocket(SOCKET_URL_FOR_PLAYER_BALANCE);

  const {
    socket: levelPlayerSocket,
    isConnected: isLevelPlayerConnected,
    connect: connectLevelPlayerSocket,
    disconnect: disconnectLevelPlayerSocket,
  } = useWebSocket(SOCKET_URL_FOR_SQUAD_LEVEL);

  const {
    socket: squadLevelSocket,
    isConnected: isSquadLevelConnected,
    connect: connectSquadLevelSocket,
    disconnect: disconnectSquadLevelSocket,
  } = useWebSocket(SOCKET_URL_FOR_SQUAD_PROGRESS_LEVEL);

  const {
    socket: notifySocket,
    isConnected: isNotifyConnected,
    connect: connectNotifySocket,
    disconnect: disconnectNotifySocket,
  } = useWebSocket(SOCKET_URL_FOR_NOTIFY);

  const [playerGameState, setPlayerGameState] = useState<AbstractObject>(null);
  const [playerBalanceState, setPlayerBalanceState] =
    useState<AbstractObject>(null);
  const [levelPlayerState, setLevelPlayerState] =
    useState<AbstractObject>(null);
  const [squadLevelState, setSquadLevelState] = useState<AbstractObject>(null);
  const [notifyState, setNotifyState] = useState<AbstractObject>(null);

  useEffect(() => {
    handleSocketConnection(playerGameSocket, setPlayerGameState);
  }, [playerGameSocket]);

  useEffect(() => {
    handleSocketConnection(levelPlayerSocket, setLevelPlayerState);
  }, [levelPlayerSocket]);

  useEffect(() => {
    handleSocketConnection(squadLevelSocket, setSquadLevelState);
  }, [squadLevelSocket]);

  useEffect(() => {
    handleSocketConnection(notifySocket, setNotifyState);
  }, [notifySocket]);

  useEffect(() => {
    handleSocketConnection(playerBalanceSocket, setPlayerBalanceState);
  }, [playerBalanceSocket]);

  // Clear all socket states when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      // Immediately clear all states
      clearAllSocketStates();
      // Also disconnect all sockets to ensure clean state
      disconnectAllSockets();
    }
  }, [isAuthenticated]);

  const disconnectAllSockets = () => {
    disconnectPlayerGameSocket();
    disconnectPlayerBalanceSocket();
    disconnectLevelPlayerSocket();
    disconnectSquadLevelSocket();
    disconnectNotifySocket();
  };

  const clearAllSocketStates = () => {
    setPlayerGameState(null);
    setPlayerBalanceState(null);
    setLevelPlayerState(null);
    setSquadLevelState(null);
    setNotifyState(null);
  };

  return (
    <SocketContext.Provider
      value={{
        playerGameSocket,
        isPlayerGameSocketConnected,
        connectPlayerGameSocket,
        disconnectPlayerGameSocket,
        playerGameState,
        setPlayerGameState,

        playerBalanceSocket,
        isPlayerBalanceConnected,
        connectPlayerBalanceSocket,
        disconnectPlayerBalanceSocket,
        playerBalanceState,
        setPlayerBalanceState,

        levelPlayerSocket,
        isLevelPlayerConnected,
        connectLevelPlayerSocket,
        disconnectLevelPlayerSocket,
        levelPlayerState,
        setLevelPlayerState,

        squadLevelSocket,
        isSquadLevelConnected,
        connectSquadLevelSocket,
        disconnectSquadLevelSocket,
        squadLevelState,
        setSquadLevelState,

        notifySocket,
        isNotifyConnected,
        connectNotifySocket,
        disconnectNotifySocket,
        notifyState,
        setNotifyState,

        disconnectAllSockets,
        clearAllSocketStates,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};

export default SocketProvider;
