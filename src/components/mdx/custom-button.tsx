import React from "react";
import { Button } from "@/components/ui/button";

function CustomButton({ children }: { children: string }) {
  return (
    <Button className="bg-blue-700 rounded-lg text-white text-lg px-4 py-2 font-semibold hover:bg-blue-600 active:scale-110">
      {children}
    </Button>
  );
}

export default CustomButton;
