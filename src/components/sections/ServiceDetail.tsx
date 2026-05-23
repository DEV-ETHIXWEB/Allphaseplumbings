import { Check } from "lucide-react";

export interface ServiceDetailProps {
  features: readonly string[];
  body: string;
}

export function ServiceDetail({ features, body }: ServiceDetailProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">{body}</p>
        <ul className="grid sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-4"
            >
              <span className="inline-flex items-center justify-center size-6 rounded-full bg-accent/15 text-accent shrink-0 mt-0.5">
                <Check className="size-4" />
              </span>
              <span className="font-medium text-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
