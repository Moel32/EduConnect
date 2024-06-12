import React from 'react';

interface VideoItemProps {
    video: {
        id: { videoId: string };
        snippet: {
            title: string;
            description: string;
            thumbnails: { medium: { url: string } };
            channelTitle: string;
        };
    };
    onVideoSelect: (video: any) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, onVideoSelect }) => {
    return (
        <div
            className="flex flex-col md:flex-row p-4 border rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
            onClick={() => onVideoSelect(video)}
        >
            <img 
                src={video.snippet.thumbnails.medium.url} 
                className="w-full md:w-48 h-auto rounded-md" 
                alt="Video thumbnail"
            />
            <div className="mt-2 md:mt-0 md:ml-4 flex flex-col justify-between">
                <div className="font-bold text-lg line-clamp-2">
                    {video.snippet.title}
                </div>
                <span className="text-sm text-gray-500">
                    {video.snippet.channelTitle}
                </span>
                <p className="text-gray-600 mt-2 line-clamp-3">
                    {video.snippet.description}
                </p>
            </div>
        </div>
    );
};

export default VideoItem;
