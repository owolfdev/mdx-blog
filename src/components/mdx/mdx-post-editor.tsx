"use client";

import React, {
  Fragment,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import * as runtime from "react/jsx-runtime";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { vim } from "@replit/codemirror-vim";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "@/mdx-components";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

class MdxRuntimeErrorBoundary extends React.Component<
  { onError: (message: string) => void; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    this.props.onError(message);
  }

  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

type EditorViewMode = "editor" | "preview" | "split";

interface MdxPostEditorProps {
  value: string;
  onChange: (value: string) => void;
  initialView?: EditorViewMode;
  showMetadataToggle?: boolean;
  showMetadata?: boolean;
  onToggleMetadata?: (next: boolean) => void;
  metadataStorageKey?: string;
}

const snippetActions = [
  {
    label: "YouTube",
    snippet: '<YouTube id="" />',
    cursorOffset: '<YouTube id="'.length,
  },
  {
    label: "Image",
    snippet: '<Image src="/images/example/wikicat.jpg" alt="" />',
    cursorOffset: '<Image src="'.length,
  },
  {
    label: "Button",
    snippet: "<Button>Button label</Button>",
    cursorOffset: "<Button>".length,
  },
  {
    label: "Code",
    snippet: "`code`",
    cursorOffset: 1,
  },
];

export function MdxPostEditor({
  value,
  onChange,
  initialView = "split",
  showMetadataToggle = false,
  showMetadata = true,
  onToggleMetadata,
  metadataStorageKey = "mdx-editor-show-metadata",
}: MdxPostEditorProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [vimEnabled, setVimEnabled] = useState(false);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [viewMode, setViewMode] = useState<EditorViewMode>(initialView);
  const vimSwitchId = useId();
  const mdxComponents = useMemo(() => useMDXComponents({}), []);

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
        const { default: MDXComponent } = await evaluate(value, {
          ...runtime,
          Fragment,
          remarkPlugins: [remarkGfm],
          useMDXComponents: () => mdxComponents,
        });

        if (!active) {
          return;
        }

        setComponent(() => MDXComponent);
        setCompileError(null);
      } catch (err) {
        if (!active) {
          return;
        }

        setCompileError(err instanceof Error ? err.message : "Unknown error");
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
  }, [value, mdxComponents]);

  useEffect(() => {
    setRuntimeError(null);
  }, [value]);

  const handleToggleVim = (next: boolean) => {
    setVimEnabled(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("mdx-playground-vim", String(next));
    }
  };

  const insertSnippet = (text: string, cursorOffset = text.length) => {
    if (!editorView) {
      onChange(value + text);
      return;
    }

    const { from, to } = editorView.state.selection.main;
    editorView.dispatch({
      changes: { from, to, insert: text },
      selection: { anchor: from + cursorOffset },
    });
    editorView.focus();
  };

  const showEditor = viewMode !== "preview";
  const showPreview = viewMode !== "editor";

  useEffect(() => {
    if (!showMetadataToggle || typeof window === "undefined") {
      return;
    }
    const saved = window.localStorage.getItem(metadataStorageKey);
    if (saved !== null) {
      onToggleMetadata?.(saved === "true");
    }
  }, [metadataStorageKey, onToggleMetadata, showMetadataToggle]);

  useEffect(() => {
    if (!showMetadataToggle || typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(metadataStorageKey, String(showMetadata));
  }, [metadataStorageKey, showMetadata, showMetadataToggle]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {(["editor", "split", "preview"] as const).map((mode) => (
            <Button
              key={mode}
              type="button"
              size="sm"
              variant={viewMode === mode ? "default" : "secondary"}
              onClick={() => setViewMode(mode)}
              aria-pressed={viewMode === mode}
            >
              {mode === "editor"
                ? "Editor"
                : mode === "preview"
                  ? "Preview"
                  : "Split"}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {isCompiling ? <span>Compiling...</span> : null}
          <div className="flex items-center gap-2 text-foreground/70">
            <Label htmlFor={vimSwitchId}>Vim enabled</Label>
            <Switch
              id={vimSwitchId}
              checked={vimEnabled}
              onCheckedChange={handleToggleVim}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <span>Insert</span>
        {snippetActions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => insertSnippet(action.snippet, action.cursorOffset)}
          >
            {action.label}
          </Button>
        ))}
      </div>

      <div
        className={cn(
          "grid gap-6",
          showEditor && showPreview ? "lg:grid-cols-2" : "grid-cols-1"
        )}
      >
        {showEditor ? (
          <section className="flex min-h-[50vh] flex-col gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span>Editor</span>
              {showMetadataToggle ? (
                <button
                  type="button"
                  onClick={() => onToggleMetadata?.(!showMetadata)}
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                >
                  {showMetadata ? "Hide metadata" : "Show metadata"}
                </button>
              ) : null}
            </div>
            <div className="h-full overflow-hidden rounded-xl border border-border/50 bg-background">
              <CodeMirror
                value={value}
                height="100%"
                minHeight="60vh"
                theme="light"
              extensions={[
                markdown(),
                syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                EditorView.lineWrapping,
                ...(vimEnabled ? [vim()] : []),
              ]}
                onChange={(nextValue) => onChange(nextValue)}
                onCreateEditor={(view) => setEditorView(view)}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                }}
              />
            </div>
          </section>
        ) : null}

        {showPreview ? (
          <section className="flex min-h-[50vh] flex-col gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Preview
            </div>
            <div className="h-full overflow-auto rounded-xl border border-border/50 bg-background p-6">
              {compileError || runtimeError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {compileError ?? runtimeError}
                </div>
              ) : Component ? (
                <article className="prose prose-lg mx-auto w-full max-w-4xl">
                  <MdxRuntimeErrorBoundary
                    onError={(message) => setRuntimeError(message)}
                  >
                    <Component />
                  </MdxRuntimeErrorBoundary>
                </article>
              ) : (
                <p className="text-sm text-muted-foreground">Loading...</p>
              )}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
