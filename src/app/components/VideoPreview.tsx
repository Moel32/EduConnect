import React from 'react';

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
    return (
        <div className="mb-8">
            <div className="w-full aspect-w-16 aspect-h-9">
                <iframe
                    src={`https://youtube.com/embed/${vid.id.videoId}`}
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
            </div>
        </div>
    );
};

export default VideoPreview;
