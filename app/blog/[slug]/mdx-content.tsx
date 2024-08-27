"use client";
import type React from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MdxErrorFallback from "./mdx-fallback-error";

type MdxContentProps = {
  slug: string;
  id: string;
};

const MdxContent = ({ slug, id }: MdxContentProps) => {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMdxContent = async () => {
      try {
        const importedMDXContent = await import(`@/content/posts/${slug}.mdx`);
        setMDXContent(() => importedMDXContent.default);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error loading MDX content:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    loadMdxContent();
  }, [slug]);

  if (loading) {
    return <p className="text-lg">Loading content...</p>;
  }

  if (error) {
    return <MdxErrorFallback error={error} />;
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
