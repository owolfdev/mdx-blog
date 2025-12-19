import { DataTable } from "./data-table";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import CachePostsButton from "@/components/admin/cache-posts-button";
import OpenCategoriesInCursor from "./open-categories-in-cursor";
import OpenAuthorsInCursor from "./open-authors-in-cursor";
import { DataTableComments } from "./data-table-comments";
import { getUnapprovedComments } from "./actions"; // <-- NEW

export default async function Administration() {
  const comments = await getUnapprovedComments(); // <-- FETCH SERVER-SIDE

  if (!isDevMode()) {
    return (
      <div className="w-full px-6">
        <div className="text-xl font-bold">Posts</div>
        <div>Access denied. Admin panel is only available in dev mode.</div>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <div className="text-xl font-bold">Manage Settings</div>
      <div className="flex flex-col gap-4 pt-2">
        <OpenCategoriesInCursor />
        <OpenAuthorsInCursor />
      </div>
      <div className="py-6">
        <hr />
      </div>
      <div className="text-xl font-bold">Manage Posts</div>
      <div className="flex flex-col gap-2 pt-2">
        <CachePostsButton />
      </div>
      <DataTable />
      <div className="py-6">
        <hr />
      </div>
      <div className="text-xl font-bold">Manage Comments</div>
      <DataTableComments comments={comments} /> {/* <-- PASS COMMENTS */}
    </div>
  );
}
