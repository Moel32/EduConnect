import React, { useState } from 'react';

interface SearchBarProps {
    onQuerySubmit: (query: string) => void;
}

const programmingKeywords = ["programming", "code", "coding", "development", "software", "javascript", "python", "java", "c++", "c#", "ruby", "html", "css", "web development", "kotlin", "react js", "react native", "next js", "vue js", "mobile"];

const SearchBar: React.FC<SearchBarProps> = ({ onQuerySubmit }) => {
    const [query, setQuery] = useState<string>("");
    const [error, setError] = useState<string>("");

    const onSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isValidQuery(query)) {
            onQuerySubmit(query);
            setError("");
        } else {
            setError("Please enter a programming-related query.");
        }
    };

    const isValidQuery = (query: string) => {
        return programmingKeywords.some(keyword => query.toLowerCase().includes(keyword));
    };

    return (
        <div className="mb-8">
            <form onSubmit={onSearchSubmit} className="w-full max-w-lg mx-auto">
                <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Search Video"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="submit"
                    >
                        Search
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default SearchBar;
