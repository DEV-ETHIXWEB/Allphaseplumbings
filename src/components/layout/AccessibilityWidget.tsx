import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  Accessibility,
  ALargeSmall,
  Contrast,
  Link2,
  MousePointer2,
  Palette,
  PauseCircle,
  Phone,
  RotateCcw,
  Type,
  X,
} from "lucide-react";
import { isGoogleAdsPath } from "@/lib/page-type";

const GOOGLE_ADS_PHONE = "(206) 309-1088";
const GOOGLE_ADS_PHONE_HREF = "tel:2063091088";

interface A11ySettings {
  textZoom: 0 | 1 | 2;
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  pauseMotion: boolean;
  bigCursor: boolean;
}

const DEFAULTS: A11ySettings = {
  textZoom: 0,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  pauseMotion: false,
  bigCursor: false,
};

const STORAGE_KEY = "app-a11y-settings";

function applyToDocument(s: A11ySettings) {
  const el = document.documentElement;
  el.classList.toggle("a11y-zoom-1", s.textZoom === 1);
  el.classList.toggle("a11y-zoom-2", s.textZoom === 2);
  el.classList.toggle("a11y-contrast", s.highContrast);
  el.classList.toggle("a11y-grayscale", s.grayscale);
  el.classList.toggle("a11y-underline", s.underlineLinks);
  el.classList.toggle("a11y-readable-font", s.readableFont);
  el.classList.toggle("a11y-no-motion", s.pauseMotion);
  el.classList.toggle("a11y-big-cursor", s.bigCursor);
}

const ZOOM_LABELS = ["Off", "110%", "125%"] as const;

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useRouter().state.location;
  const onGoogleAdsPage = isGoogleAdsPath(location.pathname);
  const supportPhone = onGoogleAdsPage ? GOOGLE_ADS_PHONE : "(206) 772-6077";
  const supportPhoneHref = onGoogleAdsPage ? GOOGLE_ADS_PHONE_HREF : "tel:+12067726077";

  // Load persisted settings once on mount (client only)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = { ...DEFAULTS, ...JSON.parse(raw) } as A11ySettings;
        setSettings(stored);
        applyToDocument(stored);
      }
    } catch {
      /* corrupted storage — keep defaults */
    }
  }, []);

  const update = useCallback((patch: Partial<A11ySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      applyToDocument(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable (private mode) — settings still apply for session */
      }
      return next;
    });
  }, []);

  // Pause autoplaying media while "pause motion" is on, incl. after route changes
  useEffect(() => {
    if (!settings.pauseMotion) return;
    const t = window.setTimeout(() => {
      document.querySelectorAll("video").forEach((v) => v.pause());
    }, 400);
    return () => window.clearTimeout(t);
  }, [settings.pauseMotion, location.pathname]);

  // Escape closes panel and restores focus to the trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const activeCount =
    (settings.textZoom > 0 ? 1 : 0) +
    [
      settings.highContrast,
      settings.grayscale,
      settings.underlineLinks,
      settings.readableFont,
      settings.pauseMotion,
      settings.bigCursor,
    ].filter(Boolean).length;

  const toggleRow =
    "flex w-full min-h-[48px] items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-[14px] font-semibold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#1E3A6E]";
  const rowOff = "border-gray-200 bg-white text-[#1E3A6E] hover:bg-[#eef4fb]";
  const rowOn = "border-[#1E3A6E] bg-[#1E3A6E] text-white hover:bg-[#2a4a85]";

  const toggles: Array<{
    key: keyof Omit<A11ySettings, "textZoom">;
    label: string;
    icon: typeof Contrast;
  }> = [
    { key: "highContrast", label: "High contrast", icon: Contrast },
    { key: "grayscale", label: "Grayscale", icon: Palette },
    { key: "underlineLinks", label: "Underline links", icon: Link2 },
    { key: "readableFont", label: "Readable font", icon: Type },
    { key: "pauseMotion", label: "Pause animations", icon: PauseCircle },
    { key: "bigCursor", label: "Large cursor", icon: MousePointer2 },
  ];

  return (
    <div className="fixed bottom-[88px] left-4 z-[60] lg:bottom-6 lg:left-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility options"
          className="absolute bottom-[60px] left-0 w-[300px] max-w-[calc(100vw-32px)] rounded-xl border-2 border-[#1E3A6E] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center justify-between rounded-t-[10px] bg-[#1E3A6E] px-4 py-3">
            <h2 className="text-[15px] font-bold text-white">Accessibility Options</h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label="Close accessibility options"
              className="flex h-11 w-11 -mr-2 items-center justify-center rounded-lg text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#F5C842]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="max-h-[min(60vh,430px)] space-y-2 overflow-y-auto p-3">
            <button
              type="button"
              onClick={() => update({ textZoom: ((settings.textZoom + 1) % 3) as 0 | 1 | 2 })}
              aria-pressed={settings.textZoom > 0}
              className={`${toggleRow} ${settings.textZoom > 0 ? rowOn : rowOff}`}
            >
              <ALargeSmall className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex-1">Bigger text</span>
              <span
                className={`text-[12px] font-bold uppercase ${settings.textZoom > 0 ? "text-[#F5C842]" : "text-gray-500"}`}
              >
                {ZOOM_LABELS[settings.textZoom]}
              </span>
            </button>

            {toggles.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => update({ [key]: !settings[key] })}
                aria-pressed={settings[key]}
                className={`${toggleRow} ${settings[key] ? rowOn : rowOff}`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="flex-1">{label}</span>
                <span
                  className={`text-[12px] font-bold uppercase ${settings[key] ? "text-[#F5C842]" : "text-gray-500"}`}
                >
                  {settings[key] ? "On" : "Off"}
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                update({ ...DEFAULTS });
              }}
              className={`${toggleRow} ${rowOff} justify-center`}
            >
              <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Reset all</span>
            </button>
          </div>

          <div className="rounded-b-[10px] border-t border-gray-200 bg-[#eef4fb] px-4 py-3">
            <p className="text-[13px] font-medium text-[#1f2937]">
              Trouble using this site?{" "}
              <a
                href={supportPhoneHref}
                className="inline-flex items-center gap-1 font-bold text-[#1E3A6E] underline underline-offset-2 hover:text-[#2a4a85]"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Call {supportPhone}
              </a>
            </p>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Accessibility options${activeCount > 0 ? ` (${activeCount} active)` : ""}`}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#1E3A6E] text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#1E3A6E]"
      >
        <Accessibility className="h-6 w-6" aria-hidden="true" />
        {activeCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C842] text-[11px] font-black text-[#1E3A6E]"
          >
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
