import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Facebook,
  Link2,
  Linkedin,
  PhoneCall,
  ShieldCheck,
  Twitter,
  Wrench,
} from "lucide-react";
import { useTrackedPhone } from "@/hooks/use-site-options";
import type { StaticArticle } from "@/data/articles";
import { toIsoDate, type TocItem } from "@/lib/article-outline";
import skylineBg from "@/assets/seattle-skyline.webp";
import logoWhite from "@/assets/app-logo-white.svg";

/* Building blocks for the static blog-article page (/blog/$slug).
   Everything that needs the rendered body (TOC, read time) is computed after
   mount from the DOM, so server and client markup stay identical. */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("a11y-no-motion"));

/* ── Reading progress ─────────────────────────────────────────────────────── */

/** Thin bar pinned to the top of the viewport that fills as the article is read. */
export function ReadingProgress({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number | null = null;
    const update = () => {
      raf = null;
      const el = targetRef.current;
      const bar = barRef.current;
      if (!el || !bar) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (raf === null) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) window.cancelAnimationFrame(raf);
    };
  }, [targetRef]);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[#F5C842] via-[#F5C842] to-[#5B9BD5]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

export function ArticleHero({
  article,
  readMinutes,
  overlap,
}: {
  article: StaticArticle;
  readMinutes: number | null;
  /** Leave room at the bottom for the cover image to overlap the hero. */
  overlap: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden pt-8 sm:pt-10 lg:pt-14 ${
        overlap ? "pb-28 lg:pb-44" : "pb-12 lg:pb-16"
      }`}
      style={{ background: article.heroGradient }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${skylineBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          opacity: 0.14,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,200,66,0.16) 0%, rgba(245,200,66,0) 70%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-32 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(91,155,213,0.28) 0%, rgba(91,155,213,0) 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 max-w-[1240px]">
        <nav aria-label="Breadcrumb" className="article-rise mb-6 lg:mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/65">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="hidden sm:block">
              <ChevronRight className="size-3.5" />
            </li>
            <li className="hidden sm:block max-w-[42ch] truncate text-white/90" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          <span
            className="article-rise inline-flex items-center gap-2 rounded-full border border-[#F5C842]/40 bg-[#F5C842]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C842]"
            style={{ animationDelay: "60ms" }}
          >
            <span className="size-1.5 rounded-full bg-[#F5C842]" />
            {article.category ?? "Plumbing Tips"}
          </span>
          <h1 className="article-rise-soft mt-5 text-[30px] sm:text-[40px] lg:text-[52px] font-black leading-[1.08] text-white">
            {article.title}
          </h1>
          {article.description && (
            <p
              className="article-rise mt-5 max-w-2xl text-[16px] sm:text-[18px] leading-relaxed text-white/75"
              style={{ animationDelay: "180ms" }}
            >
              {article.description}
            </p>
          )}

          <div
            className="article-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/70"
            style={{ animationDelay: "260ms" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur">
                <img src={logoWhite} alt="" width={26} height={14} className="w-[26px] h-auto" />
              </span>
              <span className="leading-tight">
                <span className="block font-semibold text-white">All Phase Plumbing</span>
                <span className="block text-white/60">Licensed Seattle plumbers</span>
              </span>
            </div>
            <span className="hidden sm:block h-8 w-px bg-white/15" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-[#F5C842]" aria-hidden="true" />
              <time dateTime={toIsoDate(article.date)}>{article.date}</time>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 transition-opacity duration-500 ${
                readMinutes ? "opacity-100" : "opacity-0"
              }`}
            >
              <Clock className="size-4 text-[#F5C842]" aria-hidden="true" />
              {readMinutes ?? 1} min read
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Scroll-spy: id of the section currently being read. */
function useActiveHeading(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const firstVisible = ids.find((id) => visible.get(id));
        if (firstVisible) {
          setActive(firstVisible);
          return;
        }
        // Between headings: keep the last one scrolled past.
        const passed = ids.filter((id) => {
          const el = document.getElementById(id);
          return el && el.getBoundingClientRect().top < 140;
        });
        setActive(passed.length ? passed[passed.length - 1] : null);
      },
      { rootMargin: "-110px 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/* ── Table of contents (desktop sidebar) ─────────────────────────────────── */

export function TableOfContents({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveHeading(ids);
  const listRef = useRef<HTMLOListElement>(null);
  const [indicator, setIndicator] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) {
      setIndicator(null);
      return;
    }
    const el = list.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(active)}"]`);
    if (el) setIndicator({ top: el.offsetTop, height: el.offsetHeight });
  }, [active, ids]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="toc-fade-in">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        On this page
      </p>
      <ol ref={listRef} className="relative border-l-2 border-[#1E3A6E]/10">
        <span
          aria-hidden="true"
          className="absolute -left-[2px] w-[2px] rounded-full bg-[#F5C842] transition-all duration-300 ease-out"
          style={{
            top: indicator?.top ?? 0,
            height: indicator?.height ?? 0,
            opacity: indicator ? 1 : 0,
          }}
        />
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} data-toc-id={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(item.id);
                }}
                aria-current={isActive ? "location" : undefined}
                className={`block py-1.5 pl-4 text-[13.5px] leading-snug transition-colors duration-200 ${
                  isActive ? "font-semibold text-[#1E3A6E]" : "text-slate-500 hover:text-[#1E3A6E]"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── Call-now card ────────────────────────────────────────────────────────── */

export function ArticleCtaCard({ className = "" }: { className?: string }) {
  const { phone, phone_href } = useTrackedPhone();
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-[0_20px_45px_-18px_rgba(15,34,70,0.6)] ${className}`}
      style={{ background: "linear-gradient(150deg, #1E3A6E 0%, #2d5fa8 100%)" }}
    >
      <div
        className="absolute -top-16 -right-16 size-44 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,200,66,0.25), transparent 70%)" }}
        aria-hidden="true"
      />
      <p className="relative inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C842]">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
        </span>
        Available 24/7
      </p>
      <p className="relative mt-2 font-[Merriweather,Georgia,serif] text-[19px] font-bold leading-snug">
        Need a plumber right now?
      </p>
      <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-white/75">
        Licensed, insured Seattle plumbers since 1989. Real people answer, day or night.
      </p>
      <a
        href={phone_href}
        className="group relative mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#F5C842] px-4 py-3 text-[16px] font-extrabold text-[#142B55] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
      >
        <PhoneCall className="size-4 transition-transform duration-300 group-hover:rotate-12" />
        {phone}
      </a>
      <Link
        to="/contact"
        className="group relative mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-white/25 px-4 py-2.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
      >
        Book online
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
      <ul className="relative mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/15 pt-3 text-[12.5px] text-white/80">
        {["Upfront pricing", "Same-day service", "Licensed & insured"].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <Check className="size-3.5 text-[#F5C842]" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Share ────────────────────────────────────────────────────────────────── */

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: Facebook,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      Icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: Linkedin,
    },
  ];
  const btn =
    "grid size-10 place-items-center rounded-full border border-[#1E3A6E]/15 bg-white text-[#1E3A6E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A6E] hover:bg-[#1E3A6E] hover:text-white";

  return (
    <div className="flex items-center gap-2.5">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={btn}
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button
        type="button"
        aria-label={copied ? "Link copied" : "Copy link"}
        className={btn}
        onClick={() => {
          navigator.clipboard?.writeText(url).then(
            () => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1800);
            },
            () => {},
          );
        }}
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
      <span
        role="status"
        className={`text-[13px] font-medium text-[#1E3A6E] transition-opacity duration-200 ${copied ? "opacity-100" : "opacity-0"}`}
      >
        {copied ? "Copied!" : ""}
      </span>
    </div>
  );
}

