// /src/pages/edit-profile.tsx
"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        const userData = response.data.user;
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setSpecialization(userData.specialization);
      } catch (error: any) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/profile", {
        username,
        email,
        specialization,
      });
      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch (error: any) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <NavbarFooter>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black">
        <h1 className="text-4xl text-white mb-2 font-bold">Edit Profile</h1>
        {user && (
          <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="px-3 py-2 bg-gray-100 rounded w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="px-3 py-2 bg-gray-100 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Specialization</label>
              <input
                type="text"
                className="px-3 py-2 bg-gray-100 rounded w-full"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </NavbarFooter>
  );
}
