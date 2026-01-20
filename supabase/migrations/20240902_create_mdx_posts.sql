create table if not exists mdx_posts (
  id uuid primary key,
  slug text not null,
  metadata jsonb not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mdx_posts_slug_idx
  on mdx_posts (slug);
