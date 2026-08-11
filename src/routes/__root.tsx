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
/* Stub only — no network fetch. fbevents.js replays fbq.queue when it finally
   loads (see TAG_LOADER below), so the init + first PageView recorded here
   still fire with their original ordering. */
const META_PIXEL_INIT =
  "!function(f,b,e,v,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
  "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;" +
  "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');" +
  `fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

/* ── Deferred tag loading ────────────────────────────────────────────────────
   All three tag hosts (gtm.js ~90KB, gtag.js ~130KB, fbevents.js ~105KB) used
   to be fetched, parsed and executed inside <head> during the initial load.
   Together they dominated Total Blocking Time and pushed the whole main-thread
   budget past what a good Lighthouse score allows.

   None of them need to run before first paint: every stack above is already
   stubbed synchronously (dataLayer array, gtag(), fbq() with its queue), so
   pageviews, Ads conversions and Meta Leads recorded before the real scripts
   arrive are queued and replayed verbatim on load. Only the moment of the
   network beacon moves, never the events themselves.

   Trigger is the first real user interaction — scroll, tap, keypress, pointer —
   with a 10s fallback for the rare visitor who reads without touching anything.
   Interaction-first is deliberate: it is what keeps the tags out of the
   measured load entirely rather than merely moving them later into it.

   What this does NOT affect: the Google Ads conversion and the Meta Lead event
   both fire from src/lib/lead-form.ts after a form submit, and submitting a
   form is itself an interaction — so the tags are always live well before a
   conversion needs to be reported. The only thing that can be missed is a GA4
   / Meta *pageview* from a visitor who lands, touches nothing at all, and
   leaves inside 10 seconds. */
const TAG_LOADER =
  "(function(){var fired=false;function load(){if(fired)return;fired=true;" +
  "var d=document,f=d.getElementsByTagName('script')[0];" +
  "function add(src){var j=d.createElement('script');j.async=true;j.src=src;" +
  "f.parentNode.insertBefore(j,f);}" +
  "window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});" +
  `add('https://www.googletagmanager.com/gtm.js?id=${GTM_ID}');` +
  `add('https://www.googletagmanager.com/gtag/js?id=${ADS_ID}');` +
  "add('https://connect.facebook.net/en_US/fbevents.js');}" +
  "var evts=['pointerdown','keydown','touchstart','wheel','scroll'];" +
  "function onEvt(){evts.forEach(function(e){window.removeEventListener(e,onEvt);});load();}" +
  "evts.forEach(function(e){window.addEventListener(e,onEvt,{passive:true,once:true});});" +
  // Fallback for a visitor who never touches the page at all.
  "setTimeout(load,10000);})();";

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* ── Tag stubs (synchronous, ~1KB total, zero network) ──
            dataLayer with the initial page_type, the gtag() shim + its AW
            config call, and the fbq() queue shim with init + first PageView.
            Everything recorded here replays once TAG_LOADER pulls in the real
            scripts after load. */}
        <script dangerouslySetInnerHTML={{ __html: GTM_DATALAYER_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: ADS_GTAG_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: META_PIXEL_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: TAG_LOADER }} />
        {/* Non-render-blocking webfont load. Declared as real markup (not
            injected by script) so the preload scanner discovers it in the first
            HTML chunk; media="print" keeps it off the render-blocking path and
            it flips to "all" once downloaded. */}
        <link id="google-fonts-css" rel="stylesheet" href={FONTS_HREF} media="print" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var l=document.getElementById('google-fonts-css');if(!l)return;" +
              "if(l.sheet){l.media='all';return;}" +
              "l.addEventListener('load',function(){l.media='all';},{once:true});})();",
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

  /* Scroll-reveal wiring for headings and .reveal-on-scroll elements.

     Two things here are load-performance critical:

     1. Anything already inside the viewport is revealed immediately and never
        gets `.heading-pre-animate` (opacity: 0). The hero <h1> is the LCP
        element on most pages — pre-animating it blanked it the instant
        hydration ran, which pushed LCP out to whatever painted next.
     2. Class writes are batched behind a single rect-read pass, and mutation
        callbacks are coalesced into one rAF. The previous version interleaved
        `classList.add` with `observe()` per element, forcing a layout flush per
        node while React was still hydrating the page. */
  const REVEAL_SELECTOR = "h1, h2, h3, .tracking-widest, .reveal-on-scroll";
  useEffect(() => {
    /* Elements awaiting their very first intersection report. The browser tells
       us what is on screen — we never measure it ourselves. */
    const awaitingFirstReport = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const isCard = el.classList.contains("reveal-on-scroll");

          if (entry.isIntersecting) {
            el.classList.add(isCard ? "reveal-in" : "heading-fade-in");
            awaitingFirstReport.delete(el);
            observer.unobserve(el);
            return;
          }

          /* Off screen on its first report — only now is it safe to hide it for
             the entrance animation. Headings that were on screen at load never
             receive `heading-pre-animate` at all, so the hero <h1> (the LCP
             element on most pages) is never blanked after hydration. */
          if (awaitingFirstReport.has(el)) {
            awaitingFirstReport.delete(el);
            if (!isCard) el.classList.add("heading-pre-animate");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
    );

    const isRevealTarget = (el: Element) =>
      el.classList.contains("reveal-on-scroll") ||
      el.tagName === "H1" ||
      el.tagName === "H2" ||
      el.tagName === "H3" ||
      el.classList.contains("tracking-widest") ||
      el.classList.contains("heading-slide-up");

    /* Registration is class-write + observe only: no getBoundingClientRect, so
       hydration is never interrupted by a forced layout flush. */
    const register = (candidates: Element[]) => {
      for (const el of candidates) {
        if (!isRevealTarget(el)) continue;
        const isCard = el.classList.contains("reveal-on-scroll");
        const marker = isCard ? "reveal-observed" : "heading-observed";
        if (el.classList.contains(marker)) continue;
        el.classList.add(marker);
        awaitingFirstReport.add(el);
        observer.observe(el);
      }
    };

    register(Array.from(document.querySelectorAll(REVEAL_SELECTOR)));

    /* Route changes add whole subtrees at once; collect them across a frame and
       register in a single batched pass. */
    let pending: Element[] = [];
    let frame = 0;
    const flush = () => {
      frame = 0;
      const batch = pending;
      pending = [];
      register(batch);
    };
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          pending.push(node, ...Array.from(node.querySelectorAll(REVEAL_SELECTOR)));
        }
      }
      if (pending.length > 0 && frame === 0) frame = requestAnimationFrame(flush);
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
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
