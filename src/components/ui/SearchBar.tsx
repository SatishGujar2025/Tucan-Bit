import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronDown, Filter } from 'lucide-react';

interface SearchBarProps {
  currentFilter?: string;
  onFilterChange?: (filter: string) => void;
  onSearchChange?: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  currentFilter = 'all', 
  onFilterChange, 
  onSearchChange 
}) => {
  const [activeFilter, setActiveFilter] = useState(currentFilter);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filters = [
    { id: 'all', label: 'All Games' },
    { id: 'jackpot', label: 'Jackpot Originals' },
    { id: 'new', label: 'New Games' },
    { id: 'slots', label: 'Slots' },
    { id: 'featured', label: 'Featured Games' },
    { id: 'live', label: 'Live Dealer' },
    { id: 'shows', label: 'Game Shows' },
    { id: 'table', label: 'Table Games' }
  ];

  const selectedFilter = filters.find(f => f.id === activeFilter);

  // Update local state when prop changes
  useEffect(() => {
    setActiveFilter(currentFilter);
  }, [currentFilter]);

  // Handle filter selection
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setIsFilterDropdownOpen(false);
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-4">
      {/* Search Input and Filter Dropdown Container */}
      <div className="flex items-center gap-2 mb-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Find a game"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
          />
        </div>

        {/* Mobile Filter Dropdown */}
        <div className="md:hidden relative z-[99999]" ref={dropdownRef}>
          <button
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors border border-gray-600"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">{selectedFilter?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isFilterDropdownOpen && createPortal(
            <div 
              className="fixed w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-[999999] overflow-hidden"
              style={{
                top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().bottom + 8 : 0,
                left: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().right - 192 : 0,
                zIndex: 999999
              }}
            >
              {filters.map((filter, index) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 ease-in-out hover:bg-gray-700 hover:text-white ${
                    activeFilter === filter.id
                      ? 'bg-gray-700 text-white border-l-4 border-gray-400'
                      : 'text-gray-300'
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${index === filters.length - 1 ? 'rounded-b-lg' : ''} ${
                    index !== filters.length - 1 ? 'border-b border-gray-600/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{filter.label}</span>
                    {activeFilter === filter.id && (
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>,
            document.body
          )}
        </div>
      </div>

      {/* Desktop Filter Buttons - Hidden on Mobile */}
      <div className="hidden md:flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeFilter === filter.id
                ? 'bg-gray-700 text-white border border-gray-600'
                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;