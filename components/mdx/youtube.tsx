import React from "react";

const YouTube = ({ videoId }: { videoId: string }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="">
      <iframe
        className="w-full aspect-video"
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTube;
