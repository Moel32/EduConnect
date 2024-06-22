"use client";
import React, { useState, useEffect } from 'react';

interface VideoPreviewProps {
    vid: {
        id: { videoId: string };
        snippet: {
            title: string;
            description: string;
            thumbnails: { high: { url: string } };
            channelTitle: string;
        };
    };
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ vid }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoriteVideos = JSON.parse(localStorage.getItem('favoriteVideos') || '[]');
        const isFav = favoriteVideos.some((video: any) => video.id.videoId === vid.id.videoId);
        setIsFavorite(isFav);
    }, [vid.id.videoId]);

    const handleFavorite = () => {
        const favoriteVideos = JSON.parse(localStorage.getItem('favoriteVideos') || '[]');
        if (isFavorite) {
            const updatedFavorites = favoriteVideos.filter((video: any) => video.id.videoId !== vid.id.videoId);
            localStorage.setItem('favoriteVideos', JSON.stringify(updatedFavorites));
        } else {
            favoriteVideos.push(vid);
            localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="mb-8">
            <div className="w-full aspect-w-16 aspect-h-9">
                <iframe
                    src={`https://www.youtube.com/embed/${vid.id.videoId}`}
                    className="w-full h-full"
                    allowFullScreen
                    title={vid.snippet.title}
                />
            </div>
            <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
                <h4 className="text-2xl font-bold line-clamp-2">
                    {vid.snippet.title}
                </h4>
                <span className="text-sm text-gray-500">
                    {vid.snippet.channelTitle}
                </span>
                <p className="mt-2 text-gray-600 line-clamp-3">
                    {vid.snippet.description}
                </p>
                <button
                    className={`mt-4 py-2 px-4 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'} transition duration-300`}
                    onClick={handleFavorite}
                >
                    {isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>
            </div>
        </div>
    );
};

export default VideoPreview;
