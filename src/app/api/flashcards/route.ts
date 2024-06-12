import type { NextApiRequest, NextApiResponse } from 'next';
import { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from '../../utils/localStorage';
import { Flashcard } from '../../../models/flashcard';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      res.status(200).json(getFlashcards());
      break;
    case 'POST':
      const newFlashcard: Flashcard = req.body;
      addFlashcard(newFlashcard);
      res.status(201).json(newFlashcard);
      break;
    case 'PUT':
      const updatedFlashcard: Flashcard = req.body;
      updateFlashcard(updatedFlashcard);
      res.status(200).json(updatedFlashcard);
      break;
    case 'DELETE':
      const { id } = req.body;
      deleteFlashcard(id);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
