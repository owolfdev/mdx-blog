export type MdxPostMetadata = {
  id: string;
  type: "blog" | "project";
  title: string;
  author: string;
  publishDate: string;
  description: string;
  categories: string[];
  tags: string[];
  modifiedDate: string;
  image: string | null;
  draft: boolean;
  relatedPosts: string[];
  link?: string | null;
};

export type MdxPost = {
  id: string;
  slug: string;
  metadata: MdxPostMetadata;
  content: string;
};
