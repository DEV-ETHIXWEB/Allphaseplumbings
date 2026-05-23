import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Wrench } from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { CTABanner } from "@/components/sections/CTABanner";
import { fetchPosts } from "@/lib/wordpress.functions";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Plumbing Blog — Tips from All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Plumbing guides, maintenance tips, and Seattle-specific advice from licensed local plumbers.",
      },
      { property: "og:title", content: "Plumbing Blog — All Phase" },
      { property: "og:description", content: "Plumbing know-how from licensed Seattle plumbers." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const fetchPostsFn = useServerFn(fetchPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["wp-posts", 12],
    queryFn: () => fetchPostsFn({ data: { perPage: 12 } }),
  });

  const posts = data?.posts ?? [];

  return (
    <PageShell>
      <PageHero
        eyebrow="Plumbing Know How"
        title="Tips & guides"
        italic="from our team."
        subtitle="Practical advice from licensed plumbers who actually work on Seattle homes every day."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-secondary/40 animate-pulse h-80"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No articles yet. Check back soon for plumbing tips and guides.</p>
              {data?.error && <p className="text-xs mt-3 opacity-60">{data.error}</p>}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post) => {
                const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
                return (
                  <article
                    key={post.id}
                    className="group rounded-xl overflow-hidden border border-border bg-background hover:border-primary transition-colors"
                  >
                    <div className="aspect-[16/10] bg-primary relative overflow-hidden">
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
                    </div>
                    <div className="p-6">
                      {cat && (
                        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                          {cat}
                        </span>
                      )}
                      <h2
                        className="text-lg font-bold text-primary mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
                      >
                        Read More <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </PageShell>
  );
}
