import { Fragment } from "react";
import { useTrackedPhone } from "@/hooks/use-site-options";

/* Matches the old static "(206) 772-6077" formatted number wherever it still
   appears in body copy strings (content data files, FAQ answers, etc).
   Content authors keep writing that number in plain English; at render time
   it's swapped for the sitewide CallRail number (see useTrackedPhone) and
   turned into a clickable tel: link, matching the header/footer/hero CTAs
   instead of sitting as dead text. */
const STATIC_PHONE_PATTERN = /\(206\)\s*772-6077/g;

/**
 * Renders body copy that may contain the site's static phone number,
 * swapping any match for a live tel: link with the page's tracked number.
 * Falls back to plain text when the string contains no phone number.
 */
export function TrackedPhoneText({ text }: { text: string }) {
  const { phone, phone_href } = useTrackedPhone();

  const parts = text.split(STATIC_PHONE_PATTERN);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={phone_href} className="font-semibold text-[#1E3A6E] underline underline-offset-2 hover:text-[#4A7BC4]">
              {phone}
            </a>
          )}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Bold, clickable tel: link for hand-authored JSX body copy (blog articles,
 * etc.) that wants an inline phone CTA, e.g. `Call <TrackedPhoneLink />`.
 * Renders the page's tracked number, same as TrackedPhoneText.
 */
export function TrackedPhoneLink() {
  const { phone, phone_href } = useTrackedPhone();
  return (
    <a href={phone_href} className="font-bold text-[#1E3A6E] hover:text-[#4A7BC4]">
      {phone}
    </a>
  );
}
