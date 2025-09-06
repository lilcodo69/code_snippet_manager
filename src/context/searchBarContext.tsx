import  { createContext, useState, useContext,type ReactNode } from 'react';
import { useSearch } from '../hooks/useSearch'; 
import type { SnippetSearchResult } from '../type';



interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SnippetSearchResult[] | undefined;
  isSearching: boolean;
  isSearchError: boolean;
  searchError: Error | null;
  clearSearch: () => void;
  isSearchMode:boolean;
  setSearchMode:(isSearchMode:boolean)=>void;
 
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchMode,setSearchMode]= useState(false);



  const {
    data: searchResults,
    isLoading: isSearching,
    isError: isSearchError,
    error: searchError
  } = useSearch(searchQuery);

  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchMode(false);
    
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    isSearchError,
    searchError,
    clearSearch,
    isSearchMode,
    setSearchMode
  };


  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};