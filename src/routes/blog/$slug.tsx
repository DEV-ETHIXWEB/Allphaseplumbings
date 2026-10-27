import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import {
  AboutBox,
  ArticleCtaCard,
  ArticleHero,
  ReadingProgress,
  RelatedArticles,
  ShareButtons,
  TableOfContents,
} from "@/components/sections/BlogArticle";
import { toIsoDate, useArticleOutline } from "@/lib/article-outline";
import { fetchPostBySlug } from "@/lib/wordpress.functions";
import { STATIC_ARTICLES, getStaticArticle, type StaticArticle } from "@/data/articles";

const SITE_URL = "https://www.allphaseplumbing.com";

/** og:image and schema.org need absolute URLs; local images are site-relative. */
function absoluteUrl(src: string): string {
  return src.startsWith("/") ? `${SITE_URL}${src}` : src;
}

function articleDescription(article: StaticArticle): string {
  return (
    article.description ??
    `${article.title}. Expert plumbing advice from All Phase Plumbing, serving Seattle & the Puget Sound since 1989.`
  );
}

function buildArticleSchema(article: StaticArticle): string {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const published = toIsoDate(article.date);
  const publisher = {
    "@type": "Organization",
    name: "All Phase Plumbing",
    url: SITE_URL,
  };
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: articleDescription(article),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        ...(article.image ? { image: absoluteUrl(article.ogImage ?? article.image) } : {}),
        ...(published ? { datePublished: published, dateModified: published } : {}),
        author: publisher,
        publisher,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");
}

/** Up to three other articles: same category first, then ones with a cover, then newest. */
function relatedTo(article: StaticArticle): StaticArticle[] {
  const score = (a: StaticArticle) =>
    (a.category && a.category === article.category ? 2 : 0) + (a.image ? 1 : 0);
  return STATIC_ARTICLES.filter((a) => a.slug !== article.slug)
    .sort((a, b) => score(b) - score(a) || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

const PROSE_CLASSES = [
  "prose prose-slate prose-lg max-w-none",
  // Headings: navy serif with a yellow rule; offset so TOC jumps clear the sticky header
  "prose-headings:text-[#1E3A6E] prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[26px] lg:prose-h2:text-[31px]",
  "prose-h2:border-l-4 prose-h2:border-[#F5C842] prose-h2:pl-4 prose-h2:scroll-mt-32",
  "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl",
  // Lead paragraph
  "[&>p:first-child]:text-[19px] lg:[&>p:first-child]:text-[21px] [&>p:first-child]:text-slate-700",
  "[&_p]:leading-[1.85] [&_li]:leading-[1.8]",
  // Links, emphasis, lists
  "prose-a:text-[#1E3A6E] prose-a:font-semibold prose-a:underline-offset-4 prose-a:decoration-2 prose-a:decoration-[#F5C842]",
  "prose-a:transition-colors prose-a:hover:text-[#4A7BC4]",
  "prose-strong:text-[#1E3A6E] prose-ul:my-6 prose-ol:my-6 [&_ul>li]:marker:text-[#4A7BC4]",
].join(" ");

function StaticArticleView({ article }: { article: StaticArticle }) {
  const articleRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { toc, readMinutes } = useArticleOutline(bodyRef, article.slug);
  const hasImage = !!article.image;

  return (
    <PageShell>
      <ReadingProgress targetRef={articleRef} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildArticleSchema(article) }}
      />
      <ArticleHero article={article} readMinutes={readMinutes} overlap={hasImage} />

      <div className="container mx-auto px-4 max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-20">
          <article
            ref={articleRef}
            className={`relative z-10 min-w-0 pb-16 lg:pb-24 ${hasImage ? "-mt-20 lg:-mt-32" : "pt-12"}`}
          >
            {article.image && (
              <div className="article-settle overflow-hidden rounded-2xl lg:rounded-3xl bg-[#1E3A6E] ring-1 ring-black/5 shadow-[0_30px_60px_-24px_rgba(15,34,70,0.55)]">
                <img
                  src={article.image}
                  alt={article.imageAlt ?? article.title}
                  width={1600}
                  height={900}
                  className="w-full aspect-[16/9] object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            )}

            <div ref={bodyRef} className={`${PROSE_CLASSES} ${hasImage ? "mt-10 lg:mt-14" : ""}`}>
              {article.body}
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-[#1E3A6E]/10 py-6">
              <p className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#1E3A6E]">
                Share this article
              </p>
              <ShareButtons url={`${SITE_URL}/blog/${article.slug}`} title={article.title} />
            </div>

            <AboutBox />
            <ArticleCtaCard className="mt-10 lg:hidden" />
          </article>

          <aside
            className={`relative z-10 hidden lg:block pb-24 ${hasImage ? "-mt-32" : "pt-12"}`}
            aria-label="Article tools"
          >
            <div className="sticky top-[84px] space-y-5">
              <ArticleCtaCard />
              {toc.length > 0 && (
                <div className="rounded-2xl border border-[#1E3A6E]/10 bg-white p-5 shadow-sm">
                  <TableOfContents items={toc} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <RelatedArticles articles={relatedTo(article)} />
    </PageShell>
  );
}

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const article = getStaticArticle(params.slug);

    // WordPress-backed posts are fetched client-side, so only static articles
    // can set per-article SEO tags at render/SSR time. Fall back for the rest.
    if (!article) {
      return {
        meta: [
          { title: "Article, All Phase Plumbing Blog" },
          { name: "description", content: "Plumbing article from All Phase Plumbing Seattle." },
        ],
      };
    }

    const description = articleDescription(article);
    const metaTitle = article.metaTitle ?? article.title;
    const canonical = `${SITE_URL}/blog/${article.slug}`;
    const shareImage = article.image ? absoluteUrl(article.ogImage ?? article.image) : undefined;
    const published = toIsoDate(article.date);

    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        ...(shareImage
          ? [
              { property: "og:image", content: shareImage },
              { property: "og:image:alt", content: article.imageAlt ?? article.title },
              { name: "twitter:image", content: shareImage },
            ]
          : []),
        ...(published ? [{ property: "article:published_time", content: published }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const staticArticle = getStaticArticle(slug);

  const fn = useServerFn(fetchPostBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["wp-post", slug],
    queryFn: () => fn({ data: { slug } }),
    enabled: !staticArticle,
  });

  if (staticArticle) return <StaticArticleView article={staticArticle} />;

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
                <span className="inline-block text-xs font-semibold tracking-wider text-accent mb-3">
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
                className="prose prose-slate max-w-none prose-headings:text-primary prose-a:text-[#1E3A6E] prose-a:font-semibold prose-a:underline-offset-2 prose-a:hover:text-[#4A7BC4]"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </>
          )}
        </div>
      </article>
    </PageShell>
  );
}
