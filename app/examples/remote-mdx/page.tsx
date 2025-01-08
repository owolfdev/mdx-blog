"use client";

import { createClient } from "@/utils/supabase/client";
import { evaluate } from "@mdx-js/mdx";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import * as runtime from "react/jsx-runtime";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components"; // Adjust path as needed

export default function RemoteMDXPage() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);

  // Extract custom components for MDX
  const mdxComponents = useMDXComponents({});

  useEffect(() => {
    async function fetchMDXFromSupabase() {
      try {
        const supabase = createClient();

        // Fetch the MDX content column from the `mdx_content` table
        const { data, error } = await supabase
          .from("mdx_content")
          .select("*")
          .eq("id", 1)
          .single();

        setData(data);

        if (error) {
          throw new Error(`Supabase error: ${error.message}`);
        }

        const rawMDX = data?.content;
        if (!rawMDX) {
          throw new Error("MDX content not found");
        }

        // Compile and evaluate the MDX content into a React component
        const { default: MDXComponent } = await evaluate(rawMDX, {
          ...runtime,
          Fragment, // Pass Fragment explicitly
        });

        setComponent(() => MDXComponent);
      } catch (err) {
        console.error("Error loading MDX:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    fetchMDXFromSupabase();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-96">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-black">{data?.title}</h1>
        {Component ? (
          <MDXProvider components={mdxComponents}>
            <Component />
          </MDXProvider>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
