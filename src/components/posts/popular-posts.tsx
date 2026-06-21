import { getPopularPosts } from "@/app/actions/posts/get-popular-posts";
import Link from "next/link";

export default async function PopularPostsPage() {
  const result = await getPopularPosts();

  if (!result.ok) {
    return (
      <div className="not-prose flex flex-col items-center justify-center border border-border bg-card px-6 py-10 text-center">
        <h2 className="text-xl font-bold text-destructive">
          Unable to load posts
        </h2>
        <p className="text-sm text-muted-foreground">{result.error}</p>
      </div>
    );
  }

  // Utility function to parse and format the date
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <section className="not-prose py-6">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Recent writing
        </p>
        <h2 className="text-3xl font-black tracking-[-0.06em] sm:text-5xl">
          MDX, content systems, and technical publishing notes.
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Articles, walkthroughs, and implementation details from the platform
          itself.
        </p>
      </div>

      <ul className="grid gap-6 md:grid-cols-2">
        {result.data?.map((post) => (
          <li
            key={post.id}
            className="panel-surface group relative overflow-hidden p-6 transition-transform hover:-translate-y-0.5"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="relative block space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span>{formatDate(post.publishDate)}</span>
                <span className="border border-border bg-muted px-3 py-1 text-[0.65rem]">
                  {post.likes} Likes
                </span>
              </div>
              <h3 className="text-2xl font-black leading-tight tracking-[-0.05em]">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80 dark:text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
