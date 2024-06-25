import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { Book } from '../../types/ebook'; // Adjust the path based on your project structure

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    previewLink?: string;
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const response = await axios.get<{ items: GoogleBook[] }>(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=20`
    );

    const books: Book[] = response.data.items.map((item) => ({
      key: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      publish_year: item.volumeInfo.publishedDate?.substring(0, 4) || '',
      description: item.volumeInfo.description || '',
      cover_image: item.volumeInfo.imageLinks?.thumbnail || undefined,
      preview_link: item.volumeInfo.previewLink || '',
      ia: 'true' // Placeholder or map accordingly if available
    }));

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error fetching books', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