/* ── About box ────────────────────────────────────────────────────────────── */

export function AboutBox() {
  return (
    <div className="reveal-on-scroll mt-14 flex flex-col gap-5 rounded-2xl border border-[#1E3A6E]/10 bg-gradient-to-br from-[#f4f8fd] to-white p-6 sm:flex-row sm:items-center sm:p-7">
      <span
        className="grid size-16 shrink-0 place-items-center rounded-2xl shadow-md"
        style={{ background: "linear-gradient(150deg, #1E3A6E, #2d5fa8)" }}
      >
        <ShieldCheck className="size-8 text-[#F5C842]" aria-hidden="true" />
      </span>
      <div className="flex-1">
        <p className="font-[Merriweather,Georgia,serif] text-[18px] font-bold text-[#1E3A6E]">
          Written by the All Phase Plumbing team
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">
          Licensed, insured plumbers serving Seattle, Tacoma, and the Puget Sound since 1989. We
          write about the problems we actually see in local homes.
        </p>
      </div>
      <Link
        to="/about"
        className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-bold text-[#1E3A6E] hover:text-[#4A7BC4]"
      >
        About us
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/* ── Related articles ─────────────────────────────────────────────────────── */

export function RelatedArticles({ articles }: { articles: StaticArticle[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="border-t border-border bg-[#f4f8fd] py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-[1240px]">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2d5fa8]">
              Keep reading
            </p>
            <h2 className="mt-2 text-[26px] sm:text-[32px] font-black text-[#1E3A6E]">
              More from the blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="group hidden sm:inline-flex items-center gap-1.5 text-[14px] font-bold text-[#1E3A6E] hover:text-[#4A7BC4]"
          >
            All articles
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {articles.map((a, i) => (
            <article
              key={a.slug}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: a.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1E3A6E]/10 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#1E3A6E]/30 hover:shadow-[0_22px_45px_-20px_rgba(30,58,110,0.45)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#1E3A6E]">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="grid size-full place-items-center"
                      style={{ background: "linear-gradient(135deg, #1E3A6E, #2d5fa8)" }}
                    >
                      <Wrench className="size-12 text-white/30" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[12px] font-medium text-slate-500">{a.date}</p>
                  <h3 className="mt-2 line-clamp-3 font-[Merriweather,Georgia,serif] text-[17px] font-bold leading-snug text-[#1E3A6E]">
                    {a.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-bold uppercase tracking-wider text-[#1E3A6E] group-hover:text-[#4A7BC4]">
                    Read article
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
