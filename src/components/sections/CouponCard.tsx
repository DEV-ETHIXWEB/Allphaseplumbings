/**
 * Reusable ticket-style coupon, rendered with real HTML text so every letter
 * stays crisp at any size (the old hand-traced SVGs dropped thin strokes like
 * the "I" in VALID and the "T" in WITH).
 *
 * Two color schemes: "navy" (default) uses navy frame + white card + navy
 * heading text; "yellow" puts the headline in brand gold. The decorative
 * notch dots on the long edges mimic a paper-ticket perforation.
 */

const NAVY = "#1E3A8A";
const NAVY_TEXT = "#203C8B";
const GOLD = "#F5C842";

type Notch = { top: string };

const NOTCH_POSITIONS: Notch[] = [{ top: "22%" }, { top: "50%" }, { top: "78%" }];

export type CouponCardProps = {
  /** The big headline, e.g. "$100", "10%", "FREE". */
  headline: string;
  /** Tiny suffix that sits next to the headline, e.g. "OFF". Omit for "FREE". */
  headlineSuffix?: string;
  /** Short description below the headline, e.g. "ON YOUR NEXT DRAIN CLEANING". */
  description: string;
  /** Eligibility fine print, shown above the disclaimer. */
  terms?: string;
  /** Fine-print disclaimer. */
  disclaimer?: string;
  /** Expiration line. */
  expires?: string;
  /** Visual variant. */
  variant?: "navy" | "gold";
  /** Pixel size for the headline; defaults scale automatically. */
  headlineSize?: string;
};

export function CouponCard({
  headline,
  headlineSuffix,
  description,
  terms = "Residential homeowners only. One per household. Must show at time of service.",
  disclaimer = "OFFER NOT VALID WITH ANY OTHER OFFERS OR DISCOUNTS",
  expires = "EXPIRES 12/31/2026",
  variant = "navy",
  headlineSize,
}: CouponCardProps) {
  const headlineColor = variant === "gold" ? GOLD : NAVY_TEXT;

  return (
    <div
      className="relative w-full block select-none"
      style={{
        aspectRatio: "930 / 601",
        background: NAVY,
        boxShadow: "0 8px 22px -6px rgba(15,34,70,0.35)",
        containerType: "inline-size",
      }}
    >
      {/* Decorative L-shape corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Side notches — fake "perforation" cutouts */}
      {NOTCH_POSITIONS.map((n, i) => (
        <span
          key={`l${i}`}
          className="coupon-notch absolute block"
          style={{
            left: 0,
            top: n.top,
            transform: "translate(-50%, -50%)",
            width: "6.5%",
            aspectRatio: "1",
            background: "var(--coupon-notch-bg, #f7f9fc)",
          }}
        />
      ))}
      {NOTCH_POSITIONS.map((n, i) => (
        <span
          key={`r${i}`}
          className="coupon-notch absolute block"
          style={{
            right: 0,
            top: n.top,
            transform: "translate(50%, -50%)",
            width: "6.5%",
            aspectRatio: "1",
            background: "var(--coupon-notch-bg, #f7f9fc)",
          }}
        />
      ))}

      {/* Inner card */}
      <div
        className="absolute"
        style={{
          left: "11.6%",
          right: "11.6%",
          top: "8%",
          bottom: "46%",
          background: "#FFFFFF",
          border: `4px solid #A8C4FB`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2cqw",
          padding: "2% 5%",
          textAlign: "center",
        }}
      >
        <div
          className="leading-none font-black"
          style={{
            fontFamily: "Inter, sans-serif",
            color: headlineColor,
            fontSize: headlineSize ?? "clamp(22px, 11cqw, 99px)",
            letterSpacing: "-0.02em",
            display: "inline-flex",
            alignItems: "flex-start",
            gap: "0.18em",
          }}
        >
          <span>{headline}</span>
          {headlineSuffix && (
            <span
              style={{
                fontSize: "0.34em",
                fontWeight: 800,
                letterSpacing: "0.02em",
                marginTop: "0.25em",
              }}
            >
              {headlineSuffix}
            </span>
          )}
        </div>
        <div
          className="font-bold"
          style={{
            fontFamily: "Inter, sans-serif",
            color: NAVY_TEXT,
            fontSize: "clamp(10px, 2.75cqw, 24px)",
            letterSpacing: "0.04em",
            lineHeight: 1.15,
          }}
        >
          {description.toUpperCase()}
        </div>
      </div>

      {/* Bottom navy strip — disclaimer + expires */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "4%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "3cqw",
          padding: "0 13%",
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {terms && (
          <div
            style={{
              fontSize: "clamp(9px, 1.95cqw, 17px)",
              fontWeight: 600,
              letterSpacing: "0.01em",
              lineHeight: 1.15,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {terms}
          </div>
        )}
        <div
          style={{
            fontSize: "clamp(9.5px, 2.4cqw, 20px)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1.15,
          }}
        >
          {disclaimer}
        </div>
        <div
          style={{
            fontSize: "clamp(10px, 2.6cqw, 22px)",
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: GOLD,
          }}
        >
          {expires}
        </div>
      </div>
    </div>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop = position[0] === "t";
  const isLeft = position[1] === "l";
  const size = "5%";
  const stroke = "#A8C4FB"; // same light blue as the inner card border
  const thickness = "2px";
  return (
    <span
      className="absolute block pointer-events-none"
      style={{
        [isTop ? "top" : "bottom"]: "4%",
        [isLeft ? "left" : "right"]: "3%",
        width: size,
        aspectRatio: "1",
        borderTop: isTop ? `${thickness} solid ${stroke}` : undefined,
        borderBottom: !isTop ? `${thickness} solid ${stroke}` : undefined,
        borderLeft: isLeft ? `${thickness} solid ${stroke}` : undefined,
        borderRight: !isLeft ? `${thickness} solid ${stroke}` : undefined,
        opacity: 0.95,
      }}
    />
  );
}
