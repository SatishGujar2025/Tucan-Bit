import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronDown, AlertTriangle, Loader2 } from "lucide-react";
import { FaCcVisa } from "react-icons/fa";
import logo from "../../assets/g11.jpg";
import usdcLogo from "../../assets/logos/usdc.svg";
import usdtLogo from "../../assets/logos/usdt.svg";
import solLogo from "../../assets/logos/sol.svg";
import ethLogo from "../../assets/logos/eth.svg";
import btcLogo from "../../assets/logos/btc.svg";
import { useServices } from "../../context/ServicesContext";
import { ApiResponse } from "../../types";

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        callback(...args);
        setTimeoutId(null);
      }, delay);
      setTimeoutId(id);
    },
    [callback, delay, timeoutId],
  );
};

interface DepositModalProps {
  onClose: () => void;
  onVisaClick: () => void;
}

type Crypto = "USDC" | "USDT" | "SOL" | "ETH" | "BTC";
type Network = "ERC-20" | "SOL" | "BTC" | "TRC-20";
type ChainID =
  | "eth-mainnet"
  | "eth-testnet"
  | "btc-mainnet"
  | "btc-testnet"
  | "sol-mainnet"
  | "sol-testnet"
  | "tron-mainnet";

interface SupportedChain {
  id: string;
  chain_id: ChainID;
  name: string;
  networks: Network[];
  crypto_currencies: Crypto[];
  is_testnet: boolean;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

interface DepositSession {
  id: string;
  session_id: string;
  chain_id: ChainID;
  user_id: string;
  network: Network;
  wallet_address?: string;
  amount: number;
  crypto_currency: Crypto;
  status:
    | "pending"
    | "processing"
    | "completed"
    | "cancelled"
    | "failed"
    | "expired";
  qr_code_data?: string;
  payment_link?: string | null;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

interface WithdrawalSession {
  id: string;
  withdrawal_id: string;
  chain_id: ChainID;
  user_id: string;
  network: Network;
  wallet_address: string;
  crypto_amount: string;
  crypto_currency: Crypto;
  status: "pending" | "verified" | "failed" | "processing";
  created_at: string;
  updated_at: string;
}

interface WithdrawalFeeEstimate {
  fee_usd_cents: number;
  fee_crypto: number;
  net_amount: number;
  crypto_currency: Crypto;
}

interface FormErrors {
  crypto?: string;
  network?: string;
  chainId?: string;
  amount?: string;
  walletAddress?: string;
}

const tokenLogos: Record<Crypto, string> = {
  USDC: usdcLogo,
  USDT: usdtLogo,
  SOL: solLogo,
  ETH: ethLogo,
  BTC: btcLogo,
};

const DepositModal: React.FC<DepositModalProps> = ({
  onClose,
  onVisaClick,
}) => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [selectedCurrency, setSelectedCurrency] = useState<Crypto | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [selectedChainId, setSelectedChainId] = useState<ChainID | null>(null);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [depositAddress, setDepositAddress] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [supportedChains, setSupportedChains] = useState<SupportedChain[]>([]);
  const [depositSession, setDepositSession] = useState<DepositSession | null>(
    null,
  );
  const [withdrawalSession, setWithdrawalSession] =
    useState<WithdrawalSession | null>(null);
  const [feeEstimate, setFeeEstimate] = useState<WithdrawalFeeEstimate | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useTestnets, setUseTestnets] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const logoUrl = logo;
  const { walletMgmtSvc, tvsWebSocket } = useServices();

  useEffect(() => {
    setIsLoading(true);
    walletMgmtSvc
      .get<SupportedChain[]>("/crypto/chains/supported/active?limit=0&offset=0")
      .then((response) => {
        if (response.success) {
          setSupportedChains(response.data!);
        } else {
          setError(response.message);
        }
      })
      .catch((err) =>
        setError(err.message || "Failed to fetch supported chains"),
      )
      .finally(() => setIsLoading(false));

    tvsWebSocket.connect();

    tvsWebSocket.onDeposit((message) => {
      if (message.deposit) {
        setDepositSession(message.deposit);
        setDepositAddress(message.deposit.wallet_address || null);
        setQrCodeData(message.deposit.qr_code_data || null);
      }
    });

    tvsWebSocket.onWithdrawal((message) => {
      if (message.withdrawal) {
        setWithdrawalSession(message.withdrawal);
      }
    });

    tvsWebSocket.onError((err) => console.error(err.message));
    tvsWebSocket.onOpen(() => {
      console.log("WebSocket connected for deposit and withdrawal updates");
    });

    return () => {
      tvsWebSocket.disconnect();
    };
  }, [walletMgmtSvc, tvsWebSocket]);

