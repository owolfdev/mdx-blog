// /types/post-types.ts

export interface CachedBlogPost {
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
