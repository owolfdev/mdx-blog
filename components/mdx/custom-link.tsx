import type React from "react";
import Link from "next/link";

const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  // Automatically determine if the link is external based on the href value
  const isExternalLink = href.startsWith("http");

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline font-semibold"
      >
        {children}
      </a>
    );
  }

  // For internal links, use Next.js' `Link` component
  return (
    <Link href={href} className="hover:underline font-semibold">
      {children}
    </Link>
  );
};

export default CustomLink;
