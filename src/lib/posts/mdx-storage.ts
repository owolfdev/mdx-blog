import type { MdxPostMetadata } from "@/types/mdx-post";

const formatArray = (items: string[]) =>
  items.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(", ");

export const formatMetadataBlock = (metadata: MdxPostMetadata) => {
  const lines = [
    "export const metadata = {",
    `  id: "${metadata.id}",`,
    `  type: "${metadata.type}",`,
    `  title: "${metadata.title.replace(/"/g, '\\"')}",`,
    `  author: "${metadata.author.replace(/"/g, '\\"')}",`,
    `  publishDate: "${metadata.publishDate}",`,
    `  description: "${metadata.description.replace(/"/g, '\\"')}",`,
    `  categories: [${formatArray(metadata.categories)}],`,
    `  tags: [${formatArray(metadata.tags)}],`,
    `  modifiedDate: "${metadata.modifiedDate}",`,
    `  image: ${metadata.image ? `"${metadata.image}"` : "null"},`,
    `  draft: ${metadata.draft},`,
    `  relatedPosts: [${formatArray(metadata.relatedPosts)}],`,
  ];

  if (metadata.link) {
    lines.splice(lines.length - 1, 0, `  link: "${metadata.link}",`);
  }

  lines.push("};");
  return lines.join("\n");
};

export const upsertMetadataBlock = (
  content: string,
  metadata: MdxPostMetadata
) => {
  const block = formatMetadataBlock(metadata);
  const regex = /export\s+const\s+metadata\s*=\s*{[\s\S]*?};/m;
  if (regex.test(content)) {
    return content.replace(regex, block);
  }
  return `${block}\n\n${content.trim()}`;
};

export const ensureMetadataBlock = (
  content: string,
  metadata: MdxPostMetadata
) => {
  const regex = /export\s+const\s+metadata\s*=\s*{[\s\S]*?};/m;
  if (regex.test(content)) {
    return content;
  }
  const block = formatMetadataBlock(metadata);
  return `${block}\n\n${content.trim()}`;
};

export const extractMetadataBlock = (content: string) => {
  const regex = /export\s+const\s+metadata\s*=\s*{[\s\S]*?};/m;
  const match = content.match(regex);
  return match?.[0] ?? null;
};

export const stripMetadataBlock = (content: string) => {
  const regex = /export\s+const\s+metadata\s*=\s*{[\s\S]*?};/m;
  return content.replace(regex, "").replace(/^\s*\n/, "");
};

export const getGithubRepo = () =>
  process.env.GITHUB_REPO ?? "owolfdev/mdx-blog";

export const getGithubBranch = () => process.env.GITHUB_BRANCH ?? "main";

export const shouldUseGithubSource = () =>
  process.env.USE_GITHUB_SOURCE === "true" ||
  process.env.NODE_ENV === "production";

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export const githubRequest = async (
  url: string,
  token: string,
  options: RequestInit = {}
) => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 404) {
    return { status: 404 as const, data: null };
  }

  const data = await response.json();
  if (!response.ok) {
    const baseMessage = data?.message ?? "GitHub request failed.";
    const needsScopeHint =
      response.status === 401 ||
      response.status === 403 ||
      /personal access token/i.test(baseMessage);
    const scopeHint = needsScopeHint
      ? "Ensure the token has repo access and Contents read/write, and GITHUB_REPO targets a repo the token can access."
      : null;
    const details = [
      baseMessage,
      `Status: ${response.status}`,
      `URL: ${url}`,
      scopeHint,
    ]
      .filter(Boolean)
      .join(" ");
    throw new Error(details);
  }

  return { status: response.status, data };
};

export const githubGetFileSha = async (
  repo: string,
  branch: string,
  filePath: string,
  token: string
) => {
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
  const result = await githubRequest(url, token, { method: "GET" });
  if (result.status === 404) {
    return null;
  }
  return result.data?.sha ?? null;
};

type GithubContentEntry = {
  name: string;
  path: string;
  type: "file" | "dir";
  sha: string;
};

export const githubListDirectory = async (
  repo: string,
  branch: string,
  dirPath: string,
  token: string
): Promise<GithubContentEntry[]> => {
  const url = `https://api.github.com/repos/${repo}/contents/${dirPath}?ref=${branch}`;
  const result = await githubRequest(url, token, { method: "GET" });
  if (result.status === 404) {
    return [];
  }
  if (!Array.isArray(result.data)) {
    return [];
  }
  return result.data as GithubContentEntry[];
};

export const githubGetFileContent = async (
  repo: string,
  branch: string,
  filePath: string,
  token: string
) => {
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
  const result = await githubRequest(url, token, { method: "GET" });
  if (result.status === 404) {
    return null;
  }
  const encoded = result.data?.content;
  if (!encoded) {
    return null;
  }
  return Buffer.from(encoded, "base64").toString("utf8");
};

export const githubUpsertFile = async (
  repo: string,
  branch: string,
  filePath: string,
  content: string,
  token: string,
  message: string,
  sha?: string | null
) => {
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const payload = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch,
    sha: sha ?? undefined,
  };

  await githubRequest(url, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const githubDeleteFile = async (
  repo: string,
  branch: string,
  filePath: string,
  token: string,
  sha: string,
  message: string
) => {
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const payload = {
    message,
    sha,
    branch,
  };

  await githubRequest(url, token, {
    method: "DELETE",
    body: JSON.stringify(payload),
  });
};
