"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function OpenCategoriesInVSCode() {
  const handleOpenCategoriesInVSCode = async () => {
    fetch("/api/open-in-vs-code", {
      method: "POST",
      body: JSON.stringify("data/settings/categories.json"),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div>
      <Button
        title="Open local categories list file in VS code for editing."
        onClick={handleOpenCategoriesInVSCode}
      >
        Open Categories List in VS Code
      </Button>
    </div>
  );
}

export default OpenCategoriesInVSCode;
