import React from 'react';
import { Book } from '../types/ebook';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const handlePreview = () => {
    if (book.preview_link) {
      // Open the preview link in a new tab or window
      window.open(book.preview_link, '_blank');
    } else {
      alert('Preview not available for this book.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 mx-2">
      <div className="flex flex-col lg:flex-row">
        {book.cover_image && (
          <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-6">
            <img
              src={book.cover_image}
              alt={book.title}
              className="rounded-md"
              style={{ maxWidth: '150px', height: 'auto' }}
            />
          </div>
        )}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-2">
              By {book.authors.join(', ')}
            </p>
            <p className="text-gray-700 mb-4">
              Publish Year: {book.publish_year}
            </p>
            <p className="text-gray-700 mb-4">
              {book.description}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center">
            <div className="flex space-x-4 mb-4 lg:mb-0">
              {book.preview_link && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={handlePreview}
                >
                  Preview
                </button>
              )}
              {/* Optional: Download button logic if needed */}
              {/* {book.ia && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                  onClick={handleDownload}
                >
                  Download
                </button>
              )} */}
            </div>
            <p className="text-gray-500">
              <em>Cover image may not be available for all books</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
