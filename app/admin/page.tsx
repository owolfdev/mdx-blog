import { DataTable } from "./data-table";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import CachePostsButton from "@/components/admin/cache-posts-button";
import OpenCategoriesInVSCode from "./open-categories-in-vs-code";
import OpenAuthorsInVSCode from "./open-authors-in-vs-code";

export default function Administration() {
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
      <div className="flex flex-col gap-4  pt-2">
        <OpenCategoriesInVSCode /> <OpenAuthorsInVSCode />
      </div>

      <div className="py-6">
        <hr />
      </div>

      <div className="text-xl font-bold">Manage Posts</div>
      <div className="flex flex-col gap-2 pt-2">
        <CachePostsButton />
      </div>
      <DataTable />
    </div>
  );
}
