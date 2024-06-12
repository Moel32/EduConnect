import React from 'react';

interface BookMetaProps {
    name: string;
    value: string;
}

const BookMeta: React.FC<BookMetaProps> = ({ name, value }) => {
    return (
        <div className="mb-4">
            <h6 className="font-bold">{name}</h6>
            <p className="text-gray-700">{value}</p>
        </div>
    );
};

export default BookMeta;
