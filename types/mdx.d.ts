// types/mdx.d.ts
declare module "*.mdx" {
  import type { Metadata } from "@/types/metadata"; // Adjust the path as needed

  export const metadata: Metadata;

  const Component: React.FC;
  export default Component;
}
