# Blog and Post Routes Overview

This document describes how blog listing, post rendering, and post creation/editing work in this app.

## High-level flow

- Blog index (`/blog`) is a static route that reads post metadata via a server action, then renders a client-side list with search/sort/pagination.
- Blog detail (`/blog/[slug]`) is fully static, built from MDX files on disk. Each MDX file exports `metadata` and a default component that is rendered as the post body.
- Post creation/editing (`/post/create`, `/post/edit/[slug]`) is a client UI that edits MDX content and metadata and calls server actions to write MDX files locally in dev or to GitHub in production.

## Blog index route (`/blog`)

Files:
- `src/app/blog/page.tsx`
- `src/app/actions/posts/get-posts.ts`
- `src/components/posts/blog-index-client.tsx`
- `src/components/posts/blog-post-list.tsx`

Flow:
1. `src/app/blog/page.tsx` is a static route (`dynamic = "force-static"`). It calls `getPosts({ type: "blog" })` and passes the result to the client component.
2. `getPosts` tries to read `public/cache/published-posts.json` in non-production when it exists; otherwise it parses all `content/posts/*.mdx` files.
3. While parsing MDX, it extracts `export const metadata = { ... }` and filters out drafts and future `publishDate` values.
4. `getPosts` applies optional filtering (type, search, category), sorting, and pagination, and formats each `publishDate`.
5. `BlogIndexClient` applies *additional* client-side filtering and sorting based on URL params (`search`, `category`, `sort`, `limit`, `page`) and renders the list.

Notes:
- The client list and server action both implement filtering/sorting logic; the client is driven by URL params for interactivity.

## Blog detail route (`/blog/[slug]`)

Files:
- `src/app/blog/[slug]/page.tsx`
- `src/components/posts/related-posts.tsx`
- `src/components/like/like-button.tsx`
- `src/components/comments/comment-section.tsx`

Flow:
1. `generateStaticParams` enumerates `content/posts/*.mdx` and turns each filename into a `slug`. This sets all blog pages to be statically generated.
2. `loadMdxFile` checks the MDX file exists and then dynamically imports `@/content/posts/${slug}.mdx`.
3. `generateMetadata` pulls SEO info from the MDX module’s exported `metadata`.
4. The page component renders the MDX default export as the body (`<Content />`), and uses metadata for title/author/date/categories/description.
5. Related posts, likes, and comments render after the content.

Notes:
- `dynamicParams = false` means only slugs returned by `generateStaticParams` are valid.
- `isDevMode()` gates edit controls so they only appear in dev.

## Post creation (`/post/create`)

Files:
- `src/app/post/create/page.tsx`
- `src/app/post/create/create-post-form.tsx`
- `src/app/actions/posts/create-post.ts`
- `src/lib/posts/mdx-storage.ts`
- `src/components/mdx/mdx-post-editor.tsx`

Flow:
1. The page renders `CreatePostForm`, which uses `MdxPostEditor` to edit MDX content.
2. Metadata is embedded in the MDX file as an `export const metadata = { ... };` block.
3. `CreatePostForm` derives metadata from the editor content when present, and defaults missing values (e.g., `id`, `publishDate`).
4. On save, it calls the server action `createPost` with `{ metadata, content, slug }`.
5. `createPost` ensures the metadata block exists, generates a unique slug, and writes the MDX file.
6. In dev, it writes to `content/posts/*.mdx` and regenerates cache JSON.
7. In production, it uses the GitHub Contents API to write the MDX file to the repo.

## Post editing (`/post/edit/[slug]`)

Files:
- `src/app/post/edit/[slug]/page.tsx`
- `src/app/post/edit/[slug]/edit-post-form.tsx`
- `src/app/actions/posts/get-post.ts`
- `src/app/actions/posts/update-post.ts`
- `src/lib/posts/mdx-storage.ts`

Flow:
1. The edit page loads a post via `getPost`, which reads the MDX file and returns `{ metadata, slug, content }`.
2. The edit form uses `MdxPostEditor` and keeps the metadata block in sync with edits.
3. On save, it calls `updatePost`, which rewrites the file and can rename the slug (with uniquing).
4. In dev, it writes to the local filesystem and regenerates cache JSON.
5. In production, it updates the file in GitHub and deletes the old slug path if renamed.

## Caching and published post lists

Files:
- `src/lib/cache/generate-cache-posts.mjs`
- `public/cache/published-posts.json`
- `public/cache/all-posts.json`

Flow:
- `generatePostsCache` reads all MDX files, extracts metadata, pulls like counts from Supabase, and writes two cache files:
  - `all-posts.json`: all posts
  - `published-posts.json`: posts that are not drafts and are not scheduled in the future

## Auth gating for post routes

Files:
- `src/utils/supabase/middleware.ts`

Behavior:
- Unauthenticated users are redirected to `/sign-in` when accessing `/post/create`, `/post/edit/*`, or `/admin`.

## Key helpers

- `src/lib/posts/mdx-storage.ts`
  - `formatMetadataBlock`, `ensureMetadataBlock`, `upsertMetadataBlock` manage the `metadata` block in MDX files.
  - `slugify` normalizes slug text.
  - GitHub helpers (`githubUpsertFile`, `githubDeleteFile`, etc.) handle production writes.

## GitHub source of truth mode

Environment:
- `USE_GITHUB_SOURCE=true` forces reads/writes to use GitHub instead of the local filesystem (useful for dev).
- `GITHUB_REPO`, `GITHUB_BRANCH`, `GITHUB_TOKEN` configure GitHub access.

Behavior:
- Reads (`getPosts`, `getPost`) will fetch MDX files from GitHub when GitHub source is enabled or in production.
- Writes (`createPost`, `updatePost`, `deletePost`) use the GitHub Contents API when GitHub source is enabled.
- In dev, after GitHub writes, `generatePostsCache` runs in GitHub mode to update `public/cache/*.json`.
- Blog pages switch to dynamic rendering when GitHub source is enabled so new posts render without a rebuild.

## Gotchas / implementation notes

- `getPosts` uses a cache file only in non-production and only when GitHub source is disabled; GitHub source reads from the GitHub API.
- Both server and client layers apply filtering/sorting; be aware of double filtering if you extend either.
- Metadata parsing uses `eval` for MDX metadata blocks; content is assumed to be trusted.
