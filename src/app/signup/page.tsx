"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import InternetCheckComponent from "../components/InternetCheck"; // Adjust the import path as necessary
import Image from "next/image";
import logoImage from '../../../public/images/EduConnectAppIcon3.webp'; // Adjust the path to your logo image

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
        specialization: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white py-2">
            <InternetCheckComponent />
            <div className="relative p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-auto">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                        <Image src={logoImage} alt="Logo" fill style={{objectFit:"cover"}} aria-label="SignUp Image"/>
                    </div>
                </div>
                <div className="pt-12">
                    <h1 className="text-3xl font-bold mb-4 text-center">{loading ? "Processing" : "Signup"}</h1>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold">Username</label>
                            <input
                                className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                                id="username"
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="specialization" className="block text-gray-700 text-sm font-bold">Current Specialization</label>
                            <input
                                className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                                id="specialization"
                                type="text"
                                value={user.specialization}
                                onChange={(e) => setUser({ ...user, specialization: e.target.value })}
                                placeholder="Specialization"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold">Email</label>
                            <input
                                className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold">Password</label>
                            <input
                                className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="Password"
                            />
                        </div>
                    </form>
                    <button
                        className={`h-10 w-full mt-4 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={onSignup}
                        disabled={buttonDisabled}
                    >
                        {loading ? "Loading..." : "Signup"}
                    </button>
                    <p className="mt-4 text-center text-sm">
                        Already have an account? <Link href="/login" className="text-indigo-500">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
