// /types/post-types.ts

export interface CachedPost {
  slug: string;
  id: string;
  type: string;
  title: string;
  author: string;
  publishDate: string;
  description: string;
  categories: string[];
  tags: string[] | null; // tags can be an array or null
  modifiedDate: string;
  image: string | null; // image can be a string or null
  draft: boolean;
  relatedPosts: string[] | null; // relatedPosts can be an array or null
  likes: number;
  formattedDate?: string; // Optional, as it will be added later
}

export interface PostMetadata {
  id: string;
  type: string;
  title: string;
  author: string;
  publishDate: string;
  description: string;
  categories: string[];
  tags: string[] | null;
  modifiedDate: string;
  image: string | null;
  draft: boolean;
  relatedPosts: string[] | null;
  link?: string; // New link field
}

export interface Post {
  metadata: PostMetadata;
  slug: string;
  content: string;
  filename: string;
}
