import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
    score: number;
    totalQuestions: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ score, totalQuestions }) => {
    const percentage = (score / totalQuestions) * 100;
    let encouragementMessage = '';

    if (score < 5) {
        encouragementMessage = 'Keep going! You can do better.';
    } else {
        encouragementMessage = 'Congratulations! Keep up the good work.';
    }

    return (
        <div className="flex flex-col items-center">
            <div style={{ width: '150px', height: '150px' }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${score} / ${totalQuestions}`} // Convert to string here
                    styles={buildStyles({
                        textColor: '#FFFFFF', // White text
                        pathColor: `rgba(255, 165, 0, ${percentage / 100})`, // Bright orange path color
                        trailColor: '#d6d6d6',
                        textSize: '16px',
                        pathTransitionDuration: 0.5
                    })}
                />
            </div>
            <p className="text-center text-sm mt-4 text-gray-100 font-bold animate-bounce">
                {encouragementMessage}
            </p>
        </div>
    );
}

export default CircularProgress;
