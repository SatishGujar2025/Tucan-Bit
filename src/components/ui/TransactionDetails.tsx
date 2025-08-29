import React from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAppContext } from '../../context/AppContext';

import { fetchBalanceLogDetail } from '../../network/api/transactionsService';

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
}

interface TransactionDetail {
  transaction_id?: string;
  timestamp?: string;
  status?: string;
  operational_type?: { name?: string };
  component?: string;
  change_amount?: string;
  balance_after_update?: string;
  description?: string;
  operational_group_id?: string;
  type?: string;
  id?: string;
  ip?: string;
  user_agent?: string;
}

export const TransactionDetailModal: React.FC<Props> = ({ id, open, onClose }) => {
  const { accessToken } = useAppContext();
  const { data, isLoading, error } = useQuery<TransactionDetail>({
    queryKey: ['balance-log-detail', id],
    queryFn: () => {
      if (!id) throw new Error('Transaction ID missing');
      if (!accessToken) throw new Error('Access token missing');
      return fetchBalanceLogDetail(id, accessToken);
    },
    enabled: open && !!id && !!accessToken,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100">
      <div className="bg-gradient-to-br from-purple-900 to-purple-700 text-white max-w-2xl w-full p-6 rounded-xl shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Transaction Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300 absolute top-4 right-4">
            <X size={24} />
          </button>
        </div>

        {isLoading &&  <div className="flex justify-center items-center py-8">
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
            </div>}
        {error && <p className="text-red-500">Failed to load details.</p>}

        {data && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <DetailItem label="Transaction ID" value={data.transaction_id || '-'} />
            <DetailItem label="Reference" value={data.transaction_id || '-'} />
            <DetailItem label="Timestamp" value={data.timestamp ? new Date(data.timestamp).toLocaleString() : '-'} />
            <DetailItem label="Status" value={<span className="text-green-400">{data.status || 'COMPLETED'}</span>} />
            <DetailItem label="Type" value={data.operational_type?.name || 'Unknown'} />
            <DetailItem label="Category" value={data.component || '-'} />
            <DetailItem label="Amount" value={`+${parseFloat(data.change_amount || "0")} COINS`} className="text-green-400" />
            <DetailItem label="Balance After" value={`${parseFloat(data.balance_after_update || "0")} COINS`} />
            <DetailItem label="Description" value={data.description} colSpan={2} />
            <DetailItem label="Game ID" value={data.operational_group_id || '-'} />
            <DetailItem label="Game Type" value={data.type || '-'} />
            <DetailItem label="Bet ID" value={data.transaction_id || '-'} />
            <DetailItem label="Session ID" value={data.id || '-'} />
            <DetailItem label="IP Address" value={data.ip || '192.168.1.100'} />
            <DetailItem label="User Agent" value={data.user_agent || 'Mozilla/5.0...'} colSpan={2} />
          </div>
        )}
      </div>
    </div>
  );
};

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
  colSpan?: number;
  className?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, colSpan = 1, className = '' }) => {
  return (
    <div className={`col-span-${colSpan} flex flex-col ${className}`}>
      <span className="text-xs text-gray-300 mb-1 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-medium text-white break-words">{value}</span>
    </div>
  );
};
