import React from "react";
import { Link } from "react-router-dom";
import { User, ChevronDown, DollarSign, BarChart3, Settings, ArrowRightLeft, LogOut } from "lucide-react";
import tucanLogo from "../../assets/logos/logoNew.svg";
import sidebarTogalar from "../../assets/sidebar-logos/sidebarTogalar.svg";

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

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  activeSubmenu: string | null;
  toggleSubmenu: (menu: string, event?: React.MouseEvent) => void;
  isAuthenticated: boolean;
  openModal: (modal: any) => void;
  balance: Balance | null;
  isLoadingBalances: boolean;
  balanceError: string | null;
  isBalanceDropdownOpen: boolean;
  setIsBalanceDropdownOpen: (open: boolean) => void;
  isUserDropdownOpen: boolean;
  setIsUserDropdownOpen: (open: boolean) => void;
  user: any;
  walletAddress: string | null;
  walletBalance: string | null;
  walletCurrency: string | null;
  disconnectWallet: () => void;
  logout: () => void;
  showToast: (type: any, title: string, message?: string, duration?: number) => void;
  walletMgmtSvc: any;
  setBalance: (balance: Balance | null) => void;
  setBalanceError: (error: string | null) => void;
  setIsLoadingBalances: (loading: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarExpanded,
  setSidebarExpanded,
  activeSubmenu,
  toggleSubmenu,
  isAuthenticated,
  openModal,
  balance,
  isLoadingBalances,
  balanceError,
  isBalanceDropdownOpen,
  setIsBalanceDropdownOpen,
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  user,
  walletAddress,
  walletBalance,
  walletCurrency,
  disconnectWallet,
  logout,
  showToast,
  walletMgmtSvc,
  setBalance,
  setBalanceError,
  setIsLoadingBalances,
}) => {


  const usdBalance = balance?.amount_cents ? balance.amount_cents / 100 : "0.00";

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-gradient-to-b from-[#1E2129] to-[#19191F] backdrop-blur-md border-b border-gray-800/30 shadow-lg shadow-black/30">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#36CFC9]/20 to-transparent"></div>
      <div className="w-full px-4 sm:px-6 md:px-3 lg:px-0">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-4">
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
            <button
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                setSidebarExpanded(!sidebarExpanded);
                if (activeSubmenu) toggleSubmenu("");
              }}
              className="hidden md:block mr-2 p-2 rounded-lg hover:bg-gray-800/20 transition-all duration-200"
            >
              <img src={sidebarTogalar} alt="TucanBIT" className="w-[20px] border-0" />

            </button>
            <Link to="/" className="flex items-center space-x-2">
              <img src={tucanLogo} alt="TucanBIT" className="w-[auto] h-[15px]" />
              {/* <span className="text-2xl font-bold text-white">TucanBIT</span> */}
            </Link>
          </div>
          {/* <div className="hidden md:flex items-center space-x-2">
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
          </div> */}
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
                      onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}
                      className="flex items-center space-x-2 px-3 py-2 text-white hover:text-[#36CFC9] transition-colors duration-200 group"
                    >
                      <span className="text-yellow-400 font-bold">
                        {balance?.currency_code}
                      </span>
                      <span className="text-white font-semibold text-lg">
                        {isLoadingBalances ? "Loading..." : balanceError ? "Error" : usdBalance}
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
                                  .get("/crypto/balances")
                                  .then((response: any) => {
                                    if (response.success) {
                                      setBalance(response.data!.balances[0] || null);
                                      setBalanceError(null);
                                    } else {
                                      setBalanceError(response.message);
                                    }
                                  })
                                  .catch((err: any) =>
                                    setBalanceError(err.message || "Failed to fetch balances")
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
                                    <div className="text-white font-medium">Available</div>
                                    <div className="text-gray-400 text-xs">
                                      ${(balance.amount_cents / 100).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-white font-semibold">
                                    ${(balance.amount_cents / 100).toFixed(2)}
                                  </div>
                                  <div className="text-gray-400 text-xs">Available</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">R</span>
                                  </div>
                                  <div>
                                    <div className="text-white font-medium">Locked</div>
                                    <div className="text-gray-400 text-xs">
                                      In wagers: ${(balance.reserved_cents / 100).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-white font-semibold">
                                    ${(balance.reserved_cents / 100).toFixed(2)}
                                  </div>
                                  <div className="text-gray-400 text-xs">Locked</div>
                                </div>
                              </div>
                              <div className="border-t border-gray-700 pt-2 mt-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-white font-medium">Total Balance</div>
                                  <div className="text-green-400 font-semibold">
                                    ${((balance.amount_cents + balance.reserved_cents) / 100).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <div className="text-gray-400 text-sm">
                                {isLoadingBalances ? "Loading balances..." : "No balances found"}
                              </div>
                              <button
                                onClick={() => {
                                  setIsLoadingBalances(true);
                                  walletMgmtSvc
                                    .get("/crypto/balances")
                                    .then((response: any) => {
                                      if (response.success) {
                                        setBalance(response.data!.balances[0] || null);
                                        setBalanceError(null);
                                      } else {
                                        setBalanceError(response.message);
                                      }
                                    })
                                    .catch((err: any) =>
                                      setBalanceError(err.message || "Failed to fetch balances")
                                    )
                                    .finally(() => setIsLoadingBalances(false));
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
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </span>
                      {walletBalance && (
                        <span className="text-green-300 text-sm">
                          {parseFloat(walletBalance).toFixed(4)} {walletCurrency}
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
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
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
                                <span className="text-sm">Disconnect Wallet</span>
                              </button>
                            )}
                            <button
                              onClick={async () => {
                                setIsUserDropdownOpen(false);
                                try {
                                  showToast("info", "Logging out...", "Please wait while we sign you out securely.");
                                  await logout();
                                  showToast("success", "Logged out successfully", "You have been signed out securely.");
                                } catch (error) {
                                  showToast("error", "Logout failed", "There was an issue signing you out. Please try again.");
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
          <div className="flex items-center space-x-4 ml-8 mr-[62px]">
            <select className="px-3 py-2 bg-transparent text-white text-sm focus:outline-none focus:border-[#36CFC9] transition-colors">
              <option value="en" className="bg-gray-800 text-white hover:bg-gradient-to-r hover:from-[#9C42F5] hover:via-[#4579F5] hover:to-[#00FFAA]">EN</option>
              <option value="es" className="bg-gray-800 text-white hover:bg-gradient-to-r hover:from-[#9C42F5] hover:via-[#4579F5] hover:to-[#00FFAA]">ES</option>
              <option value="fr" className="bg-gray-800 text-white hover:bg-gradient-to-r hover:from-[#9C42F5] hover:via-[#4579F5] hover:to-[#00FFAA]">FR</option>
            </select>
            <Link to="/" onClick={() => openModal("login")} className="flex items-center space-x-2 px-4 py-2 mr-[52px] mt-[6px] bg-white hover:bg-gray-100 text-black rounded-lg font-semibold text-sm transition-all duration-200">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;