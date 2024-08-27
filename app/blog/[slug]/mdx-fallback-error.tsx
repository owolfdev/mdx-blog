// components/MdxErrorFallback.tsx
import React from "react";

type MdxErrorFallbackProps = {
  error: Error;
};

const MdxErrorFallback = ({ error }: MdxErrorFallbackProps) => {
  return (
    <div className="text-red-600">
      <h2 className="text-2xl font-bold">Error Loading Content</h2>
      <p>We&apos;re sorry, but there was an issue loading this content.</p>
      <p className="mt-2 text-sm">Error: {error.message}</p>
    </div>
  );
};

export default MdxErrorFallback;
