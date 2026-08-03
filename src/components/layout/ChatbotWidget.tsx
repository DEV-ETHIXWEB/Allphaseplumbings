import { useState, useRef, useEffect, ReactNode } from "react";
import { MessageCircle, X, Send, Phone, MapPin } from "lucide-react";
import { useSiteOptions, useTrackedPhone } from "@/hooks/use-site-options";
import { sendLeadEmail } from "@/lib/lead-email.functions";
import { trackFormSubmit, trackAdsLeadConversion } from "@/lib/analytics";

/* ──────────────────────────────────────────────────────────────────────────
 * All Phase Chatbot Widget with Conversational Flow
 * ────────────────────────────────────────────────────────────────────────── */

type Msg = { from: "bot" | "user"; text: string | ReactNode };

type ChatFlowState =
  | "INIT"
  | "BOOK_NAME"
  | "BOOK_PHONE"
  | "BOOK_EMAIL"
  | "BOOK_ZIP"
  | "BOOK_TYPE"
  | "HOURS_ZIP"
  | "ASK_RESTART"
  | "DONE";

type UserData = {
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  type?: string;
};

const QUICK_REPLIES = ["Book a service", "Emergency help", "Get a quote", "Hours & areas"];

/**
 * Deliver a completed chatbot booking to the shop team through the same
 * Resend-backed server function the site forms use, so chat leads are no longer
 * silently dropped. Fire-and-forget: a send failure is logged but never
 * interrupts the conversation (mirrors the forms' "never block the user" rule).
 *
 * In-area bookings also report GA4 `form_submit` + the Google Ads lead
 * conversion, exactly like the forms, so chat leads are attributed to the
 * campaign. Out-of-area leads (ZIP outside the service area) are still emailed
 * so the team can honor the bot's "we'll reach out" promise, but are NOT
 * counted as a conversion.
 */
async function submitChatbotLead(
  data: UserData,
  { outOfArea = false }: { outOfArea?: boolean } = {},
): Promise<void> {
  const source = outOfArea ? "Chatbot Booking (Out of Area)" : "Chatbot Booking";

  if (!outOfArea) {
    trackFormSubmit({
      form_location: source,
      form_type: "chatbot_booking",
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }

  try {
    const result = await sendLeadEmail({
      data: {
        source,
        name: data.name,
        phone: data.phone,
        email: data.email,
        zip: data.zip,
        service: data.type,
      },
    });
    if (result.success && !outOfArea) {
      trackAdsLeadConversion();
    }
  } catch (err) {
    console.error("Chatbot lead failed to send:", err);
  }
}

/* Circular avatar: white speech-bubble icon on the brand-navy disc, with a
   medium-blue ring so it separates from both the navy header and the light
   chat background. `ringWidth` thickens the ring for the large launcher
   size so the brand ring reads clearly at rest, not just up close. */
function MascotAvatar({ size = 44, ring = true, ringWidth = 2.5 }: { size?: number; ring?: boolean; ringWidth?: number }) {
  return (
    <span
      className="ap-circle relative inline-block shrink-0"
      style={{
        width: size,
        height: size,
        padding: ring ? ringWidth : 0,
        background: ring ? "#6B9FE4" : "transparent",
      }}
    >
      <span
        className="ap-circle flex h-full w-full items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f2246 0%,#1E3A6E 55%,#2d5fa8 100%)" }}
        aria-hidden="true"
      >
        <MessageCircle className="h-[55%] w-[55%] text-white" strokeWidth={2} />
      </span>
    </span>
  );
}

