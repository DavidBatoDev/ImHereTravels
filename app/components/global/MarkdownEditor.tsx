"use client";

import { useRef, useState } from "react";
import { Bold, Italic, List, ListOrdered, Link2, Eye, Pencil } from "lucide-react";
import Markdown from "@/app/components/global/Markdown";

/**
 * Lightweight markdown editor for reviews: a formatting toolbar over a textarea
 * plus a live-preview toggle. Chosen over a heavyweight WYSIWYG for zero SSR
 * risk and minimal friction ("no technical difficulties") while still producing
 * clean markdown that renders identically on the tour page via <Markdown/>.
 */

type Wrap = { before: string; after: string };

export default function MarkdownEditor({
  value,
  onChange,
  placeholder,
  maxLength = 5000,
  id,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  maxLength?: number;
  id?: string;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");

  function surround({ before, after }: Wrap) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || "text";
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next.slice(0, maxLength));
    // Restore selection around the wrapped text after React re-renders.
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function prefixLines(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const block = value.slice(lineStart, end);
    const numbered = prefix === "1. ";
    const replaced = block
      .split("\n")
      .map((line, i) => (numbered ? `${i + 1}. ` : prefix) + line)
      .join("\n");
    const next = value.slice(0, lineStart) + replaced + value.slice(end);
    onChange(next.slice(0, maxLength));
    requestAnimationFrame(() => el.focus());
  }

  const btn =
    "flex size-8 items-center justify-center rounded-sm text-dark-gray hover:bg-light-grey transition-colors";

  return (
    <div className="rounded-md border border-light-grey bg-white">
      <div className="flex items-center gap-1 border-b border-light-grey px-2 py-1.5">
        <button type="button" className={btn} aria-label="Bold" onClick={() => surround({ before: "**", after: "**" })}>
          <Bold className="size-4" />
        </button>
        <button type="button" className={btn} aria-label="Italic" onClick={() => surround({ before: "_", after: "_" })}>
          <Italic className="size-4" />
        </button>
        <button type="button" className={btn} aria-label="Bulleted list" onClick={() => prefixLines("- ")}>
          <List className="size-4" />
        </button>
        <button type="button" className={btn} aria-label="Numbered list" onClick={() => prefixLines("1. ")}>
          <ListOrdered className="size-4" />
        </button>
        <button type="button" className={btn} aria-label="Link" onClick={() => surround({ before: "[", after: "](https://)" })}>
          <Link2 className="size-4" />
        </button>
        <div className="ml-auto">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-sm px-2 py-1 font-body text-b4-desktop text-dark-gray hover:bg-light-grey"
            onClick={() => setMode((m) => (m === "write" ? "preview" : "write"))}
          >
            {mode === "write" ? (
              <>
                <Eye className="size-4" /> Preview
              </>
            ) : (
              <>
                <Pencil className="size-4" /> Write
              </>
            )}
          </button>
        </div>
      </div>

      {mode === "write" ? (
        <textarea
          id={id}
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          placeholder={placeholder}
          rows={6}
          className="block w-full resize-y rounded-b-md bg-white px-4 py-3 font-body text-b2-desktop text-midnight outline-none placeholder:text-grey"
        />
      ) : (
        <div className="min-h-[9rem] px-4 py-3">
          {value.trim() ? (
            <Markdown>{value}</Markdown>
          ) : (
            <p className="font-body text-b4-desktop text-grey">Nothing to preview yet.</p>
          )}
        </div>
      )}

      <div className="flex justify-end px-3 pb-2">
        <span className="font-body text-b4-desktop text-grey">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
