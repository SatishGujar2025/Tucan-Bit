interface AppConfig {
  walletApiUrl: string;
  tvsWebSocketUrl: string;
  apiTimeout?: number;
}

const loadConfig = (): AppConfig => {
  const walletApiUrl = "http://13.51.168.77:8084/wms/api/v1";
  const tvsWebSocketUrl = "ws://13.51.168.77:8085/tvs/api/v1/status/ws";
  const apiTimeout = 10000;

  return {
    walletApiUrl,
    tvsWebSocketUrl,
    apiTimeout,
  };
};

export const config = loadConfig();
