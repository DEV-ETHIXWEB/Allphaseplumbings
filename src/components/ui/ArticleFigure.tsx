/**
 * Inline blog-article image. Fades up via the global `.reveal-on-scroll`
 * observer in __root.tsx; explicit width/height reserve space so nothing shifts.
 */
export function ArticleFigure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}) {
  return (
    <figure className="not-prose my-10 reveal-on-scroll">
      <div className="overflow-hidden rounded-2xl border border-border shadow-md transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(30,58,110,0.22)]">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full h-auto transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
