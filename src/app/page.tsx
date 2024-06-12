"use client";
import React, { useState, useEffect, lazy, Suspense } from 'react';
import NavbarFooter from "./components/NavbarFooter";
import { useRouter } from 'next/navigation';
import LoadingPage from './components/LoadingPage';
import axios from 'axios';


const LazyCommentSection = lazy(() => import('./components/CommentSection'));

// Define the User interface
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
    const [user, setUser] = useState<User | null>(null); // Provide the User interface or type here
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

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
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <NavbarFooter>
            <div className="container mx-auto px-4 py-12">
                {/* Main content */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-8">Welcome to EduConnect, {user && user.username}!</h1>
                    <p className="text-lg mb-8 mx-auto text-center">EduConnect is a platform designed to help students study efficiently with the available resources it offers you. Below are features that would assist you during your self-studying.</p>
                    <h2 className="text-center text-3xl font-bold mb-8 underline decoration-4 decoration-dotted decoration-yellow-500">Features</h2>
                </div>

                {/* Features */}
                <div className="flex flex-wrap justify-center mt-12 mb-16">
                    <div className="m-4 relative">
                        <button className="w-40 h-40 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition duration-300 text-white font-bold italic" onClick={() => router.push("/video-resources")}>
                            Video Resources
                        </button>
                    </div>
                    <div className="m-4 relative">
                        <button className="w-40 h-40 bg-green-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition duration-300 text-white font-bold italic" onClick={() => router.push("/quizzes")}>
                            Quiz
                        </button>
                    </div>
                    <div className="m-4 relative">
                        <button className="w-40 h-40 bg-red-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition duration-300 text-white font-bold italic" onClick={() => router.push("/flashcards")}>
                            Flashcards
                        </button>
                    </div>
                    <div className="m-4 relative">
                        <button className="w-40 h-40 bg-orange-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition duration-300 text-white font-bold italic" onClick={() => router.push("/study-planner")}>
                            AI Study Planner
                        </button>
                    </div>
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
};

export default Home;
