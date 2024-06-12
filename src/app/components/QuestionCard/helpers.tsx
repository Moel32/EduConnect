export const getBGColor = (userAnswer: string | undefined, correctAnswer: string, answer: string): string => {
    const isAnswerCorrect = userAnswer ? userAnswer === correctAnswer : undefined;

    if ((isAnswerCorrect === true && answer === userAnswer) || (isAnswerCorrect === false && answer === correctAnswer)) {
        return 'bg-[#55ac78] text-white';
    }

    if(isAnswerCorrect === false && answer === userAnswer) return 'bg-[#ac5050] text-white';
        return 'bg-white text-[#9f50ac]';
}