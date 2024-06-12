// utils/localStorage.ts
import { Flashcard } from '../../models/flashcard';

const FLASHCARD_STORAGE_KEY = 'flashcards';

export const getFlashcards = (): Flashcard[] => {
  if (typeof window !== 'undefined') {
    const storedFlashcards = localStorage.getItem(FLASHCARD_STORAGE_KEY);
    return storedFlashcards ? JSON.parse(storedFlashcards) : [];
  }
  return [];
};

export const saveFlashcards = (flashcards: Flashcard[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(flashcards));
  }
};

export const addFlashcard = (flashcard: Flashcard): void => {
  const flashcards = getFlashcards();
  flashcards.push(flashcard);
  saveFlashcards(flashcards);
};

export const updateFlashcard = (updatedFlashcard: Flashcard): void => {
  let flashcards = getFlashcards();
  flashcards = flashcards.map((flashcard) =>
    flashcard.id === updatedFlashcard.id ? updatedFlashcard : flashcard
  );
  saveFlashcards(flashcards);
};

export const deleteFlashcard = (id: string): void => {
  let flashcards = getFlashcards();
  flashcards = flashcards.filter((flashcard) => flashcard.id !== id);
  saveFlashcards(flashcards);
};
