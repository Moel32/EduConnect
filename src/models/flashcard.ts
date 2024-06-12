// models/flashcard.ts
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
