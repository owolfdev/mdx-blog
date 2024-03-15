import { DataTable } from "./data-table";
import { isDevMode } from "@/lib/utils";

export default function Settings() {
  if (!isDevMode()) {
    return (
      <div className="w-full px-6">
        <div className="text-xl font-bold">Posts</div>
        <div>Access denied.</div>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <div className="text-xl font-bold">Posts</div>
      <DataTable />
    </div>
  );
}
