"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectPostType() {
  const [selectedValue, setSelectedValue] = useState("blog");

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Post Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blog">Blog</SelectItem>
        <SelectItem value="project">Project</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SelectPostType;
