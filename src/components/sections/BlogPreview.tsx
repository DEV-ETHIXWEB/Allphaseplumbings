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

function PostCard({ post }: { post: WPPost }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  return (
    <article
      className="group rounded-xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(91,155,213,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border-[3px] border-[#1E3A6E]"
      style={{ background: "#A8C4FB" }}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={post.title.rendered}
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
        {cat && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/75 mb-3">
            {cat}
          </span>
        )}
        <h3
          className="text-xl font-bold text-white mb-3 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A6E] hover:gap-2 hover:text-[#1E3A6E]/70 transition-all"
        >
          Read More <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function PlaceholderCard({ i }: { i: number }) {
  const data = PLACEHOLDER_DATA[i];
  return (
    <article
      className="group rounded-xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(91,155,213,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border-[3px] border-[#1E3A6E]"
      style={{ background: "#A8C4FB" }}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={data.img}
          alt={data.imgAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/75 mb-3">
          Plumbing Tips
        </span>
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{data.title}</h3>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A6E] hover:gap-2 hover:text-[#1E3A6E]/70 transition-all"
        >
          Read More <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
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
