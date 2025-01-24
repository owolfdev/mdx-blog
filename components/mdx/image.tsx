"use client";

import NextImage from "next/image";

//ImageComponent

const Image = ({
  src,
  alt,
  caption,
  title,
  layout = "responsive",
  width = 700,
  height = 400,
}: {
  src: string;
  alt: string;
  caption?: string;
  title?: string; // Optional title
  layout?: "fill" | "responsive";
  width?: number;
  height?: number;
}) => {
  return (
    <div
      role="img"
      aria-label={alt}
      aria-describedby={caption ? "image-caption" : undefined}
      className="relative"
      style={{ width: "100%", height: "auto" }}
    >
      <NextImage
        src={src}
        alt={alt}
        title={title || alt} // Use title if provided; fallback to alt
        layout={layout}
        width={width}
        height={height}
        objectFit="cover"
        className="pb-4"
      />
      {caption && (
        <div className="text-sm text-muted-foreground mt-[-12px] mb-4">
          {caption}
        </div>
      )}
    </div>
  );
};

export default Image;
