"use client";

import NavbarFooter from '../components/NavbarFooter';

const VirtualAssistant: React.FC = () => {
  return (
    <NavbarFooter>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className=" p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Virtual Assistant</h1>
          <p className="text-xl text-gray-700 animate-pulse">Coming Soon...</p>
        </div>
      </div>
    </NavbarFooter>
  );
};

export default VirtualAssistant;
