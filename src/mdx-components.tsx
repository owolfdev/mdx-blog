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
      <h1
        className="w-full pb-3 text-3xl font-black tracking-tight sm:text-4xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="w-full pb-3 text-2xl font-black tracking-tight sm:text-3xl"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="w-full pb-3 text-xl font-bold tracking-tight sm:text-2xl"
        {...props}
      />
    ),
    h4: (props) => (
      <h4 className="w-full pb-2 text-lg font-semibold" {...props} />
    ),
    h5: (props) => (
      <h5 className="w-full pb-2 text-base font-semibold" {...props} />
    ),
    h6: (props) => (
      <h6
        className="w-full pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="w-full pb-4 text-base font-normal leading-relaxed text-foreground/85 dark:text-foreground/90 sm:text-lg"
        // style={{ fontFamily: "var(--font-geist)" }}
        {...props}
      />
    ),
    li: (props) => (
      <li
        className="text-base font-normal leading-relaxed text-foreground/85 dark:text-foreground/90"
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="w-full list-disc space-y-2 pl-6 pb-4" {...props} />
    ),
    ol: (props) => (
      <ol className="w-full list-decimal space-y-2 pl-6 pb-4" {...props} />
    ),
    hr: (props) => (
      <hr className="w-full border-t border-border pb-6" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-primary/40 bg-muted/30 p-4 text-sm font-medium text-foreground/85 dark:text-foreground/90"
        {...props}
      />
    ),
    a: ({ href = "", children, ...rest }) => {
      return (
        <CustomLink
          href={href}
          className="text-primary decoration-primary/60 underline-offset-4 hover:text-primary/85 dark:hover:text-primary/90 hover:underline"
        >
          {children}
        </CustomLink>
      );
    },
    // table
    table: (props) => (
      <table
        className="w-full table-auto border-collapse border border-border text-left text-sm"
        {...props}
      />
    ),
    thead: (props) => (
      <thead
        className="bg-muted/50 text-foreground/85 dark:text-foreground/90"
        {...props}
      />
    ),
    tbody: (props) => <tbody className="bg-card" {...props} />,
    tr: (props) => <tr className="even:bg-muted/20" {...props} />,
    th: (props) => (
      <th
        className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border border-border px-4 py-3 text-sm text-muted-foreground"
        {...props}
      />
    ),
  };
}
