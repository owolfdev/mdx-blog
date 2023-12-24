"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function OpenAdmin() {
  return (
    <div>
      <Link href="/admin">
        <Button title="Open local categories list file in VS code for editing.">
          Open Admin Page
        </Button>
      </Link>
    </div>
  );
}

export default OpenAdmin;
