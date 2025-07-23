
import React, { useState } from 'react'; 
import SnippetList from "../components/SnippetList";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
       <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-white mb-6">Your Code Snippets</h2>

            {/* 2. Add the search input field */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Semantically search your snippets..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* We will pass the searchQuery to SnippetList later */}
            <SnippetList />
      
        </div>
    )
}

export default Home;