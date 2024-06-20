"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import Button from "../components/Button/Button";
import { QuestionsState } from '../types/quiz';
import NavbarFooter from "../components/NavbarFooter";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import LoadingPage from '../components/LoadingPage'; // Import the LoadingPage component
import InternetCheckComponent from "../components/InternetCheck"; // Adjust the import path as necessary

type Props = {
    questions: QuestionsState;
    totalQuestions: number;
}

const Quiz = ({ questions, totalQuestions }: Props) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [error, setError] = useState<string | null>(null);
    const [failedQuestions, setFailedQuestions] = useState<number[]>([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;

    const router = useRouter();

    const handleOnAnswerClick = (answer: string, currentQuestionIndex: number) => {
        if (isQuestionAnswered) return;
        const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        } else {
            setFailedQuestions(prev => [...prev, currentQuestionIndex]);
        }
        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
    }

    const handleChangeQuestion = (step: number) => {
        const newQuestionIndex = currentQuestionIndex + step;
        if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;

        setCurrentQuestionIndex(newQuestionIndex);
    }

    useEffect(() => {
        if (!questions || questions.length === 0) {
            setError("Unable to fetch questions. Please check your internet connection.");
        } else {
            setError(null);
        }
        // Simulate loading time with setTimeout
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);

        // Clean up timer on component unmount
        return () => clearTimeout(timer);
    }, [questions]);

    useEffect(() => {
        if (currentQuestionIndex >= totalQuestions) {
            localStorage.setItem('latestQuizScore', JSON.stringify({ score, totalQuestions }));
        }
    }, [currentQuestionIndex, totalQuestions, score]);

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <NavbarFooter><div className="text-white text-center p-8">{error}</div></NavbarFooter>;
    }

    if (currentQuestionIndex >= totalQuestions) {
        return (
            <NavbarFooter>
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={1000}
                    tweenDuration={5000}
                />
                <div className="text-white text-center p-8">
                    <h1 className="text-2xl font-bold mb-4">Congratulations!</h1>
                    <p className="text-xl">You have completed the quiz.</p>
                    <p className="text-xl">Your score is: {score} / {totalQuestions}</p>
                    {failedQuestions.length > 0 && (
                        <div>
                            <p className="text-xl mt-4">You failed the following questions:</p>
                            <ul className="list-disc text-left">
                                {failedQuestions.map((index, i) => (
                                    <li key={i}>
                                        <span className="text-yellow-500">
                                            {questions[index].question.replace(/[^\w\s]/gi, '')}
                                        </span> - Correct Answer: <span className="text-green-500">{questions[index].correct_answer.replace(/[^\w\s]/gi, '')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex justify-center space-x-4 mt-8">
                        <Button text="Restart Quiz" onClick={() => {
                            setCurrentQuestionIndex(0);
                            setScore(0);
                            setUserAnswers({});
                            setFailedQuestions([]);
                        }} />
                        <Button text="End Quiz" onClick={() => router.push('/')} />
                    </div>
                </div>
            </NavbarFooter>
        );
    }

    return (
        <NavbarFooter>
            <InternetCheckComponent />
            <div className="text-white text-center">
                <p className="p-8 font-bold text-[20px]">Score: {score}</p>
                <p className="text-[#9f50ac] font-bold pb-2 text-[14px]">
                    Question {currentQuestionIndex + 1} out of {totalQuestions}
                </p>
                {questions[currentQuestionIndex] ? (
                    <QuestionCard
                        currentQuestionIndex={currentQuestionIndex}
                        question={questions[currentQuestionIndex].question}
                        answers={questions[currentQuestionIndex].answers}
                        userAnswer={userAnswers[currentQuestionIndex]}
                        correctAnswer={questions[currentQuestionIndex].correct_answer}
                        onClick={handleOnAnswerClick}
                    />
                ) : (
                    <div className="text-white text-center p-8">Question not found</div>
                )}
                <div className="flex justify-between mt-18">
                    <Button text="Prev" onClick={() => handleChangeQuestion(-1)} />
                    <Button
                        text={currentQuestionIndex === totalQuestions - 1 ? 'End' : 'Next'}
                        onClick={currentQuestionIndex == totalQuestions - 1 ? () => setCurrentQuestionIndex(totalQuestions) : () => handleChangeQuestion(1)}
                    />
                </div>
            </div>
        </NavbarFooter>
    );
}

export default Quiz;
