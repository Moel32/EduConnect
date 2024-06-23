"use client";

// /src/pages/profile.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NavbarFooter from "../components/NavbarFooter";
import LoadingPage from "../components/LoadingPage";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface User {
    _id: string;
    username: string;
    email: string;
    specialization: string;
    avatar?: string;
    isVerified: boolean;
}

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("/api/profile");
                setUser(response.data.user);
                setSelectedAvatar(response.data.user.avatar || "");
            } catch (error: any) {
                setError(true);
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleAvatarChange = async (avatar: string) => {
        try {
            await axios.put("/api/avatar", { avatar });
            setSelectedAvatar(avatar);
            toast.success("Avatar updated successfully");
        } catch (error) {
            toast.error("Failed to update avatar");
        }
    };

    if (loading) return <LoadingPage />; // Use loading component
    if (error) return <div className="flex items-center justify-center min-h-screen text-black font-bold">Error loading profile</div>; // Make error message bold

    return (
        <NavbarFooter>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black">
                <h1 className="text-4xl text-white mb-6 font-bold">Profile Information</h1>
                {user && (
                    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
                        <div className="flex flex-col items-center mb-4">
                            <label className="block text-gray-700 mb-2">Profile Picture</label>
                            <div className="flex space-x-4 mb-4">
                                <Image
                                    src="/images/avatar1.webp"
                                    alt="Avatar 1"
                                    width={50}
                                    height={50}
                                    className={`cursor-pointer rounded-full border-2 ${selectedAvatar === "/images/avatar1.png" ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={() => handleAvatarChange("/images/avatar1.png")}
                                />
                                <Image
                                    src="/images/avatar2.webp"
                                    alt="Avatar 2"
                                    width={50}
                                    height={50}
                                    className={`cursor-pointer rounded-full border-2 ${selectedAvatar === "/images/avatar2.png" ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={() => handleAvatarChange("/images/avatar2.png")}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.username}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Specialization</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.specialization}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Verified</label>
                            <p className="px-3 py-2 bg-gray-100 rounded">{user.isVerified ? "Yes" : "No"}</p>
                        </div>
                        <button
                            className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition duration-300"
                            onClick={() => router.push("/edit-profile")}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </NavbarFooter>
    );
};

export default ProfilePage;
