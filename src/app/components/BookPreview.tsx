// components/BookPreview.tsx

import React from 'react';
import { Book } from '../types/ebook';

interface BookPreviewProps {
  book: Book;
}

const BookPreview: React.FC<BookPreviewProps> = ({ book }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 flex">
      {book.cover_image && (
        <img
          src={book.cover_image}
          alt={`${book.title} cover`}
          className="w-32 h-48 object-cover mr-4"
        />
      )}
      <div>
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-2">
          By {book.authors.join(', ')}
        </p>
        <p className="text-gray-700 mb-2">
          Publish Year: {book.publish_year}
        </p>
        <p className="text-gray-700 mb-2">
          Internet Archive ID: {book.ia}
        </p>
      </div>
    </div>
  );
};

export default BookPreview;
