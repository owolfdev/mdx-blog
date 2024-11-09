"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="flex gap-2"
      >
        <span>
          <ArrowLeft size="1.5em" />
        </span>{" "}
        Back
      </Button>
    </div>
  );
};

export default BackButton;
