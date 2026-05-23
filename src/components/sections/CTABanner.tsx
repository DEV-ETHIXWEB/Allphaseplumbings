import { useState, useEffect, useRef } from "react";
import vanImg from "@/assets/van.png";
import { useSiteOptions } from "@/hooks/use-site-options";
import { StarBorder } from "@/components/ui/StarBorder";

const SERVICE_OPTIONS = [
  "Plumbing Repair",
  "Drain Cleaning",
  "Water Heater",
  "Sewer Service",
  "Emergency Service",
  "Other",
];

export function CTABanner() {
  const opts = useSiteOptions();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsAnimated(true);
      },
      { threshold: 0.15 },
    );
    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* form submission handled externally */
  }

  const inputCls =
    "border border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] text-[21px] bg-white text-gray-800 transition-shadow hover:border-gray-300 focus:shadow-md";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[580px] sm:min-h-[660px] flex items-end overflow-hidden pt-16 sm:pt-20 pb-28 sm:pb-32 md:pb-36"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Dark premium indigo glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070f1e]/90 via-[#0a1628]/85 to-[#0d1e36]/90" />

      {/* Decorative ambient glowing grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

      {/* Ground road */}
      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-28 md:h-32 bg-[#1e293b] border-t-[6px] border-[#475569] z-0 shadow-[inset_0_8px_16px_rgba(0,0,0,0.4)] overflow-hidden flex items-center">
        <div className="w-full h-1 border-t-4 border-dashed border-[#facc15] opacity-60 relative">
          <div className="absolute inset-0 bg-repeat-x w-[200%] animate-[infinite-scroll_20s_linear_infinite]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-end">
          {/* Left Column — van slides in from left, sits flush against the form */}
          <div className="lg:col-span-3 flex flex-col justify-end items-center lg:items-end relative select-none">
            <div
              className={`w-full ml-auto transition-opacity duration-300
                          mb-[-28px] sm:mb-[-30px] md:mb-[-32px] ${
                            isAnimated ? "animate-van-slide opacity-100" : "opacity-0"
                          }`}
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src={vanImg}
                alt="All Phase Plumbing service van"
                className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Column — contact card */}
          <div className="lg:col-span-2 w-full flex justify-center lg:justify-start self-center">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1E3A7B]/20 w-full max-w-[520px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden">
              {/* Blue gradient header strip */}
              <div
                className="px-10 py-7"
                style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)" }}
              >
                <h2 className="text-[45px] font-bold text-white text-center">{opts.cta_heading}</h2>
                <p className="text-[#FFB800] font-semibold text-[27px] mt-1.5 text-center">
                  {opts.cta_subheading}
                </p>
              </div>

              <div className="p-10">
                <p className="text-gray-600 text-[24px] mb-6">{opts.cta_body}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputCls}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputCls} text-gray-500`}
                    required
                  >
                    <option value="" disabled>
                      Service Needed
                    </option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="text-gray-900">
                        {opt}
                      </option>
                    ))}
                  </select>

                  <p className="text-[17px] text-gray-400 leading-relaxed">
                    By submitting this form you consent to receive messages from All Phase Plumbing.
                    Msg &amp; data rates may apply. Reply STOP to unsubscribe.
                  </p>

                  <StarBorder
                    type="submit"
                    className="block w-full active:scale-[0.98] transition-all"
                    innerClassName="text-[24px] font-bold text-white tracking-widest w-full"
                    innerStyle={{
                      background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)",
                      border: "none",
                      padding: "16px 24px",
                    }}
                  >
                    CONTACT US TODAY
                  </StarBorder>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
