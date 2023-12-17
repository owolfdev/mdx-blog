import CachePostsButton from "@/components/admin/cache-posts-button";

export default function Admin() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Administration
      </h1>
      <div className="flex flex-col gap-4">
        <CachePostsButton />
      </div>
    </div>
  );
}
