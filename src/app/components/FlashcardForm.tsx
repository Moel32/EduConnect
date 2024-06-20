"use client";

import { useState, useEffect } from 'react';
import { Flashcard } from '../../models/flashcard';
import { v4 as uuidv4 } from 'uuid';
import Button from '../components/Button/FlashcardButton';

interface FlashcardFormProps {
  onSave: (flashcard: Flashcard) => void;
  initialData: Flashcard | null;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ onSave, initialData }) => {
  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [questionError, setQuestionError] = useState('');
  const [answerError, setAnswerError] = useState('');

  const handleSubmit = () => {
    let hasError = false;

    if (!question.trim()) {
      setQuestionError('Question field must be filled.');
      hasError = true;
    } else {
      setQuestionError('');
    }

    if (!answer.trim()) {
      setAnswerError('Answer field must be filled.');
      hasError = true;
    } else {
      setAnswerError('');
    }

    if (hasError) {
      return;
    }

    const flashcard: Flashcard = {
      id: initialData?.id || uuidv4(),
      question,
      answer,
    };
    onSave(flashcard);
    setQuestion('');
    setAnswer('');
  };

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [initialData]);

  return (
    <div className="mb-4 w-full max-w-sm mx-auto">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={`border p-2 w-full text-black rounded-md ${questionError ? 'border-red-500' : ''}`}
        />
        {questionError && <p className="text-red-500 text-sm mt-1">{questionError}</p>}
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`border p-2 w-full text-black rounded-md ${answerError ? 'border-red-500' : ''}`}
        />
        {answerError && <p className="text-red-500 text-sm mt-1">{answerError}</p>}
      </div>
      <Button onClick={handleSubmit}>Save Flashcard</Button>
    </div>
  );
};

export default FlashcardForm;
