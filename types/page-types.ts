export interface CachedPage {
  slug: string;
  id: string;
  title: string;
  description: string;
  modifiedDate: string;
  link?: string | null; // Optional field for an external or local link
  image: string | null; // Image can be a string or null
  draft: boolean;
  formattedDate?: string; // Optional field for formatted date, added later
}

export interface PageMetadata {
  id: string;
  title: string;
  description: string;
  modifiedDate: string;
  image: string | null;
  draft: boolean;
  link?: string; // Optional link field
}

export interface Page {
  metadata: PageMetadata;
  slug: string;
  content: string;
  filename: string;
}
