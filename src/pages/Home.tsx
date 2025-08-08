// pages/Home.tsx - Fixed syntax and better UX
import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { useRecentSnippets } from '../hooks/useRecentSnippets';
import RecentSnippets from '../components/snippet/RecentSnippets';
import { SnippetForm } from '../components/snippet/SnippetForm';
import {snippetTemplate} from '../components/snippet/snippetTemplate'

const Home = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { 
    data: recentSnippets, 
    isLoading: isRecentLoading, 
    error: recentError 
  } = useRecentSnippets(7);

  const { 
    data: searchResults, 
    isLoading: isSearching, 
    isError: isSearchError, 
    error: searchError 
  } = useSearch(searchQuery);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === '/' && 
        !showCreateForm && 
        event.target !== searchInputRef.current && 
        !(event.target as HTMLElement)?.tagName?.match(/INPUT|TEXTAREA|SELECT/)
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCreateForm]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isSearchMode = searchQuery.length > 0;
  const hasRecentSnippets = recentSnippets && recentSnippets.length > 0;
  const hasSearchResults = searchResults && searchResults.length > 0;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Your Code Snippets</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          + Create Snippet
        </button>
      </div>

   
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Semantically search your snippets..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-600 border border-gray-500 rounded">
                /
              </kbd>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Search
          </button>
          {isSearchMode && (
            <button
              onClick={handleClearSearch}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {isSearchMode && (
          <div>
            {isSearching && (
              <div className="text-center text-gray-400 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                Searching...
              </div>
            )}

            {isSearchError && (
              <div className="text-center text-red-500 p-4 bg-red-900 bg-opacity-20 rounded-lg">
                Error: {searchError?.message}
              </div>
            )}

            {searchResults && !isSearching && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  🔍 Search Results ({searchResults.length})
                </h3>
                {hasSearchResults ? (
                  <div className="space-y-4">

                    
                    {/* {searchResults.map(result => (
                      <div key={result.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 border-l-4 border-l-blue-500">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white text-lg">{result.title}</h4>
                          <span className="text-sm text-green-400 font-semibold">
                            {result.similarity ? `${(result.similarity * 100).toFixed(1)}% match` : ''}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Language: {result.language}</p>
                        <pre className="bg-gray-900 p-3 rounded text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                          {result.code}
                        </pre>
                        {result.description && (
                          <p className="text-gray-300 mt-2">{result.description}</p>
                        )}
                      </div>
                    ))} */}

                    <snippetTemplate/>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-800 rounded-lg">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-400 text-lg mb-2">
                      No matching snippets found for "{searchQuery}"
                    </p>
                    <p className="text-gray-500">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!isSearchMode ? (
          <RecentSnippets 
            snippets={recentSnippets}
            isLoading={isRecentLoading}
            error={recentError}
          />
        ) : hasRecentSnippets ? (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">📌 Your Recent Snippets</h3>
            <RecentSnippets 
              snippets={recentSnippets}
              isLoading={isRecentLoading}
              error={recentError}
            />
          </div>
        ) : null}

        {!hasRecentSnippets && !isRecentLoading && !recentError && !isSearchMode && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Code Snippets Yet</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Start building your personal code library! Create your first snippet to save and organize your code.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Create Your First Snippet
            </button>
          </div>
        )}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <SnippetForm onClose={() => setShowCreateForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;