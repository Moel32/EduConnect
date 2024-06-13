"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import InternetCheckComponent from "../components/InternetCheck"; // Adjust the import path as necessary

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center py-2" style={{ backgroundImage: "url('images/login.webp')" }}>
            <InternetCheckComponent />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">{loading ? "Processing" : "Login"}</h1>
                <hr className="mb-4" />
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm">Email</label>
                        <input
                            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm">Password</label>
                        <input
                            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
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
                    onClick={onLogin}
                    disabled={buttonDisabled}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                <p className="text-sm mt-4 text-center">
                    Don&apos;t have an account? <Link href="/signup" className="text-indigo-500">Register here</Link>
                </p>
            </div>
        </div>
    );
}
