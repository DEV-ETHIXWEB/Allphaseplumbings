/**
 * lead-form.ts
 *
 * Client helper shared by every lead-capture form on the site. Reads the
 * submitted fields straight off the <form> element (via FormData, so it works
 * with the existing uncontrolled inputs — just give each input a `name`) and
 * hands them to the sendLeadEmail server function.
 *
 * Usage in a form's submit handler:
 *
 *   onSubmit={async (e) => {
 *     e.preventDefault();
 *     const form = e.currentTarget;            // capture BEFORE any await
 *     if (await captcha.verify()) {
 *       await submitLeadFromForm(form, { source: "Contact Page", service });
 *       setSent(true);
 *     }
 *   }}
 *
 * A mail hiccup never blocks the user's success state — failures are logged
 * (client console + server console) but the form still confirms to the visitor.
 */

import { sendLeadEmail, type LeadPayload } from "@/lib/lead-email.functions";
import { trackFormSubmit, trackAdsLeadConversion, trackMetaLead } from "@/lib/analytics";

export async function submitLeadFromForm(
  form: HTMLFormElement,
  extra: Partial<LeadPayload> & { source: string },
): Promise<void> {
  const fd = new FormData(form);
  const val = (key: string): string | undefined => {
    const v = fd.get(key);
    const s = typeof v === "string" ? v.trim() : "";
    return s || undefined;
  };

  const payload: LeadPayload = {
    name: val("name"),
    firstName: val("firstName"),
    lastName: val("lastName"),
    phone: val("phone"),
    email: val("email"),
    zip: val("zip"),
    city: val("city"),
    service: val("service"),
    // An uncontrolled checkbox named "smsOptIn" shows up in FormData only when
    // checked. Forms that track it in React state override this via `extra`.
    smsOptIn: fd.get("smsOptIn") != null ? true : undefined,
    // `extra` wins: state-driven fields (custom dropdowns, tabs, controlled ZIP)
    // are passed explicitly and should override anything read from the form.
    ...extra,
  };

  // GA4 form_submit via GTM. This runs only after the caller's validation +
  // reCAPTCHA gate passed (submitLeadFromForm is called on success only), so it
  // never fires on a validation-failed or bot submit. form_type comes from the
  // form's data-gtm-form attribute; form_location is the caller-supplied source.
  trackFormSubmit({
    form_location: extra.source,
    form_type: form.dataset.gtmForm || "lead_form",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });

  try {
    const result = await sendLeadEmail({ data: payload });
    // Google Ads + Meta Pixel conversions — strictly after API success: only
    // when the server function confirms the lead was delivered. Validation
    // failures never reach this helper, and a failed/unconfigured send records
    // no conversion on either platform.
    if (result.success) {
      trackAdsLeadConversion();
      trackMetaLead();
    }
  } catch (err) {
    console.error("Lead email failed to send:", err);
  }
}
