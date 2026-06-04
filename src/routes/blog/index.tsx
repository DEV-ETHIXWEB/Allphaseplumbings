import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Wrench } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { fetchPosts } from "@/lib/wordpress.functions";
import skylineBg from "@/assets/seattle-skyline.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Plumbing Blog, Tips from All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Plumbing guides, maintenance tips, and Seattle-specific advice from licensed local plumbers.",
      },
      { property: "og:title", content: "Plumbing Blog, All Phase" },
      { property: "og:description", content: "Plumbing know-how from licensed Seattle plumbers." },
    ],
  }),
  component: BlogIndex,
});

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

const STATIC_ARTICLES = [
  {
    slug: "puget-sound-winter-plumbing-survival-guide",
    title: "The 2026 Puget Sound Winter Plumbing Survival Guide: Performance, Prevention, and Technology",
    excerpt: "January in the Pacific Northwest is often deceptive. While our neighbors in the Midwest are…",
    date: "January 6, 2026",
    comments: "No Comments",
    img: "https://images.unsplash.com/photo-1704915171712-41bd8b5652a0?w=800&q=80",
    imgAlt: "Frozen outdoor faucet covered in snow and ice",
  },
  {
    slug: "handyman-vs-professional-plumber-seattle",
    title: "The Difference Between a Handyman and a Professional Plumber in Seattle",
    excerpt: "As a homeowner in Seattle, you've probably faced a leaky faucet, a running toilet, or…",
    date: "November 10, 2025",
    comments: "No Comments",
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80",
    imgAlt: "Professional plumber working under a kitchen sink",
  },
  {
    slug: "tankless-water-heaters-seattle-worth-upgrade",
    title: "Tankless Water Heaters in Seattle: Is It Worth the Upgrade?",
    excerpt: "As a homeowner in Seattle, you're always looking for ways to make your home more…",
    date: "November 10, 2025",
    comments: "No Comments",
    img: "https://images.unsplash.com/photo-1575299737366-39c143459bc5?w=800&q=80",
    imgAlt: "Tankless water heater mounted on wall above sink",
  },
  {
    slug: "preventing-tree-root-damage-sewer-lines",
    title: "Preventing Tree Root Damage in Seattle Sewer Lines",
    excerpt: "If you live in the Seattle Metro Area, you're surrounded by beautiful, mature trees. From…",
    date: "November 10, 2025",
    comments: "1 Comment",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    imgAlt: "Tangled tree roots spreading across the ground",
  },
];

function BlogIndex() {
  const fetchPostsFn = useServerFn(fetchPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["wp-posts", 12],
    queryFn: () => fetchPostsFn({ data: { perPage: 12 } }),
  });

  const posts = data?.posts ?? [];
  const useStatic = !isLoading && posts.length === 0;

  return (
    <PageShell>
      {/* ── Hero ── */}
      <section
        className="relative border-b border-border py-10 lg:py-[60px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f4f8fd 0%, #e6eff9 50%, #dbe7f4 100%)",
        }}
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${skylineBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.55,
            filter: "blur(1px) brightness(0.98)",
          }}
          aria-hidden="true"
        />
        {/* Soft white veil to keep navy heading readable */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(91,155,213,0.35) 0%, rgba(91,155,213,0) 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,110,0.25) 0%, rgba(30,58,110,0) 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,200,66,0.18) 0%, rgba(245,200,66,0) 70%)",
            filter: "blur(45px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-8 left-[8%] w-40 h-24 z-0 pointer-events-none border-2 border-[#1E3A6E]/20 rounded-md"
          style={{ transform: "rotate(-18deg)", background: "rgba(91,155,213,0.08)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 right-[6%] w-56 h-32 z-0 pointer-events-none border-2 border-[#F5C842]/40 rounded-md"
          style={{ transform: "rotate(12deg)", background: "rgba(245,200,66,0.08)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-6 left-[22%] w-48 h-28 z-0 pointer-events-none border-2 border-[#1E3A6E]/25 rounded-md"
          style={{ transform: "rotate(28deg)", background: "rgba(30,58,110,0.06)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-[18%] right-[28%] w-24 h-16 z-0 pointer-events-none border-2 border-[#5B9BD5]/40 rounded-md"
          style={{ transform: "rotate(-32deg)", background: "rgba(91,155,213,0.1)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-[38px] sm:text-[48px] lg:text-[58px] font-black uppercase tracking-wider text-primary mb-3">
            Blog
          </h1>
          <nav className="text-[13px] text-muted-foreground">
            <Link to="/" className="font-semibold text-primary hover:text-accent">
              Home
            </Link>{" "}
            <span className="mx-1">-</span>{" "}
            <span className="font-semibold">Blog</span>
          </nav>
        </div>
      </section>

      {/* ── Posts grid ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-secondary/40 animate-pulse h-96"
                />
              ))}
            </div>
          ) : useStatic ? (
            <div className="grid md:grid-cols-3 gap-8">
              {STATIC_ARTICLES.map((a) => (
                <article
                  key={a.slug}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-[0_20px_50px_rgba(30,58,110,0.25)] hover:-translate-y-2 hover:border-[#1E3A6E]/40 transition-all duration-300 ease-out"
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: a.slug }}
                    className="block aspect-[16/10] relative overflow-hidden bg-slate-200"
                  >
                    <img
                      src={a.img}
                      alt={a.imgAlt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <div className="px-5 pt-5 pb-5 flex flex-col flex-1">
                    <h2 className="text-[17px] font-bold text-primary leading-snug mb-3 line-clamp-3">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: a.slug }}
                        className="hover:text-accent"
                      >
                        {a.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {a.excerpt}
                    </p>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: a.slug }}
                      className="inline-flex items-center text-sm font-bold text-primary uppercase tracking-wider hover:text-accent mb-4"
                    >
                      Read More »
                    </Link>
                    <div className="mt-auto pt-3 border-t border-border text-xs text-muted-foreground">
                      {a.date}
                      <span className="mx-2">-</span>
                      {a.comments}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => {
                const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const excerpt = stripHtml(post.excerpt?.rendered ?? "").slice(0, 130);
                return (
                  <article
                    key={post.id}
                    className="group flex flex-col bg-white overflow-hidden"
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="block aspect-[16/10] bg-primary relative overflow-hidden"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary-foreground/30">
                          <Wrench className="size-16" />
                        </div>
                      )}
                    </Link>
                    <div className="pt-5 pb-2 flex flex-col flex-1">
                      <h2 className="text-[17px] font-bold text-primary leading-snug mb-3 line-clamp-2">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          className="hover:text-accent"
                        />
                      </h2>
                      {excerpt && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {excerpt}
                          {excerpt.length >= 130 ? "…" : ""}
                        </p>
                      )}
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center text-sm font-bold text-primary uppercase tracking-wider hover:text-accent mb-4"
                      >
                        Read More »
                      </Link>
                      <div className="mt-auto pt-3 border-t border-border text-xs text-muted-foreground">
                        {formatDate(post.date)}
                        <span className="mx-2">-</span>
                        No Comments
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