  useEffect(() => {
    const fetchFeeEstimate = async () => {
      if (
        selectedCurrency &&
        selectedChainId &&
        withdrawAmount &&
        parseFloat(withdrawAmount) > 0
      ) {
        setIsEstimating(true);
        setError(null);
        try {
          const response = await walletMgmtSvc.get<WithdrawalFeeEstimate>(
            `/crypto/withdrawal/get-fee-estimates?chain_id=${selectedChainId}&crypto_currency=${selectedCurrency}&amount=${parseFloat(withdrawAmount)}`,
          );
          if (response.success && response.data) {
            setFeeEstimate(response.data);
          } else {
            setError(response.message);
            setFeeEstimate(null);
          }
        } catch (err: any) {
          setError(err.message || "Failed to estimate fees");
          setFeeEstimate(null);
        } finally {
          setIsEstimating(false);
        }
      } else {
        setFeeEstimate(null);
      }
    };

    fetchFeeEstimate();
  }, [selectedCurrency, selectedChainId, withdrawAmount, walletMgmtSvc]);

  const getAvailableCryptos = (): Crypto[] => {
    const cryptos = new Set<Crypto>();
    supportedChains.forEach((chain) => {
      if (chain.is_testnet === useTestnets) {
        chain.crypto_currencies.forEach((crypto) => cryptos.add(crypto));
      }
    });
    return Array.from(cryptos);
  };

  const getAvailableNetworks = (crypto: Crypto): Network[] => {
    const networks = new Set<Network>();
    supportedChains
      .filter(
        (chain) =>
          chain.crypto_currencies.includes(crypto) &&
          chain.is_testnet === useTestnets,
      )
      .forEach((chain) => {
        chain.networks.forEach((network) => networks.add(network));
      });
    return Array.from(networks);
  };

  const getAvailableChains = (crypto: Crypto, network: Network): ChainID[] => {
    return supportedChains
      .filter(
        (chain) =>
          chain.crypto_currencies.includes(crypto) &&
          chain.networks.includes(network) &&
          chain.is_testnet === useTestnets,
      )
      .map((chain) => chain.chain_id);
  };

  const handleCryptoChange = (value: Crypto) => {
    setSelectedCurrency(value);
    setSelectedNetwork(null);
    setSelectedChainId(null);
    setFeeEstimate(null);
    setFormErrors({});
  };

  const handleNetworkChange = (value: Network) => {
    setSelectedNetwork(value);
    if (selectedCurrency) {
      const availableChains = getAvailableChains(selectedCurrency, value);
      setSelectedChainId(
        availableChains.length > 0 ? availableChains[0] : null,
      );
    }
    setFeeEstimate(null);
    setFormErrors({});
  };

  const handleTestnetToggle = () => {
    setUseTestnets(!useTestnets);
    setSelectedCurrency(null);
    setSelectedNetwork(null);
    setSelectedChainId(null);
    setFeeEstimate(null);
    setFormErrors({});
  };

  const handleAmountChange = (value: string) => {
    if (value === "" || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setWithdrawAmount(value);
      setFormErrors((prev) => ({ ...prev, amount: undefined }));
    }
  };

  const handleWalletAddressChange = (value: string) => {
    setWithdrawAddress(value.trim());
    setFormErrors((prev) => ({ ...prev, walletAddress: undefined }));
  };

