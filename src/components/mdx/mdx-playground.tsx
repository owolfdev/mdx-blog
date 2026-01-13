"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { Fragment } from "react";
import * as runtime from "react/jsx-runtime";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "@/mdx-components";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type MdxPlaygroundVariant = "full" | "embedded";

interface MdxPlaygroundProps {
  variant?: MdxPlaygroundVariant;
}

const starterMDX = `# MDX Live Preview

Type on the left, see it on the right.

## Markdown + JSX

- **Bold**
- _Italic_
- \`Inline code\`

> MDX supports React components too.

\`\`\`js
export const answer = 42;
\`\`\`
`;

export function MdxPlayground({ variant = "full" }: MdxPlaygroundProps) {
  const [source, setSource] = useState(starterMDX);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [vimEnabled, setVimEnabled] = useState(false);
  const vimSwitchId = useId();
  const mdxComponents = useMemo(() => useMDXComponents({}), []);
  const isFull = variant === "full";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = window.localStorage.getItem("mdx-playground-vim");
    setVimEnabled(saved === "true");
  }, []);

  useEffect(() => {
    let active = true;
    setIsCompiling(true);

    const handle = setTimeout(async () => {
      try {
        const { default: MDXComponent } = await evaluate(source, {
          ...runtime,
          Fragment,
          remarkPlugins: [remarkGfm],
          useMDXComponents: () => mdxComponents,
        });

        if (!active) {
          return;
        }

        setComponent(() => MDXComponent);
        setError(null);
      } catch (err) {
        if (!active) {
          return;
        }

        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (active) {
          setIsCompiling(false);
        }
      }
    }, 200);

    return () => {
      active = false;
      clearTimeout(handle);
    };
  }, [source, mdxComponents]);

  const handleToggleVim = (next: boolean) => {
    setVimEnabled(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("mdx-playground-vim", String(next));
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Live Tool
        </p>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
          Live MDX Playground
        </h2>
        <p className="text-base text-foreground/80">
          Vim mode is enabled in CodeMirror. Write MDX on the left to see the
          rendered preview on the right.
        </p>
        <Link
          href="/blog/building-a-live-mdx-playground-with-codemirror-and-nextjs"
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Read the full walkthrough
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="flex min-h-[50vh] flex-col gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span>Editor</span>
            <div className="flex items-center gap-3">
              {isCompiling ? <span>Compiling…</span> : null}
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
                <Label htmlFor={vimSwitchId}>Vim enabled</Label>
                <Switch
                  id={vimSwitchId}
                  checked={vimEnabled}
                  onCheckedChange={handleToggleVim}
                />
              </div>
            </div>
          </div>
          <div className="h-full overflow-hidden rounded-xl border border-border/50 bg-background">
            <CodeMirror
              value={source}
              height="100%"
              minHeight={isFull ? "60vh" : "50vh"}
              theme="light"
              extensions={[markdown(), ...(vimEnabled ? [vim()] : [])]}
              onChange={(value) => setSource(value)}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
              }}
            />
          </div>
        </section>

        <section className="flex min-h-[50vh] flex-col gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Preview
          </div>
          <div className="h-full overflow-auto rounded-xl border border-border/50 bg-background p-6">
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            ) : Component ? (
              <article className="prose prose-lg mx-auto w-full max-w-4xl">
                <Component />
              </article>
            ) : (
              <p className="text-sm text-muted-foreground">Loading…</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
