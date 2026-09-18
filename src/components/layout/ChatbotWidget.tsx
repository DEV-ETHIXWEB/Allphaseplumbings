import { useState, useRef, useEffect, useCallback, Fragment, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { MessageCircle, X, Send, Phone, ArrowRight, RotateCcw } from "lucide-react";
import { useSiteOptions, useTrackedPhone } from "@/hooks/use-site-options";
import { sendLeadEmail } from "@/lib/lead-email.functions";
import { trackFormSubmit, trackAdsLeadConversion } from "@/lib/analytics";
import { ServicePicker } from "@/components/ui/ServicePicker";
import { useServicePicker } from "@/hooks/use-service-picker";
import { RESIDENTIAL_SERVICES } from "@/data/service-options";
import { ChatEngine, type EngineState } from "@/lib/chatbot/engine";
import type { BotMessage, ChatAction, LeadRequest, Turn } from "@/lib/chatbot/types";

/* ──────────────────────────────────────────────────────────────────────────
 * All Phase Chatbot Widget
 *
 * The UI shell for the rule-based assistant in src/lib/chatbot. The engine
 * decides what to say; this component paces the replies (typing indicator,
 * delay scaled to message length), renders the light markup, action buttons,
 * quick replies and the service picker, and delivers finished leads.
 * ────────────────────────────────────────────────────────────────────────── */

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  actions?: ChatAction[];
  tone?: BotMessage["tone"];
};

type Persisted = {
  v: 2;
  messages: Msg[];
  engine: EngineState;
  quickReplies: string[];
  showPicker: boolean;
  input: Turn["input"];
};

const STORAGE_KEY = "ap-chatbot-v2";
const DEFAULT_INPUT: Turn["input"] = { placeholder: "Type a message…", mode: "text" };

/**
 * Delivers a finished chatbot request through the same Resend-backed server
 * function the site forms use. Returns whether the email actually went out,
 * so the bot only tells the visitor "you're all set" when it's true.
 *
 * In-area requests report GA4 `form_submit` + the Google Ads lead conversion,
 * exactly like the forms. Out-of-area requests are still emailed so the team
 * can follow up, but are not counted as a conversion.
 */
async function deliverLead(lead: LeadRequest): Promise<boolean> {
  const { outOfArea, ...payload } = lead;

  if (!outOfArea) {
    trackFormSubmit({
      form_location: lead.source,
      form_type: "chatbot_booking",
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }

  try {
    const result = await sendLeadEmail({ data: payload });
    if (result.success && !outOfArea) trackAdsLeadConversion();
    return result.success;
  } catch (err) {
    console.error("Chatbot lead failed to send:", err);
    return false;
  }
}

function loadPersisted(): Persisted | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Persisted;
    return p && p.v === 2 && Array.isArray(p.messages) && p.engine ? p : null;
  } catch {
    return null;
  }
}

