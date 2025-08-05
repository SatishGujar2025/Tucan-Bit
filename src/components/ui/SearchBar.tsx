import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="mb-8">
      <div className="relative max-w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Find a game"
          className="w-full bg-gray-800 border border-gray-700  rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default SearchBar;