"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarFooter from "../components/NavbarFooter";
import LoadingPage from "../components/LoadingPage";

interface UserSettings {
  username: string;
  email: string;
  specialization: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [appVersion, setAppVersion] = useState("0.6.3");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/settings");
        const settingsData = response.data.settings;
        setSettings(settingsData);
        setUsername(settingsData.username);
        setEmail(settingsData.email);
        setSpecialization(settingsData.specialization);
      } catch (error: any) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/settings", {
        username,
        email,
        specialization,
      });
      toast.success("Settings updated successfully");
    } catch (error: any) {
      toast.error("Failed to update settings");
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <NavbarFooter>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black">
        <h1 className="text-4xl text-white mb-10 font-bold">Settings</h1>
        {settings && (
          <form onSubmit={handleSave} className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
            <div className="mb-4">
              <label className="block text-white mb-2 font-medium">Username</label>
              <input
                type="text"
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2 font-medium">Email</label>
              <input
                type="email"
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2 font-medium">Specialization</label>
              <input
                type="text"
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-violet-600 text-whitse px-6 py-2 rounded-lg hover:bg-violet-700 transition duration-300 w-full font-semibold"
            >
              Save Settings
            </button>
          </form>
        )}
        <p className="mt-6 text-gray-500">App Version: {appVersion}</p>
      </div>
    </NavbarFooter>
  );
}
