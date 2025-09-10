import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";
import { API_CONFIG } from "../../config/api";

import LoginModal from "../modals/LoginModal";
import SignInModal from "../modals/SignInModal";
import OTPPopup from "../modals/OTPModal";
import PasswordResetModal from "../modals/PasswordResetModal";
import DepositModal from "../modals/DepositModal";
import VisaPaymentModal from "../modals/VisaPaymentModal";
import WalletConnectModal from "../modals/WalletConnectModal";
import VerificationModal from "../modals/VerificationModal";
import PromotionalSidebar from "./PromotionalSidebar";
import MobileNavigation from "./MobileNavigation";
import IntercomChatWidget from "../ui/IntercomChatWidget";
import GameLaunchModal from '../../components/modals/GameLaunchModal';

import {
  Home,
  Gamepad2,
  Gift,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
  BarChart3,
  Settings,
  DollarSign,
  ArrowRightLeft,
} from "lucide-react";

import homeIcon from "../../assets/sidebar-logos/icons8-home-50.png";
import sportsIcon from "../../assets/sidebar-logos/icons8-jersey-50.png";
import lootboxIcon from "../../assets/sidebar-logos/icons8-open-delivered-box-50.png";
import gamesIcon from "../../assets/sidebar-logos/icons8-ps-controller-50.png";
import slotsIcon from "../../assets/sidebar-logos/icons8-slot-machine-50.png";
import rouletteIcon from "../../assets/sidebar-logos/icons8-roulette-50.png";
import blackjackIcon from "../../assets/sidebar-logos/icons8-ace-of-spades-50.png";
import liveCasinoIcon from "../../assets/sidebar-logos/icons8-video-call-50.png";
import jackpotsIcon from "../../assets/sidebar-logos/icons8-win-50.png";
import promotionsIcon from "../../assets/sidebar-logos/icons8-promotion-32.png";
import tournamentsIcon from "../../assets/sidebar-logos/icons8-trophy-50.png";
import vipIcon from "../../assets/sidebar-logos/icons8-battle-50.png";
import walletIcon from "../../assets/sidebar-logos/icons8-wallet-50.png";
import depositIcon from "../../assets/sidebar-logos/icons8-initiate-money-transfer-50.png";
import withdrawIcon from "../../assets/sidebar-logos/icons8-request-money-50.png";
import supportIcon from "../../assets/sidebar-logos/icons8-support-50.png";
import helpIcon from "../../assets/sidebar-logos/icons8-support-help-center.png";
import contactIcon from "../../assets/sidebar-logos/icons8-gmail-logo-50.png";
import responsibleIcon from "../../assets/sidebar-logos/icons8-user-shield-50.png";
import fairnessIcon from "../../assets/sidebar-logos/icons8-chessboard-50.png";
import termsIcon from "../../assets/sidebar-logos/icons8-terms-and-conditions-50.png";
import tucanLogo from "../../assets/tucan.png";

import bitcoinLogo from "../../assets/payment-methods/icons8-bitcoin-94.png";
import ethereumLogo from "../../assets/payment-methods/icons8-ethereum-24.png";
import tonLogo from "../../assets/payment-methods/ton_symbol.png";
import dollarSymbol from "../../assets/payment-methods/dollar-symbol.png";

import partnerToncoin from "../../assets/payment-methods/partner_Toncoin review.webp";
import partnerBitcoin from "../../assets/payment-methods/partner-bitcoin-cryptocurrency-electronic-money-golden.jpg";
import partnerTether from "../../assets/payment-methods/partner-Tethers-Secret-8B-Gold-Stockpile-A-Strategic-Move-Amid-Economic-Uncertainty.webp";

import gcbLogo from "../../assets/payment-methods/GCB.png";
import eighteenPlusLogo from "../../assets/payment-methods/icons8-18-plus-50.png";
import { useServices } from "../../context/ServicesContext";