  const handleCopyAddress = () => {
    if (depositAddress) {
      navigator.clipboard.writeText(depositAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleGenerateDeposit = async () => {
    const errors: FormErrors = {};
    if (!selectedCurrency) errors.crypto = "Please select a cryptocurrency";
    if (!selectedNetwork) errors.network = "Please select a network";
    if (!selectedChainId)
      errors.chainId = "No available chain for this combination";
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      errors.amount = "Amount must be greater than 0";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await walletMgmtSvc.post<DepositSession>(
        "/crypto/deposit/initiate",
        {
          crypto: selectedCurrency,
          network: selectedNetwork,
          chain_id: selectedChainId,
          amount: parseFloat(withdrawAmount),
          payment_method: "crypto",
        },
      );
      if (response.success) {
        setDepositSession(response.data!);
        setDepositAddress(response.data!.wallet_address || null);
        setQrCodeData(response.data!.qr_code_data || null);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to initiate deposit");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewDeposit = () => {
    setDepositSession(null);
    setDepositAddress(null);
    setQrCodeData(null);
    setWithdrawAmount("");
    setError(null);
    setFormErrors({});
  };

  const handleNewWithdrawal = () => {
    setWithdrawalSession(null);
    setWithdrawAmount("");
    setWithdrawAddress("");
    setFeeEstimate(null);
    setError(null);
    setFormErrors({});
  };

  const initiateWithdrawal = async () => {
    if (isLoading) return;
    const errors: FormErrors = {};
    if (!selectedCurrency) errors.crypto = "Please select a cryptocurrency";
    if (!selectedNetwork) errors.network = "Please select a network";
    if (!selectedChainId)
      errors.chainId = "No available chain for this combination";
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    if (!withdrawAddress.trim()) {
      errors.walletAddress = "Wallet address is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await walletMgmtSvc.post<ApiResponse<null>>(
        "/crypto/withdrawal/initiate",
        {
          chain_id: selectedChainId,
          crypto_currency: selectedCurrency,
          network: selectedNetwork,
          amount: parseFloat(withdrawAmount),
          wallet_address: withdrawAddress.trim(),
        },
      );
      if (response.success) {
        setWithdrawalSession({
          id: "",
          withdrawal_id: "",
          chain_id: selectedChainId!,
          user_id: "",
          network: selectedNetwork!,
          wallet_address: withdrawAddress.trim(),
          crypto_amount: withdrawAmount,
          crypto_currency: selectedCurrency!,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to initiate withdrawal");
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce the initiateWithdrawal function with a 500ms delay
  const handleInitiateWithdrawal = useDebounce(initiateWithdrawal, 500);

  const getStatusBadgeStyle = (
    status: DepositSession["status"] | WithdrawalSession["status"],
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400 text-yellow-900";
      case "processing":
        return "bg-blue-500 text-white animate-pulse";
      case "completed":
      case "verified":
        return "bg-green-500 text-white";
      case "failed":
        return "bg-red-500 text-red-900";
      case "cancelled":
      case "expired":
        return "bg-orange-500 text-orange-900";
      default:
        return "bg-gray-500 text-gray-900";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-[480px] mx-auto shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === "deposit"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Deposit
            </span>
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === "withdraw"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              Withdraw
            </span>
          </button>
          <div className="flex items-center gap-2 pr-6 py-4">
            <button
              onClick={onVisaClick}
              className="text-white px-2 py-2 rounded text-lg font-bold transition-colors duration-200"
            >
              <span className="text-3xl">
                <FaCcVisa />
              </span>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {!depositSession && !withdrawalSession && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">
                Use Testnets
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useTestnets}
                  onChange={handleTestnetToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}

          {activeTab === "deposit" ? (
            <>
              {depositSession && depositAddress && qrCodeData ? (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeStyle(
                        depositSession.status,
                      )}`}
                    >
                      {depositSession.status === "processing" && (
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      )}
                      {depositSession.status.charAt(0).toUpperCase() +
                        depositSession.status.slice(1)}
                    </span>
                  </div>
                  <div className="relative bg-white p-4 rounded-lg w-fit mx-auto">
                    <img
                      src={qrCodeData}
                      alt="Deposit QR Code"
                      className="w-[200px] h-[200px]"
                    />
                    <img
                      src={logoUrl}
                      alt="logo"
                      className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-md"
                    />
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Wallet Address:</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-300 truncate max-w-[200px]">
                          {depositAddress}
                        </p>
                        <button
                          onClick={handleCopyAddress}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          {isCopied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Crypto:</span>{" "}
                      {depositSession.crypto_currency}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Amount:</span>{" "}
                      {depositSession.amount.toFixed(6)}{" "}
                      {depositSession.crypto_currency}
                    </p>
                  </div>
                  <a
                    href="/transactions"
                    className="text-blue-400 hover:text-blue-300 text-sm text-center block"
                  >
                    View All Deposit Sessions
                  </a>
                  <button
                    onClick={handleNewDeposit}
                    disabled={isLoading}
                    className="w-full bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "New Deposit"
                    )}
                  </button>
                  {error && (
                    <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle
                        size={14}
                        className="text-yellow-500 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-yellow-400 text-xs">{error}</p>
                    </div>
                  )}
                  <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle
                      size={14}
                      className="text-yellow-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-yellow-400 text-xs">
                      Please carefully check the deposit wallet address!
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Cryptocurrency
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          {selectedCurrency ? (
                            <>
                              <img
                                src={tokenLogos[selectedCurrency]}
                                alt={`${selectedCurrency} logo`}
                                className="w-6 h-6"
                              />
                              <span>{selectedCurrency}</span>
                            </>
                          ) : (
                            <span className="text-gray-400">
                              Select cryptocurrency
                            </span>
                          )}
                        </div>
                        <ChevronDown size={16} className="text-gray-400" />
                      </button>
                      {isCurrencyOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                          {getAvailableCryptos().map((currency) => (
                            <button
                              key={currency}
                              onClick={() => {
                                setSelectedCurrency(currency);
                                setIsCurrencyOpen(false);
                                handleCryptoChange(currency);
                              }}
                              className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                            >
                              <img
                                src={tokenLogos[currency]}
                                alt={`${currency} logo`}
                                className="w-6 h-6"
                              />
                              <span>{currency}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {formErrors.crypto && (
                      <p className="text-yellow-400 text-xs mt-1">
                        {formErrors.crypto}
                      </p>
                    )}
                  </div>

                  {selectedCurrency && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Network
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                        >
                          <span>{selectedNetwork || "Select network"}</span>
                          <ChevronDown size={16} className="text-gray-400" />
                        </button>
                        {isNetworkOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                            {getAvailableNetworks(selectedCurrency).map(
                              (network) => (
                                <button
                                  key={network}
                                  onClick={() => {
                                    setSelectedNetwork(network);
                                    setIsNetworkOpen(false);
                                    handleNetworkChange(network);
                                  }}
                                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                                >
                                  {network}
                                </button>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                      {formErrors.network && (
                        <p className="text-yellow-400 text-xs mt-1">
                          {formErrors.network}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedNetwork && selectedChainId && (
                    <div className="bg-blue-900 bg-opacity-20 p-3 rounded-lg">
                      <p className="text-sm text-blue-300">
                        Selected Chain:{" "}
                        <span className="font-medium">{selectedChainId}</span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <h3 className="text-white font-medium">
                        Deposit through Blockchain
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Direct deposits through blockchain can take up to 10
                      minutes. Please be patient!
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Deposit Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.000001"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                          <span className="text-gray-400 text-sm">
                            {selectedCurrency || "CRYPTO"}
                          </span>
                        </div>
                      </div>
                      {formErrors.amount && (
                        <p className="text-yellow-400 text-xs mt-1">
                          {formErrors.amount}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleGenerateDeposit}
                      disabled={
                        isLoading ||
                        !selectedCurrency ||
                        !selectedNetwork ||
                        !selectedChainId
                      }
                      className="w-full bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        "Generate Deposit Address"
                      )}
                    </button>
                    {error && (
                      <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-3 flex items-start gap-2">
                        <AlertTriangle
                          size={14}
                          className="text-yellow-500 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-yellow-400 text-xs">{error}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {withdrawalSession ? (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeStyle(
                        withdrawalSession.status,
                      )}`}
                    >
                      {(withdrawalSession.status === "pending" ||
                        withdrawalSession.status === "processing") && (
                        <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping"></span>
                      )}
                      {withdrawalSession.status.charAt(0).toUpperCase() +
                        withdrawalSession.status.slice(1)}
                    </span>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Wallet Address:</span>
                      </p>
                      <p className="text-sm text-gray-300 truncate max-w-[200px]">
                        {withdrawalSession.wallet_address}
                      </p>
                    </div>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Crypto:</span>{" "}
                      {withdrawalSession.crypto_currency}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Amount:</span>{" "}
                      {withdrawalSession.crypto_amount}{" "}
                      {withdrawalSession.crypto_currency}
                    </p>
                    {feeEstimate && (
                      <>
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">Estimated Fee:</span>{" "}
                          {feeEstimate.fee_crypto.toFixed(6)} SOL (~$
                          {(feeEstimate.fee_usd_cents / 100).toFixed(2)} USD)
                        </p>
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">
                            Net Amount Received:
                          </span>{" "}
                          {parseFloat(withdrawAmount) - feeEstimate.fee_crypto}{" "}
                          {withdrawalSession.crypto_currency}
                        </p>
                      </>
                    )}
                  </div>
                  <a
                    href="/transactions"
                    className="text-blue-400 hover:text-blue-300 text-sm text-center block"
                  >
                    View All Withdrawal Sessions
                  </a>
                  <button
                    onClick={handleNewWithdrawal}
                    disabled={isLoading}
                    className="w-full bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "New Withdrawal"
                    )}
                  </button>
                  {error && (
                    <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle
                        size={14}
                        className="text-yellow-500 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-yellow-400 text-xs">{error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Cryptocurrency
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          {selectedCurrency ? (
                            <>
                              <img
                                src={tokenLogos[selectedCurrency]}
                                alt={`${selectedCurrency} logo`}
                                className="w-6 h-6"
                              />
                              <span>{selectedCurrency}</span>
                            </>
                          ) : (
                            <span className="text-gray-400">
                              Select cryptocurrency
                            </span>
                          )}
                        </div>
                        <ChevronDown size={16} className="text-gray-400" />
                      </button>
                      {isCurrencyOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                          {getAvailableCryptos().map((currency) => (
                            <button
                              key={currency}
                              onClick={() => {
                                setSelectedCurrency(currency);
                                setIsCurrencyOpen(false);
                                handleCryptoChange(currency);
                              }}
                              className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                            >
                              <img
                                src={tokenLogos[currency]}
                                alt={`${currency} logo`}
                                className="w-6 h-6"
                              />
                              <span>{currency}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {formErrors.crypto && (
                      <p className="text-yellow-400 text-xs mt-1">
                        {formErrors.crypto}
                      </p>
                    )}
                  </div>

                  {selectedCurrency && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Network
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-left text-white flex items-center justify-between hover:border-gray-500 transition-colors duration-200"
                        >
                          <span>{selectedNetwork || "Select network"}</span>
                          <ChevronDown size={16} className="text-gray-400" />
                        </button>
                        {isNetworkOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                            {getAvailableNetworks(selectedCurrency).map(
                              (network) => (
                                <button
                                  key={network}
                                  onClick={() => {
                                    setSelectedNetwork(network);
                                    setIsNetworkOpen(false);
                                    handleNetworkChange(network);
                                  }}
                                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                                >
                                  {network}
                                </button>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                      {formErrors.network && (
                        <p className="text-yellow-400 text-xs mt-1">
                          {formErrors.network}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedNetwork && selectedChainId && (
                    <div className="bg-blue-900 bg-opacity-20 p-3 rounded-lg">
                      <p className="text-sm text-blue-300">
                        Selected Chain:{" "}
                        <span className="font-medium">{selectedChainId}</span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <h3 className="text-white font-medium">
                        Withdraw through Blockchain
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Direct withdrawals through blockchain can take up to 10
                      minutes. Please be patient!
                    </p>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Withdraw Address
                      </label>
                      <input
                        type="text"
                        value={withdrawAddress}
                        onChange={(e) =>
                          handleWalletAddressChange(e.target.value)
                        }
                        placeholder="Enter your address"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                      />
                      {formErrors.walletAddress && (
                        <p className="text-yellow-400 text-xs mt-1">
                          {formErrors.walletAddress}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Withdraw Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.000001"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                          <span className="text-gray-400 text-sm">
                            {selectedCurrency || "CRYPTO"}
                          </span>
                        </div>
                      </div>
                      {formErrors.amount && (
                        <p className="text-yellow-400 text-xs mt-1">
                          {formErrors.amount}
                        </p>
                      )}
                    </div>
                    {isEstimating && (
                      <div className="flex items-center gap-2">
                        <Loader2
                          size={16}
                          className="animate-spin text-gray-400"
                        />
                        <p className="text-gray-400 text-sm">
                          Estimating fees...
                        </p>
                      </div>
                    )}
                    {feeEstimate && !isEstimating && (
                      <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">Estimated Fee:</span>{" "}
                          {feeEstimate.fee_crypto.toFixed(6)} SOL (~$
                          {(feeEstimate.fee_usd_cents / 100).toFixed(2)} USD)
                        </p>
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">
                            Net Amount Received:
                          </span>{" "}
                          {feeEstimate.net_amount.toFixed(6)} {selectedCurrency}
                        </p>
                      </div>
                    )}
                    <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle
                        size={14}
                        className="text-yellow-500 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-yellow-400 text-xs">
                        Please carefully check the withdrawal wallet address and
                        amount!{" "}
                        {selectedCurrency !== "SOL" &&
                          "Ensure you have sufficient SOL to cover transaction fees."}
                      </p>
                    </div>
                    <button
                      onClick={handleInitiateWithdrawal}
                      disabled={
                        isLoading ||
                        !selectedCurrency ||
                        !selectedNetwork ||
                        !selectedChainId ||
                        !withdrawAmount ||
                        !withdrawAddress.trim() ||
                        parseFloat(withdrawAmount) <= 0
                      }
                      className="w-full bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Withdraw"
                      )}
                    </button>
                    {error && (
                      <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-3 flex items-start gap-2">
                        <AlertTriangle
                          size={14}
                          className="text-yellow-500 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-yellow-400 text-xs">{error}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
