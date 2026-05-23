import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { CTABanner } from "@/components/sections/CTABanner";
import { fetchPostBySlug } from "@/lib/wordpress.functions";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Article — All Phase Plumbing Blog" },
      { name: "description", content: "Plumbing article from All Phase Plumbing Seattle." },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const fn = useServerFn(fetchPostBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["wp-post", slug],
    queryFn: () => fn({ data: { slug } }),
  });

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
      <CTABanner />
    </PageShell>
  );
}
