// types/ebook.ts

export interface Book {
  key: string;
  title: string;
  authors: string[];
  publish_year: string;
  ia?: string;
  cover_image?: string; // Add this line
}
