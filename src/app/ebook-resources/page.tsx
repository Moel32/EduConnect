"use client";
// pages/ebooks.tsx

import React, { useState } from 'react';
import NavbarFooter from '../components/NavbarFooter';
import axios from 'axios';
import LoadingPage from '../components/LoadingPage';
import BookList from '../components/BookList';
import AnimatedMessage from '../components/AnimatedMessage'; // Import AnimatedMessage component
import { Book } from '../types/ebook';

const EbookResources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Book[]>(`/api/books?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching eBooks', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavbarFooter>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-white">EBooks Library</h1>
          <AnimatedMessage /> {/* Display animated message */}
          <input
            type="text"
            className="w-full p-4 mb-4 text-gray-700 rounded-md"
            placeholder="Search for programming subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="w-60 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer hover:bg-blue-200 transition duration-300 text-white font-bold italic text-xl"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </button>
          {loading && <LoadingPage />}
          {!loading && <BookList books={searchResults} />}
        </div>
      </div>
    </NavbarFooter>
  );
};

export default EbookResources;
