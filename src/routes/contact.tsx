import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact All Phase Plumbing — Seattle Plumber" },
      {
        name: "description",
        content:
          "Call (206) 772-6077 or request a tech online. Same-day plumbing service across Greater Seattle.",
      },
      { property: "og:title", content: "Contact All Phase Plumbing" },
      { property: "og:description", content: "Call (206) 772-6077 — speak to a real person." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to a real"
        italic="Seattle plumber."
        subtitle="Phones answered 24/7 for emergencies. We respond to form submissions within the hour during business hours."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Get in touch</h2>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <span className="inline-flex items-center justify-center size-10 rounded-md bg-primary text-primary-foreground shrink-0">
                  <Phone className="size-5" />
                </span>
                <div>
                  <div className="text-sm text-muted-foreground">Call us</div>
                  <a
                    href="tel:+12067726077"
                    className="text-lg font-semibold text-primary hover:text-accent"
                  >
                    (206) 772-6077
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex items-center justify-center size-10 rounded-md bg-primary text-primary-foreground shrink-0">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <div className="text-sm text-muted-foreground">Visit</div>
                  <p className="text-foreground">
                    14101 Interurban Ave S, Unit 78-A
                    <br />
                    Tukwila, WA 98168
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex items-center justify-center size-10 rounded-md bg-primary text-primary-foreground shrink-0">
                  <Mail className="size-5" />
                </span>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a
                    href="mailto:info@allphaseplumbing.com"
                    className="text-foreground hover:text-accent"
                  >
                    info@allphaseplumbing.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <form
            className="bg-background border border-border rounded-2xl shadow-lg p-6 sm:p-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("sent");
            }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">Request a Tech</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="tel"
              placeholder="Phone"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              placeholder="How can we help?"
              rows={4}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Send Request
            </button>
            {status === "sent" && (
              <p className="text-sm text-accent font-medium text-center">
                Thanks — we'll be in touch within the hour.
              </p>
            )}
          </form>
        </div>
      </section>
    </PageShell>
  );
}
