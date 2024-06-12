"use client";

import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import youtube from "../api/video-resources/route";
import NavbarFooter from '../components/NavbarFooter';
import VideoList from "../components/VideoList";
import VideoPreview from '../components/VideoPreview';
import LoadingPage from '../components/LoadingPage'; // Import the LoadingPage component

interface Video {
    id: {
        videoId: string;
        kind: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium: { url: string };
            high: { url: string };
        };
        channelTitle: string;
    };
    etag: string;
}

const VideosPage: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(false);

    const onQuerySubmit = async (query: string) => {
        setLoading(true);
        const res = await youtube.get("/search", {
            params: { q: query }
        });
        setVideos(res.data.items);
        setSelectedVideo(null);
        setLoading(false);
    };

    const onVideoSelect = (video: Video) => {
        setSelectedVideo(video);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <NavbarFooter>
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-8">Video Resources</h1>
                    <p className="text-lg mb-8 mx-auto text-center">Search for videos that can help you in your programming journey. For now, the search is limited to some programming queries.</p>
                </div>
                <SearchBar onQuerySubmit={onQuerySubmit} />
                <span>Got {videos.length} videos</span>
                {selectedVideo && <VideoPreview vid={selectedVideo} />}
                <VideoList onVideoSelect={onVideoSelect} videos={videos} />
            </div>
        </NavbarFooter>
    );
};

export default VideosPage;
