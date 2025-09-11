import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";
import { API_CONFIG } from "../../config/api";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import PromotionalSidebar from "./PromotionalSidebar";
import MobileNavigation from "./MobileNavigation";
import IntercomChatWidget from "../ui/IntercomChatWidget";
import ModalContainer from "./ModalContainer";
import { useServices } from "../../context/ServicesContext";

interface Balance {
  id: string;
  user_id: string;
  currency_code: string;
  amount_cents: number;
  amount_units: string;
  reserved_cents: number;
  reserved_units: string;
  updated_at: string;
}

const Layout: React.FC = () => {
  const location = useLocation();
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [promotionalSidebarExpanded, setPromotionalSidebarExpanded] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { walletMgmtSvc, tvsWebSocket } = useServices();
  const [balance, setBalance] = useState<Balance | null>(null);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  const {
    modalView,
    closeModal,
    openModal,
    isAuthenticated,
    login,
    logout,
    user,
    walletAddress,
    walletBalance,
    walletCurrency,
    disconnectWallet,
    gameUrl,
    closeGame
  } = useAppContext();

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoadingBalances(true);
      walletMgmtSvc
        .get<{ balances: Balance[]; total: number }>("/crypto/balances")
        .then((response) => {
          if (response.success) {
            setBalance(response.data!.balances[0] || null);
          } else {
            setBalanceError(response.message);
          }
        })
        .catch((err) => setBalanceError(err.message || "Failed to fetch balances"))
        .finally(() => setIsLoadingBalances(false));

      tvsWebSocket.connect();
      tvsWebSocket.onBalance((message) => {
        if (message.balance) {
          setBalance(message.balance);
          setBalanceError(null);
        }
      });

      tvsWebSocket.onError((err) => {
        console.error("WebSocket error:", err.message);
      });
      tvsWebSocket.onOpen(() => {
        console.log("WebSocket connected for balance updates");
      });

      return () => {
        tvsWebSocket.disconnect();
      };
    }
  }, [isAuthenticated, walletMgmtSvc, tvsWebSocket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo(0, 0);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-dropdown")) {
        setIsUserDropdownOpen(false);
      }
      if (!target.closest(".balance-dropdown")) {
        setIsBalanceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!sidebarOpen && activeSubmenu && window.innerWidth < 768) {
      setActiveSubmenu(null);
    }
  }, [sidebarOpen, activeSubmenu]);

  const toggleSubmenu = (menu: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
    if (activeSubmenu) {
      setActiveSubmenu(null);
    }
  };

  const handleMobileMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    if (activeSubmenu) {
      setActiveSubmenu(null);
    }
  };

  const handleShowVerification = () => openModal("verification");
  const handleShowSignIn = () => openModal("signin");
  const handleShowOtp = () => openModal("otp");
  const handleShowPasswordReset = () => openModal("passwordReset");

  const handleLoginComplete = async (userProfile?: any) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_PROFILE}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const realUserProfile = await response.json();
          login(realUserProfile);
        } else {
          const user_id = localStorage.getItem("user_id") || "newuser";
          const basicProfile = {
            user_id,
            username: "User",
            first_name: "User",
            last_name: "",
            email: localStorage.getItem("registrationEmail") || "",
            phone_number: "",
            profile_picture: "",
            type: "PLAYER",
            referral_code: "",
          };
          login(basicProfile);
        }
      }
    } catch (error) {
      const user_id = localStorage.getItem("user_id") || "newuser";
      const basicProfile = {
        user_id,
        username: "User",
        first_name: "User",
        last_name: "",
        email: localStorage.getItem("registrationEmail") || "",
        phone_number: "",
        profile_picture: "",
        type: "PLAYER",
        referral_code: "",
      };
      login(basicProfile);
    }
  };

  const isSportsPage = location.pathname === "/sports";

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full w-full">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isAuthenticated={isAuthenticated}
        openModal={openModal}
        balance={balance}
        isLoadingBalances={isLoadingBalances}
        balanceError={balanceError}
        isBalanceDropdownOpen={isBalanceDropdownOpen}
        setIsBalanceDropdownOpen={setIsBalanceDropdownOpen}
        isUserDropdownOpen={isUserDropdownOpen}
        setIsUserDropdownOpen={setIsUserDropdownOpen}
        user={user}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
        walletCurrency={walletCurrency}
        disconnectWallet={disconnectWallet}
        logout={logout}
        showToast={showToast}
        walletMgmtSvc={walletMgmtSvc}
        setBalance={setBalance}
        setBalanceError={setBalanceError}
        setIsLoadingBalances={setIsLoadingBalances}
      />
      
      <Sidebar
        sidebarOpen={sidebarOpen}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        activeSubmenu={activeSubmenu}
        toggleSubmenu={toggleSubmenu}
        handleLinkClick={handleLinkClick}
        isSportsPage={isSportsPage}
      />
      
      <div className="hidden lg:block">
        <PromotionalSidebar
          isExpanded={promotionalSidebarExpanded}
          setIsExpanded={setPromotionalSidebarExpanded}
        />
      </div>
      
      <div
        ref={mainContentRef}
        id="main-content"
        className={sidebarExpanded ? "sidebar-expanded" : ""}
      >
        <main
          className={`pt-16 pb-20 md:pb-0 overflow-x-hidden w-full transition-all duration-300 ${promotionalSidebarExpanded ? "lg:pr-48 xl:pr-64" : "lg:pr-8 xl:pr-0"} ${sidebarOpen || sidebarExpanded ? "lg:pl-64" : "lg:pl-16"} ${sidebarOpen ? "pl-64" : "pl-0"} ${!sidebarOpen && !sidebarExpanded ? "md:pl-16" : ""} sm:px-0 md:px-0 lg:px-0`}
        >
          <Outlet key={location.pathname} />
          <div className="hidden md:block">
            <Footer />
          </div>
        </main>
      </div>
      
      <MobileNavigation onMenuToggle={handleMobileMenuToggle} />
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <ModalContainer
        modalView={modalView}
        closeModal={closeModal}
        openModal={openModal}
        gameUrl={gameUrl}
        closeGame={closeGame}
        handleShowVerification={handleShowVerification}
        handleShowSignIn={handleShowSignIn}
        handleShowOtp={handleShowOtp}
        handleShowPasswordReset={handleShowPasswordReset}
        handleLoginComplete={handleLoginComplete}
      />
      
      <IntercomChatWidget position="bottom-right" theme="dark" />
    </div>
  );
};

export default Layout;