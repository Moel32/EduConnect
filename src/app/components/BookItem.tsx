// components/BookItem.tsx

import React from 'react';
import { Book } from '../types/ebook';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p className="text-gray-700 mb-2">
        By {book.authors.join(', ')}
      </p>
      <p className="text-gray-700 mb-2">
        Publish Year: {book.publish_year}
      </p>
      {book.cover_image && (
        <img src={book.cover_image} alt={book.title} className="rounded-md mb-2" style={{ maxWidth: '100%', height: 'auto' }} />
      )}
      <p className="text-gray-700 mb-2">
        <em>Cover image may not be available for all books</em>
      </p>
    </div>
  );
};

export default BookItem;
