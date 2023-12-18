import React from "react";
import Image from "next/image";

const ImageComponent = ({ imgSrc, alt }: { imgSrc: string; alt: string }) => {
  return (
    <div className="">
      <Image src={imgSrc} alt={alt} width="700" height="0" />
    </div>
  );
};

export default ImageComponent;
