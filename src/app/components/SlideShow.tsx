"use client";
import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import quizImage1 from '../../../public/images/study-plan.webp'; // Adjust these paths as necessary
import quizImage2 from '../../../public/images/study-plan.webp';
import quizImage3 from '../../../public/images/study-plan.webp';
import quizImage4 from '../../../public/images/study-plan.webp';

interface Slide {
    src: StaticImageData;
    message: string;
}

const slides: Slide[] = [
    { src: quizImage1, message: "Explore our Video Resources" },
    { src: quizImage2, message: "Get to learn more by taking a Quiz" },
    { src: quizImage3, message: "Create your own flashcards" },
    { src: quizImage4, message: "Have your study plan done for you" },
];

const Slideshow: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center mb-8">
            <div className="relative w-64 h-64 rounded-full overflow-hidden mx-auto mb-4">
                <Image 
                    src={slides[currentIndex].src}
                    alt="Slideshow Image"
                    layout="fill"
                    objectFit="cover"
                    aria-label="Slideshow Image"
                />
            </div>
            <p className="text-center text-lg font-semibold">{slides[currentIndex].message}</p>
        </div>
    );
};

export default Slideshow;
