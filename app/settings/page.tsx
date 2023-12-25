import CachePostsButton from "@/components/admin/cache-posts-button";
import OpenCategoriesInVSCode from "./open-categories-in-vs-code";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">Settings</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link href="/admin">
            <Button>Administration</Button>
          </Link>
          <p className="text-sm text-muted-foreground">Manage posts data.</p>
        </div>
        <div className="flex flex-col gap-2">
          <CachePostsButton />
          <p className="text-sm text-muted-foreground">
            Cache posts after editing a post manually in VS Code or other text
            editor. Caching will update the blog roll and search capabilities.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <OpenCategoriesInVSCode />
          <p className="text-sm text-muted-foreground">
            Categories, which can be set via a multi-select component in the
            create and edit post forms, are stored in a JSON file. This button
            will open that file in VS Code for editing.
          </p>
        </div>
      </div>
    </div>
  );
}
