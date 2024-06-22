// components/BookList.tsx

import React from 'react';
import BookItem from './BookItem';
import { Book } from '../types/ebook';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (!Array.isArray(books) || books.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-700">
        {books === null ? (
          <p>No books found. Please refine your search.</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookItem key={book.key} book={book} />
      ))}
    </div>
  );
};

export default BookList;
