import React, { createContext, useContext } from "react";
import {
  createApiService,
  walletManagementSvc,
  createWebSocketService,
  tvsWebSocket,
} from "../services";

interface ServicesContextType {
  walletMgmtSvc: ReturnType<typeof createApiService>;
  tvsWebSocket: ReturnType<typeof createWebSocketService>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined,
);

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const services: ServicesContextType = {
    walletMgmtSvc: walletManagementSvc,
    tvsWebSocket,
  };

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
