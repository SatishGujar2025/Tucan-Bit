import { FC } from 'react';

export const PzButton: FC<{
  type?: 'primary' | 'secondary';
  text: string;
  isDisabled?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ type = 'primary', text, isDisabled, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full uppercase text-white font-[Anton] py-3 rounded-xl text-xl transition-colors ${className} ${
      type === 'primary'
        ? 'bg-[#ED0CFF] hover:bg-[#d30ae0]'
        : 'bg-gray-700 hover:bg-gray-600'
    } ${
      isDisabled
        ? 'bg-gray-600 cursor-not-allowed hover:bg-gray-600'
        : 'transition-colors'
    }`}
    disabled={isDisabled}
  >
    {text}
  </button>
);
