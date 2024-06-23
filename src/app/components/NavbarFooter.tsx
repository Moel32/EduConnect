"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Notifications from "../components/Notifications";

interface NavbarFooterProps {
  children: React.ReactNode;
}

export default function NavbarFooter({ children }: NavbarFooterProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [bottomNavbarVisible, setBottomNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.dropdown') && !(event.target as HTMLElement).closest('.notification-icon')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setNavbarVisible(false);
        setBottomNavbarVisible(false);
      } else {
        setNavbarVisible(true);
        setBottomNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownOpen, lastScrollY]);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <nav className={`bg-violet-950 p-4 flex justify-between items-center fixed top-0 w-full z-20 transition-transform duration-300 ${navbarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">EduConnect</div>
        </div>
        <div className="relative flex items-center space-x-4 text-lg">
          <div className="notification-icon">
            <Notifications />
          </div>
          <button onClick={toggleDropdown} className="hover:text-purple-300 focus:outline-none" aria-label="Menu">
            <i className="fas fa-bars"></i>
          </button>
          {dropdownOpen && (
            <div className="dropdown absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
              <ul className="p-2">
                <li className="py-1 flex items-center">
                  <button
                    onClick={() => router.push("/profile")}
                    className="flex items-center w-full px-4 py-2 hover:bg-purple-200 rounded text-purple-900 focus:outline-none"
                  >
                    <i className="fas fa-user mr-2 text-purple-900"></i>
                    Profile
                  </button>
                </li>
                <li className="py-1 flex items-center">
                  <button
                    onClick={() => router.push("/settings")}
                    className="flex items-center w-full px-4 py-2 hover:bg-purple-200 rounded text-purple-900 focus:outline-none"
                  >
                    <i className="fas fa-cog mr-2 text-purple-900"></i>
                    Settings
                  </button>
                </li>
                <li className="py-1 flex items-center justify-center">
                  <button
                    onClick={logout}
                    className="flex items-center justify-center w-full text-purple-900 focus:outline-none"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <i className="fas fa-spinner fa-spin text-purple-900"></i>
                    ) : (
                      <i className="fas fa-sign-out-alt text-purple-900"></i>
                    )}
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
      <footer className={`bg-violet-950 p-2 text-center text-sm fixed bottom-0 w-full z-20 transition-transform duration-300 ${bottomNavbarVisible ? 'translate-y-0' : 'translate-y-full'}`}>
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
          <Link href="/virtual-assistant" className="flex flex-col items-center text-white hover:text-purple-300">
            <i className="fas fa-robot text-2xl"></i>
            <span>Assistant</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
