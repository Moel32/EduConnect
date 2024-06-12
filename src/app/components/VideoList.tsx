import React from 'react';
import VideoItem from './VideoItem';

interface VideoListProps {
    videos: any[];
    onVideoSelect: (video: any) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect }) => {
    const renderedList = videos.map((video) => {
        if (video.id.kind === "youtube#video") {
            return (
                <VideoItem 
                    onVideoSelect={onVideoSelect} 
                    key={video.etag} 
                    video={video} 
                />
            );
        }
        return null;
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderedList}
        </div>
    );
};

export default VideoList;
