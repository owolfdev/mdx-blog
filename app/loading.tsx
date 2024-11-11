"use client";
import React from "react";
import BarLoader from "react-spinners/BarLoader";

function Loading() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center pb-96">
      <div>
        <div className="h-1/2 pt-[200px]">
          <BarLoader
            color="#767676"
            loading={true}
            width={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
