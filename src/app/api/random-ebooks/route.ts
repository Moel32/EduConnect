// pages/api/random-books.ts

import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { Book } from '../../types/ebook'; // Adjust the path based on your project structure

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 });
  }

  try {
    const response = await axios.get<{ items: GoogleBook[] }>(
      `https://www.googleapis.com/books/v1/volumes?q=${category}&maxResults=10`
    );

    const books: Book[] = response.data.items.map((item) => ({
      key: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      publish_year: item.volumeInfo.publishedDate?.substring(0, 4) || '',
      cover_image: item.volumeInfo.imageLinks?.thumbnail || undefined
    }));

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error fetching random books', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
