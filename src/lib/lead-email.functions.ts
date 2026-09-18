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
import { buildLeadEmail, type LeadPayload } from "@/lib/lead-email-template";

export type { LeadPayload };

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

    const { subject, html, text } = buildLeadEmail(data);

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
