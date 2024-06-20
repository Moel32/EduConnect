import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
    score: number;
    totalQuestions: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ score, totalQuestions }) => {
    const percentage = (score / totalQuestions) * 100;

    return (
        <div className="flex flex-col items-center">
            <div style={{ width: '150px', height: '150px' }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${score} / ${totalQuestions}`}
                    styles={buildStyles({
                        textColor: '#FFFFFF', // White text
                        pathColor: `rgba(75, 255, 0, 1, ${percentage / 100})`,
                        trailColor: '#d6d6d6',
                        textSize: '16px',
                        pathTransitionDuration: 0.5
                    })}
                />
            </div>
            <p className="text-center text-xl font-bold mt-4 text-white">Last Quiz Score</p>
        </div>
    );
}

export default CircularProgress;
