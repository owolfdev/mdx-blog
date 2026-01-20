create index if not exists mdx_posts_publish_date_idx
  on mdx_posts ((metadata->>'publishDate'));

create index if not exists mdx_posts_type_idx
  on mdx_posts ((metadata->>'type'));

create index if not exists mdx_posts_title_idx
  on mdx_posts ((metadata->>'title'));

create index if not exists mdx_posts_author_idx
  on mdx_posts ((metadata->>'author'));

create index if not exists mdx_posts_categories_gin_idx
  on mdx_posts using gin ((metadata->'categories'));

create index if not exists mdx_posts_tags_gin_idx
  on mdx_posts using gin ((metadata->'tags'));
