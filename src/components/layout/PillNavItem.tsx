import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";

type Props = {
  to: string;
  exact?: boolean;
  children: ReactNode;
  /** Background of the rising circle and the active state. */
  baseColor?: string;
  /** Background of the pill in its resting state. */
  pillColor?: string;
  /** Label color in resting state. */
  pillTextColor?: string;
  /** Label color once the circle covers the pill. */
  hoveredPillTextColor?: string;
};

const EASE = "power3.out";

/**
 * A single nav item styled as a pill, with a GSAP "rising-circle" hover effect
 * (the circle sweeps up from below and the label slides up while a duplicate
 * label fades in from below). Wraps a TanStack Router <Link> so dropdown
 * hover state owned by the parent header still works.
 */
export function PillNavItem({
  to,
  exact,
  children,
  baseColor = "#1E3A6E",
  pillColor = "#ffffff",
  pillTextColor = "#1E3A6E",
  hoveredPillTextColor = "#ffffff",
}: Props) {
  const pillRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoverLabelRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const pill = pillRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    const hoverLabel = hoverLabelRef.current;
    if (!pill || !circle) return;

    const layout = () => {
      const rect = pill.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;
      // Geometry copied from the user-supplied PillNav: a circle whose chord
      // matches the pill width, so the rise looks tangent to the bottom edge.
      const R = (w * w) / 4 + h * h;
      const r = R / (2 * h);
      const D = Math.ceil(2 * r) + 2;
      const delta = Math.ceil(r - Math.sqrt(Math.max(0, r * r - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      if (label) gsap.set(label, { y: 0 });
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });
      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: EASE, overwrite: "auto" }, 0);
      if (label) {
        tl.to(label, { y: -(h + 8), duration: 2, ease: EASE, overwrite: "auto" }, 0);
      }
      if (hoverLabel) {
        gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(
          hoverLabel,
          { y: 0, opacity: 1, duration: 2, ease: EASE, overwrite: "auto" },
          0,
        );
      }
      tlRef.current = tl;
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: EASE,
      overwrite: "auto",
    });
  };
  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.2,
      ease: EASE,
      overwrite: "auto",
    });
  };

  const cssVars = {
    ["--pn-base" as string]: baseColor,
    ["--pn-pill-bg" as string]: pillColor,
    ["--pn-pill-text" as string]: pillTextColor,
    ["--pn-hover-text" as string]: hoveredPillTextColor,
  };

  return (
    <Link
      ref={pillRef}
      to={to}
      activeOptions={{ exact: exact ?? false }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="pn-pill relative inline-flex items-center justify-center gap-1 px-4 py-2.5
                 text-[19px] font-bold rounded-full overflow-hidden whitespace-nowrap
                 transition-colors duration-200"
      style={{
        background: "var(--pn-pill-bg)",
        color: "var(--pn-pill-text)",
        ...cssVars,
      }}
      activeProps={{
        className: "pn-pill pn-pill-active",
      }}
    >
      <span
        ref={circleRef}
        aria-hidden="true"
        className="pn-circle absolute left-1/2 pointer-events-none rounded-full will-change-transform"
        style={{ background: "var(--pn-base)", zIndex: 1 }}
      />
      <span className="pn-stack relative inline-flex items-center gap-1" style={{ zIndex: 2 }}>
        <span
          ref={labelRef}
          className="pn-label relative inline-flex items-center gap-[5px] leading-none whitespace-nowrap will-change-transform"
          style={{ color: "var(--pn-pill-text)" }}
        >
          {children}
        </span>
        <span
          ref={hoverLabelRef}
          aria-hidden="true"
          className="pn-label-hover absolute inset-0 inline-flex items-center justify-center gap-[5px] leading-none whitespace-nowrap pointer-events-none will-change-transform"
          style={{ color: "var(--pn-hover-text)" }}
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
