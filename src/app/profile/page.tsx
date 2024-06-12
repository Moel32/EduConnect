"use client";

// /src/pages/profile.tsx
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NavbarFooter from "../components/NavbarFooter";
import LoadingPage from "../components/LoadingPage";

interface User {
    _id: string;
    username: string;
    email: string;
    specialization: string;
    avatar?: string;
    isVerified: boolean;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("/api/profile");
                setUser(response.data.user);
            } catch (error: any) {
                setError(true);
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <LoadingPage />; // Use loading component
    if (error) return <div className="flex items-center justify-center min-h-screen text-black font-bold">Error loading profile</div>; // Make error message bold

    return (
        <NavbarFooter>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black">
                <h1 className="text-4xl text-white mb-2 font-bold">Profile Information</h1>
                {user && (
                    <div className="p-4 bg-white shadow-md rounded-lg w-full max-w-md">
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.username}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Specialization</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.specialization}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Verified</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.isVerified ? "Yes" : "No"}</p>
                        </div>
                        <Link href="/edit-profile" className="text-blue-500">Edit Profile</Link>
                    </div>
                )}
            </div>
        </NavbarFooter>
    );
}
