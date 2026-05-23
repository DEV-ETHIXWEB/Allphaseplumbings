import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import Particles from "@/components/ui/Particles";
import wrenchImg from "@/assets/wrench.png";
import pipeImg from "@/assets/pipe.png";

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
      className="relative overflow-hidden"
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

      {/* ── Left: Wrench PNG — slides in from left ── */}
      <div
        className="absolute bottom-4 pointer-events-none select-none z-10"
        style={{
          left: "12%",
          transform: `translateX(${visible ? "0px" : "-220px"})`,
          opacity: visible ? 1 : 0,
          transition: "transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease",
          transitionDelay: "0.1s",
        }}
        aria-hidden="true"
      >
        <img
          src={wrenchImg}
          alt=""
          className="w-[110px] sm:w-[140px] lg:w-[170px] h-auto drop-shadow-xl"
          draggable={false}
        />
      </div>

      {/* ── Right: Pipe PNG — slides in from right ── */}
      <div
        className="absolute bottom-4 pointer-events-none select-none z-10"
        style={{
          right: "12%",
          transform: `translateX(${visible ? "0px" : "220px"})`,
          opacity: visible ? 1 : 0,
          transition: "transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease",
          transitionDelay: "0.2s",
        }}
        aria-hidden="true"
      >
        <img
          src={pipeImg}
          alt=""
          className="w-[130px] sm:w-[160px] lg:w-[190px] h-auto drop-shadow-xl"
          draggable={false}
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
            to="/about"
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
