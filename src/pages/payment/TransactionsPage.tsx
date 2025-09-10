import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { useServices } from "../../context/ServicesContext";

interface Transaction {
  id: string;
  deposit_session_id?: string;
  withdrawal_id?: string;
  chain_id: string;
  network: string;
  crypto_currency: string;
  tx_hash?: string;
  from_address: string;
  to_address: string;
  amount: number;
  usd_amount_cents?: number;
  exchange_rate?: number;
  fee: number;
  block_number?: number;
  block_hash?: string;
  status: "pending" | "verified" | "failed" | "processing";
  confirmations: number;
  timestamp: string;
  verified_at?: string;
  processor: string;
  transaction_type: "deposit" | "withdrawal";
  metadata?: any;
  created_at: string;
  updated_at: string;
}

const TransactionsPage: React.FC = () => {
  const { walletMgmtSvc } = useServices();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  // Function to fetch transactions
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await walletMgmtSvc.get<{
        transactions: Transaction[];
        limit: number;
        offset: number;
        total: number;
      }>("/crypto/transactions?limit=50&offset=0");
      if (response.success) {
        setTransactions(response.data?.transactions || []);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [walletMgmtSvc]);

  const handleRefresh = () => {
    fetchTransactions();
  };

  const getExplorerUrl = (chainId: string, txHash: string) => {
    switch (chainId) {
      case "sol-mainnet":
        return `https://explorer.solana.com/tx/${txHash}`;
      case "sol-testnet":
        return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
      case "eth-mainnet":
        return `https://etherscan.io/tx/${txHash}`;
      case "eth-testnet":
        return `https://sepolia.etherscan.io/tx/${txHash}`;
      default:
        return "#";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="w-4 h-4 text-green-400" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 text-white border-green-500/30";
      case "pending":
      case "processing":
        return "bg-yellow-500/20 text-black border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-white border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.tx_hash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.deposit_session_id
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.withdrawal_id
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.crypto_currency
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedFilter === "all" ||
      transaction.transaction_type === selectedFilter;
    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;

    // Period filter (example implementation for last 30 days, 90 days, etc.)
    const now = new Date();
    const transactionDate = new Date(transaction.timestamp);
    let matchesPeriod = true;
    if (selectedPeriod !== "all") {
      const days =
        selectedPeriod === "30d" ? 30 : selectedPeriod === "90d" ? 90 : 365;
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      matchesPeriod = transactionDate >= cutoff;
    }

    return matchesSearch && matchesType && matchesStatus && matchesPeriod;
  });

  // Calculate stats using usd_amount_cents
  const totalDeposits = transactions
    .filter(
      (t) =>
        t.transaction_type === "deposit" &&
        t.status === "verified" &&
        t.usd_amount_cents,
    )
    .reduce((sum, t) => sum + t.usd_amount_cents! / 100, 0);
  const totalWithdrawals = transactions
    .filter(
      (t) =>
        t.transaction_type === "withdrawal" &&
        t.status === "verified" &&
        t.usd_amount_cents,
    )
    .reduce((sum, t) => sum + Math.abs(t.usd_amount_cents! / 100), 0);

  // Export functionality (example: CSV download)
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Type",
      "Crypto",
      "Amount",
      "USD Value",
      "Exchange Rate",
      "Status",
      "Date",
      "Tx ID",
      "Tx Hash",
    ];
    const rows = filteredTransactions.map((t) => [
      t.deposit_session_id || t.withdrawal_id || t.id,
      t.transaction_type,
      t.crypto_currency,
      t.amount.toFixed(8),
      t.usd_amount_cents ? (t.usd_amount_cents / 100).toFixed(2) : "N/A",
      t.exchange_rate ? t.exchange_rate.toFixed(6) : "N/A",
      t.status,
      new Date(t.timestamp).toLocaleString(),
      t.deposit_session_id || t.withdrawal_id || "N/A",
      t.tx_hash || "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Transaction History
          </h1>
          <p className="text-gray-400">
            Track all your deposits and withdrawals
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Deposits</p>
                <p className="text-2xl font-bold text-green-400">
                  ${totalDeposits.toFixed(2)} USD
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Withdrawals</p>
                <p className="text-2xl font-bold text-red-400">
                  ${totalWithdrawals.toFixed(2)} USD
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by Tx Hash, ID, or Crypto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="all">All Time</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="365d">Last Year</option>
              </select>

              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>

              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {isLoading && (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Loading transactions...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400">{error}</p>
            </div>
          )}
          {!isLoading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Crypto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      USD Value
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Exchange Rate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Tx Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(transaction.transaction_type)}
                          <div>
                            <p className="text-white font-medium">
                              {transaction.deposit_session_id ||
                                transaction.withdrawal_id ||
                                transaction.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                            transaction.transaction_type === "deposit"
                              ? "bg-green-500/20 text-white"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.transaction_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {transaction.crypto_currency}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${
                            transaction.amount > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toFixed(8)}{" "}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {transaction.usd_amount_cents
                          ? `$${(transaction.usd_amount_cents / 100).toFixed(2)}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {transaction.exchange_rate
                          ? transaction.exchange_rate.toFixed(6)
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(transaction.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(transaction.status)}`}
                          >
                            {transaction.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300">
                          <p className="text-sm">
                            {new Date(
                              transaction.timestamp,
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(
                              transaction.timestamp,
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {transaction.tx_hash && (
                          <a
                            href={getExplorerUrl(
                              transaction.chain_id,
                              transaction.tx_hash,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                          >
                            <span>View</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && !error && filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No transactions found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
