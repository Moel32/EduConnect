import { shuffleArray } from "../utils/arrayUtils";
import Quiz from "./Quiz";
import { Difficulty, QuestionsState, Question } from "../types/quiz";
import Link from "next/link";

const TOTAL_QUESTIONS = 10;

const getQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState> => {
    const endpoint = `https://opentdb.com/api.php?amount=10&category=18&type=multiple`;

    try {
        const response = await fetch(endpoint, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }

        const data: { results: Array<Question> } = await response.json();

        return data.results?.map(question => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }));
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw new Error('Failed to fetch questions. Please check your internet connection.');
    }
};

const QuizPage = async () => {
    try {
        const questions = await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
        return <Quiz questions={questions} totalQuestions={TOTAL_QUESTIONS}/>;
    } catch (error) {
        // Handle error here, such as displaying a message to the user or logging it
        console.error('Error loading quiz page:', error);
        return <div className="absolute justify-center items-center">
         <Link href="/" className="block px-4 py-2 hover:bg-purple-200 rounded text-purple-900">Go back Home</Link></div>;
    }
};

export default QuizPage;


