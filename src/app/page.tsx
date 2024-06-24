"use client";
import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import NavbarFooter from "./components/NavbarFooter";
import { useRouter } from 'next/navigation';
import LoadingPage from './components/LoadingPage';
import axios from 'axios';
import CircularProgress from './components/CircularProgress';
import Slideshow from './components/SlideShow';
import VideoItem from './components/VideoItem';
import VideoPreview from './components/VideoPreview'; // Import VideoPreview component

const LazyCommentSection = dynamic(() => import('./components/CommentSection'), {
    suspense: true,
});

interface User {
    _id: string;
    username: string;
    email: string;
    specialization: string;
    avatar?: string;
    isVerified: boolean;
}

function Home() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [latestScore, setLatestScore] = useState<{ score: number, totalQuestions: number } | null>(null);
    const [favoriteVideos, setFavoriteVideos] = useState<any[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<any | null>(null); // Add state for selected video
    const router = useRouter();
    const [isParagraphVisible, setIsParagraphVisible] = useState(false);

    const handleSubmit = async () => {
        try {
            await axios.post('/api/comments', { message: comment, username: user?.username });
            setSuccessMessage('Comment submitted successfully');
            setComment('');
        } catch (error) {
            console.error('Error submitting comment', error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/profile');
                setUser(response.data.user);
                if (!localStorage.getItem('welcomeMessagePlayed')) {
                    playWelcomeMessage(response.data.user.username);
                    localStorage.setItem('welcomeMessagePlayed', 'true');
                }
            } catch (error) {
                console.error("Error fetching user", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        const savedScore = localStorage.getItem('latestQuizScore');
        if (savedScore) {
            setLatestScore(JSON.parse(savedScore));
        }

        const savedFavorites = JSON.parse(localStorage.getItem('favoriteVideos') || '[]');
        setFavoriteVideos(savedFavorites);

        setTimeout(() => {
            setIsParagraphVisible(true);
        }, 2000);
    }, []);

    const playWelcomeMessage = (username: string) => {
        const message = `Welcome to EduConnect, ${username}`;
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
    };

    const handleFavoriteVideoClick = (video: any) => {
        setSelectedVideo(video); // Set selected video to play it
    };

    return (
        <NavbarFooter>
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8 text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block py-1 px-2 rounded-lg">
                        Welcome to EduConnect, {user && user.username}!
                    </h1>
                    {isParagraphVisible && (
                        <p className="text-xl mb-8 mx-auto text-center max-w-2xl text-gray-100">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block py-1 px-2 rounded-lg text-white font-bold mr-2">
                                EduConnect
                            </span>
                            is a platform designed to help students study efficiently with the available resources it offers. Dive into a plethora of engaging video resources, participate in quizzes, utilize flashcards, and plan your studies with our AI Study Planner.
                        </p>
                    )}

                    <Slideshow />

                    {favoriteVideos.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-4 text-white relative">
                                <span className="inline-block border-b-4 border-white pb-1">
                                    <span className="highlighted-animation text-yellow-500">Your Favorite Videos</span>
                                </span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {favoriteVideos.map((video: any) => (
                                    <div
                                        key={video.id.videoId}
                                        className="cursor-pointer"
                                        onClick={() => handleFavoriteVideoClick(video)}
                                    >
                                        <VideoItem video={video} onVideoSelect={() => { }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedVideo && (
                        <div className="mt-8">
                            <VideoPreview vid={selectedVideo} />
                        </div>
                    )}

                    <p className="text-xl mb-8 mx-auto text-center max-w-2xl text-gray-100">
                        Mark videos as favorites to easily access them here. If you want more videos, use the button below to explore more video resources.
                    </p>

                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <div className="text-center">
                            <button
                                className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-green-200 transition duration-300 text-white font-bold text-lg"
                                onClick={() => router.push("/ebook-resources")}
                            >
                                <i className="fas fa-book mb-2"></i>
                            </button>
                            <p className="text-gray-100">
                                Access a wide range of free PDFs and eBooks.
                            </p>
                        </div>
                        <div className="text-center">
                            <button
                                className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-blue-200 transition duration-300 text-white font-bold text-lg"
                                onClick={() => router.push("/video-resources")}
                            >
                                <i className="fas fa-video mb-2"></i>
                            </button>
                            <p className="text-gray-100">
                                Explore a variety of educational videos.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-4 text-white relative">
                        <span className="inline-block border-b-4 border-white pb-1">
                            <span className="highlighted-animation text-yellow-500">Your Last Quiz Score</span>
                        </span>
                    </h2>
                    {latestScore && (
                        <CircularProgress score={latestScore.score} totalQuestions={latestScore.totalQuestions} />
                    )}
                </div>

                <Suspense fallback={<LoadingPage />}>
                    <LazyCommentSection
                        comment={comment}
                        setComment={setComment}
                        handleSubmit={handleSubmit}
                        successMessage={successMessage}
                    />
                </Suspense>
            </div>
        </NavbarFooter>
    );
}

export default Home;
