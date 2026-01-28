"use server";

import { requireAdminUser } from "@/lib/utils/require-admin";

type GeneratePostDraftInput = {
  description: string;
  createTitleAndSlug: boolean;
  createContent: boolean;
};

type GeneratePostDraftResult = {
  title?: string;
  slug?: string;
  description?: string;
  categories?: string[];
  tags?: string[];
  modifiedDate?: string;
  content?: string;
};

const extractOutputText = (response: {
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
  output_text?: string;
}) => {
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text;
  }

  const chunks: string[] = [];
  for (const item of response.output ?? []) {
    if (item?.type !== "message") {
      continue;
    }
    for (const part of item.content ?? []) {
      if (
        (part?.type === "output_text" || part?.type === "text") &&
        typeof part.text === "string"
      ) {
        chunks.push(part.text);
      } else if (part && "json" in part) {
        try {
          chunks.push(JSON.stringify(part.json));
        } catch {
          // Ignore invalid json payloads
        }
      }
    }
  }

  return chunks.join("").trim();
};

export async function generatePostDraft({
  description,
  createTitleAndSlug,
  createContent,
}: GeneratePostDraftInput): Promise<GeneratePostDraftResult> {
  await requireAdminUser();

  if (!createTitleAndSlug && !createContent) {
    return {};
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing.");
  }

  const trimmedDescription = description.trim();
  if (!trimmedDescription) {
    throw new Error("Please provide a description to generate a draft.");
  }

  const instructions = [
    "You are an assistant that generates blog post drafts.",
    "Return ONLY valid JSON that matches the provided schema.",
    "Use concise, clear phrasing.",
  ].join(" ");

  const requestBody = {
    model: "gpt-4o-mini",
    instructions,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: [
              "Generate a draft from the description below.",
              "",
              `Description: ${trimmedDescription}`,
              "",
              "Return a JSON object with these keys:",
              "title, slug, description, categories, tags, modifiedDate, content",
              "",
              "Rules:",
              "- title: 3-8 words.",
              "- slug: kebab-case, no leading/trailing hyphens.",
              "- description: 1-2 sentences.",
              "- categories: 1-3 broad topics.",
              "- tags: 3-8 specific tags.",
              "- modifiedDate: ISO 8601 date string.",
              "- content: MDX with a single H1 title, short intro, 3-5 sections, and a concise conclusion.",
              "",
              "Note: The client may ignore fields based on user toggles; still generate all fields.",
            ].join("\n"),
          },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema" as const,
        name: "post_draft",
        schema: {
          type: "object",
          additionalProperties: false,
          required: [
            "title",
            "slug",
            "description",
            "categories",
            "tags",
            "modifiedDate",
            "content",
          ],
          properties: {
            title: { type: "string", minLength: 1 },
            slug: { type: "string", minLength: 1 },
            description: { type: "string", minLength: 1 },
            categories: {
              type: "array",
              items: { type: "string", minLength: 1 },
              minItems: 1,
              maxItems: 3,
            },
            tags: {
              type: "array",
              items: { type: "string", minLength: 1 },
              minItems: 3,
              maxItems: 8,
            },
            modifiedDate: { type: "string", minLength: 1 },
            content: { type: "string", minLength: 1 },
          },
        },
        strict: true,
      },
    },
    temperature: 0.4,
    max_output_tokens: 1100,
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const payload = await response.json();
  if (!response.ok) {
    const message =
      payload?.error?.message ??
      "OpenAI request failed while generating the post draft.";
    throw new Error(message);
  }

  const outputText = extractOutputText(payload);
  if (!outputText) {
    console.error("OpenAI draft payload (empty output):", payload);
    throw new Error("OpenAI returned an empty draft.");
  }

  let parsed: GeneratePostDraftResult;
  try {
    parsed = JSON.parse(outputText);
  } catch (error) {
    throw new Error("OpenAI returned invalid JSON.");
  }

  return parsed ?? {};
}
