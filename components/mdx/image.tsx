import Image from "next/image";

const ImageComponent = ({
  imgSrc,
  alt,
  caption,
  layout = "responsive",
  width = 700,
  height = 400,
}: {
  imgSrc: string;
  alt: string;
  caption?: string;
  layout?: "fill" | "responsive";
  width?: number;
  height?: number;
}) => {
  return (
    <div className="relative" style={{ width: "100%", height: "auto" }}>
      <Image
        src={imgSrc}
        alt={alt}
        layout={layout}
        width={width}
        height={height}
        objectFit="cover"
      />
      {caption && (
        <div className="text-sm text-muted-foreground mt-[-12px] mb-2">
          {caption}
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
