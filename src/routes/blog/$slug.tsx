import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { fetchPostBySlug } from "@/lib/wordpress.functions";
import { getStaticArticle } from "@/data/articles";
import skylineBg from "@/assets/seattle-skyline.jpg";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Article — All Phase Plumbing Blog" },
      { name: "description", content: "Plumbing article from All Phase Plumbing Seattle." },
    ],
  }),
  component: BlogPost,
});

function ArticleHero({ title, gradient }: { title: string; gradient: string }) {
  return (
    <section
      className="relative border-b border-border py-16 lg:py-20 overflow-hidden"
      style={{ background: gradient }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${skylineBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-[6%] w-56 h-32 z-0 pointer-events-none border-2 border-white/20 rounded-md"
        style={{ transform: "rotate(12deg)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-8 left-[8%] w-40 h-24 z-0 pointer-events-none border-2 border-white/15 rounded-md"
        style={{ transform: "rotate(-18deg)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white leading-tight">
          {title}
        </h1>
      </div>
    </section>
  );
}

function BlogPost() {
  const { slug } = Route.useParams();
  const staticArticle = getStaticArticle(slug);

  const fn = useServerFn(fetchPostBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["wp-post", slug],
    queryFn: () => fn({ data: { slug } }),
    enabled: !staticArticle,
  });

  // ── Static article path ──
  if (staticArticle) {
    return (
      <PageShell>
        <ArticleHero title={staticArticle.title} gradient={staticArticle.heroGradient} />
        <article className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary mb-8"
            >
              <ArrowLeft className="size-4" /> Back to blog
            </Link>
            <div className="text-sm text-muted-foreground mb-6">
              {staticArticle.date}
              <span className="mx-2">-</span>
              {staticArticle.comments}
            </div>
            {staticArticle.image && (
              <img
                src={staticArticle.image}
                alt={staticArticle.title}
                className="w-full aspect-[16/9] object-cover rounded-2xl mb-10 border border-border shadow-md"
                loading="lazy"
              />
            )}
            <div className="prose prose-slate max-w-none prose-lg prose-headings:text-primary prose-h2:mt-12 prose-h2:mb-5 prose-h2:text-3xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-a:text-accent prose-strong:text-primary prose-ul:my-5 prose-ol:my-5 [&_p]:text-justify [&_p]:leading-[1.85] [&_li]:text-justify [&_li]:leading-[1.8] hyphens-auto">
              {staticArticle.body}
            </div>
          </div>
        </article>
      </PageShell>
    );
  }

  // ── WordPress fallback ──
  const post = data?.post;
  const img = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post?._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <PageShell>
      <article className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="size-4" /> Back to blog
          </Link>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-10 bg-secondary rounded w-3/4" />
              <div className="h-64 bg-secondary rounded" />
              <div className="h-4 bg-secondary rounded" />
              <div className="h-4 bg-secondary rounded w-5/6" />
            </div>
          ) : !post ? (
            <div className="py-16 text-center">
              <h1 className="text-2xl font-bold text-primary mb-3">Article not found</h1>
              <p className="text-muted-foreground">
                This post may have been moved or is no longer available.
              </p>
            </div>
          ) : (
            <>
              {cat && (
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                  {cat}
                </span>
              )}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              {img && (
                <img
                  src={img}
                  alt=""
                  className="w-full aspect-[16/10] object-cover rounded-2xl mb-8 border border-border"
                />
              )}
              <div
                className="prose prose-slate max-w-none prose-headings:text-primary prose-a:text-accent"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </>
          )}
        </div>
      </article>
    </PageShell>
  );
}
