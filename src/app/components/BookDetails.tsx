import React from 'react';
import { isEmpty, truncate, languages } from '../utils/bookLang';
import BookMeta from './BookMeta';
import BookRating from './BookRating';
import Loading from './LoadingPage';
import Moment from 'react-moment';

interface BookDetailsProps {
    data: {
        volumeInfo: {
            title: string;
            authors?: string[];
            description?: string;
            imageLinks?: { thumbnail: string } | null; // Update this line
            averageRating?: number;
            ratingsCount?: number;
            publishedDate?: string;
            pageCount?: number;
            categories?: string[];
            language?: string;
        };
        accessInfo: {
            pdf?: { isAvailable: boolean, acsTokenLink: string };
            webReaderLink?: string;
        };
    } | null;
}

const BookDetails: React.FC<BookDetailsProps> = ({ data }) => {
    if (!data) return <Loading />; // Check if data is null

    const { volumeInfo, accessInfo } = data!;
    const {
        title, authors, description, imageLinks, averageRating, ratingsCount, publishedDate, pageCount, categories, language
    } = volumeInfo;
    const { pdf, webReaderLink } = accessInfo;

    return (
        <article className="bg-white shadow-md rounded-lg p-6">
            <div className="md:flex">
                <div className="md:w-1/3">
                    <img src={imageLinks?.thumbnail || '/static/empty-cover.jpeg'} alt={title} className="w-full rounded-lg" />
                    <BookRating rating={averageRating || 0} count={ratingsCount || 0} />
                </div>
                <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold mb-2">
                        {title}
                        {publishedDate && <span className="text-gray-500"> – <Moment date={publishedDate} format="YYYY" /></span>}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {authors && authors.length > 0 && <BookMeta name="Author" value={authors.join(', ')} />}
                        {pageCount && <BookMeta name="Page number" value={pageCount.toString()} />}
                        {categories && <BookMeta name="Category" value={categories.join(', ')} />}
                        {language && <BookMeta name="Language" value={languages.find(item => item.code === language)?.name || language} />}
                    </div>
                    {description && <p className="mb-4">{truncate(description, 500).replace(/<[^>]+>/g, '')}</p>}
                    <div>
                        {webReaderLink && <a href={webReaderLink} target="_blank" rel="noopener noreferrer" className="btn btn-success mr-3">Read Now</a>}
                        {pdf?.isAvailable && <a href={pdf.acsTokenLink} target="_blank" rel="noopener noreferrer" className="btn btn-danger">Download PDF</a>}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BookDetails;
