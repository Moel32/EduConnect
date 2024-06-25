// components/BookList.tsx

import React from 'react';
import { Book } from '../types/ebook';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  console.log('Books received:', books);

  if (!books.length) {
    return <p className="text-gray-100">No books found.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {books.map((book) => (
        <div key={book.key} className="p-2 md:p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <BookItem book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookList;
