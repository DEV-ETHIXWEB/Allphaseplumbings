import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Wrench } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";
import { fetchPosts } from "@/lib/wordpress.functions";
import type { WPPost } from "@/types/wordpress";

/* Unsplash images matched to each placeholder blog title */
const PLACEHOLDER_DATA = [
  {
    title: "5 signs your water heater needs replacing",
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=700&q=75",
    imgAlt: "Water heater in a utility room",
  },
  {
    title: "What to do when a drain backs up at 2am",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=75",
    imgAlt: "Drain pipes and plumbing repair work",
  },
  {
    title: "Tankless vs traditional water heaters in Seattle",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=75",
    imgAlt: "Modern plumbing pipes and fittings",
  },
];

/**
 * Mobile (< sm): card is a 600×350 rectangle (12:7 ratio) with the image
 * filling the whole frame and the title + category overlaid on a navy
 * gradient at the bottom. Desktop keeps the original stacked layout.
 */
function MobileOverlayCard({
  img,
  imgAlt,
  category,
  title,
  href,
  hrefParams,
}: {
  img: string | undefined;
  imgAlt: string;
  category: string | undefined;
  title: string;
  href: string;
  hrefParams?: { slug: string };
}) {
  return (
    <Link
      to={href}
      params={hrefParams as never}
      className="group block relative w-full mx-auto overflow-hidden border-[3px] border-[#1E3A6E] shadow-md
                 active:scale-[0.985] transition-transform duration-200"
      style={{ aspectRatio: "600 / 350", maxWidth: "600px" }}
      aria-label={title}
    >
      {img ? (
        <img
          src={img}
          alt={imgAlt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#A8C4FB] text-white/40">
          <Wrench className="size-16" />
        </div>
      )}
      {/* Dark gradient backdrop so overlaid text always reads */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,34,70,0) 30%, rgba(15,34,70,0.55) 65%, rgba(15,34,70,0.92) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-4">
        {category && (
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F5C842] mb-1.5">
            {category}
          </span>
        )}
        <h3
          className="text-[18px] font-extrabold text-white leading-snug line-clamp-2"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <span
          className="inline-flex items-center gap-1.5 mt-2 text-[13px] font-bold text-white/95
                     group-hover:gap-2.5 transition-all"
        >
          Read More <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Desktop card — original stacked layout: image on top, navy text below.
 */
function DesktopStackedCard({
  img,
  imgAlt,
  category,
  title,
  href,
  hrefParams,
}: {
  img: string | undefined;
  imgAlt: string;
  category: string | undefined;
  title: string;
  href: string;
  hrefParams?: { slug: string };
}) {
  return (
    <article
      className="group rounded-xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(91,155,213,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border-[3px] border-[#1E3A6E]"
      style={{ background: "#A8C4FB" }}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={imgAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30">
            <Wrench className="size-16" />
          </div>
        )}
      </div>
      <div className="p-6">
        {category && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1E3A6E]/75 mb-3">
            {category}
          </span>
        )}
        <h3
          className="text-xl font-bold text-[#1E3A6E] mb-3 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <Link
          to={href}
          params={hrefParams as never}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A6E] hover:gap-2 hover:text-[#1E3A6E]/70 transition-all"
        >
          Read More <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: WPPost }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  const shared = {
    img,
    imgAlt: post.title.rendered,
    category: cat,
    title: post.title.rendered,
    href: "/blog/$slug",
    hrefParams: { slug: post.slug },
  };
  return (
    <>
      <div className="sm:hidden">
        <MobileOverlayCard {...shared} />
      </div>
      <div className="hidden sm:block">
        <DesktopStackedCard {...shared} />
      </div>
    </>
  );
}

function PlaceholderCard({ i }: { i: number }) {
  const data = PLACEHOLDER_DATA[i];
  const shared = {
    img: data.img,
    imgAlt: data.imgAlt,
    category: "Plumbing Tips" as string | undefined,
    title: data.title,
    href: "/blog",
  };
  return (
    <>
      <div className="sm:hidden">
        <MobileOverlayCard {...shared} />
      </div>
      <div className="hidden sm:block">
        <DesktopStackedCard {...shared} />
      </div>
    </>
  );
}

export function BlogPreview() {
  const fetchPostsFn = useServerFn(fetchPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["wp-posts", 3],
    queryFn: () => fetchPostsFn({ data: { perPage: 3 } }),
  });

  const posts = data?.posts ?? [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Plumbing Know How
          </h2>
          <p className="mt-3 text-lg text-muted-foreground font-medium">
            Tips and guides from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border-2 border-[#1E3A7B]/30 bg-white/60 backdrop-blur-sm animate-pulse h-80"
                />
              ))
            : posts.length > 0
              ? posts.map((p) => <PostCard key={p.id} post={p} />)
              : [0, 1, 2].map((i) => <PlaceholderCard key={i} i={i} />)}
        </div>

        <div className="text-center mt-12">
          <StarBorder
            as={Link}
            to="/blog"
            className="inline-block transition-all"
            innerClassName="flex items-center gap-2 text-sm font-bold text-white tracking-wider uppercase"
            innerStyle={{
              background: "linear-gradient(135deg,#1E3A6E 0%,#4A7BC4 100%)",
              border: "none",
              padding: "12px 28px",
            }}
          >
            View Blogs <ArrowRight className="size-4" />
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
