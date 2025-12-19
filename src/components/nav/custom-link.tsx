"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function LoaderLink({
  url,
  children,
  isButton = false,
}: {
  url: string;
  children: React.ReactNode;
  isButton?: boolean;
}) {
  const [_loading, setLoading] = useState(false); // State for showing loading screen
  const router = useRouter();

  const defaultButton = buttonVariants({ variant: "default", size: "default" });

  const handleClick = async () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      router.push(url);
    }, 400); // Simulate delay before navigation
  };

  const handleClick2 = async () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading after a delay
    }, 4000); // Simulate a longer delay
  };

  return (
    <>
      <div className="flex flex-col gap-8 justify-center align-middle items-center">
        {isButton ? (
          <Link
            href={url}
            onClick={handleClick}
            className={`w-[200px] ${defaultButton}`}
          >
            {children}
          </Link>
        ) : (
          <Link href={url} onClick={handleClick2} className="w-full">
            {children}
          </Link>
        )}
        {_loading && ( // Use _loading for a loading indicator
          <div className="fixed top-0 left-0 bg-white dark:bg-[#010816] flex justify-center items-center w-full h-screen z-10">
            <span className="animated-text text-4xl font-bold letter-spacing-0">
              <span className="letter">M</span>
              <span className="letter">D</span>
              <span className="letter">X</span>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default LoaderLink;
