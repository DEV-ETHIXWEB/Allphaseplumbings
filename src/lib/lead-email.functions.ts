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

/**
 * Last-resort record of a lead whose email could not be delivered.
 *
 * The browser deliberately still shows the visitor a success state when the
 * mail send fails, so a Resend outage, an expired API key, or an unverified
 * sending domain would otherwise lose real enquiries silently, with nobody on
 * either side knowing. Writing the full payload to the server log under one
 * fixed, greppable tag means every lost lead can still be recovered from the
 * hosting provider's logs and called back by hand.
 *
 * Search the deployment logs for LEAD_DELIVERY_FAILED to pull them out.
 */
function logUndeliveredLead(data: LeadPayload, reason: string): void {
  console.error(
    "LEAD_DELIVERY_FAILED",
    JSON.stringify({ reason, at: new Date().toISOString(), lead: data }),
  );
}

export const sendLeadEmail = createServerFn({ method: "POST" })
  .inputValidator((data: LeadPayload) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[lead-email] RESEND_API_KEY not set — lead NOT emailed:", data);
      logUndeliveredLead(data, "not-configured");
      return { success: false, reason: "not-configured" as const };
    }

    const recipients = getRecipients();
    const bcc = getBcc();
    const from = process.env.RESEND_FROM || DEFAULT_FROM;

    const { subject, html, text } = buildLeadEmail(data);

    const body = JSON.stringify({
      from,
      to: [recipients[0]],
      cc: recipients.slice(1),
      // Silent dev-team copy. Invisible to the To:/Cc: (shop) recipients.
      bcc: bcc.length ? bcc : undefined,
      reply_to: data.email || undefined,
      subject,
      html,
      text,
    });

    /* Two attempts, because a single transient network blip or Resend 5xx used
       to drop a real enquiry permanently: the visitor is shown a success state
       either way, so there was no retry from the user's side and no record of
       the loss. Only transient conditions are retried; a 4xx (bad key,
       unverified domain, malformed payload) will fail identically on a second
       try, so it returns immediately. */
    const MAX_ATTEMPTS = 2;
    let lastReason = "unknown";

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body,
          signal: AbortSignal.timeout(10_000),
        });

        if (res.ok) return { success: true };

        const errBody = await res.text().catch(() => "");
        console.error(
          `[lead-email] Resend responded ${res.status} (attempt ${attempt}/${MAX_ATTEMPTS})`,
          errBody,
        );
        lastReason = `resend-${res.status}`;

        // Client errors are permanent: retrying cannot change the outcome.
        if (res.status < 500 && res.status !== 429) break;
      } catch (err) {
        console.error(
          `[lead-email] Resend request failed (attempt ${attempt}/${MAX_ATTEMPTS}):`,
          err,
        );
        lastReason = "request-failed";
      }

      if (attempt < MAX_ATTEMPTS) await new Promise((r) => setTimeout(r, 500));
    }

    logUndeliveredLead(data, lastReason);
    return { success: false, reason: "send-failed" as const };
  });
