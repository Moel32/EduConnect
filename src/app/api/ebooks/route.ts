// pages/api/books.ts

import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { Book } from '../../types/ebook'; // Adjust the path based on your project structure

interface Doc {
  key: string;
  title: string;
  author_name: string[];
  publish_year: string;
  ia?: string;
}

interface ArchiveResponse {
  response: {
    docs: Doc[];
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('q');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const response = await axios.get<ArchiveResponse>(
      `https://archive.org/advancedsearch.php?q=${searchQuery}&output=json`
    );

    const docs = response.data.response.docs;
    if (!docs || docs.length === 0) {
      return NextResponse.json({ error: 'No books found' }, { status: 404 });
    }

    const books: Book[] = docs.map((doc) => ({
      key: doc.key,
      title: doc.title,
      authors: doc.author_name || [],
      publish_year: doc.publish_year || '',
      ia: doc.ia,
    }));

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error fetching books', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
