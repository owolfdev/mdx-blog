"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MdxContentProps = {
  slug: string;
  id: string;
};

const MdxContent = ({ slug, id }: MdxContentProps) => {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const loadMdxContent = async () => {
      try {
        const importedMDXContent = await import(`@/content/posts/${slug}.mdx`);
        setMDXContent(() => importedMDXContent.default);
      } catch (err) {
        console.error("Error loading MDX content:", err);

        // If the module is not found, navigate to the 404 page
        if ((err as Error)?.message?.includes("Cannot find module")) {
          router.replace("/404"); // Use replace to avoid adding the 404 page to the history stack
        }
      } finally {
        setLoading(false);
      }
    };

    loadMdxContent();
  }, [slug, router]);

  if (loading) {
    return <p className="text-lg">Loading content...</p>;
  }

  if (MDXContent) {
    return (
      <div>
        <MDXContent />
      </div>
    );
  }

  return null;
};

export default MdxContent;
