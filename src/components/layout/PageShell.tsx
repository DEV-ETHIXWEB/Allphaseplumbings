import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  italic,
  subtitle,
  largeEyebrow,
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  subtitle?: string;
  largeEyebrow?: boolean;
}) {
  return (
    <section className="bg-secondary/40 border-b border-border py-[51px] lg:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {eyebrow && (
          <span
            className={`inline-block font-semibold uppercase tracking-widest text-accent mb-2 ${
              largeEyebrow ? "text-[19px]" : "text-[11px]"
            }`}
          >
            {eyebrow}
          </span>
        )}
        <h1 className="text-[29px] sm:text-[38px] lg:text-[48px] font-bold text-primary leading-[1.1]">
          {title} {italic && <span className="font-display-italic text-accent">{italic}</span>}
        </h1>
        {subtitle && <p className="mt-4 text-[14px] text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
