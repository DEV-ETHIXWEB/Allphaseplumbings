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
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-secondary/40 border-b border-border py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {eyebrow && (
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-[1.1]">
          {title} {italic && <span className="font-display-italic text-accent">{italic}</span>}
        </h1>
        {subtitle && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
