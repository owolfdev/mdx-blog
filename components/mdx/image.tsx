"use client";

import NextImage from "next/image";

//ImageComponent

const Image = ({
  src,
  alt,
  caption,
  layout = "responsive",
  width = 700,
  height = 400,
}: {
  src: string;
  alt: string;
  caption?: string;
  layout?: "fill" | "responsive";
  width?: number;
  height?: number;
}) => {
  return (
    <div className="relative" style={{ width: "100%", height: "auto" }}>
      <NextImage
        src={src}
        alt={alt}
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
