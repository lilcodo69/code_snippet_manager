// src/context/SnippetsContext.tsx

import { createContext, useContext, type ReactNode,  } from 'react';
import { useRecentSnippets } from '../hooks/useRecentSnippets';
import { useSearchContext } from './searchBarContext';
import type { CodeSnippet } from '../type';

interface SnippetsContextType {
  snippetsToDisplay: CodeSnippet[];
  isLoading: boolean;
  error: Error | null;
  isSearchMode: boolean;
  searchQuery: string;
}

const SnippetsContext = createContext<SnippetsContextType | undefined>(undefined);

export const SnippetsProvider = ({ children }: { children: ReactNode }) => {
  const { 
    searchResults, 
    isSearching, 
    searchError, 
    isSearchMode, 
    searchQuery 
  } = useSearchContext();

  const { 
    data: recentSnippets, 
    isLoading: isRecentLoading, 
    error: recentError 
  } = useRecentSnippets(10);

  const isLoading = isSearchMode ? isSearching : isRecentLoading;
  const error = isSearchMode ? searchError : recentError;
  const snippetsToDisplay = (isSearchMode ? searchResults : recentSnippets) || [];

  const value = {
    snippetsToDisplay,
    isLoading,
    error,
    isSearchMode,
    searchQuery
  };

  return <SnippetsContext.Provider value={value}>{children}</SnippetsContext.Provider>;
};

export const useSnippets = () => {
  const context = useContext(SnippetsContext);
  if (context === undefined) {
    throw new Error('useSnippets must be used within a SnippetsProvider');
  }
  return context;
};