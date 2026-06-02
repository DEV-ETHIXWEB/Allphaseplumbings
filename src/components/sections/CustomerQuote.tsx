import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import Particles from "@/components/ui/Particles";

export function CustomerQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white"
      style={{
        background: "linear-gradient(160deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
        minHeight: 340,
      }}
    >
      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Particles
          particleCount={500}
          particleSpread={20}
          speed={1}
          particleBaseSize={150}
          sizeRandomness={1.1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff", "#aac8f0", "#7ab3e0"]}
          className="w-full h-full"
        />
      </div>

      {/* ── Centre content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 py-20 sm:py-24 max-w-3xl mx-auto">
        <p
          className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-white leading-snug"
          style={{
            fontFamily: "'Poppins', Inter, sans-serif",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.85s ease 0.25s, transform 0.85s ease 0.25s",
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          }}
        >
          At All Phase Plumbing, nothing speaks louder than the words of our satisfied customers.
        </p>

        <div
          className="mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.85s ease 0.45s, transform 0.85s ease 0.45s",
          }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-12 py-3.5
                       border-2 border-white text-white font-extrabold text-base tracking-widest uppercase
                       hover:bg-white hover:text-[#1E3A6E] transition-all duration-200 rounded-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
