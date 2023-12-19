import CachePostsButton from "@/components/admin/cache-posts-button";

export default function Settings() {
  const handleOpenInVSCode = async () => {
    fetch("/api/open-in-vs-code", {
      method: "POST",
      body: JSON.stringify(""),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">Settings</h1>
      <div className="flex flex-col gap-4">
        <CachePostsButton />
      </div>
    </div>
  );
}
