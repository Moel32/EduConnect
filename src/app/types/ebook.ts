// types/ebook.ts

export interface Book {
  key: string;
  title: string;
  authors: string[];
  publish_year: string;
  ia?: string;
  cover_image?: string; // Added this line
  description?: string; // Added for completeness if description is also used
  preview_link?: string; // Added for completeness if preview_link is also used
}
