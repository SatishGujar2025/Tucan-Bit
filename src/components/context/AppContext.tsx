import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for our shared state and functions
type ModalView = 'login' | 'otp' | 'verification' | 'deposit' | 'visa' | null;

interface AppContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  balance: number;
  modalView: ModalView;
  login: (username: string) => void;
  logout: () => void;
  openModal: (view: ModalView) => void;
  closeModal: () => void;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default undefined value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the props for our provider component
interface AppProviderProps {
  children: ReactNode;
}

// Create the Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalView, setModalView] = useState<ModalView>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [balance, setBalance] = useState(10000);

  const handleLoginSuccess = (username: string) => {
    setIsAuthenticated(true);
    setUser({ username });
    setModalView('deposit'); // Show deposit modal after successful login flow
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setModalView(null);
  };

  const openModal = (view: ModalView) => setModalView(view);
  const closeModal = () => setModalView(null);

  const value: AppContextType = {
    isAuthenticated,
    user,
    balance,
    modalView,
    login: handleLoginSuccess,
    logout: handleLogout,
    openModal,
    closeModal,
    setBalance
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Create a custom hook for easy access to the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};