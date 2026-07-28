/**
 * lead-email.functions.ts
 *
 * Server-side handler that emails a website lead to the shop's team via Resend.
 * Runs only on the server (TanStack server function) so RESEND_API_KEY is never
 * shipped to the browser. Mirrors the plain-fetch approach used in
 * recaptcha.functions.ts, so no extra npm dependency is required.
 *
 * Environment variables:
 *   RESEND_API_KEY   Required. Without it, the lead is logged server-side and
 *                    the call returns { success: false } instead of throwing.
 *   RESEND_FROM      Optional. The "from" address; MUST be on a domain you've
 *                    verified in Resend (DKIM), e.g.
 *                    "All Phase Plumbing <leads@allphaseplumbing.com>".
 *   LEAD_RECIPIENTS  Optional. Comma-separated list of recipients. The first is
 *                    the primary To:, the rest go in Cc:. Defaults to the four
 *                    shop addresses below.
 *   LEAD_BCC         Optional. Comma-separated blind-copy recipients (e.g. the
 *                    dev team monitoring lead delivery). BCC is invisible to the
 *                    To:/Cc: recipients, so it never shows on the copy the shop
 *                    receives. Unset by default.
 */

import { createServerFn } from "@tanstack/react-start";

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
  service?: string;
  /** "residential" | "commercial" where the form distinguishes. */
  serviceType?: string;
  smsOptIn?: boolean;
}

const DEFAULT_RECIPIENTS = [
  "office@allphaseplumbing.com",
  "ReginaW@allphaseplumbing.com",
  "larryb@allphaseplumbing.com",
  "gary@allphaseplumbing.com",
];

const DEFAULT_FROM = "All Phase Plumbing <leads@allphaseplumbing.com>";

function getRecipients(): string[] {
  const raw = process.env.LEAD_RECIPIENTS;
  if (!raw) return DEFAULT_RECIPIENTS;
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length ? list : DEFAULT_RECIPIENTS;
}

// Blind-copy recipients (dev team). Sourced from an env var so the addresses
// live only in the hosting config, never in the repo. BCC is not shown to the
// To:/Cc: recipients, so it stays off the copy the shop team receives.
function getBcc(): string[] {
  const raw = process.env.LEAD_BCC;
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const HTML_ESCAPES: Record<string, string> = { "<": "&lt;", ">": "&gt;", "&": "&amp;" };
function esc(value: string): string {
  return value.replace(/[<>&]/g, (c) => HTML_ESCAPES[c]);
}

export const sendLeadEmail = createServerFn({ method: "POST" })
  .inputValidator((data: LeadPayload) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[lead-email] RESEND_API_KEY not set — lead NOT emailed:", data);
      return { success: false, reason: "not-configured" as const };
    }

    const recipients = getRecipients();
    const bcc = getBcc();
    const from = process.env.RESEND_FROM || DEFAULT_FROM;

    const fullName =
      data.name?.trim() ||
      [data.firstName, data.lastName].filter(Boolean).join(" ").trim() ||
      "Website lead";

    // Ordered field list; blanks are dropped so each email only shows what was
    // actually filled in (forms vary — some have email, some ZIP, etc.).
    const fields: [string, string | undefined][] = [
      ["Name", fullName],
      ["Phone", data.phone],
      ["Email", data.email],
      ["ZIP code", data.zip],
      ["City", data.city],
      ["Service needed", data.service],
      ["Request type", data.serviceType],
      ["SMS opt-in", data.smsOptIn ? "Yes" : undefined],
      ["Submitted from", data.source],
    ];
    const shown = fields.filter(([, v]) => v && v.toString().trim());

    const htmlRows = shown
      .map(
        ([k, v]) =>
          `<tr>` +
          `<td style="padding:9px 14px;background:#f4f7fb;font-weight:700;color:#1E3A6E;border-bottom:1px solid #e6edf6;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
          `<td style="padding:9px 14px;color:#222;border-bottom:1px solid #e6edf6">${esc(v!.toString())}</td>` +
          `</tr>`,
      )
      .join("");

    const html =
      `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#222">` +
      `<div style="background:#1E3A6E;padding:18px 22px;border-radius:10px 10px 0 0">` +
      `<h2 style="margin:0;font-size:20px;color:#ffffff">New service request</h2>` +
      `<p style="margin:4px 0 0;color:#F5C842;font-weight:600;font-size:13px">From the All Phase Plumbing website</p>` +
      `</div>` +
      `<table style="width:100%;border-collapse:collapse;font-size:15px;border:1px solid #e6edf6;border-top:none">${htmlRows}</table>` +
      (data.email
        ? `<p style="font-size:13px;color:#666;margin:14px 2px">Tip: just hit Reply to email the customer back directly.</p>`
        : "") +
      `</div>`;

    const text = shown.map(([k, v]) => `${k}: ${v}`).join("\n");

    const subject = `New lead: ${fullName}${data.service ? ` — ${data.service}` : ""}`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [recipients[0]],
          cc: recipients.slice(1),
          // Silent dev-team copy. Invisible to the To:/Cc: (shop) recipients.
          bcc: bcc.length ? bcc : undefined,
          reply_to: data.email || undefined,
          subject,
          html,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[lead-email] Resend responded", res.status, body);
        return { success: false, reason: "send-failed" as const };
      }

      return { success: true };
    } catch (err) {
      console.error("[lead-email] Resend request failed:", err);
      return { success: false, reason: "send-failed" as const };
    }
  });
