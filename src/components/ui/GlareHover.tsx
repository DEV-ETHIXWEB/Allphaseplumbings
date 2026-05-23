import { useEffect, useRef } from "react";

interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const GlareHover = ({
  width = "500px",
  height = "500px",
  background = "#000",
  borderRadius = "10px",
  borderColor = "#333",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {},
}: GlareHoverProps) => {
  const idRef = useRef(`gh-${Math.random().toString(36).slice(2, 8)}`);
  const id = idRef.current;

  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  useEffect(() => {
    const styleId = `glare-hover-styles-${id}`;
    if (document.getElementById(styleId)) return;

    const tag = document.createElement("style");
    tag.id = styleId;
    tag.textContent = `
      .${id}::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          var(--gh-angle),
          hsla(0,0%,0%,0) 60%,
          var(--gh-rgba) 70%,
          hsla(0,0%,0%,0),
          hsla(0,0%,0%,0) 100%
        );
        transition: var(--gh-duration) ease;
        background-size: var(--gh-size) var(--gh-size), 100% 100%;
        background-repeat: no-repeat;
        background-position: -100% -100%, 0 0;
        pointer-events: none;
        z-index: 5;
      }
      .${id}:hover::before {
        background-position: 100% 100%, 0 0;
      }
      .${id}.play-once::before { transition: none; }
      .${id}.play-once:hover::before {
        transition: var(--gh-duration) ease;
        background-position: 100% 100%, 0 0;
      }
    `;
    document.head.appendChild(tag);

    return () => document.getElementById(styleId)?.remove();
  }, [id]);

  const cssVars = {
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${transitionDuration}ms`,
    "--gh-size": `${glareSize}%`,
    "--gh-rgba": rgba,
  } as React.CSSProperties;

  return (
    <div
      className={[
        id,
        playOnce ? "play-once" : "",
        "relative overflow-hidden grid place-items-center cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width,
        height,
        background,
        borderRadius,
        border: `1px solid ${borderColor}`,
        ...cssVars,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default GlareHover;
