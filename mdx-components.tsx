import React from "react";
import type { MDXComponents } from "mdx/types";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code";
import InlineCode from "@/components/mdx/inline-code";
import Pre from "@/components/mdx/pre"; // Adjust the import path as needed
import Image from "@/components/mdx/image"; // Adjust the import path as needed

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTube,
    Image, // Use the custom Image component
    pre: Pre, // Use the custom Pre component
    code: (props) => {
      const { className, children } = props;
      if (className) {
        return <Code {...props} />;
      }
      return <InlineCode>{children}</InlineCode>;
    },
    h1: (props) => (
      <h1 className="text-4xl font-black pb-4 w-full" {...props} />
    ),
    h2: (props) => <h2 className="text-3xl font-bold pb-4 w-full" {...props} />,
    h3: (props) => (
      <h3 className="text-2xl font-semibold pb-4 w-full" {...props} />
    ),
    h4: (props) => (
      <h4 className="text-xl font-medium pb-4 w-full" {...props} />
    ),
    h5: (props) => (
      <h5 className="text-lg font-normal pb-4 w-full" {...props} />
    ),
    h6: (props) => (
      <h6 className="text-base font-light pb-4 w-full" {...props} />
    ),
    p: (props) => <p className="text-lg mb-4 w-full" {...props} />,
    li: (props) => <li className="pb-1" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 pb-4 w-full" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 pb-4 w-full" {...props} />,
    hr: (props) => <hr className="my-4" {...props} />,
    blockquote: (props) => (
      <blockquote
        style={{ paddingBottom: 0 }}
        className="border-l-4 pl-4 my-4"
        {...props}
      />
    ),
    a: (props) => <a className="hover:underline font-semibold" {...props} />,
  };
}
