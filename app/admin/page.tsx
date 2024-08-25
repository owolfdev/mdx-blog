import { DataTable } from "./data-table";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import CachePostsButton from "@/components/admin/cache-posts-button";
import OpenCategoriesInVSCode from "./open-categories-in-vs-code";

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
      <div className="flex gap-4 pb-4 flex-col sm:flex-row">
        <div className="flex flex-col gap-2">
          <CachePostsButton />
        </div>
        <div className="flex flex-col gap-2">
          <OpenCategoriesInVSCode />
        </div>
      </div>
      <div className="text-xl font-bold">Posts</div>
      <DataTable />
    </div>
  );
}