export function ChatbotWidget() {
  const opts = useSiteOptions();
  const trackedPhone = useTrackedPhone();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // State for conversation
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [flowState, setFlowState] = useState<ChatFlowState>("INIT");
  const [userData, setUserData] = useState<UserData>({});

  // Comic bubble lifecycle
  const [hintShown, setHintShown] = useState(false);
  const [hintGone, setHintGone] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Initialize greeting when opening
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text: "Hi there! I'm the All Phase assistant. How can I help with your plumbing today?",
        },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  // Comic bubble pop-up timing
  useEffect(() => {
    // Show quick popup shortly after load
    const t1 = setTimeout(() => setHintShown(true), 1000);
    return () => clearTimeout(t1);
  }, []);

  // Clean up any pending reply timers on unmount.
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function openChat() {
    setHintShown(false);
    setHintGone(true);
    setOpen(true);
  }

  function closeChat() {
    setClosing(true);
    const t = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 220);
    timers.current.push(t);
  }

  function addBotMsg(content: string | ReactNode, delay = 600) {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: content }]);
    }, delay);
    timers.current.push(t);
  }

  function handleInput(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Add user message immediately
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");

    switch (flowState) {
      case "INIT":
        handleInitChoice(trimmed);
        break;

      case "BOOK_NAME":
        if (trimmed.length < 2 || !/^[a-zA-Z\s]+$/.test(trimmed)) {
          addBotMsg("Please enter a valid name (letters and spaces only).");
          return;
        }
        setUserData((prev) => ({ ...prev, name: trimmed }));
        setFlowState("BOOK_PHONE");
        addBotMsg(`Thanks, ${trimmed}. What is the best phone number to reach you?`);
        break;

      case "BOOK_PHONE":
        const digits = trimmed.replace(/\D/g, "");
        if (digits.length !== 10) {
          addBotMsg("Please enter a valid 10-digit phone number.");
          return;
        }
        setUserData((prev) => ({ ...prev, phone: trimmed }));
        setFlowState("BOOK_EMAIL");
        addBotMsg("Got it. And your email address?");
        break;

      case "BOOK_EMAIL":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          addBotMsg("Please enter a valid email address.");
          return;
        }
        setUserData((prev) => ({ ...prev, email: trimmed }));
        setFlowState("BOOK_ZIP");
        addBotMsg("Thanks! What is your zip code?");
        break;

      case "BOOK_ZIP":
        if (!/^\d{5}$/.test(trimmed)) {
          addBotMsg("Please enter a valid 5-digit zip code.");
          return;
        }
        setUserData((prev) => ({ ...prev, zip: trimmed }));
        // 98xxx is Washington State. Just an example validation for our service areas.
        if (!/^98\d{3}$/.test(trimmed)) {
           setFlowState("ASK_RESTART");
           // Still a real lead — name/phone/email were already captured, so email
           // the team (flagged out-of-area, not counted as a conversion) to honor
           // the "we'll reach out" promise. userData lacks the just-typed zip
           // (setUserData is async), so pass it explicitly.
           void submitChatbotLead({ ...userData, zip: trimmed }, { outOfArea: true });
           addBotMsg(
             <div className="flex flex-col gap-2">
               <p>We are not serving there currently but we will reach you out for solution.</p>
               <p className="mt-1 font-semibold">Is there anything else I can help you with?</p>
             </div>
           );
           return;
        }
        setFlowState("BOOK_TYPE");
        addBotMsg("Perfect. Finally, what type of service do you need?");
        break;

      case "BOOK_TYPE": {
        const newData = { ...userData, type: trimmed };
        setUserData(newData);
        setFlowState("ASK_RESTART");
        // Deliver the completed booking to the shop team (Resend email + analytics).
        void submitChatbotLead(newData);
        addBotMsg(
          <div className="flex flex-col gap-2">
            <p>Thank you! We've received your request for {newData.type}. Our team will contact you shortly at {newData.phone} or {newData.email} to confirm your appointment.</p>
            <p className="mt-1 font-semibold">Is there anything else I can help you with?</p>
          </div>
        );
        break;
      }

      case "HOURS_ZIP":
        if (!/^\d{5}$/.test(trimmed)) {
          addBotMsg("Please enter a valid 5-digit zip code.");
          return;
        }
        setFlowState("ASK_RESTART");
        if (!/^98\d{3}$/.test(trimmed)) {
           addBotMsg(
             <div className="flex flex-col gap-2">
               <p>We are not serving there currently but we will reach you out for solution.</p>
               <p className="mt-1 font-semibold">Is there anything else I can help you with?</p>
             </div>
           );
           return;
        }
        // Simulate checking zip against available service areas
        addBotMsg(
          <div className="flex flex-col gap-2">
            <p>Yes, we serve the {trimmed} area! Here are some of our primary service zones:</p>
            <div className="flex flex-col gap-1.5 mt-1">
              <a href="/service-areas" className="flex items-center gap-2 text-[14px] text-[#4A7BC4] hover:underline font-medium">
                <MapPin className="size-4" /> Greater Seattle
              </a>
              <a href="/service-areas" className="flex items-center gap-2 text-[14px] text-[#4A7BC4] hover:underline font-medium">
                <MapPin className="size-4" /> Tukwila
              </a>
              <a href="/service-areas" className="flex items-center gap-2 text-[14px] text-[#4A7BC4] hover:underline font-medium">
                <MapPin className="size-4" /> Bellevue
              </a>
            </div>
            <p className="text-[13px] italic">We are available 24/7 for all areas.</p>
            <p className="mt-1 font-semibold">Is there anything else I can help you with?</p>
          </div>
        );
        break;

      case "ASK_RESTART":
        const ans = trimmed.toLowerCase();
        if (ans === "yes" || ans === "y") {
          // Clear chat and restart
          setMessages([
            {
              from: "bot",
              text: "Hi there! I'm the All Phase assistant. How can I help with your plumbing today?",
            },
          ]);
          setUserData({});
          setFlowState("INIT");
        } else if (ans === "no" || ans === "n") {
          // Close chat immediately
          closeChat();
        } else {
          addBotMsg("Please answer Yes or No. Is there anything else I can help you with?");
        }
        break;

      default:
        addBotMsg("If you need more help, please call us directly or use the contact form!");
        break;
    }
  }

  function handleInitChoice(choice: string) {
    const c = choice.toLowerCase();

    if (c.includes("book")) {
      setFlowState("BOOK_NAME");
      addBotMsg("Great! Let's get you booked. To start, what is your name?");
    } else if (c.includes("emergency") || c.includes("urgent")) {
      setFlowState("ASK_RESTART");
      addBotMsg(
        <div className="flex flex-col gap-2">
          <p>This is an emergency! We are available 24/7.</p>
          <p>Tap below to call us immediately, and we'll dispatch a technician.</p>
          <a
            href={trackedPhone.phone_href}
            onClick={() => {
              // Trigger email logic for emergency
              window.location.href = `mailto:${opts.email}?subject=EMERGENCY PLUMBING HELP&body=I need immediate plumbing help!`;
            }}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-[#ef4444] px-4 py-2 text-[14px] font-bold text-white shadow-md transition-transform hover:scale-105"
          >
            <Phone className="size-4" /> Call Now
          </a>
          <p className="mt-2 font-semibold">Is there anything else I can help you with?</p>
        </div>
      );
    } else if (c.includes("quote")) {
      setFlowState("ASK_RESTART");
      addBotMsg(
        <div className="flex flex-col gap-2">
          <p>We give flat-rate, upfront quotes with no surprises.</p>
          <a
            href="/contact"
            className="mt-1 inline-block bg-[#1E3A6E] px-4 py-2 text-center text-[14px] font-bold text-white transition-transform hover:scale-105"
          >
            Go to Quote Form
          </a>
          <p className="mt-2 font-semibold">Is there anything else I can help you with?</p>
        </div>
      );
    } else if (c.includes("hour") || c.includes("area")) {
      setFlowState("HOURS_ZIP");
      addBotMsg("We proudly serve many areas. What is your zip code to check availability?");
    } else {
      setFlowState("ASK_RESTART");
      addBotMsg(
        <div className="flex flex-col gap-2">
          <p>Thanks for your message! A team member will follow up shortly. In the meantime, you can call us any time for immediate help.</p>
          <p className="mt-1 font-semibold">Is there anything else I can help you with?</p>
        </div>
      );
    }
  }

  return (
    <div className="ap-chatbot-root fixed bottom-[88px] right-4 z-[60] flex flex-col items-end sm:right-6 lg:bottom-6">
      {/* ── Chat panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="All Phase chat assistant"
          className={`ap-chat-panel ap-chat-radius ${closing ? "ap-chat-out" : "ap-chat-in"}
                     mb-3 flex h-[min(680px,calc(100dvh-120px))] w-[min(440px,calc(100vw-2rem))] flex-col
                     overflow-hidden border border-black/10 bg-white
                     shadow-[0_24px_60px_-12px_rgba(15,34,70,0.5)]`}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 text-white"
            style={{ background: "linear-gradient(135deg,#0f2246 0%,#1E3A6E 55%,#2d5fa8 100%)" }}
          >
            <MascotAvatar size={48} />
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-bold leading-tight">All Phase Assistant</p>
              <p className="flex items-center gap-1.5 text-[13px] text-white/80">
                <span className="relative flex size-2">
                  <span className="ap-circle absolute inline-flex size-full animate-ping bg-[#4ade80] opacity-75" />
                  <span className="ap-circle relative inline-flex size-2 bg-[#4ade80]" />
                </span>
                Online · replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
              className="ap-icon-btn inline-flex size-9 items-center justify-center text-white/80 transition-colors duration-200 hover:bg-white/15 hover:text-white active:scale-90"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto bg-[#f4f7fb] px-4 py-4">
            {messages.map((m, i) =>
              m.from === "bot" ? (
                <div key={i} className="ap-msg flex items-end gap-2">
                  <MascotAvatar size={32} ring={false} />
                  <div className="max-w-[80%] bg-white px-4 py-3 text-[15px] leading-snug text-[#1E3A6E] shadow-sm">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="ap-msg flex justify-end">
                  <div className="max-w-[80%] bg-[#1E3A6E] px-4 py-3 text-[15px] leading-snug text-white shadow-sm">
                    {m.text}
                  </div>
                </div>
              ),
            )}

            {typing && (
              <div className="ap-msg flex items-end gap-2">
                <MascotAvatar size={32} ring={false} />
                <div className="flex items-center gap-1 bg-white px-3.5 py-3 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="ap-circle size-1.5 bg-[#4A7BC4]"
                      style={{ animation: `apChatDot 1s ${d * 0.15}s infinite ease-in-out` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick replies (only show when INIT or ASK_RESTART) */}
          {(flowState === "INIT" || flowState === "ASK_RESTART") && !typing && (
            <div className="flex flex-wrap gap-2 border-t border-black/5 bg-white px-4 pt-3.5">
              {(flowState === "INIT" ? QUICK_REPLIES : ["Yes", "No"]).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleInput(q)}
                  className="border border-[#1E3A6E]/25 bg-[#eef4fb] px-3.5 py-2 text-[13.5px] font-semibold text-[#1E3A6E] transition-all duration-200 hover:scale-105 hover:bg-[#1E3A6E] hover:text-white active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            className="flex items-center gap-2 bg-white p-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleInput(input);
            }}
          >
            <a
              href={trackedPhone.phone_href}
              aria-label="Call us"
              className="inline-flex size-11 shrink-0 items-center justify-center bg-[#F5C842] text-[#1E3A6E] transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <Phone className="size-5" strokeWidth={2.4} />
            </a>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="min-w-0 flex-1 border-2 border-[#1E3A6E]/15 bg-[#f4f7fb] px-4 py-3 text-[15px] text-[#1E3A6E] placeholder:text-gray-400 transition-colors duration-200 focus:border-[#1E3A6E] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim()}
              className="inline-flex size-11 shrink-0 items-center justify-center bg-[#1E3A6E] text-white transition-all duration-200 hover:scale-110 hover:bg-[#16305c] active:scale-95 disabled:scale-100 disabled:opacity-40"
            >
              <Send className="size-5" />
            </button>
          </form>
        </div>
      )}

      {/* ── "Need plumbing help?" speech bubble ── */}
      {!open && !hintGone && (
        <div
          className={`ap-hint-wrap mb-3 mr-1 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            hintShown ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-90 opacity-0 translate-y-2"
          }`}
        >
          <button
            onClick={openChat}
            className="ap-circle-bubble ap-hint-bubble relative bg-white px-5 py-3 text-[14px] font-bold text-[#1E3A6E] shadow-[0_12px_30px_-8px_rgba(15,34,70,0.45)] ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(15,34,70,0.55)] active:scale-95"
          >
            Need plumbing help?
            {/* tail pointing down toward the launcher */}
            <span className="absolute -bottom-1 right-7 size-3 rotate-45 bg-white ring-1 ring-black/5" />
          </button>
        </div>
      )}

      {/* ── Floating launcher ── */}
      <button
        type="button"
        onClick={() => (open ? closeChat() : openChat())}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="ap-launcher group relative flex items-center justify-center transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95"
      >
        <span className="ap-launcher-glow" aria-hidden="true" />
        <span className="relative grid place-items-center">
          <span
            className={`ap-icon-swap ${open ? "" : "ap-icon-swap-out"} absolute inset-0 grid place-items-center`}
          >
            <span
              className="ap-circle flex size-[58px] sm:size-[84px] items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg,#0f2246,#2d5fa8)" }}
            >
              <X className="size-6 sm:size-8" />
            </span>
          </span>
          <span className={`ap-icon-swap ${open ? "ap-icon-swap-out" : ""}`}>
            {/* Smaller launcher on phones so it doesn't dominate the screen;
                full size from sm up. Thicker gradient ring (ringWidth) so the
                brand halo reads clearly at rest, not just up close. */}
            <span className="relative inline-block sm:hidden">
              <MascotAvatar size={58} ringWidth={4} />
              <span className="absolute right-0 top-0 flex size-4">
                <span className="ap-circle absolute inline-flex size-full animate-ping bg-[#4ade80] opacity-75" />
                <span className="ap-circle relative inline-flex size-4 border-2 border-white bg-[#4ade80]" />
              </span>
            </span>
            <span className="relative hidden sm:inline-block">
              <MascotAvatar size={84} ringWidth={5} />
              <span className="absolute right-0.5 top-0.5 flex size-[18px]">
                <span className="ap-circle absolute inline-flex size-full animate-ping bg-[#4ade80] opacity-75" />
                <span className="ap-circle relative inline-flex size-[18px] border-2 border-white bg-[#4ade80]" />
              </span>
            </span>
          </span>
        </span>
      </button>

      <style>{`
        /* The site forces sharp corners globally ([class*="rounded-"] -> 0
           !important). Re-enable rounded/circular shapes ONLY for specific elements. */
        .ap-chatbot-root .ap-circle { border-radius: 50% !important; }
        .ap-chatbot-root .ap-circle-bubble { border-radius: 9999px !important; }
        .ap-chatbot-root .ap-chat-radius { border-radius: 22px !important; }
        .ap-chatbot-root .ap-icon-btn { border-radius: 9999px !important; }

        .ap-chat-panel { transform-origin: bottom right; will-change: transform, opacity; }
        .ap-chat-in { animation: apChatPop 0.34s cubic-bezier(0.34, 1.4, 0.64, 1) both; }
        .ap-chat-out { animation: apChatHide 0.22s cubic-bezier(0.4, 0, 1, 1) both; }
        @keyframes apChatPop {
          0%   { opacity: 0; transform: scale(0.4) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes apChatHide {
          0%   { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.55) translateY(20px); }
        }
        .ap-msg { animation: apMsgIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes apMsgIn {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes apChatDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        /* Launcher glow ring: soft brand-navy/gold halo behind the button,
           on at rest (not just hover) so the launcher reads as a premium
           "always on" affordance even in a static screenshot, with a slow
           breathing pulse and a brighter flare on hover/focus. */
        .ap-launcher-glow {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(107,159,228,0.6) 0%, rgba(30,58,110,0.28) 55%, transparent 72%);
          filter: blur(10px);
          opacity: 0.85;
          animation: apGlowPulse 3.6s ease-in-out infinite;
          transition: opacity 0.25s ease, filter 0.25s ease;
          pointer-events: none;
        }
        .ap-launcher:hover .ap-launcher-glow,
        .ap-launcher:focus-visible .ap-launcher-glow {
          opacity: 1;
          filter: blur(12px);
        }
        @keyframes apGlowPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .ap-launcher > span.relative {
          filter: drop-shadow(0 16px 30px rgba(15,34,70,0.55)) drop-shadow(0 4px 10px rgba(107,159,228,0.3));
          transition: filter 0.2s ease;
        }
        .ap-launcher:hover > span.relative {
          filter: drop-shadow(0 20px 38px rgba(15,34,70,0.65)) drop-shadow(0 6px 14px rgba(107,159,228,0.4));
        }
        @media (prefers-reduced-motion: reduce) {
          .ap-launcher-glow { animation: none; opacity: 0.85; }
        }

        /* Icon swap: chat bubble <-> close X, rotate/fade through the center
           instead of an abrupt visibility toggle. */
        .ap-icon-swap {
          transition: opacity 0.22s cubic-bezier(0.22, 1, 0.36, 1), transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .ap-icon-swap-out {
          opacity: 0;
          transform: scale(0.6) rotate(45deg);
          pointer-events: none;
        }

        /* Speech bubble: gentle idle float so it reads as alive, not static. */
        .ap-hint-bubble { animation: apHintFloat 3.2s ease-in-out 0.6s infinite; }
        @keyframes apHintFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ap-chat-in, .ap-chat-out, .ap-msg, .ap-hint-bubble, .ap-icon-swap { animation: none; transition: none; }
        }
      `}</style>
    </div>
  );
}
