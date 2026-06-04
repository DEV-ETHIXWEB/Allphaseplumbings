import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Coupons } from "@/components/sections/Coupons";
import { WhyUs } from "@/components/sections/WhyUs";
import skylineBg from "@/assets/seattle-skyline.jpg";

export const Route = createFileRoute("/coupons")({
  head: () => ({
    meta: [
      { title: "Plumbing Coupons & Offers, All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Current homeowner coupons from All Phase Plumbing, drain cleaning, camera inspection, and service call discounts.",
      },
      { property: "og:title", content: "Plumbing Coupons, All Phase" },
      { property: "og:description", content: "Save on your next plumbing visit." },
    ],
  }),
  component: () => (
    <PageShell>
      {/* ── Hero ── */}
      <section
        className="relative border-b border-border py-16 lg:py-[90px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f4f8fd 0%, #e6eff9 50%, #dbe7f4 100%)",
        }}
      >
        {/* Faint blurred skyline */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${skylineBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
            filter: "blur(6px)",
          }}
          aria-hidden="true"
        />
        {/* Abstract blobs */}
        <div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(91,155,213,0.35) 0%, rgba(91,155,213,0) 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,110,0.25) 0%, rgba(30,58,110,0) 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,200,66,0.18) 0%, rgba(245,200,66,0) 70%)",
            filter: "blur(45px)",
          }}
          aria-hidden="true"
        />

        {/* Abstract rotated rectangles */}
        <div
          className="absolute top-8 left-[8%] w-40 h-24 z-0 pointer-events-none border-2 border-[#1E3A6E]/20 rounded-md"
          style={{ transform: "rotate(-18deg)", background: "rgba(91,155,213,0.08)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 right-[6%] w-56 h-32 z-0 pointer-events-none border-2 border-[#F5C842]/40 rounded-md"
          style={{ transform: "rotate(12deg)", background: "rgba(245,200,66,0.08)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-6 left-[22%] w-48 h-28 z-0 pointer-events-none border-2 border-[#1E3A6E]/25 rounded-md"
          style={{ transform: "rotate(28deg)", background: "rgba(30,58,110,0.06)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-[18%] right-[28%] w-24 h-16 z-0 pointer-events-none border-2 border-[#5B9BD5]/40 rounded-md"
          style={{ transform: "rotate(-32deg)", background: "rgba(91,155,213,0.1)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-[35%] w-32 h-20 z-0 pointer-events-none border-2 border-[#1E3A6E]/15 rounded-md"
          style={{ transform: "rotate(8deg)", background: "rgba(91,155,213,0.05)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-[38px] sm:text-[48px] lg:text-[58px] font-black uppercase tracking-wider text-primary mb-3">
            Coupons
          </h1>
          <nav className="text-[13px] text-muted-foreground">
            <Link to="/" className="font-semibold text-primary hover:text-accent">
              Home
            </Link>{" "}
            <span className="mx-1">-</span>{" "}
            <span className="font-semibold">Coupons</span>
          </nav>
        </div>
      </section>

      {/* ── Intro + cards ── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-5">
            Seattle Plumbing Specials
          </h2>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-4xl mx-auto">
            At All Phase Plumbing, we believe top-quality plumbing shouldn't come with a hefty price
            tag. That's why we offer exclusive Seattle plumbing specials to help homeowners and
            businesses across the greater Seattle area save on essential services. Whether you're
            looking for plumbing coupons for a quick repair or limited-time drain cleaning
            specials, we make it easy to get expert service at a great value. Our special offers
            are available to customers throughout the region, including Tukwila, Auburn, and Federal
            Way. From discounts on water heater repairs to savings on full system replacements,
            we're always updating our deals to help you get the services you need without breaking
            the bank.
          </p>
        </div>
      </section>

      <Coupons hideHeader />

      <WhyUs />

      {/* ── Customer quote ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            What Our Customers Say About All Phase Plumbing
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-extrabold text-white tracking-widest uppercase rounded shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]"
            style={{
              background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)",
            }}
          >
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
