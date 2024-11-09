import React from "react";
import { EditPageForm } from "./edit-page-form";
import { getPage } from "@/app/actions/pages/get-page";
import type { Page } from "@/types/page-types";

async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const pageData = await getPage({ slug: (await params).slug });

  if ("notFound" in pageData && pageData.notFound) {
    return <div>Post not found</div>; // Handle not found case
  }

  const page = pageData as Page; // Type assertion to Page

  return (
    <div className="flex flex-col gap-8 pb-6 w-full max-w-3xl sm:max-w-3xl">
      <div className="flex flex-col max-w-3xl w-full gap-8 pt-10">
        <h1 className="text-6xl font-black">Edit Page</h1>
        <p className="w-full text-2xl">
          Page title: <span className="font-bold">{page.metadata.title}</span>
        </p>
        <EditPageForm pageData={page} />
      </div>
    </div>
  );
}

export default EditPage;
