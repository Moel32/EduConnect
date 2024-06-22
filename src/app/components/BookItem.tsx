// components/BookItem.tsx

import React from 'react';
import { Book } from '../types/ebook';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const handleDownload = () => {
    window.open(`https://archive.org/details/${book.ia}`, '_blank');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p className="text-gray-700 mb-2">
        By {book.authors.join(', ')}
      </p>
      <p className="text-gray-700 mb-2">
        Publish Year: {book.publish_year}
      </p>
      <button
        onClick={handleDownload}
        className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-700 focus:outline-none"
      >
        Download
      </button>
    </div>
  );
};

export default BookItem;
