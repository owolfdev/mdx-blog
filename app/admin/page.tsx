import { DataTable } from "./data-table";
export default function Settings() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Administration
      </h1>
      <div className="flex flex-col gap-4">
        <DataTable />
      </div>
    </div>
  );
}
