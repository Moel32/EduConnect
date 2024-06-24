import React, { useState, useEffect } from 'react';
import { faHeart, faComments, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

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
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | ''>(0);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteVideos') || '[]');
        const isFavorited = savedFavorites.some((video: any) => video.id.videoId === vid.id.videoId);
        setIsFavorite(isFavorited);
    }, [vid]);

    const handleFavorite = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteVideos') || '[]');
        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = savedFavorites.filter((video: any) => video.id.videoId !== vid.id.videoId);
        } else {
            updatedFavorites = [...savedFavorites, vid];
        }
        localStorage.setItem('favoriteVideos', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    const handleSubmitFeedback = async () => {
        try {
            if (!rating) {
                toast.error('Please provide a rating.');
                return;
            }

            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videoId: vid.id.videoId,
                    rating,
                    comment,
                }),
            });

            if (response.ok) {
                toast.success('Feedback submitted successfully');
                setComment('');
                setRating(0);
            } else {
                const errorData = await response.json();
                console.error('Failed to submit feedback:', errorData.error);
                toast.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Error submitting feedback');
        }
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
                <h4 className="text-2xl font-bold line-clamp-2">{vid.snippet.title}</h4>
                <span className="text-sm text-gray-500">{vid.snippet.channelTitle}</span>
                <p className="mt-2 text-gray-600 line-clamp-3">{vid.snippet.description}</p>
                <div className="mt-4 flex items-center">
                    <button
                        className={`flex items-center space-x-1 text-gray-500 focus:outline-none ${isFavorite ? 'text-red-500' : ''}`}
                        onClick={handleFavorite}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Favorite</span>
                    </button>
                    <button
                        className="ml-4 flex items-center space-x-1 text-gray-500 focus:outline-none"
                        onClick={handleSubmitFeedback}
                    >
                        <FontAwesomeIcon icon={faComments} />
                        <span>Submit Feedback</span>
                    </button>
                </div>
                <textarea
                    className="mt-4 p-2 border rounded w-full text-black"
                    rows={4}
                    placeholder="Enter your feedback..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex items-center mt-2">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
                    <input
                        type="number"
                        className="p-2 border rounded w-20 text-black"
                        placeholder="Rating (1-5)"
                        min={1}
                        max={5}
                        value={rating === 0 ? '' : rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                    />
                    <span className="ml-2 text-gray-500">1 (lowest) - 5 (highest)</span>
                </div>
            </div>
        </div>
    );
};

export default VideoPreview;
