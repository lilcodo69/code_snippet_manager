import React, { useState, useRef, useEffect } from 'react';
import { useSearchContext } from '../context/searchBarContext';

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchQuery, clearSearch, searchQuery,setSearchMode } = useSearchContext();
  const searchInputRef = useRef<HTMLInputElement>(null);
     
  useEffect(() => {
    if (!searchQuery) {
      setInputValue('');
    }
  }, [searchQuery]);

  const handleSearch = () => {
    console.log("search Input",inputValue);
    
    if (inputValue.trim()) {
      setSearchQuery(inputValue.trim());
    setSearchMode(true);
     
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    setSearchMode(true);

    }
   
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <div className="flex flex-1 justify-center items-center gap-2">
        <div className="relative w-full max-w-xl">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search snippets..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <div className="px-[0.6rem] py-1 text-xs font-semibold text-gray-400 bg-gray-600 rounded border border-gray-500">
                  /
                </div>
            </div>
        </div>
        <button
            onClick={handleSearch}
            disabled={!inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white px-5 py-2 rounded-md font-semibold transition-colors"
        >
            Search
        </button>
        {searchQuery && (
            <button
                onClick={clearSearch}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
            >
                Clear
            </button>
        )}
    </div>
  );
};