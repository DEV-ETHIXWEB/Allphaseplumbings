import { useState, useEffect } from "react";
import img1 from "@/assets/img 1.jpeg";
import img2 from "@/assets/img 2.JPEG";
import img3 from "@/assets/img 3.JPEG";
import img4 from "@/assets/img 4.jpeg";

const slides = [
  { url: img1, alt: "All Phase Plumbing team — job photo 1" },
  { url: img2, alt: "All Phase Plumbing team — job photo 2" },
  { url: img3, alt: "All Phase Plumbing team — job photo 3" },
  { url: img4, alt: "All Phase Plumbing team — job photo 4" },
];

export function TeamSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#1E3A7B] shadow-lg bg-slate-950">
      {/* Sliding Track */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full h-full shrink-0 relative select-none">
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Dot Indicators Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-sm border border-white/10 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-amber-400 scale-125" : "bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
