import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CouponsSidePopout } from "@/components/layout/CouponsSidePopout";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ChatbotWidget } from "@/components/layout/ChatbotWidget";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "All Phase Plumbing" },
      {
        name: "description",
        content:
          "Trusted plumbing repair, drain cleaning, water heaters and sewer services across Greater Seattle. Same-day service, licensed since 1989.",
      },
      { name: "author", content: "All Phase Plumbing" },
      { property: "og:title", content: "All Phase Plumbing" },
      {
        property: "og:description",
        content:
          "Trusted plumbing repair, drain cleaning, water heaters and sewer services across Greater Seattle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      // LCP: preload hero poster so first paint is instant
      {
        rel: "preload",
        as: "image",
        href: "/videos/seattle-bg-poster.jpg",
        fetchPriority: "high",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Google Fonts CSS is loaded non-render-blocking via the inline script in
      // RootShell (media="print" → "all" swap). See FONTS_HREF below.
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* Google Fonts stylesheet, loaded asynchronously so it never blocks render. */
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap";

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Non-render-blocking webfont load: inject a print-media stylesheet and
            flip it to "all" once it has downloaded (text shows immediately in a
            fallback font via display=swap, then upgrades). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(
              FONTS_HREF,
            )};l.media='print';l.onload=function(){this.media='all';};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={FONTS_HREF} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // 1. Define the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.classList.contains("reveal-on-scroll")
                ? "reveal-in"
                : "heading-fade-in",
            );
            // Unobserve once animated so it stays in place
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
    );

    // 2. Helper function to check and register headings
    const observeElement = (el: Element) => {
      // Generic scroll-reveal elements (cards, list items, etc.)
      if (el.classList.contains("reveal-on-scroll")) {
        if (!el.classList.contains("reveal-observed")) {
          el.classList.add("reveal-observed");
          observer.observe(el);
        }
        return;
      }

      const isHeading =
        el.tagName === "H1" ||
        el.tagName === "H2" ||
        el.tagName === "H3" ||
        el.classList.contains("tracking-widest") || // eyebrow spans
        el.classList.contains("heading-slide-up");

      if (isHeading && !el.classList.contains("heading-observed")) {
        el.classList.add("heading-observed", "heading-pre-animate");
        observer.observe(el);
      }
    };

    // 3. Scan initial DOM
    document
      .querySelectorAll("h1, h2, h3, .tracking-widest, .reveal-on-scroll")
      .forEach(observeElement);

    // 4. Setup Mutation Observer to watch for routing node additions dynamically
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            observeElement(node);
            node
              .querySelectorAll("h1, h2, h3, .tracking-widest, .reveal-on-scroll")
              .forEach(observeElement);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const location = useRouter().state.location;
  const isLandingPage = 
    location.pathname.startsWith("/draincleaning") ||
    location.pathname.startsWith("/emergency-plumber") ||
    location.pathname.startsWith("/hydro-jetting");

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {!isLandingPage && (
        <>
          <CouponsSidePopout />
          <MobileBottomNav />
          <ChatbotWidget />
        </>
      )}
    </QueryClientProvider>
  );
}