const Footer: React.FC = () => {
    return (
        <footer className="bg-black/40 border-t border-[#3C1A4F]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-5 gap-8 mb-12">
                    <div>
                        <div className="flex items-center mb-6">
              <img
                src={tucanLogo}
                alt="TucanBIT"
                className="w-16 h-16 rounded-lg mr-0"
              />
                            <span className="text-2xl font-bold text-white">TucanBIT</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
              TucanBIT is owned and operated by Tucan Entertainment B.V. and
              holds a certificate of operation duly extended by the Curacao
              Gaming Control Board. The world's most trusted crypto casino. Play
              responsibly and enjoy the future of online gaming.
                        </p>
                        <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                                <span className="text-white">𝕏</span>
                            </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                                <span className="text-white">📷</span>
                            </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                                <span className="text-white">▶</span>
                            </a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">⭐</span>
              <span className="text-sm text-gray-400">
                TrustScore 4.4 | 782 reviews
              </span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Casino</h3>
                        <ul className="space-y-3">
              <li>
                <Link
                  to="/slots"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Slots
                </Link>
              </li>
              <li>
                <Link
                  to="/blackjacks"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blackjack
                </Link>
              </li>
              <li>
                <Link
                  to="/roulette"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Roulette
                </Link>
              </li>
              <li>
                <Link
                  to="/live-casino"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Live Casino
                </Link>
              </li>
              <li>
                <Link
                  to="/jackpots"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Jackpots
                </Link>
              </li>
              <li>
                <Link
                  to="/table-games"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Table Games
                </Link>
              </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Sports</h3>
                        <ul className="space-y-3">
              <li>
                <Link
                  to="/sports"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sportsbook
                </Link>
              </li>
              <li>
                <Link
                  to="/sports/football"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Football
                </Link>
              </li>
              <li>
                <Link
                  to="/sports/basketball"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Basketball
                </Link>
              </li>
              <li>
                <Link
                  to="/sports/esports"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Esports
                </Link>
              </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Promotions</h3>
                        <ul className="space-y-3">
              <li>
                <Link
                  to="/promotions"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Promotions
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions/daily-fin"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  The Daily Fin
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions/battle-pass"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Battle Pass
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions/wtf"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  WTF?!
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions/refer-friend"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refer a Friend
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions/affiliates"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Affiliates
                </Link>
              </li>
                        </ul>
                    </div>
                    <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Support & Legal
            </h3>
                        <ul className="space-y-3 mb-6">
              <li>
                <Link
                  to="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/responsible-gaming"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Responsible Gaming
                </Link>
              </li>
              <li>
                <Link
                  to="/fairness"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fairness
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 mb-8">
                    <div className="grid lg:grid-cols-4 gap-20">
                        <div>
              <h4 className="text-white font-semibold text-md mb-4">
                Partners
              </h4>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                                    <img 
                                        src={partnerToncoin} 
                                        alt="Toncoin Partner" 
                                        className="w-16 h-16 object-contain" 
                                    />
                  <span className="text-white text-xs font-medium text-center">
                    Toncoin
                  </span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                                    <img 
                                        src={partnerBitcoin} 
                                        alt="Bitcoin Partner" 
                                        className="w-16 h-16 object-contain" 
                                    />
                  <span className="text-white text-xs font-medium text-center">
                    Bitcoin
                  </span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                                    <img 
                                        src={partnerTether} 
                                        alt="Tether Partner" 
                                        className="w-16 h-16 object-contain" 
                                    />
                  <span className="text-white text-xs font-medium text-center">
                    Tether
                  </span>
                                </div>
                            </div>
                        </div>
                        <div>
              <h4 className="text-white font-semibold text-md mb-4">
                Payment Methods
              </h4>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center space-x-2">
                                    <img src={bitcoinLogo} alt="Bitcoin" className="w-5 h-5" />
                                    <span className="text-white text-sm">Bitcoin</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <img src={ethereumLogo} alt="Ethereum" className="w-5 h-5" />
                                    <span className="text-white text-sm">Ethereum</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <img src={tonLogo} alt="TON" className="w-5 h-5" />
                                    <span className="text-white text-sm">TON</span>
                                </div>
                            </div>
                        </div>
                        <div>
              <h4 className="text-white font-semibold text-md mb-4">
                Currency
              </h4>
                            <div className="flex items-center space-x-2">
                                <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center space-x-2">
                                    <img src={tonLogo} alt="TON" className="w-5 h-5" />
                                    <span className="text-white text-sm">1 TON</span>
                                </div>
                                <span className="text-gray-400">→</span>
                                <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center space-x-2">
                                    <img src={dollarSymbol} alt="USD" className="w-5 h-5" />
                                    <span className="text-white text-sm">$3.31 USD</span>
                                </div>
                            </div>
                        </div>
                        <div>
              <h4 className="text-white font-semibold text-md mb-4">
                Compliance
              </h4>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center">
                  <img
                    src={gcbLogo}
                    alt="GCB"
                    className="w-12 h-12 object-contain"
                  />
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <img
                      src={eighteenPlusLogo}
                      alt="18+"
                      className="w-8 h-8 object-contain"
                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 mb-4 lg:mb-0">
                            <p className="text-gray-400 text-sm">
                                © 2025 TucanBIT. All rights reserved. Licensed in Curacao.
                            </p>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-500">🛡</span>
                                    <span className="text-sm text-gray-400">SSL Secured</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-yellow-500">🏆</span>
                                    <span className="text-sm text-gray-400">Provably Fair</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-cyan-500">🕐</span>
                                    <span className="text-sm text-gray-400">24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

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
  const [promotionalSidebarExpanded, setPromotionalSidebarExpanded] =
    useState(false);
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
        .catch((err) =>
          setBalanceError(err.message || "Failed to fetch balances"),
        )
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
  const desktopNavItems = [
    { id: "home", path: "/", label: "Home", icon: Home },
    { id: "lootboxes", path: "/lootboxes", label: "LootBoxes", icon: Gift },
    { id: "games", path: "/games", label: "Games", icon: Gamepad2 },
  ];
  if (isAuthenticated) {
    desktopNavItems.push({
      id: "profile",
      path: "/profile",
      label: "Profile",
      icon: User,
    });
  }

   const headerNavItems = [
    {
      id: "liveCasino",
      path: "/live-casino",
      label: "Live Casino",
      icon: "🎲",
    },
    { id: "games", path: "/games", label: "Games", icon: "🎮" },
    { id: "vipClub", path: "/vip-club", label: "Tucan Elite", icon: "💎" },
  ];

  const usdBalance = balance?.amount_cents
    ? balance.amount_cents / 100
    : "0.00";

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full w-full">
      <div
        className={`fixed inset-y-0 left-0 z-[60] bg-black shadow-2xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-all duration-300 border-r border-gray-800 ${sidebarOpen ? "w-64" : sidebarExpanded ? "w-64" : "w-16"} max-h-screen overflow-hidden`}
      >
        <div className="flex flex-col h-full max-h-screen">
          <div
            className={`border-b border-gray-800 ${sidebarOpen ? "p-6" : sidebarExpanded ? "p-6" : "p-4"} lg:p-4`}
          >
            <div
              className={`flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"}`}
            >
              <div
                className={`flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"}`}
              >
                <div className="md:hidden">
                   <Link to="/" onClick={handleLinkClick}>  
                     <div className="flex items-center space-x-2">
                       <img src={tucanLogo} alt="Tucan" className="w-8 h-8" />
                      <span className="text-2xl font-bold text-white">
                        TucanBIT
                      </span>
                     </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Crypto Casino & Sportsbook
                    </p>
                   </Link> 
                </div>
                {sidebarExpanded && (
                  <div className="hidden md:block">
                   <Link to="/" onClick={handleLinkClick}>  
                     <div className="flex items-center space-x-2">
                       <img src={tucanLogo} alt="Tucan" className="w-8 h-8" />
                        <span className="text-2xl font-bold text-white">
                          TucanBIT
                        </span>
                     </div>
                   </Link> 
                    <p className="text-xs text-gray-400 mt-1">
                      Crypto Casino & Sportsbook
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setSidebarExpanded(!sidebarExpanded);
                  if (activeSubmenu) setActiveSubmenu(null);
                }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg transition-all duration-300 border border-white/30 hover:border-white/50 p-1.5 rounded-lg hidden md:block ml-2"
              >
                {sidebarExpanded ? (
                  <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </button>
            </div>
          </div>
            {isSportsPage && sidebarExpanded && (
              <>
                <div className="p-4 border-b border-gray-800">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">💳</span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Tucan Wallet
                      </p>
                      <p className="text-xs text-gray-300">Coming soon</p>
                    </div>
                  </div>
                  </div>
                </div>
               <div className="p-4 border-b border-gray-800">
            <div className="bg-gradient-to-r from-purple-950 to-purple-900 rounded-lg p-3 text-white min-h-[140px]">
              <h3 className="font-bold text-sm mb-2">BATTLEPASS</h3>
                  <p className="text-xs mb-3">
                    Get amazing rewards with Battlepass.
                  </p>
                             <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <span className="text-lg">🪙</span>
                   <span className="text-lg">🏆</span>
                 </div>
                 <div className="text-xs">
                   <p>Levelup Rewards</p>
                   <p>Tucan Tokens</p>
                 </div>
               </div>
            </div>
          </div>
              </>
            )}
          <nav
            className={`flex-1 overflow-y-auto ${sidebarOpen ? "p-4" : sidebarExpanded ? "p-4" : "p-2"} space-y-1 min-h-0 h-full scrollbar-hide pb-20`}
          >
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
              }
            >
              <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                <img
                  src={homeIcon}
                  alt="Home"
                  className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                />
              </span>
              <span
                className={`${sidebarOpen ? "block" : "hidden"} md:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
              >
                Home
              </span>
            </NavLink>
            {sidebarExpanded && (
              <div className="px-3 py-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  GAMING
                </span>
              </div>
            )}
            <NavLink
              to="/sports"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
              }
            >
              <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                <img
                  src={sportsIcon}
                  alt="Sports"
                  className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                />
              </span>
              <span
                className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
              >
                Sports
              </span>
            </NavLink>
            <NavLink
              to="/lootboxes"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
              }
            >
              <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                <img
                  src={lootboxIcon}
                  alt="Lootboxes"
                  className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                />
              </span>
              <span
                className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
              >
                Lootboxes
              </span>
            </NavLink>
            <div>
              <button
                onClick={(e) => toggleSubmenu("games", e)}
                className={`${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"} p-3 rounded-lg hover:bg-gray-800 text-white`}
              >
                <div className="flex items-center ${sidebarOpen ? 'space-x-3' : sidebarExpanded ? 'space-x-3' : 'justify-center'}">
                  <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                    <img
                      src={gamesIcon}
                      alt="Games"
                      className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                    />
                  </span>
                  <span
                    className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
                  >
                    Games
                  </span>
                </div>
                <div
                  className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}
                >
                  {activeSubmenu === "games" ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </button>
              {activeSubmenu === "games" && (
                <div className="pl-10 pt-2 space-y-2">
                  <NavLink
                    to="/slots"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                      <img
                        src={slotsIcon}
                        alt="Slots"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Slots</span>
                  </NavLink>
                  <NavLink
                    to="/table-games"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                      <img
                        src={fairnessIcon}
                        alt="Table Games"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Table Games</span>
                  </NavLink>
                  <NavLink
                    to="/roulette"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                      <img
                        src={rouletteIcon}
                        alt="Roulette"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Roulette</span>
                  </NavLink>
                  <NavLink
                    to="/blackjacks"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                      <img
                        src={blackjackIcon}
                        alt="Blackjack"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Blackjack</span>
                  </NavLink>
                  <NavLink
                    to="/live-casino"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                      <img
                        src={liveCasinoIcon}
                        alt="Live Casino"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Live Casino</span>
                  </NavLink>
                  <NavLink
                    to="/jackpots"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0 z-10 relative">
                      <img
                        src={jackpotsIcon}
                        alt="Jackpots"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Jackpots</span>
                  </NavLink>
            </div>
              )}
            </div>
            {sidebarExpanded && (
              <div className="px-3 py-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  COMMUNITY
                </span>
              </div>
            )}
            <NavLink
              to="/promotions"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
              }
            >
              <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                <img
                  src={promotionsIcon}
                  alt="Promotions"
                  className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                />
              </span>
              <span
                className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
              >
                Promotions
              </span>
            </NavLink>
            <NavLink
              to="/tournaments"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
              }
            >
              <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                <img
                  src={tournamentsIcon}
                  alt="Tournaments"
                  className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                />
              </span>
              <span
                className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
              >
                Tournaments
              </span>
            </NavLink>
            <NavLink
              to="/vip-club"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "space-x-3" : sidebarExpanded ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
              }
            >
              <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                <img
                  src={vipIcon}
                  alt="Tucan Elite"
                  className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                />
              </span>
              <span
                className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
              >
                Tucan Elite
              </span>
            </NavLink>
            {sidebarExpanded && (
              <div className="px-3 py-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  WALLET & SUPPORT
                </span>
              </div>
            )}
            <div>
              <button
                onClick={(e) => toggleSubmenu("wallet", e)}
                className={`${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"} p-3 rounded-lg hover:bg-gray-800 text-white`}
              >
                <div className="flex items-center ${sidebarOpen ? 'space-x-3' : sidebarExpanded ? 'space-x-3' : 'justify-center'}">
                  <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                    <img
                      src={walletIcon}
                      alt="Wallet"
                      className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                    />
                  </span>
                  <span
                    className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
                  >
                    Wallet
                  </span>
                </div>
                <div
                  className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}
                >
                  {activeSubmenu === "wallet" ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </button>
              {activeSubmenu === "wallet" && (
                <div className="pl-10 pt-1 space-y-1">
                  <NavLink
                    to="/deposit"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">
                      <img
                        src={depositIcon}
                        alt="Deposit"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Deposit</span>
                  </NavLink>
                  <NavLink
                    to="/withdraw"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">
                      <img
                        src={withdrawIcon}
                        alt="Withdraw"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Withdraw</span>
                  </NavLink>
            </div>
              )}
            </div>
            <div>
              <button
                onClick={(e) => toggleSubmenu("support", e)}
                className={`${sidebarOpen ? "w-full" : sidebarExpanded ? "w-full" : "w-16"} flex items-center ${sidebarOpen ? "justify-between" : sidebarExpanded ? "justify-between" : "justify-center"} p-3 rounded-lg hover:bg-gray-800 text-white`}
              >
                    <div className="flex items-center ${sidebarOpen ? 'space-x-3' : sidebarExpanded ? 'space-x-3' : 'justify-center'}">
                  <span className="text-xl w-6 text-center flex-shrink-0 z-10 relative">
                    <img
                      src={supportIcon}
                      alt="Support"
                      className="w-5 h-5 flex-shrink-0 filter brightness-0 invert"
                    />
                  </span>
                  <span
                    className={`ml-3 ${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"} flex-1 min-w-0 truncate`}
                  >
                    Support
                  </span>
                    </div>
                <div
                  className={`${sidebarOpen ? "block" : "hidden"} lg:${sidebarExpanded ? "block" : "hidden"}`}
                >
                  {activeSubmenu === "support" ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                    </div>
                </button>
              {activeSubmenu === "support" && (
                <div className="pl-10 pt-1 space-y-1">
                  <NavLink
                    to="/help"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">
                      <img
                        src={helpIcon}
                        alt="Help Center"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Help Center</span>
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">
                      <img
                        src={contactIcon}
                        alt="Contact Us"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Contact Us</span>
                  </NavLink>
                  <NavLink
                    to="/responsible-gaming"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">
                      <img
                        src={responsibleIcon}
                        alt="Responsible Gaming"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Responsible Gaming</span>
                  </NavLink>
                  <NavLink
                    to="/fairness"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">
                      <img
                        src={fairnessIcon}
                        alt="Fairness"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Fairness</span>
                  </NavLink>
                  <NavLink
                    to="/terms-of-service"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">
                      <img
                        src={termsIcon}
                        alt="Terms of Service"
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </span>
                    <span>Terms of Service</span>
                  </NavLink>
                  <NavLink
                    to="/privacy-policy"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? "text-white bg-gray-800 font-semibold" : "hover:bg-gray-800 text-white"}`
                    }
                  >
                    <span className="text-lg w-6 text-center">🔒</span>
                    <span>Privacy Policy</span>
                  </NavLink>
            </div>
              )}
            </div>
          </nav>
        </div>
      </div>
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
        <nav className="sticky top-0 z-[999999] bg-gradient-to-r from-black to-gray-800 backdrop-blur-md border-b border-gray-800/30 shadow-lg shadow-black/30 relative">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#36CFC9]/20 to-transparent"></div>
          <div
            className={`w-full px-4 sm:px-6 md:px-8 lg:px-8 lg:max-w-5xl lg:mx-auto ${promotionalSidebarExpanded ? "lg:pr-48" : "lg:pr-8"} ${promotionalSidebarExpanded ? "xl:pr-64" : "xl:pr-12"}`}
          >
            <div className="flex items-center h-16">
                <div className="flex items-center">
                  <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)} 
                    className="md:hidden relative p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                    <span
                      className={`absolute w-5 h-0.5 bg-black rounded-full transition-all duration-300 transform ${sidebarOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`}
                    ></span>
                    <span
                      className={`absolute w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${sidebarOpen ? "opacity-0" : "opacity-100"}`}
                    ></span>
                    <span
                      className={`absolute w-5 h-0.5 bg-black rounded-full transition-all duration-300 transform ${sidebarOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}`}
                    ></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                    </div>
                  </button>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  {headerNavItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all text-sm ${location.pathname === item.path ? "bg-gray-800/20 text-[#36CFC9]" : "text-gray-400 hover:text-white"}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                        <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  ))}
                  {!isAuthenticated && (
                  <button
                    onClick={() => openModal("login")}
                    className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-100 text-black rounded-lg font-semibold text-sm transition-all duration-200"
                  >
                        <User className="w-4 h-4" />
                        <span>Get Started</span>
                    </button>
                  )}
                </div>
              <div className="flex items-center space-x-4 ml-auto mr-4 relative">
                  {!isAuthenticated && (
                  <button
                    onClick={() => openModal("login")}
                    className="md:hidden flex items-center space-x-1 px-3 py-2 text-white hover:text-[#36CFC9] transition-colors duration-200 font-medium"
                  >
                    <User className="w-4 h-4" />
                        <span>Get Started</span>
                    </button>
                  )}
                  {isAuthenticated && (
                  <div className="flex items-center space-x-6">
                          <div className="relative balance-dropdown">
                      <button
                        onClick={() =>
                          setIsBalanceDropdownOpen(!isBalanceDropdownOpen)
                        }
                        className="flex items-center space-x-2 px-3 py-2 text-white hover:text-[#36CFC9] transition-colors duration-200 group"
                      >
                        <span className="text-yellow-400 font-bold">
                          {balance?.currency_code}
                        </span>
                        <span className="text-white font-semibold text-lg">
                          {isLoadingBalances
                            ? "Loading..."
                            : balanceError
                              ? "Error"
                              : usdBalance}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:text-[#36CFC9] ${isBalanceDropdownOpen ? "rotate-180" : ""}`}
                        />
                                </button>
                            {isBalanceDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-xs text-gray-400 uppercase tracking-wider">
                                Your Balances
                                                </div>
                              <button
                                onClick={() => {
                                  setIsLoadingBalances(true);
                                  walletMgmtSvc
                                    .get<{
                                      balances: Balance[];
                                      total: number;
                                    }>("/crypto/balances")
                                    .then((response) => {
                                      if (response.success) {
                                        setBalance(
                                          response.data!.balances[0] || null,
                                        );
                                        setBalanceError(null);
                                      } else {
                                        setBalanceError(response.message);
                                      }
                                    })
                                    .catch((err) =>
                                      setBalanceError(
                                        err.message ||
                                          "Failed to fetch balances",
                                      ),
                                    )
                                    .finally(() => setIsLoadingBalances(false));
                                }}
                                className="text-xs text-[#36CFC9] hover:text-[#2bb8b3] transition-colors"
                              >
                                Refresh
                              </button>
                                            </div>
                            {balance ? (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold text-sm">
                                        {balance.currency_code.charAt(0)}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-white font-medium">
                                        Available
                                </div>
                                      <div className="text-gray-400 text-xs">
                                        $
                                        {(balance.amount_cents / 100).toFixed(
                                          2,
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-white font-semibold">
                                      ${(balance.amount_cents / 100).toFixed(2)}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                      Available
                                    </div>
                                  </div>
                          </div>

                                <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold text-sm">
                                        R
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-white font-medium">
                                        Locked
                                      </div>
                                      <div className="text-gray-400 text-xs">
                                        In wagers: $
                                        {(balance.reserved_cents / 100).toFixed(
                                          2,
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-white font-semibold">
                                      $
                                      {(balance.reserved_cents / 100).toFixed(
                                        2,
                                      )}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                      Locked
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-gray-700 pt-2 mt-2">
                                  <div className="flex items-center justify-between">
                                    <div className="text-white font-medium">
                                      Total Balance
                                    </div>
                                    <div className="text-green-400 font-semibold">
                                      $
                                      {(
                                        (balance.amount_cents +
                                          balance.reserved_cents) /
                                        100
                                      ).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <div className="text-gray-400 text-sm">
                                  {isLoadingBalances
                                    ? "Loading balances..."
                                    : "No balances found"}
                                </div>
                            <button 
                              onClick={() => {
                                    setIsLoadingBalances(true);
                                    walletMgmtSvc
                                      .get<{
                                        balances: Balance[];
                                        total: number;
                                      }>("/crypto/balances")
                                      .then((response) => {
                                        if (response.success) {
                                          setBalance(
                                            response.data!.balances[0] || null,
                                          );
                                          setBalanceError(null);
                                        } else {
                                          setBalanceError(response.message);
                                        }
                                      })
                                      .catch((err) =>
                                        setBalanceError(
                                          err.message ||
                                            "Failed to fetch balances",
                                        ),
                                      )
                                      .finally(() =>
                                        setIsLoadingBalances(false),
                                      );
                                  }}
                                  className="text-[#36CFC9] text-xs hover:text-[#2bb8b3] transition-colors mt-2"
                                >
                                  Refresh to load balances
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {walletAddress && (
                      <div className="flex items-center space-x-2 px-3 py-2 text-white hover:text-[#36CFC9] transition-colors duration-200 group">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">
                          {walletAddress.slice(0, 6)}...
                          {walletAddress.slice(-4)}
                        </span>
                        {walletBalance && (
                          <span className="text-green-300 text-sm">
                            {parseFloat(walletBalance).toFixed(4)}{" "}
                            {walletCurrency}
                          </span>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => openModal("deposit")}
                      className="flex items-center space-x-2 px-3 py-2 text-white hover:text-[#36CFC9] transition-colors duration-200 font-medium"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span className="hidden sm:inline">Deposit</span>
                    </button>
                    <div className="relative user-dropdown z-[999999]">
                      <button
                        onClick={() =>
                          setIsUserDropdownOpen(!isUserDropdownOpen)
                        }
                        className="flex items-center space-x-2 px-3 py-2 text-white hover:text-[#36CFC9] transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-[#36CFC9] to-[#F25287] rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-white" />
                              </div>
                        <span className="text-white font-medium whitespace-nowrap">
                          {user?.username || "User"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform group-hover:text-[#36CFC9] ${isUserDropdownOpen ? "rotate-180" : ""}`}
                        />
                            </button>
                      {isUserDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-[999999]">
                          <div className="p-4">
                            <div className="px-3 py-3 border-b border-gray-700/50 mb-3">
                              <div>
                                <p className="text-white font-semibold text-sm">
                                  {user?.username || "User"}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {user?.email || "user@example.com"}
                                </p>
                                  </div>
                            </div>
                            <div className="space-y-1">
                                  <button 
                                    onClick={() => {
                                      setIsUserDropdownOpen(false);
                                  if (!isAuthenticated) openModal("login");
                                  else window.location.href = "/profile";
                                }}
                                className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-lg text-gray-300 hover:text-white transition-colors w-full text-left"
                              >
                                <User className="w-4 h-4" />
                                <span className="text-sm">Profile</span>
                                  </button>
                              <Link
                                to="/transactions"
                                onClick={() => setIsUserDropdownOpen(false)}
                                className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                              >
                                <BarChart3 className="w-4 h-4" />
                                <span className="text-sm">Transactions</span>
                                  </Link>
                              <Link
                                to="/settings"
                                onClick={() => setIsUserDropdownOpen(false)}
                                className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                              >
                                <Settings className="w-4 h-4" />
                                <span className="text-sm">Settings</span>
                                  </Link>
                              <Link
                                to="/withdraw"
                                onClick={() => setIsUserDropdownOpen(false)}
                                className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                              >
                                <ArrowRightLeft className="w-4 h-4" />
                                <span className="text-sm">Withdraw</span>
                                  </Link>
                            </div>
                            <div className="border-t border-gray-700/50 my-3"></div>
                            <div className="space-y-1">
                              {walletAddress && (
                                    <button 
                                      onClick={() => {
                                    disconnectWallet();
                                        setIsUserDropdownOpen(false);
                                      }} 
                                  className="flex items-center space-x-3 p-3 hover:bg-orange-500/10 rounded-lg text-orange-400 hover:text-orange-300 transition-colors w-full text-left"
                                >
                                  <LogOut className="w-4 h-4" />
                                  <span className="text-sm">
                                    Disconnect Wallet
                                  </span>
                                </button>
                              )}
                              <button
                                onClick={async () => {
                                  setIsUserDropdownOpen(false);
                                  try {
                                    showToast(
                                      "info",
                                      "Logging out...",
                                      "Please wait while we sign you out securely.",
                                    );
                                    await logout();
                                    showToast(
                                      "success",
                                      "Logged out successfully",
                                      "You have been signed out securely.",
                                    );
                                  } catch (error) {
                                    showToast(
                                      "error",
                                      "Logout failed",
                                      "There was an issue signing you out. Please try again.",
                                    );
                                  }
                                }}
                                className="flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Logout</span>
                                    </button>
                                  </div>
                                </div>
                        </div>
                            )}
                          </div>
                      </div>
                  )}
                </div>
            </div>
            </div>
        </nav>
        <main
          className={`pb-20 md:pb-0 overflow-x-hidden w-full transition-all duration-300 ${promotionalSidebarExpanded ? "lg:pr-48 xl:pr-64" : "lg:pr-8 xl:pr-0"} ${sidebarOpen || sidebarExpanded ? "lg:pl-64" : "lg:pl-16"} ${sidebarOpen ? "pl-64" : "pl-0"} ${!sidebarOpen && !sidebarExpanded ? "md:pl-16" : ""} sm:px-0 md:px-0 lg:px-0`}
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
      {modalView === "login" && (
        <LoginModal
          onClose={closeModal}
          onShowVerification={handleShowVerification}
          onShowSignIn={handleShowSignIn}
          onShowWalletConnect={() => openModal("walletConnect")}
        />
      )}
      {modalView === "signin" && (
        <SignInModal
          onClose={closeModal}
          onShowVerification={handleShowVerification}
          onShowPasswordReset={handleShowPasswordReset}
        />
      )}
      {modalView === "verification" && (
        <VerificationModal 
          onClose={closeModal} 
          onVerificationComplete={handleShowOtp}
          onBack={() => openModal("login")}
        />
      )}
      {modalView === "otp" && (
        <OTPPopup onClose={closeModal} onLoginSuccess={handleLoginComplete} />
      )}
      {modalView === "passwordReset" && (
        <PasswordResetModal
          onClose={closeModal}
          onBackToLogin={handleShowSignIn}
        />
      )}
      {modalView === 'gameLaunch' && gameUrl && (
        <GameLaunchModal src={gameUrl} onClose={closeGame} />
      )}
      {modalView === "deposit" && (
        <DepositModal
          onClose={closeModal}
          onVisaClick={() => openModal("visa")}
        />
      )}
      {modalView === "visa" && (
        <VisaPaymentModal onClose={() => openModal("deposit")} />
      )}
      {modalView === "walletConnect" && <WalletConnectModal />}
      <IntercomChatWidget position="bottom-right" theme="dark" />
    </div>
  );
};

export default Layout;
