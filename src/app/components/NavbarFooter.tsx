"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Notifications from "../components/Notifications"; // Import the Notifications component

interface NavbarFooterProps {
  children: React.ReactNode;
}

export default function NavbarFooter({ children }: NavbarFooterProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <nav className="bg-violet-950 p-4 flex justify-between items-center fixed top-0 w-full z-20">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">EduConnect</div>
        </div>
        <div className="relative flex items-center space-x-4 text-lg">
          <Notifications />
          <button onClick={toggleDropdown} className="hover:text-purple-300 focus:outline-none" aria-label="Menu">
            <i className="fas fa-bars"></i>
          </button>
          {dropdownOpen && (
            <div className="dropdown absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
              <ul className="p-2">
                <li className="py-1 flex items-center">
                  <i className="fas fa-user mr-2 text-purple-900"></i>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-purple-200 rounded text-purple-900">
                    Profile
                  </Link>
                </li>
                <li className="py-1 flex items-center">
                  <i className="fas fa-cog mr-2 text-purple-900"></i>
                  <Link href="/settings" className="block px-4 py-2 hover:bg-purple-200 rounded text-purple-900">
                    Settings
                  </Link>
                </li>
                <li className="py-1 flex items-center">
                  <button onClick={logout} className="w-full bg-purple-500 text-white hover:bg-purple-700 font-bold py-2 px-4 rounded">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <div className={`relative flex flex-col items-center justify-center min-h-screen py-2 z-0 pt-20 ${dropdownOpen ? 'filter blur-lg' : ''}`}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto p-4">
          {children}
        </div>
      </div>
      <footer className="bg-violet-950 p-4 text-center text-sm fixed bottom-0 w-full z-20">
        <nav className="flex justify-around">
          <Link href="/" className="flex flex-col items-center text-white hover:text-purple-300">
            <i className="fas fa-home text-2xl"></i>
            <span>Home</span>
          </Link>
          <Link href="/quizzes" className="flex flex-col items-center text-white hover:text-purple-300">
            <i className="fas fa-question text-2xl"></i>
            <span>Quiz</span>
          </Link>
          <Link href="/flashcards" className="flex flex-col items-center text-white hover:text-purple-300">
            <i className="fas fa-clone text-2xl"></i>
            <span>Flashcards</span>
          </Link>
          <Link href="/study-planner" className="flex flex-col items-center text-white hover:text-purple-300">
            <i className="fas fa-calendar-alt text-2xl"></i>
            <span>Study Planner</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
