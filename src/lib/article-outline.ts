import { useEffect, useState, type RefObject } from "react";

/* Body-derived data for static blog articles. Computed after mount from the
   rendered DOM so server and client markup stay identical. */

/** "October 27, 2026" → "2026-10-27" without a timezone shift. */
export function toIsoDate(display: string): string | undefined {
  const d = new Date(display);
  if (Number.isNaN(d.getTime())) return undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* ── Body-derived data: heading ids, TOC, read time ──────────────────────── */

export type TocItem = { id: string; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Gives every body <h2> a stable id and returns the TOC + read time. */
export function useArticleOutline(bodyRef: RefObject<HTMLElement | null>, key: string) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [readMinutes, setReadMinutes] = useState<number | null>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const seen = new Set<string>();
    const items = Array.from(body.querySelectorAll("h2")).map((h) => {
      const text = h.textContent?.trim() ?? "";
      let id = h.id || slugify(text) || "section";
      while (seen.has(id)) id += "-2";
      seen.add(id);
      h.id = id;
      return { id, text };
    });
    setToc(items);
    // Ids only exist after mount, so the browser couldn't honour a #hash on load.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && seen.has(hash)) document.getElementById(hash)?.scrollIntoView();
    const words = (body.textContent ?? "").trim().split(/\s+/).length;
    setReadMinutes(Math.max(1, Math.round(words / 225)));
  }, [bodyRef, key]);

  return { toc, readMinutes };
}
