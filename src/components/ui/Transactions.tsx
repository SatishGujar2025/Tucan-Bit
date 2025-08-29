import React, { useState, useMemo,useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronDown, Filter, AlertCircle, X, Eye } from 'lucide-react';
import { fetchOperationalTypes, fetchTransactions, TransactionFilters } from '../../network/api/transactionsService';
import { TransactionDetailModal } from './TransactionDetails';
import { formatNumber } from '../../utils/helper';
import { useAppContext } from '../../context/AppContext';

interface TransactionsProps {
  onClose: () => void;
}

interface ApiLog {
  id: string;
  user_id: string;
  component: string;
  currency: string;
  description: string;
  change_amount: string;
  operational_group_id: string;
  operational_type: {
    id: string,
    name: string
  };
  timestamp: string;
  type: 'deposit' | 'transfer' | string;
  balance_after_update: string;
  transaction_id: string;
  status: string;
}

interface ApiResponse {
  status: string;
  data: {
    page: number;
    total_pages: number;
    logs: ApiLog[];
  };
}

const Transactions: React.FC<TransactionsProps> = ({ onClose }) => {
  const { accessToken } = useAppContext()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [detailPageOpen, setDetailPageOpen] = useState<boolean>(false)
  const [detail_id, setDetail_id] = useState<string>('')
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  const perPage = 10;

  // Enhanced filter states with amount range
  const [filters, setFilters] = useState<Omit<TransactionFilters, 'page' | 'per_page'> & { min_amount?: string; max_amount?: string }>({
    search: '',
    type: 'all',
    start_date: '',
    end_date: '',
    min_amount: undefined,
    max_amount: undefined,
  });

  // Validation state for amount fields
  const [amountErrors, setAmountErrors] = useState<{ min_amount?: string; max_amount?: string }>({});

  // Fetch operational types
  const { data: opTypes } = useQuery<{ id: string; name: string }[]>({
    queryKey: ['operationalTypes'],
    queryFn: () => {
      if (!accessToken) throw new Error('Access token missing');
      return fetchOperationalTypes(accessToken);
    }
  });

  // Validate amount range
  const validateAmountRange = (minAmount: string, maxAmount: string) => {
    const errors: { min_amount?: string; max_amount?: string } = {};

    // Check if values are valid numbers
    if (minAmount && isNaN(Number(minAmount))) {
      errors.min_amount = 'Please enter a valid number';
    }
    if (maxAmount && isNaN(Number(maxAmount))) {
      errors.max_amount = 'Please enter a valid number';
    }

    // Check if min is less than max
    if (minAmount && maxAmount && !errors.min_amount && !errors.max_amount) {
      const min = Number(minAmount);
      const max = Number(maxAmount);
      if (min > max) {
        errors.max_amount = 'Maximum amount must be greater than minimum';
      }
      if (min < 0) {
        errors.min_amount = 'Amount cannot be negative';
      }
      if (max < 0) {
        errors.max_amount = 'Amount cannot be negative';
      }
    }

    setAmountErrors(errors);
    return Object.keys(errors).length === 0;
  };



    // Check if mobile on mount and resize
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      checkMobile();
      window.addEventListener('resize', checkMobile);
  
      // Trigger animation
      setTimeout(() => setIsAnimating(true), 50);
  
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

  // Check if filters are valid for API call
  const filtersValid = useMemo(() => {
    // Validate amount range if either field has a value
    if (filters.min_amount || filters.max_amount) {
      return validateAmountRange(filters.min_amount ?? '', filters.max_amount ?? '');
    }
    return true;
  }, [filters.min_amount, filters.max_amount]);

  // Prepare filters for API call
  const prepareFiltersForAPI = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiFilters: any = { ...filters };

    // Remove empty string values and convert amounts to numbers
    if (apiFilters.min_amount === '') delete apiFilters.min_amount;
    else if (apiFilters.min_amount) apiFilters.min_amount = Number(apiFilters.min_amount);

    if (apiFilters.max_amount === '') delete apiFilters.max_amount;
    else if (apiFilters.max_amount) apiFilters.max_amount = Number(apiFilters.max_amount);

    if (apiFilters.start_date === '') delete apiFilters.start_date;
    if (apiFilters.end_date === '') delete apiFilters.end_date;
    if (apiFilters.search === '') delete apiFilters.search;
    if (apiFilters.type === 'all') delete apiFilters.type;

    return apiFilters;
  }, [filters]);

  // Fetch transactions with enhanced filtering
  const {
    data: transactionData,
    isLoading: logsLoading,
    isError: logsError,
    refetch,
  } = useQuery<ApiResponse, Error, ApiResponse>({
    queryKey: ['transactions', currentPage, prepareFiltersForAPI],
    queryFn: () => {
      if (!accessToken) throw new Error('Access token missing');
      if (!filtersValid) throw new Error('Invalid filter values');

      return fetchTransactions({
        page: currentPage,
        per_page: perPage,
        ...prepareFiltersForAPI
      }, accessToken);
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: filtersValid, // Only make API call when filters are valid
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);

    // Real-time validation for amount fields
    if (key === 'min_amount' || key === 'max_amount') {
      const newFilters = { ...filters, [key]: value };
      validateAmountRange(newFilters.min_amount ?? '', newFilters.max_amount ?? '');
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      start_date: '',
      end_date: '',
      min_amount: undefined,
      max_amount: undefined
    });
    setAmountErrors({});
    setCurrentPage(1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelDeatils = (id: any) => {
    if (id) {
      setDetail_id(id)
      setDetailPageOpen(true)
    } else {
      setDetail_id('')
      setDetailPageOpen(false)
    }

  }
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.type && filters.type !== 'all') count++;
    if (filters.start_date) count++;
    if (filters.end_date) count++;
    if (filters.min_amount) count++;
    if (filters.max_amount) count++;
    return count;
  }, [filters]);

  const exportToCSV = () => {
    if (!transactionData || !transactionData.data.logs.length) {
      alert('No transactions to export');
      return;
    }
    const headers = ['Transaction ID', 'Timestamp', 'Type', 'Description', 'Amount', 'Currency', 'Balance After', 'Status', 'User ID', 'Component', 'Operational Group ID', 'Operational Type ID'];
    const csvData = transactionData.data.logs.map(tx => [
      tx.transaction_id,
      new Date(tx.timestamp).toLocaleString(),
      tx.type.toUpperCase(),
      `"${tx.description.replace(/"/g, '""')}"`,
      tx.change_amount,
      tx.currency,
      tx.balance_after_update,
      tx.status || 'COMPLETED',
      tx.user_id,
      tx.component,
      tx.operational_group_id,
      tx.operational_type
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    // Mobile bottom sheet styles
  const mobileContainerClass = `
    fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center
    transition-all duration-300 ease-out
    ${isAnimating ? 'opacity-100' : 'opacity-0'}
  `;

  const mobileContentClass = `
  bg-gradient-to-b from-[#510957] to-black
    rounded-t-3xl w-full max-h-[85vh] flex flex-col
    transform transition-transform duration-300 ease-out
    ${isAnimating ? 'translate-y-0' : 'translate-y-full'}
  `;

  // Desktop modal styles
  const desktopContainerClass = `
    fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4
    transition-all duration-300 ease-out
    ${isAnimating ? 'opacity-100' : 'opacity-0'}
  `;

  const desktopContentClass = `
   bg-[linear-gradient(to_bottom_right,_#510957_10%,_black_80%)]
  rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col
  transform transition-all duration-300 ease-out
  ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
`;

  return (

        <div className={isMobile ? mobileContainerClass : desktopContainerClass}>
      <div className={isMobile ? mobileContentClass : desktopContentClass}>
        {/* Header */}
        <div className="p-6  flex justify-between items-center sticky top-0  from-[#510957] to-[#510957]rounded-t-3xl md:rounded-t-2xl z-10">
          {/* <button onClick={onClose} className="text-white/60 hover:text-white">
            <ChevronLeft size={24} />
          </button> */}
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl  text-white font-[Anton] tracking-wide ">All Transactions</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
              />
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Transaction Type */}
              <div className="flex-1">
                <label className="block text-sm text-white/60 mb-2">Transaction Type</label>
                <div className="relative">
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="all">All</option>
                    {opTypes?.map(type => (
                      <option className='text-black' key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
              </div>

              {/* Date Range */}
              <div className="flex-1">
                <label className="block text-sm text-white/60 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={filters.start_date}
                    onChange={(e) => handleFilterChange('start_date', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                    title="Start Date"
                  />
                  <input
                    type="date"
                    value={filters.end_date}
                    onChange={(e) => handleFilterChange('end_date', e.target.value)}
                    className="w-full bg-white/10 w-full border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                    title="End Date"
                  />
                </div>
              </div>

              {/* Amount Range - Now Functional */}
              <div className="flex-1">
                <label className="block text-sm text-white/60 mb-2">Amount Range</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.min_amount}
                      onChange={(e) => handleFilterChange('min_amount', e.target.value)}
                      className={`w-full bg-white/10 border ${amountErrors.min_amount ? 'border-red-500' : 'border-white/20'
                        } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400`}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.max_amount}
                      onChange={(e) => handleFilterChange('max_amount', e.target.value)}
                      className={`w-full bg-white/10 border ${amountErrors.max_amount ? 'border-red-500' : 'border-white/20'
                        } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400`}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                {/* Amount validation errors */}
                {(amountErrors.min_amount || amountErrors.max_amount) && (
                  <div className="mt-1 space-y-1">
                    {amountErrors.min_amount && (
                      <div className="flex items-center gap-1 text-red-400 text-xs">
                        <AlertCircle size={12} />
                        <span>Min: {amountErrors.min_amount}</span>
                      </div>
                    )}
                    {amountErrors.max_amount && (
                      <div className="flex items-center gap-1 text-red-400 text-xs">
                        <AlertCircle size={12} />
                        <span>Max: {amountErrors.max_amount}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Filter Summary and Actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/60">
                {transactionData && (
                  <>
                    Showing {transactionData.data.logs.length} of {transactionData.data.total_pages * perPage} transactions
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 text-yellow-400">
                        ({activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active)
                      </span>
                    )}
                  </>
                )}
                {!filtersValid && (
                  <span className="ml-2 text-red-400">
                    (Please fix filter errors)
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
                <button
                  onClick={exportToCSV}
                  className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  disabled={!transactionData?.data.logs.length}
                >
                  Export CSV
                </button>
                <button
                  onClick={() => refetch()}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Loading spinner */}
          {logsLoading && (
            <div className="flex justify-center items-center py-8">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          )}

          {/* Error state */}
          {logsError && (
            <div className="text-center py-8">
              <p className="text-red-400 mb-2">Unable to load transactions.</p>
              <button
                onClick={() => refetch()}
                className="text-white text-sm"
              >
                Try again
              </button>
            </div>
          )}

          {/* Enhanced Transaction Table */}
          {transactionData && (
            <div className="bg-white/5 rounded-xl overflow-hidden">
              {transactionData.data.logs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-white/40 mb-2">
                    <Filter size={48} className="mx-auto mb-4" />
                  </div>
                  <p className="text-white/60 text-lg mb-2">No transactions found</p>
                  <p className="text-white/40 text-sm">Try adjusting your filters</p>
                </div>
              ) : (
                <>
                  {/* Table Header and Body */}
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm text-white">
                      {/* Table Header */}
                      <thead className="bg-white/10">
                        <tr>
                          <th className="px-4 py-2">Timestamp</th>
                          <th className="px-4 py-2">Type</th>
                          <th className="px-4 py-2">Description</th>
                          <th className="px-4 py-2">Amount</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Transaction Id</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      {/* Table Body */}
                      <tbody>
                        {transactionData.data.logs.map((tx) => {
                          const amountNum = Number(tx.change_amount);
                          const isEarn = tx.type === 'deposit';
                          const date = new Date(tx.timestamp);

                          return (
                            <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 py-2">
                                <div>{date.toLocaleDateString()}</div>
                                <div className="text-xs text-white/40">{date.toLocaleTimeString()}</div>
                              </td>
                              <td className="px-4 py-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${'bg-green-500/20 text-green-400'}`}>
                                  {tx.operational_type.name}
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                <p className="font-medium text-white truncate">{tx.description}</p>
                              </td>
                              <td className="px-4 py-2">
                                <span className={`font-bold ${isEarn ? 'text-green-400' : 'text-red-400'}`}>
                                  {isEarn ? '+' : ''}{formatNumber(amountNum)} {tx.currency}
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tx.status === 'completed' || !tx.status
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-yellow-500/20 text-yellow-400'}`}>
                                  {tx.status ? tx.status.toUpperCase() : 'PENDING'}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-white/60 text-xs">
                                {tx.transaction_id}
                              </td>
                              <td className="px-4 py-2 text-white/60 text-xs flex items-center">
                                <Eye
                                  onClick={() => handelDeatils(tx.id)}
                                  className="cursor-pointer hover:text-white transition-colors duration-200"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {transactionData && transactionData.data.total_pages > 1 && (
                    <div className="p-6 border-t border-white/10">
                      {/* Page Info */}
                      <div className="text-sm text-white/60 mb-4 text-center">
                        Page {currentPage} of {transactionData.data.total_pages}
                      </div>
                      {/* Pagination Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                              }
                            }}
                            disabled={currentPage <= 1}
                            className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
                          >
                            Previous
                          </button>

                          {/* Page Numbers */}
                          <div className="flex items-center gap-1">
                            {(() => {
                              const totalPages = transactionData.data.total_pages;
                              const maxVisiblePages = 5;
                              let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                              const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                              if (endPage - startPage + 1 < maxVisiblePages) {
                                startPage = Math.max(1, endPage - maxVisiblePages + 1);
                              }

                              const pages = [];

                              if (startPage > 1) {
                                pages.push(
                                  <button
                                    key={1}
                                    type="button"
                                    onClick={() => setCurrentPage(1)}
                                    className="px-3 py-2 rounded-lg text-sm transition-colors bg-white/10 hover:bg-white/20 text-white"
                                  >
                                    1
                                  </button>
                                );
                                if (startPage > 2) {
                                  pages.push(
                                    <span key="ellipsis1" className="px-2 text-white/60">...</span>
                                  );
                                }
                              }

                              for (let i = startPage; i <= endPage; i++) {
                                pages.push(
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => setCurrentPage(i)}
                                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${currentPage === i
                                      ? 'bg-white text-black font-medium'
                                      : 'bg-white/10 hover:bg-white/20 text-white'
                                      }`}
                                  >
                                    {i}
                                  </button>
                                );
                              }

                              if (endPage < totalPages) {
                                if (endPage < totalPages - 1) {
                                  pages.push(
                                    <span key="ellipsis2" className="px-2 text-white/60">...</span>
                                  );
                                }
                                pages.push(
                                  <button
                                    key={totalPages}
                                    type="button"
                                    onClick={() => setCurrentPage(totalPages)}
                                    className="px-3 py-2 rounded-lg text-sm transition-colors bg-white/10 hover:bg-white/20 text-white"
                                  >
                                    {totalPages}
                                  </button>
                                );
                              }

                              return pages;
                            })()}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (currentPage < transactionData.data.total_pages) {
                                setCurrentPage(currentPage + 1);
                              }
                            }}
                            disabled={currentPage >= transactionData.data.total_pages}
                            className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <TransactionDetailModal id={detail_id} open={detailPageOpen} onClose={() => setDetailPageOpen(false)} />
      </div>
    </div>
  );
};

export default Transactions;