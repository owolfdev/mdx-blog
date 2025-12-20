import type React from "react";
import Link from "next/link";

const CustomLink = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  // Automatically determine if the link is external based on the href value
  const isExternalLink = href.startsWith("http");

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-semibold transition-colors hover:underline ${className}`}
      >
        {children}
      </a>
    );
  }

  // For internal links, use Next.js' `Link` component
  return (
    <Link href={href} className={`font-semibold transition-colors hover:underline ${className}`}>
      {children}
    </Link>
  );
};

export default CustomLink;