/** Renders the engine's tiny markup: **bold**, line breaks and "• " bullets. */
function RichText({ text }: { text: string }) {
  const inline = (line: string): ReactNode[] =>
    line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );

  const blocks = text.split(/\n{2,}/);
  return (
    <div className="flex flex-col gap-2">
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        return (
          <div key={bi} className="flex flex-col gap-1">
            {lines.map((line, li) =>
              line.startsWith("• ") ? (
                <div key={li} className="flex gap-2 pl-0.5">
                  <span className="text-[#4A7BC4]" aria-hidden="true">
                    •
                  </span>
                  <span>{inline(line.slice(2))}</span>
                </div>
              ) : (
                <p key={li}>{inline(line)}</p>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Circular avatar: white speech-bubble icon on the brand-navy disc, with a
   medium-blue ring so it separates from both the navy header and the light
   chat background. `ringWidth` thickens the ring for the large launcher
   size so the brand ring reads clearly at rest, not just up close. */
function MascotAvatar({
  size = 44,
  ring = true,
  ringWidth = 2.5,
}: {
  size?: number;
  ring?: boolean;
  ringWidth?: number;
}) {
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // Conversation state
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [inputSpec, setInputSpec] = useState<Turn["input"]>(DEFAULT_INPUT);
  const servicePicker = useServicePicker();

  // Comic bubble lifecycle
  const [hintShown, setHintShown] = useState(false);
  const [hintGone, setHintGone] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const engineRef = useRef<ChatEngine | null>(null);
  const nextId = useRef(1);
  const busy = useRef(false);

  const biz = {
    phone: trackedPhone.phone,
    email: opts.email,
    address: `${opts.address_line1}, ${opts.address_city}, ${opts.address_state} ${opts.address_zip}`,
  };

  const engine = useCallback((): ChatEngine => {
    if (!engineRef.current) engineRef.current = new ChatEngine({ biz });
    return engineRef.current;
    // biz is rebuilt each render; the engine only needs the values at creation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Show a turn: bot bubbles appear one at a time behind a typing indicator
     (paced by length so it reads naturally), then the quick replies / picker. */
  const playTurn = useCallback(
    (turn: Turn, onDone?: () => void) => {
      busy.current = true;
      setQuickReplies([]);
      setShowPicker(false);
      let elapsed = 0;
      turn.messages.forEach((m, i) => {
        const delay = Math.min(1500, 450 + m.text.length * 7) + (i === 0 ? 0 : 250);
        elapsed += delay;
        timers.current.push(
          setTimeout(() => setTyping(true), elapsed - delay + (i === 0 ? 0 : 150)),
        );
        timers.current.push(
          setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [
              ...prev,
              { id: nextId.current++, from: "bot", text: m.text, actions: m.actions, tone: m.tone },
            ]);
          }, elapsed),
        );
      });
      timers.current.push(
        setTimeout(() => {
          setQuickReplies(turn.quickReplies);
          setShowPicker(turn.showServicePicker);
          setInputSpec(turn.input);
          if (turn.showServicePicker) servicePicker.reset();
          busy.current = false;
          if (onDone) onDone();
          else if (typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches)
            inputRef.current?.focus();
        }, elapsed + 30),
      );
    },
    [servicePicker],
  );

  /* A turn that carries a finished lead: show its messages, send the email
     (typing indicator while it's in flight), then show the real outcome. */
  const runTurn = useCallback(
    (turn: Turn) => {
      if (!turn.lead) {
        playTurn(turn);
        return;
      }
      const lead = turn.lead;
      playTurn(turn, () => {
        busy.current = true;
        setTyping(true);
        void deliverLead(lead).then((ok) => {
          setTyping(false);
          runTurn(engine().leadDelivered(ok));
        });
      });
    },
    [engine, playTurn],
  );

  // Start (or restore) the conversation when the panel first opens.
  useEffect(() => {
    if (!open || messages.length > 0) return;
    const saved = loadPersisted();
    if (saved && saved.messages.length) {
      engineRef.current = new ChatEngine({ biz, state: saved.engine });
      nextId.current = Math.max(...saved.messages.map((m) => m.id)) + 1;
      setMessages(saved.messages);
      setQuickReplies(saved.quickReplies);
      setShowPicker(saved.showPicker);
      setInputSpec(saved.input ?? DEFAULT_INPUT);
      return;
    }
    runTurn(engine().start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Persist the conversation for this tab so a page reload doesn't wipe it.
  useEffect(() => {
    if (!messages.length || !engineRef.current || typing) return;
    try {
      const data: Persisted = {
        v: 2,
        messages: messages.slice(-100),
        engine: engineRef.current.state,
        quickReplies,
        showPicker,
        input: inputSpec,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable (private mode, quota) — chat still works */
    }
  }, [messages, quickReplies, showPicker, inputSpec, typing]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open, quickReplies, showPicker]);

  // Comic bubble pop-up timing
  useEffect(() => {
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

  function restart() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    busy.current = false;
    setTyping(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    engineRef.current = new ChatEngine({ biz });
    setMessages([]);
    setQuickReplies([]);
    setShowPicker(false);
    setInputSpec(DEFAULT_INPUT);
    servicePicker.reset();
    runTurn(engineRef.current.start());
  }

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy.current) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: trimmed }]);
    setInput("");
    runTurn(engine().send(trimmed));
  }

  function handlePickerContinue() {
    if (busy.current) return;
    const services = servicePicker.resolve();
    if (!services) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: services.join(", ") }]);
    servicePicker.reset();
    runTurn(engine().pickServices(services));
  }

  function followLink(e: React.MouseEvent, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    router.history.push(href);
    // On phones the panel covers the page, so get out of the way.
    if (typeof window !== "undefined" && window.innerWidth < 640) closeChat();
  }

  function renderAction(a: ChatAction, i: number, tone?: BotMessage["tone"]) {
    if (a.type === "call") {
      return (
        <a
          key={i}
          href={trackedPhone.phone_href}
          className={`inline-flex items-center gap-2 px-3.5 py-2 text-[13.5px] font-bold shadow-sm transition-transform hover:scale-105 active:scale-95 ${
            tone === "alert" ? "bg-[#ef4444] text-white" : "bg-[#F5C842] text-[#1E3A6E]"
          }`}
        >
          <Phone className="size-4" strokeWidth={2.4} />
          {a.label ?? `Call ${trackedPhone.phone}`}
        </a>
      );
    }
    return (
      <a
        key={i}
        href={a.href}
        onClick={(e) => followLink(e, a.href)}
        className="inline-flex items-center gap-1.5 border border-[#1E3A6E]/20 bg-[#eef4fb] px-3 py-2 text-[13px] font-semibold text-[#1E3A6E] transition-colors hover:bg-[#1E3A6E] hover:text-white"
      >
        {a.label}
        <ArrowRight className="size-3.5" />
      </a>
    );
  }

  const bubbleTone = (tone?: BotMessage["tone"]) =>
    tone === "alert"
      ? "border-l-4 border-[#ef4444] bg-[#fff5f5]"
      : tone === "success"
        ? "border-l-4 border-[#22c55e] bg-[#f3fbf6]"
        : "bg-white";

  return (
    <div className="ap-chatbot-root fixed bottom-[88px] right-4 z-[60] flex flex-col items-end sm:right-6 lg:bottom-6">
      {/* ── Chat panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="All Phase chat assistant"
          className={`ap-chat-panel ap-chat-radius ${closing ? "ap-chat-out" : "ap-chat-in"}
                     mb-3 flex h-[min(680px,calc(100dvh-116px))] sm:h-[min(680px,calc(100dvh-120px))] w-[min(440px,calc(100vw-2rem))] flex-col
                     overflow-hidden border border-black/10 bg-white
                     shadow-[0_24px_60px_-12px_rgba(15,34,70,0.5)]`}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-white sm:gap-3 sm:px-4 sm:py-3.5"
            style={{ background: "linear-gradient(135deg,#0f2246 0%,#1E3A6E 55%,#2d5fa8 100%)" }}
          >
            <span className="sm:hidden">
              <MascotAvatar size={38} />
            </span>
            <span className="hidden sm:inline-block">
              <MascotAvatar size={48} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-bold leading-tight sm:text-[17px]">
                All Phase Assistant
              </p>
              <p className="flex min-w-0 items-center gap-1.5 text-[12.5px] text-white/80 sm:text-[13px]">
                <span className="relative flex size-2 shrink-0">
                  <span className="ap-circle absolute inline-flex size-full animate-ping bg-[#4ade80] opacity-75" />
                  <span className="ap-circle relative inline-flex size-2 bg-[#4ade80]" />
                </span>
                <span className="truncate">Online · replies instantly</span>
              </p>
            </div>
            <button
              type="button"
              onClick={restart}
              aria-label="Start a new conversation"
              title="Start over"
              className="ap-icon-btn inline-flex size-9 items-center justify-center text-white/80 transition-colors duration-200 hover:bg-white/15 hover:text-white active:scale-90"
            >
              <RotateCcw className="size-5" />
            </button>
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
          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 space-y-3.5 overflow-y-auto bg-[#f4f7fb] px-4 py-4"
          >
            {messages.map((m) =>
              m.from === "bot" ? (
                <div key={m.id} className="ap-msg flex items-end gap-2" data-from="bot">
                  <MascotAvatar size={32} ring={false} />
                  <div
                    className={`max-w-[82%] px-4 py-3 text-[15px] leading-snug text-[#1E3A6E] shadow-sm ${bubbleTone(m.tone)}`}
                  >
                    <RichText text={m.text} />
                    {m.actions?.length ? (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.actions.map((a, i) => renderAction(a, i, m.tone))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="ap-msg flex justify-end" data-from="user">
                  <div className="max-w-[80%] whitespace-pre-wrap break-words bg-[#1E3A6E] px-4 py-3 text-[15px] leading-snug text-white shadow-sm">
                    {m.text}
                  </div>
                </div>
              ),
            )}

            {typing && (
              <div className="ap-msg flex items-end gap-2" aria-label="Assistant is typing">
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

          {/* Quick replies */}
          {quickReplies.length > 0 && !typing && !showPicker && (
            <div className="flex max-h-[112px] flex-wrap gap-2 overflow-y-auto border-t border-black/5 bg-white px-4 pt-3.5">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="border border-[#1E3A6E]/25 bg-[#eef4fb] px-3.5 py-2 text-[13.5px] font-semibold text-[#1E3A6E] transition-all duration-200 hover:scale-105 hover:bg-[#1E3A6E] hover:text-white active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Service picker (service step): icon-button MCQ, multi-select,
             with an Other chip that reveals free text. Typing an answer in
             the composer instead still works (the engine parses it). */}
          {showPicker && !typing && (
            <div className="max-h-[46%] overflow-y-auto border-t border-black/5 bg-white px-4 pt-3.5 pb-1">
              <ServicePicker
                options={RESIDENTIAL_SERVICES}
                selected={servicePicker.selected}
                onToggle={servicePicker.toggle}
                otherText={servicePicker.otherText}
                onOtherTextChange={servicePicker.setOtherText}
                error={servicePicker.error}
                theme="light"
                ariaLabel="What type of service do you need?"
                columns="grid-cols-2"
              />
              <button
                type="button"
                onClick={handlePickerContinue}
                disabled={servicePicker.selected.length === 0}
                className="mt-2.5 mb-1 w-full border border-[#1E3A6E]/25 bg-[#1E3A6E] px-4 py-2.5 text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#16305c] active:scale-95 disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          )}

          {/* Composer */}
          <form
            className="flex items-center gap-2 bg-white p-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
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
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputSpec.placeholder}
              inputMode={inputSpec.mode === "numeric" ? "numeric" : inputSpec.mode}
              autoComplete={
                inputSpec.mode === "tel" ? "tel" : inputSpec.mode === "email" ? "email" : "off"
              }
              maxLength={1000}
              aria-label="Message"
              className="min-w-0 flex-1 border-2 border-[#1E3A6E]/15 bg-[#f4f7fb] px-4 py-3 text-[15px] text-[#1E3A6E] placeholder:text-gray-400 transition-colors duration-200 focus:border-[#1E3A6E] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || typing}
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
            hintShown
              ? "scale-100 opacity-100 translate-y-0"
              : "pointer-events-none scale-90 opacity-0 translate-y-2"
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
        // On phones the open panel's own close button replaces the launcher,
        // which frees that space for the conversation.
        className={`ap-launcher group relative ${open ? "max-sm:hidden" : ""} flex items-center justify-center transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95`}
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
