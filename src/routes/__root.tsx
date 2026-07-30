import { lazy, Suspense, useEffect, useRef, useState } from "react";
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
import { isLandingPath, getPageType } from "@/lib/page-type";
import { trackPageView, trackPhoneClick, trackCtaClick, trackMetaPageView } from "@/lib/analytics";

/* Floating overlay widgets are code-split and mounted after the page is loaded
   and idle: none of them are part of the first paint, and keeping them out of
   the critical bundle cuts hydration work on every route. All are position:
   fixed overlays, so late mounting causes no layout shift. */
const CouponsSidePopout = lazy(() =>
  import("@/components/layout/CouponsSidePopout").then((m) => ({ default: m.CouponsSidePopout })),
);
const MobileBottomNav = lazy(() =>
  import("@/components/layout/MobileBottomNav").then((m) => ({ default: m.MobileBottomNav })),
);
const ChatbotWidget = lazy(() =>
  import("@/components/layout/ChatbotWidget").then((m) => ({ default: m.ChatbotWidget })),
);
const AccessibilityWidget = lazy(() =>
  import("@/components/layout/AccessibilityWidget").then((m) => ({
    default: m.AccessibilityWidget,
  })),
);
const ConsentWidget = lazy(() =>
  import("@/components/layout/ConsentWidget").then((m) => ({ default: m.ConsentWidget })),
);

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
      // Hero poster preload lives in the homepage route head (index.tsx) —
      // only the homepage renders the video hero.
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
  "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap";

/* ── Google Tag Manager (GTM-P68HPFVD → GA4 G-32603H5BWW) ────────────────────
   GTM is the single tag host: GA4 config + all event tags live inside it, so
   the app only pushes semantic events to the dataLayer (see src/lib/analytics.ts).
   The init script stamps the FIRST pageview with its page_type before GTM loads,
   so ad traffic landing directly on a landing page still gets the landing/inside
   split on its initial GA4 page_view. The landing prefixes mirror
   src/lib/page-type.ts — keep the two in sync. */
const GTM_ID = "GTM-P68HPFVD";
const GTM_DATALAYER_INIT =
  "window.dataLayer=window.dataLayer||[];(function(){var p=location.pathname;" +
  "var L=['/drain-cleaning','/emergency-plumber','/hydro-jetting'];" +
  "var isL=L.some(function(x){return p===x||p.indexOf(x+'/')===0;});" +
  "window.dataLayer.push({page_type:isL?'landing':'inside',page_path:p});})();";
const GTM_SNIPPET =
  "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime()," +
  "event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s)," +
  "dl=l!='dataLayer'?'&l='+l:'';j.async=true;" +
  "j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;" +
  `f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

/* ── Google Ads (AW-10953093685) via gtag.js ─────────────────────────────────
   Google Ads conversion tracking runs through gtag.js, NOT through the GTM
   container (no container access from this repo). gtag.js and gtm.js safely
   share the same window.dataLayer: gtag pushes Arguments objects that GTM
   triggers ignore, so neither stack sees the other's events. The config call
   registers the AW account once per page load; the actual conversion event is
   fired from src/lib/lead-form.ts only after a lead reaches the server
   (see analytics.trackAdsLeadConversion). */
const ADS_ID = "AW-10953093685";
const ADS_GTAG_INIT =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
  `gtag('js',new Date());gtag('config','${ADS_ID}');`;

/* ── Meta Pixel (1931193014119752) ───────────────────────────────────────────
   The client's pre-existing pixel — reused as-is (never swap for a new ID) so
   its historical event history and ad audiences stay attached. Runs entirely
   outside GTM: base code + initial PageView load inline here, same
   script-injection pattern as gtag.js above. fbq has no built-in SPA-navigation
   trigger (unlike GTM's own history-change trigger), so route-change PageViews
   are fired explicitly from RootComponent's existing SPA navigation effect via
   analytics.trackMetaPageView. Lead fires from src/lib/lead-form.ts, gated on
   the identical "server confirmed success" condition as the Google Ads
   conversion — see analytics.trackMetaLead. */
const META_PIXEL_ID = "1931193014119752";
const META_PIXEL_INIT =
  "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
  "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;" +
  "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" +
  "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}" +
  "(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
  `fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Google Tag Manager — dataLayer init (with initial page_type) first,
            then the container loader, as high in <head> as possible. */}
        <script dangerouslySetInnerHTML={{ __html: GTM_DATALAYER_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
        {/* Google Ads gtag.js — async loader + one config call for the AW
            account. Rendered once in the shell, so it can never duplicate on
            SPA navigations. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: ADS_GTAG_INIT }} />
        {/* Meta Pixel — base code + initial PageView. Loaded once here, so it
            can never duplicate on SPA navigations (route-change PageViews are
            fired separately, see RootComponent below). */}
        <script dangerouslySetInnerHTML={{ __html: META_PIXEL_INIT }} />
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
        {/* Google Tag Manager (noscript) — must be immediately after <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Meta Pixel (noscript fallback) — required alongside the script
            bootstrap above so the pixel still fires with JS disabled. */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  /* Mount the floating widgets once the page has loaded and the main thread is
     idle. They never render on the server, so the SSR payload shrinks too. */
  const [widgetsReady, setWidgetsReady] = useState(false);
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    let cancelled = false;
    const start = () =>
      idle(() => {
        if (!cancelled) setWidgetsReady(true);
      });
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  useEffect(() => {
    // 1. Define the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.classList.contains("reveal-on-scroll") ? "reveal-in" : "heading-fade-in",
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
  const isLandingPage = isLandingPath(location.pathname);

  /* SPA route-change pageviews. The inline <head> script already pushed the
     initial pageview (with page_type), so we skip the first run here and only
     track client-side navigations — avoiding a duplicate on first load. */
  const lastTrackedPath = useRef<string | null>(null);
  useEffect(() => {
    const path = location.pathname;
    if (lastTrackedPath.current === null) {
      lastTrackedPath.current = path;
      return;
    }
    if (lastTrackedPath.current !== path) {
      lastTrackedPath.current = path;
      trackPageView({ page_type: getPageType(path), page_path: path });
      trackMetaPageView();
    }
  }, [location.pathname]);

  /* One delegated listener covers every phone link and CTA button site-wide —
     no per-element tags. Phone clicks are suppressed on landing pages (CallRail
     dynamic numbers already attribute those calls). CTA clicks fire for any
     element carrying a data-gtm-cta id. Capture phase so it runs before the
     tel: / anchor navigation. */
  useEffect(() => {
    const sectionOf = (el: Element): string => {
      if (el.closest("header")) return "header";
      if (el.closest("footer")) return "footer";
      if (el.closest("nav")) return "nav";
      return "body";
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;

      const tel = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (tel && getPageType(window.location.pathname) !== "landing") {
        trackPhoneClick({
          phone: (tel.getAttribute("href") || "").replace(/^tel:/, ""),
          link_location: sectionOf(tel),
          page_path: window.location.pathname,
        });
      }

      const cta = target.closest("[data-gtm-cta]") as HTMLElement | null;
      if (cta) {
        trackCtaClick({
          click_id: cta.dataset.gtmCta || "",
          click_text: (cta.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
          page_path: window.location.pathname,
        });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {widgetsReady && (
        <Suspense fallback={null}>
          <AccessibilityWidget />
          <ConsentWidget />
          {!isLandingPage && (
            <>
              <CouponsSidePopout />
              <MobileBottomNav />
              <ChatbotWidget />
            </>
          )}
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
