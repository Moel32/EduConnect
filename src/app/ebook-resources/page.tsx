"use client";

// pages/ebooks.tsx

import React, { useState, useEffect } from 'react';
import NavbarFooter from '../components/NavbarFooter';
import axios from 'axios';
import LoadingPage from '../components/LoadingPage';
import BookList from '../components/BookList';
import AnimatedMessage from '../components/AnimatedMessage';
import { Book } from '../types/ebook';

const EbookResources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [randomBooks, setRandomBooks] = useState<Book[]>([]);

  // Function to fetch random books from the API
  const fetchRandomBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Book[]>('/api/random-ebooks?category=programming');
      setRandomBooks(response.data);
    } catch (error) {
      console.error('Error fetching random books', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search by query
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Book[]>(`/api/ebooks?q=${searchQuery}`);
      // Filter out books that are not downloadable
      const downloadableBooks = response.data.filter(book => !!book.ia);
      setSearchResults(downloadableBooks);
    } catch (error) {
      console.error('Error fetching eBooks', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  return (
    <NavbarFooter>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-white">EBooks Library</h1>
          <AnimatedMessage />
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
          {!loading && searchQuery ? (
            <BookList books={searchResults} />
          ) : (
            <BookList books={randomBooks} />
          )}
        </div>
      </div>
    </NavbarFooter>
  );
};

export default EbookResources;
