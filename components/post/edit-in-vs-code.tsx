"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function EditInVSCode(file: any) {
  const handleEditInVSCode = () => {
    console.log("Edit in VS Code");
    // fetch("/api/edit-file-in-vs-code", {
    //   method: "POST",
    //   body: JSON.stringify({ file: file as string }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };
  return (
    <div>
      <Button onClick={handleEditInVSCode}>Edit in VS Code</Button>
    </div>
  );
}

export default EditInVSCode;
