"use client";
import { useState, useEffect } from 'react';
import FlashcardForm from '../components/FlashcardForm';
import { Flashcard } from '../../models/flashcard';
import { getFlashcards, deleteFlashcard } from '../utils/localStorage';
import NavbarFooter from '../components/NavbarFooter';
import Button from '../components/Button/FlashcardButton';
import LoadingPage from '../components/LoadingPage'; // Import the LoadingPage component

const FlashcardPage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    setLoading(true); // Set loading state to true when fetching flashcards
    setFlashcards(getFlashcards());
    setLoading(false); // Set loading state to false after fetching flashcards
  }, []);

  const handleSave = (flashcard: Flashcard) => {
    const updatedFlashcards = editingFlashcard
      ? flashcards.map((fc) => (fc.id === flashcard.id ? flashcard : fc))
      : [...flashcards, flashcard];
    setFlashcards(updatedFlashcards);
    setEditingFlashcard(null);
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  const handleDelete = (id: string) => {
    const updatedFlashcards = flashcards.filter((fc) => fc.id !== id);
    setFlashcards(updatedFlashcards);
    deleteFlashcard(id);
  };

  const handleEdit = (flashcard: Flashcard) => {
    setEditingFlashcard(flashcard);
  };

  const handleFlip = (id: string) => {
    setFlipped((prevFlipped) => (prevFlipped === id ? null : id));
  };

  return (
    <NavbarFooter>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-screen-xl p-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Flashcards</h1>
          <h2 className="text-sm text-gray-600 mb-6 text-center">
            Create your flashcards
          </h2>
          <FlashcardForm onSave={handleSave} initialData={editingFlashcard} />
          {loading ? (
            <LoadingPage /> // Render loading page while fetching flashcards
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {flashcards.map((flashcard) => (
                <div
                  key={flashcard.id}
                  className={`relative py-8 px-4 rounded-md cursor-pointer transition-colors overflow-hidden ${flipped === flashcard.id ? 'bg-blue-200' : 'bg-yellow-500'}`}
                  style={{ minHeight: '16rem' }}
                  onClick={() => handleFlip(flashcard.id)}
                >
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-lg ${flipped === flashcard.id ? 'text-blue-800' : 'text-white'} leading-relaxed break-words`}>{flipped === flashcard.id ? flashcard.answer : flashcard.question}</p>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between space-x-1">
                    <Button  onClick={() => handleEdit(flashcard)}>Edit</Button>
                    <Button  onClick={() => handleDelete(flashcard.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </NavbarFooter>
  );
};

export default FlashcardPage;