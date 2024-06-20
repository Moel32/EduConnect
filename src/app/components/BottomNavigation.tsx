"use client";

import Link from "next/link";

export default function BottomNavigation() {
  return (
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
  );
}
