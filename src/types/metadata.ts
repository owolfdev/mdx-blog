export type Metadata = {
  id: string;
  type: "blog" | "page";
  slug?: string; // Make slug optional
  title: string;
  author?: string;
  publishDate?: string;
  description: string;
  categories?: string[];
  tags?: string[];
  modifiedDate: string;
  image?: string | null;
  draft?: boolean;
  relatedPosts?: string[];
};
