"use client";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";

function PushNavigator({ blogs }: { blogs: any[] }) {
  const router = useRouter();

  useEffect(() => {
    if (blogs.length === 0) {
      router.push("/blog");
    }
  }, [blogs]);

  return <div></div>;
}

export default PushNavigator;
