
import React, { useState } from 'react';
import { useSearch } from '../hooks/useSearch';   

import SnippetList from "../components/SnippetList";


const Home = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

   
    const { data: searchResults, isLoading: isSearching, isError, error } = useSearch(searchQuery);

    return (
       <div className="container mx-auto p-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-6">Your Code Snippets</h2>

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Semantically search your snippets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                {isSearching && <div className="text-center text-gray-400 mt-4">Searching...</div>}

                {isError && <div className="text-center text-red-500 mt-4">Error: {error.message}</div>}

                {searchQuery.trim().length > 0 && searchResults && !isSearching && (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Search Results</h3>
                        {searchResults.length > 0 ? (
                            searchResults.map(result => (
                                <div key={result.id} className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700">
                                    <h4 className="font-bold text-white text-lg">{result.title}</h4>
                                    <p className="text-sm text-green-400 mb-2">Similarity: {(result.similarity * 100).toFixed(2)}%</p>
                                    <pre className="bg-gray-900 p-3 rounded mt-2 text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">{result.code}</pre>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center mt-4">No matching snippets found.</p>
                        )}
                    </div>
                )}

                {!searchQuery.trim() && (
                    <div>
                         <h3 className="text-2xl font-bold text-white mb-4">All Snippets</h3>
                        <SnippetList />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;