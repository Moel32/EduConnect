"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <nav className="bg-violet-950 p-4 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden relative ${dropdownOpen ? 'filter blur-lg' : ''}`}>
            <Image
              src="/images/EduConnectAppIcon3.png" // Replace with the path to your image
              alt="EduConnect Icon"
              fill
              style={{objectFit:"cover"}}
              quality={100}
              sizes="(max-width: 768px) 100vw, 
                     (max-width: 1200px) 50vw, 
                     33vw"
            />
          </div>
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <button onClick={() => router.push("/")} className="text-lg hover:text-purple-300 focus:outline-none" arial-label="Home">
              <i className="fas fa-home"></i> {/* Home button */}
            </button>
          </div>
        </div>
        <div className="relative flex items-center space-x-4 text-lg">
          <Notifications /> {/* Add the Notifications component */}
          <button onClick={toggleDropdown} className="hover:text-purple-300 focus:outline-none" arial-label="Menu">
            <i className="fas fa-bars"></i> {/* FontAwesome menu icon */}
          </button>
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
              <ul className="p-2">
                <li className="py-1 flex items-center">
                  <i className="fas fa-user mr-2 text-purple-900"></i> {/* Profile icon */}
                  <Link href="/profile" className="block px-4 py-2 hover:bg-purple-200 rounded text-purple-900">
                    Profile
                  </Link>
                </li>
                <li className="py-1 flex items-center">
                  <i className="fas fa-cog mr-2 text-purple-900"></i> {/* Settings icon */}
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
      <div className={`relative flex flex-col items-center justify-center min-h-screen py-2 z-0 ${dropdownOpen ? 'filter blur-lg' : ''}`}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto p-4">
          {children}
        </div>
      </div>
      <footer className="bg-violet-950 p-4 text-center text-sm absolute bottom-0 w-full z-10">
        &copy; 2024 EduConnect. All rights reserved.
      </footer>
    </div>
  );
}
