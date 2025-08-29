import { useEffect, useState, useRef, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import { RECONNECT_DELAY } from '../../constants/numbers';

const MAX_RECONNECT_ATTEMPTS = 5;

interface UseWebSocketOptions {
  connectOnMount?: boolean;
  autoReconnect?: boolean;
}

const useWebSocket = (
  url: string,
  options: UseWebSocketOptions = {
    connectOnMount: false,
    autoReconnect: true,
  }
) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const {accessToken ,isAuthenticated} = useAppContext();
  const reconnectAttempts = useRef(0);
  const reconnectTimerRef = useRef(0);

  const clearSocketTimeout = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = 0;
    }
  }, [reconnectTimerRef.current]);

  // Connect to WebSocket
  const connectWebSocket = useCallback(() => {
    clearSocketTimeout();
    // Don't create a new connection if one already exists
    if (
      socket &&
      (socket.readyState === WebSocket.CONNECTING ||
        socket.readyState === WebSocket.OPEN)
    ) {
      console.log('WebSocket connection already exists');
      return;
    }

    if (!url) {
      console.log('WebSocket URL is missing');
      return;
    }

    if (!accessToken) {
      console.log('WebSocket access token is missing');
      return;
    }

    console.log('Connecting to WebSocket server...');
    const webSocket = new WebSocket(url);
    setSocket(webSocket);

    webSocket.onopen = () => {
      console.log('Connected to WebSocket server ', url);
      // Set Socket connection via useRef hook as setIsConnected is not working for onClose
      setIsConnected(true);
      reconnectAttempts.current = 0; // Reset attempts on successful connection

      // Send authentication token
      const message = {
        access_token: accessToken,
      };
      webSocket.send(JSON.stringify(message));
    };

    webSocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    webSocket.onclose = (event) => {
      console.log(
        'Disconnected from WebSocket server',
        event.code,
        event.reason,
        url
      );
      setIsConnected(false);
      setSocket(null);

      if (
        options.autoReconnect &&
        reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS
      ) {
        reconnectTimerRef.current = window.setTimeout(
          connectWebSocket,
          RECONNECT_DELAY
        );
        reconnectAttempts.current += 1;
        console.log(
          `Reconnecting attempt ${reconnectAttempts.current} to ${url}...`
        );
      }
    };
  }, [isAuthenticated, socket]);

  // Disconnect from WebSocket
  const disconnectWebSocket = useCallback(() => {
    clearSocketTimeout();

    if (socket) {
      console.log('Manually disconnecting from WebSocket server');

      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close(1000, 'User no longer betting'); // Normal closure
      }
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket,!isAuthenticated]);

  // Connect on mount if specified in options
  useEffect(() => {
    if (options.connectOnMount) {
      connectWebSocket();
    }

    // Cleanup on unmount
    return () => {
      if (
        socket &&
        (socket.readyState === WebSocket.OPEN ||
          socket.readyState === WebSocket.CONNECTING)
      ) {
        socket.close(1000, 'Component unmounting');
      }
      clearSocketTimeout();
    };
  }, [options.connectOnMount]);

  // Reconnect if token changes
  useEffect(() => {
    if (isConnected && socket) {
      // If token changes while connected, reconnect to update authentication
      socket.close(1000, 'Authentication token changed');
      connectWebSocket();
    }
  }, [isAuthenticated]);

  // Disconnect socket if accessToken is missing
  useEffect(() => {
    if (!isAuthenticated) {
      disconnectWebSocket();
      // Force cleanup of socket state
      setSocket(null);
      setIsConnected(false);
    }
  }, [isAuthenticated, disconnectWebSocket]);

  return {
    socket,
    isConnected,
    connect: connectWebSocket,
    disconnect: disconnectWebSocket,
  };
};

export default useWebSocket;
