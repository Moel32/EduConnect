import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface BookRatingProps {
    rating: number;
    count: number;
}

const RatingStars: React.FC = () => {
    let starItems = [];
    for (let i = 0; i < 5; i++) {
        starItems.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
    return <>{starItems}</>;
};

const BookRating: React.FC<BookRatingProps> = ({ rating, count }) => {
    let divWidth = 0;
    if (rating > 0 && rating !== undefined) {
        divWidth = rating * 20.4;
    }

    return (
        <div className="mt-4">
            <p className="text-lg">
                {rating > 0 && rating !== undefined ? rating : 0}
                <span className="text-sm text-gray-500"> – {count > 0 && count !== undefined ? count : 0} ratings</span>
            </p>
            <div className="relative">
                <div className="absolute top-0 left-0 w-full text-gray-400">
                    <RatingStars />
                </div>
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${divWidth}%` }}>
                    <div className="text-yellow-400">
                        <RatingStars />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookRating;
