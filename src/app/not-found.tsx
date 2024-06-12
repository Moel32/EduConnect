import React from 'react';
import Link from 'next/link';

export default async function NotFound() {const Custom404: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-8">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
            <Link href="/" className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
                Go Back Home 
            </Link>
        </div>
    );
};
}