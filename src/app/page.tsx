"use client";
import React, { useState, useEffect, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import NavbarFooter from "./components/NavbarFooter";
import { useRouter } from 'next/navigation';
import LoadingPage from './components/LoadingPage';
import axios from 'axios';
import CircularProgress from './components/CircularProgress'; // Adjust the path as necessary
import Slideshow from './components/SlideShow'; // Import the Slideshow component

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

        // Delay showing the paragraph to avoid it being LCP
        setTimeout(() => {
            setIsParagraphVisible(true);
        }, 2000); // Adjust timing as needed
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <NavbarFooter>
            <div className="container mx-auto px-4 py-12">
                {/* Main content */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8">Welcome to EduConnect, {user && user.username}!</h1>
                    {isParagraphVisible && (
                        <p className="text-lg mb-8 mx-auto text-center max-w-2xl">
                            EduConnect is a platform designed to help students study efficiently with the available resources it offers. Dive into a plethora of engaging video resources, participate in quizzes, utilize flashcards, and plan your studies with our AI Study Planner.
                        </p>
                    )}

                    {/* Slideshow */}
                     <Slideshow />
                     <div>
                        <button className="w-60 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer hover:bg-purple-200 transition duration-300 text-white font-bold italic text-xl" onClick={() => router.push("/video-resources")}>
                            Explore Video Resources
                        </button>
                     </div>
                    
                    {latestScore && (
                        <CircularProgress score={latestScore.score} totalQuestions={latestScore.totalQuestions} />
                    )}
                </div>

                {/* Lazy loaded Comment section */}
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
