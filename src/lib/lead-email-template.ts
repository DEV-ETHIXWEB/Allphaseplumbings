/**
 * lead-email-template.ts
 *
 * Builds the subject / HTML / plain-text body of a lead email. Kept free of
 * server-only imports so it can be unit-tested (see scripts/chatbot-tests)
 * and so the site forms and the chatbot render through the exact same code.
 *
 * The chatbot-only fields (urgency, preferredTime, message, areaNote,
 * transcript) are optional: when a form doesn't send them, nothing about its
 * email changes.
 */

export interface LeadPayload {
  /** Which page/form the lead came from, e.g. "Contact Page". */
  source?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  zip?: string;
  city?: string;
  /**
   * Which service(s) the visitor picked from the icon-button MCQ picker.
   * A plain string is still accepted (older callers) — the builder normalizes
   * either shape before rendering the email. A chosen "Other" is expected to
   * already be formatted as "Other: <what they typed>" by the client (see
   * useServicePicker).
   */
  service?: string | string[];
  /** "residential" | "commercial" where the form distinguishes. */
  serviceType?: string;
  smsOptIn?: boolean;
  /** Chatbot: e.g. "EMERGENCY: call back immediately" or "ASAP". */
  urgency?: string;
  /** Chatbot: when the customer would like the visit ("Tomorrow (morning)"). */
  preferredTime?: string;
  /** Chatbot: the problem in the customer's own words. */
  message?: string;
  /** Chatbot: coverage caveat, e.g. "Edge of service area: please confirm". */
  areaNote?: string;
  /** Chatbot: the conversation, one "Customer: …" / "Bot: …" line per message. */
  transcript?: string;
}

const HTML_ESCAPES: Record<string, string> = { "<": "&lt;", ">": "&gt;", "&": "&amp;" };
export function esc(value: string): string {
  return value.replace(/[<>&]/g, (c) => HTML_ESCAPES[c]);
}

/** Caps free-text fields so an oversized (or abusive) payload can't bloat the email. */
function clip(v: string | undefined, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

export function buildLeadEmail(raw: LeadPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const data: LeadPayload = {
    ...raw,
    urgency: clip(raw.urgency, 120),
    preferredTime: clip(raw.preferredTime, 120),
    message: clip(raw.message, 1500),
    areaNote: clip(raw.areaNote, 200),
    // Keep the end of a long chat: that's where the request itself is.
    transcript:
      typeof raw.transcript === "string" && raw.transcript.length > 8000
        ? `…${raw.transcript.slice(-8000)}`
        : raw.transcript,
  };
  const fullName =
    data.name?.trim() ||
    [data.firstName, data.lastName].filter(Boolean).join(" ").trim() ||
    "Website lead";

  // The service picker sends an array when one or more chips are selected
  // (MCQ, so multiple is normal); older/simpler callers may still send a
  // single string. Normalize to a clean array either way.
  const services = (Array.isArray(data.service) ? data.service : [data.service])
    .filter((s): s is string => !!s && s.trim().length > 0)
    .map((s) => s.trim());
  const serviceSummary = services.join(", ");
  const emergency = /emergency/i.test(data.urgency ?? "");

  // Ordered field list; blanks are dropped so each email only shows what was
  // actually filled in (forms vary — some have email, some ZIP, etc.).
  const fields: [string, string | undefined][] = [
    ["Name", fullName],
    ["Urgency", data.urgency],
    ["Phone", data.phone],
    ["Email", data.email],
    ["ZIP code", data.zip],
    ["City", data.city],
    ["Service area check", data.areaNote],
    ["Preferred time", data.preferredTime],
    ["Problem details", data.message],
    ["Request type", data.serviceType],
    ["SMS opt-in", data.smsOptIn ? "Yes" : undefined],
    ["Submitted from", data.source],
  ];
  const shown = fields.filter(([, v]) => v && v.toString().trim());

  const fieldRow = (k: string, v: string, highlight = false) =>
    `<tr>` +
    `<td style="padding:9px 14px;background:${highlight ? "#fdecec" : "#f4f7fb"};font-weight:700;color:${highlight ? "#b91c1c" : "#1E3A6E"};border-bottom:1px solid #e6edf6;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
    `<td style="padding:9px 14px;color:${highlight ? "#b91c1c" : "#222"};${highlight ? "font-weight:700;" : ""}border-bottom:1px solid #e6edf6;white-space:pre-wrap">${v}</td>` +
    `</tr>`;

  // Services render as their own tag-styled row (one email column, one or
  // more visual chips inside it) rather than a plain comma-joined string,
  // so a multi-select submission is still easy to scan at a glance. Placed
  // right after Name so what they need reads before the rest of the fields.
  const serviceChips = services
    .map(
      (s) =>
        `<span style="display:inline-block;margin:2px 4px 2px 0;padding:4px 10px;background:#F5C842;color:#1E3A6E;font-weight:700;font-size:13px;border-radius:999px;white-space:nowrap">${esc(s)}</span>`,
    )
    .join("");

  const htmlRows = shown.map(([k, v]) =>
    fieldRow(k, esc(v!.toString()), k === "Urgency" && emergency),
  );
  if (services.length) htmlRows.splice(1, 0, fieldRow("Service(s) needed", serviceChips));

  const transcriptHtml = data.transcript?.trim()
    ? `<h3 style="margin:22px 2px 8px;font-size:15px;color:#1E3A6E">Chat transcript</h3>` +
      `<div style="background:#f4f7fb;border:1px solid #e6edf6;border-radius:8px;padding:12px 14px;font-size:13px;line-height:1.5;color:#333;white-space:pre-wrap">${esc(data.transcript.trim())}</div>`
    : "";

  const html =
    `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#222">` +
    `<div style="background:${emergency ? "#b91c1c" : "#1E3A6E"};padding:18px 22px;border-radius:10px 10px 0 0">` +
    `<h2 style="margin:0;font-size:20px;color:#ffffff">${emergency ? "🚨 EMERGENCY service request" : "New service request"}</h2>` +
    `<p style="margin:4px 0 0;color:#F5C842;font-weight:600;font-size:13px">From the All Phase Plumbing website</p>` +
    `</div>` +
    `<table style="width:100%;border-collapse:collapse;font-size:15px;border:1px solid #e6edf6;border-top:none">${htmlRows.join("")}</table>` +
    (data.email
      ? `<p style="font-size:13px;color:#666;margin:14px 2px">Tip: just hit Reply to email the customer back directly.</p>`
      : "") +
    transcriptHtml +
    `</div>`;

  const textRows = shown.map(([k, v]) => `${k}: ${v}`);
  if (services.length) textRows.splice(1, 0, `Service(s) needed: ${serviceSummary}`);
  if (data.transcript?.trim()) textRows.push("", "Chat transcript:", data.transcript.trim());
  const text = textRows.join("\n");

  const subject = `${emergency ? "🚨 EMERGENCY: " : ""}New lead: ${fullName}${serviceSummary ? ` — ${serviceSummary}` : ""}`;

  return { subject, html, text };
}
