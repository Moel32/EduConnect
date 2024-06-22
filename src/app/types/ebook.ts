// types/book.ts

export interface Book {
  key: string;
  title: string;
  authors: string[];
  publish_year: string;
  ia?: string; // Internet Archive identifier
}
