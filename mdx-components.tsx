import React from "react";
// import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import type { MDXComponents } from "mdx/types";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code";
import InlineCode from "@/components/mdx/inline-code";
import Pre from "@/components/mdx/pre"; // Adjust the import path as needed
import Image from "@/components/mdx/image"; // Adjust the import path as needed
import CustomLink from "@/components/mdx/custom-link"; // Adjust the import path as needed
import PopularPosts from "@/components/posts/popular-posts";
import { Button } from "@/components/ui/button";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTube,
    PopularPosts,
    Button: (props) => (
      <div className="pb-4">
        <Button {...props} className="" />
      </div>
    ),
    Image, // Use the custom Image component
    pre: Pre, // Use the custom Pre component
    code: ({ className, children, ...rest }) => {
      if (className) {
        return (
          <Code className={className} {...rest}>
            {children}
          </Code>
        );
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
    p: (props) => <p className="text-xl sm:text-lg mb-4 w-full" {...props} />,
    li: (props) => <li className="" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 pb-4 w-full" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 pb-4 w-full" {...props} />,
    hr: (props) => <hr className="pb-4 border-t w-full" {...props} />,
    blockquote: (props) => (
      <blockquote
        style={{ paddingBottom: 0 }}
        className="border-l-4 pl-4 my-4"
        {...props}
      />
    ),
    a: ({ href = "", children, ...rest }) => {
      // Use the CustomLink component to handle external/internal links
      return (
        <CustomLink href={href}>
          <span className="dark:text-primary text-primary decoration-primary">
            {children}
          </span>
        </CustomLink>
      );
    },
    // table
    table: (props) => (
      <table
        className="border-collapse w-full text-left table-auto border border-gray-300 dark:border-gray-700 "
        {...props}
      />
    ),
    thead: (props) => (
      <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
    ),
    tbody: (props) => (
      <tbody className="bg-white dark:bg-gray-900" {...props} />
    ),
    tr: (props) => (
      <tr className="even:bg-gray-50 dark:even:bg-gray-800" {...props} />
    ),
    th: (props) => (
      <th
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
        {...props}
      />
    ),
  };
}
